import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "images.unsplash.com",
      "assets.aceternity.com",
      "images.pexels.com",
      "plus.unsplash.com",
      "firebasestorage.googleapis.com",
      "images.ctfassets.net",
      "dkwyrpnldnrcxphesnfl.supabase.co",
      "profileimage.com", // TODO: temporary fix, get rid of this later
    ],
  },
};

export default nextConfig;
