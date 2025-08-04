import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  //     images: {
  //       domains: ['edusol-psi.vercel.app'], 
  //     },
  
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
