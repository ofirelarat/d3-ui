import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true // Allow importing components from outside the app directory
  }
};

export default nextConfig;
