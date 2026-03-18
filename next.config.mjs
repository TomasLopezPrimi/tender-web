/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, 
  },
  async redirects() {
    return [
      // REDIRECCIONES 301 (Viejas -> Nuevas)
      { source: '/producto/tender-colgante-8h/', destination: '/producto/tender-col-8h', permanent: true },
      { source: '/producto/tender-colgante-6h/', destination: '/producto/tender-col-6h', permanent: true },
      { source: '/producto/tender-colgante-4h/', destination: '/producto/tender-col-4h', permanent: true },
      { source: '/producto/tender-rebatible-6h/', destination: '/producto/tender-reb-6h', permanent: true },
      { source: '/producto/tender-rebatible-4h/', destination: '/producto/tender-reb-4h', permanent: true },
    ]
  },
}

export default nextConfig;