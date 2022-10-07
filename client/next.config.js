/** @type {import('next').NextConfig} */

const rewrites = async () => {
  return [
    {
      source: "/photos",
      destination: `https://devc-my-unsplash-api.onrender.com/api/${process.env.API_KEY}/photos`,
    },
    {
      source: "/photos/delete/:id",
      destination: `https://devc-my-unsplash-api.onrender.com/api/${process.env.API_KEY}/photos/delete/:id`,
    },
    {
      source: "/photos/:page",
      destination: `https://devc-my-unsplash-api.onrender.com/api/${process.env.API_KEY}/photos?page=:page`,
    },
    {
      source: "/photos/:label/:page",
      destination: `https://devc-my-unsplash-api.onrender.com/api/${process.env.API_KEY}/photos?label=:label&page=:page`,
    },
  ]
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  env: { 
    API_KEY: process.env.API_KEY,
    DEL_PASS: process.env.DEL_PASS },
  rewrites,
}

module.exports = nextConfig
