import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Disable the built-in image optimization when using an external CDN or serving images
    unoptimized: false,
    domains: ['localhost', 'picsum.photos'],

    // Allow loading images from all origins
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all subdomains and domains
      },
    ],

    // Enable device sizes for responsive images
    deviceSizes: [320, 420, 768, 1024, 1200],

    // Enable image sizes for static `Image` components
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  reactStrictMode: true, // Ensures React is running in strict mode
};

export default nextConfig;
