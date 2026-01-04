const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/sketches-showcase" : "",
  assetPrefix: isProd ? "/sketches-showcase/" : "",
};

module.exports = nextConfig;
