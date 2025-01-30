import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        ".html": ["html-loader"],
        ".js": ["babel-loader"],
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader'],
    });
    return config;
  },
};

export default nextConfig;
