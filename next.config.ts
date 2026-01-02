const isProd = process.env.NODE_ENV === 'production';

// @type {import('next').NextConfig} 
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/sketches-showcase' : '',
  assetPrefix: isProd ? '/sketches-showcase/' : '',
};

module.exports = nextConfig;
