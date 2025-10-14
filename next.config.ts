// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',              
  images: { unoptimized: true }, 
  basePath: '/myport',
  assetPrefix: '/myport/',
};
export default nextConfig;
