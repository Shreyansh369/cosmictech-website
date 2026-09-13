import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 430, 768, 1024, 1280, 1440, 1920, 2560, 3840],
  },
  experimental: {
    optimizePackageImports: ['motion'],
  },
}

export default nextConfig
