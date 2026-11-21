import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/opencode5',
  assetPrefix: '/opencode5',
};

export default nextConfig;
