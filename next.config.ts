import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      '192.168.11.253',
      'picsum.photos',
      'avatar.iran.liara.run',
      '192.168.11.172'
    ],
    remotePatterns: [
      {
        protocol: 'http', // Explicitly allow HTTP
        hostname: '192.168.11.172', // Specify your hostname
      },
      {
        protocol: 'https', // Allow HTTPS for all
        hostname: '**',
      },
    ],
    unoptimized: false,
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
};

export default nextConfig;
