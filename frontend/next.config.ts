import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix Turbopack workspace root detection with multiple lockfiles
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Ensure output file tracing resolves from the correct root
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
