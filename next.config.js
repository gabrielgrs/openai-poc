/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    VERCEL_URL: process.env.VERCEL_URL,
  },
}

module.exports = nextConfig
