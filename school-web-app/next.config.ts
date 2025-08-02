import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // My own config options
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://school-service-ms-app.educesol.com/:path*',
      },
    ];
  },
};

export default nextConfig;
