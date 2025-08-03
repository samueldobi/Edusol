import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
      images: {
        domains: ['edusol-psi.vercel.app'], 
      },
  // My own config options
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-gateway-ms-app.fly.dev/:path*',
      },
    ];
  },
};

export default nextConfig;
