import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async redirects() {
    return [
      { source: '/eventi', destination: '/workshop', permanent: true },
      { source: '/meetup', destination: '/workshop', permanent: true },
      { source: '/meet-up', destination: '/workshop', permanent: true },
      { source: '/community', destination: '/workshop#community', statusCode: 301 },
    ]
  },
};

export default nextConfig;
