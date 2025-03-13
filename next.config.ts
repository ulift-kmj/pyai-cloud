import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'], // Unsplash 도메인 추가
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
