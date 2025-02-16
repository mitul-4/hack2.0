import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
      {
        protocol: "https",
        hostname: "cookingformysoul.com",
      },
      {
        protocol: "https",
        hostname: "www.sipandfeast.com",
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "sugargeekshow.com",
      },
    ],
  },
};

export default nextConfig;

