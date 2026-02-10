/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export', // Active le SSG
  basePath: '/frontend-carambar',
  assetPrefix: '/frontend-carambar',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
