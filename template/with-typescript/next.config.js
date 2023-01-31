/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    dev: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
