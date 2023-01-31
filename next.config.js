/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.elvillanense.com.ar", "media.ambito.com"],
  },
};

module.exports = nextConfig;
