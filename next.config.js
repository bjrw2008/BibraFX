/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com", "lh3.googleusercontent.com", "onedrive.live.com"]
  }
};
module.exports = nextConfig;
