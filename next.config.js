/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite cargar imágenes desde S3 y el sitio actual
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'fueradelclosetac.com',
      },
    ],
  },
  // Genera el sitio como HTML estático (para Netlify gratis)
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
