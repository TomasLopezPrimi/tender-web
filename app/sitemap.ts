import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tender.com.ar';

  const routes = [
    '',
    '/tienda',
    // '/contacto', (agregá las que tengas)
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/producto/${product.sku}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Prioridad alta para los productos
  }));

  return [...routes, ...productRoutes];
}