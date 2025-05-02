/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We're using absolute URLs now, so no need for rewrites
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  }
}

module.exports = nextConfig 