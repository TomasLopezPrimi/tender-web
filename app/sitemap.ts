import { MetadataRoute } from 'next';
import { baseProductMetadata } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = [
    '',
    '/tienda',
    '/productos',
    '/como-elegir-un-tender',
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
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  const productRoutes = baseProductMetadata.map((product) => ({
    url: `${baseUrl}/producto/${product.sku}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...productRoutes];
}
