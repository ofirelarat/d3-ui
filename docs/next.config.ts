import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@d3-ui': process.cwd() + '/../components',
    };
    return config;
  },
  experimental: {
    externalDir: true, // Allow importing components from outside the app directory
  }
};

export default nextConfig;
