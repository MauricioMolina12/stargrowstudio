import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = nextConfig;

export default nextConfig;
