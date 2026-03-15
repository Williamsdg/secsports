import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/secsports",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
      },
      {
        protocol: "https",
        hostname: "s.espncdn.com",
      },
    ],
  },
};

export default nextConfig;
