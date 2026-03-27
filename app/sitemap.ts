import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tender.com.ar';

  const routes = [
    '',
    '/tienda',
    '/productos',
    '/arquitectos',
    '/servicio-tecnico',
    '/showroom',
    '/politica-de-privacidad',
    '/terminos-y-condiciones',
  ].map((route) => {
    let priority = 0.8;
    if (route === '') priority = 1;
    else if (route === '/tienda' || route === '/productos') priority = 0.9;
    else if (route.includes('politica') || route.includes('terminos')) priority = 0.3;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/producto/${product.sku}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...productRoutes];
}