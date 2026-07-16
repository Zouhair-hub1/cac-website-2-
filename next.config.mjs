/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote images (e.g. Unsplash placeholders) until real photos are added
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
