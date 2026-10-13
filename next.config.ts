import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
    // Fresh builds avoid stale stylesheet artifacts during local design iterations.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default createMDX()(nextConfig);
