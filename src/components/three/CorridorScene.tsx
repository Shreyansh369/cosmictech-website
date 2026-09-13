'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { corridorExtent, sectionBoundaries, systemLayers } from '@/data/systemLayers'

/**
 * THE CORRIDOR
 *
 * An interactive railway system architecture. The track datum lies at the
 * base; the signalling stack rises above it as a lattice of layers, with
 * risers at each block-section boundary tying the layers together.
 *
 * The animation is not ornament — it is the mechanism. An occupancy pulse
 * runs the corridor; as it enters a section, that section's detection
 * registers, and the consequence propagates upward through signalling,
 * interlocking, control and network in the order the real system does it.
 * Watching it is watching automatic block working.
 *
 * Performance approach: the entire lattice is ONE BufferGeometry of line
 * segments with a vertex-colour attribute, and every node is one
 * InstancedMesh. Highlighting writes into those buffers rather than
 * rebuilding the scene, so the whole corridor is two draw calls.
 */

const COL_BASE = new THREE.Color('#66727d')
const COL_RAIL = new THREE.Color('#8d979e')
const COL_DIM = new THREE.Color('#2b333a')
const COL_ACCENT = new THREE.Color('#e4542c')
const COL_LIVE = new THREE.Color('#f07a4f')
const COL_NODE = new THREE.Color('#a6b0b7')

interface SegmentMeta {
  /** Index of the layer this segment belongs to; -1 for the track datum. */
  layer: number
  /** Section boundary index, or -1 for longitudinal runs. */
  boundary: number
  kind: 'rail' | 'run' | 'riser' | 'tick'
}

function buildLattice() {
  const positions: number[] = []
  const meta: SegmentMeta[] = []

  const push = (
    a: [number, number, number],
    b: [number, number, number],
    m: SegmentMeta,
  ) => {
    positions.push(...a, ...b)
    meta.push(m)
  }

  // --- Track datum: two rails, abstracted to hairlines -------------------
  for (const x of [-1.15, 1.15]) {
    push([x, 0, corridorExtent.near], [x, 0, corridorExtent.far], {
      layer: -1,
      boundary: -1,
      kind: 'rail',
    })
  }

  // Boundary ticks across the datum — where detection sits.
  sectionBoundaries.forEach((z, bi) => {
    push([-1.85, 0, z], [1.85, 0, z], { layer: 0, boundary: bi, kind: 'tick' })
  })

  // --- Layer runs: one longitudinal line per layer above the datum -------
  systemLayers.forEach((layer, li) => {
    if (li === 0) return // the physical layer is the track itself
    push(
      [0, layer.elevation, corridorExtent.near],
      [0, layer.elevation, corridorExtent.far],
      { layer: li, boundary: -1, kind: 'run' },
    )

    // Cross-ticks at each boundary, so a layer reads as a structure
    sectionBoundaries.forEach((z, bi) => {
      push([-1.1, layer.elevation, z], [1.1, layer.elevation, z], {
        layer: li,
        boundary: bi,
        kind: 'tick',
      })
    })
  })

  // --- Risers: the interlock lattice tying layer n to layer n+1 ----------
  sectionBoundaries.forEach((z, bi) => {
    for (let li = 0; li < systemLayers.length - 1; li++) {
      const a = systemLayers[li]
      const b = systemLayers[li + 1]
      if (!a || !b) continue
      push([0, a.elevation, z], [0, b.elevation, z], {
        layer: li + 1,
        boundary: bi,
        kind: 'riser',
      })
    }
  })

  return { positions: new Float32Array(positions), meta }
}

function Lattice({
  activeLayer,
  reducedMotion,
}: {
  activeLayer: string | null
  reducedMotion: boolean
}) {
  const { positions, meta } = useMemo(buildLattice, [])
  const colorAttr = useMemo(() => new Float32Array(positions.length), [positions.length])
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  const activeIndex = activeLayer
    ? systemLayers.findIndex((l) => l.id === activeLayer)
    : -1

  // Node instances: one per layer per boundary.
  const nodeCount = systemLayers.length * sectionBoundaries.length
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useMemo(() => {
    // Initial node placement never changes; only colour does.
    const mesh = nodesRef.current
    if (!mesh) return
    let i = 0
    for (const layer of systemLayers) {
      for (const z of sectionBoundaries) {
        dummy.position.set(0, layer.elevation, z)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        i++
      }
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [dummy])

  useFrame(({ clock }) => {
    const mesh = nodesRef.current
    const geo = geometryRef.current
    if (!mesh || !geo) return

    // Place instances on first frame (ref is null during useMemo above).
    if (!mesh.userData.placed) {
      let i = 0
      for (const layer of systemLayers) {
        for (const z of sectionBoundaries) {
          dummy.position.set(0, layer.elevation, z)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
          i++
        }
      }
      mesh.instanceMatrix.needsUpdate = true
      mesh.userData.placed = true
    }

    const t = clock.getElapsedTime()

    /* ---- The occupancy pulse ------------------------------------------
       A train runs the corridor on a 13s cycle. `pulseZ` is where it is;
       `enteredAt[b]` is how long ago it passed boundary b, which drives the
       upward propagation through the layers. */
    const cycle = 11
    const progress = reducedMotion ? 0.42 : (t % cycle) / cycle
    const pulseZ = corridorExtent.near + (corridorExtent.far - corridorExtent.near) * progress

    const sinceBoundary = sectionBoundaries.map((z) => {
      // Positive once the pulse has passed this boundary.
      const travelled = corridorExtent.near - pulseZ
      const boundaryDist = corridorExtent.near - z
      const delta = travelled - boundaryDist
      return delta >= 0 ? delta : -1
    })

    /** Excitation 0..1 for a given layer/boundary pair. */
    const excitation = (layerIdx: number, boundaryIdx: number) => {
      if (reducedMotion) return 0
      const since = sinceBoundary[boundaryIdx]
      if (since === undefined || since < 0) return 0
      // Propagation delay upward: each layer responds a little after the one below.
      const delay = layerIdx * 0.85
      const local = since - delay
      if (local < 0 || local > 4.5) return 0
      return Math.max(0, 1 - local / 4.5)
    }

    /* ---- Line colours -------------------------------------------------- */
    for (let s = 0; s < meta.length; s++) {
      const m = meta[s]
      if (!m) continue

      let base: THREE.Color
      if (m.kind === 'rail') base = COL_RAIL
      else if (activeIndex >= 0 && m.layer !== activeIndex) base = COL_DIM
      else base = COL_BASE

      tmpColor.copy(base)

      if (activeIndex >= 0 && m.layer === activeIndex) {
        tmpColor.lerp(COL_ACCENT, 0.85)
      }

      const ex = m.boundary >= 0 ? excitation(Math.max(m.layer, 0), m.boundary) : 0
      if (ex > 0) tmpColor.lerp(COL_LIVE, ex * 0.9)

      // Rails light where the pulse currently is.
      if (m.kind === 'rail' && !reducedMotion) {
        tmpColor.lerp(COL_BASE, 0)
      }

      // Both vertices of the segment share the colour.
      const o = s * 6
      for (let v = 0; v < 2; v++) {
        colorAttr[o + v * 3] = tmpColor.r
        colorAttr[o + v * 3 + 1] = tmpColor.g
        colorAttr[o + v * 3 + 2] = tmpColor.b
      }
    }
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute | undefined
    if (colAttr) colAttr.needsUpdate = true

    /* ---- Node colours --------------------------------------------------- */
    let i = 0
    for (let li = 0; li < systemLayers.length; li++) {
      for (let bi = 0; bi < sectionBoundaries.length; bi++) {
        const dimmed = activeIndex >= 0 && li !== activeIndex
        tmpColor.copy(dimmed ? COL_DIM : COL_NODE)
        if (activeIndex === li) tmpColor.copy(COL_ACCENT)
        const ex = excitation(li, bi)
        if (ex > 0) tmpColor.lerp(COL_LIVE, ex)
        mesh.setColorAt(i, tmpColor)
        i++
      }
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <group>
      <lineSegments>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colorAttr, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.95} />
      </lineSegments>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

/** The occupancy marker — a short bright run along the datum. */
function OccupancyMarker({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const cycle = 11
    const progress = reducedMotion ? 0.42 : (clock.getElapsedTime() % cycle) / cycle
    mesh.position.z =
      corridorExtent.near + (corridorExtent.far - corridorExtent.near) * progress
  })

  return (
    <mesh ref={ref} position={[0, 0.02, 0]}>
      <boxGeometry args={[2.3, 0.02, 1.6]} />
      <meshBasicMaterial color="#e4542c" toneMapped={false} transparent opacity={0.85} />
    </mesh>
  )
}

/** Slow parallax on the camera; the corridor is observed, never flown through. */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(-0.6, 4.1, -11), [])

  useFrame(() => {
    if (reducedMotion) {
      camera.position.set(12.2, 4.4, 13.8)
      camera.lookAt(target)
      return
    }
    const tx = 12.2 + pointer.x * 1.4
    const ty = 4.4 - pointer.y * 0.9
    camera.position.x += (tx - camera.position.x) * 0.045
    camera.position.y += (ty - camera.position.y) * 0.045
    camera.position.z = 13.8
    camera.lookAt(target)
  })

  return null
}

export default function CorridorScene({
  activeLayer,
  reducedMotion = false,
}: {
  activeLayer: string | null
  reducedMotion?: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 38, near: 0.5, far: 160, position: [12.2, 4.4, 13.8] }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ pointerEvents: 'none' }}
    >
      <CameraRig reducedMotion={reducedMotion} />
      <fog attach="fog" args={['#0a0d10', 30, 74]} />
      <Lattice activeLayer={activeLayer} reducedMotion={reducedMotion} />
      <OccupancyMarker reducedMotion={reducedMotion} />
    </Canvas>
  )
}
