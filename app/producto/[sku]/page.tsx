import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMetadataBySku } from "@/lib/products";
import { getHydratedProducts, fetchPricingConfig } from "@/lib/catalog";
import ProductClientPage from '@/components/productos/product-client-page';


interface ProductPageProps {
  params: Promise<{
    sku: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const metadata = getMetadataBySku(resolvedParams.sku);

  if (!metadata) {
    return { title: 'Producto no encontrado | Tender®' };
  }

  return {
    title: `${metadata.title} | Tender® Original`,
    description: `Comprá ${metadata.title} online. ${metadata.description.substring(0, 100)}... Conocé medidas y precios de Tender Original.`,
    alternates: {
      canonical: `https://www.tender.com.ar/producto/${metadata.sku}`,
    },
    openGraph: {
      title: `${metadata.title} | Tender®`,
      description: metadata.description,
      images: [{ url: `https://www.tender.com.ar${metadata.images[0]}` }],
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const metadata = getMetadataBySku(resolvedParams.sku);

  if (!metadata) notFound();

  // Hidratar: si el backend no devuelve variantes para este sku, el producto
  // no está disponible → tratar como no encontrado.
  const { products, pricingConfig } = await getHydratedProducts([metadata]);
  const product = products[0];

  if (!product) notFound();

  const lowestPrice = product.minPrice;
  const highestPrice = product.maxPrice;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images.map(img => `https://www.tender.com.ar${img}`),
    "description": product.description,
    "sku": product.sku,
    "brand": { "@type": "Brand", "name": "Tender®" },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://www.tender.com.ar/producto/${product.sku}`,
      "priceCurrency": "ARS",
      "lowPrice": lowestPrice,
      "highPrice": highestPrice,
      "offerCount": product.sizes.length,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientPage product={product} sku={resolvedParams.sku} pricingConfig={pricingConfig} />
    </>
  );
}