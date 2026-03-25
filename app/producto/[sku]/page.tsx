import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySku } from "@/lib/products";
import ProductClientPage from '@/components/productos/product-client-page';


interface ProductPageProps {
  params: Promise<{
    sku: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySku(resolvedParams.sku);

  if (!product) {
    return {
      title: 'Producto no encontrado | Tender®',
    };
  }

  return {
    title: `${product.title} | Tender® Original`,
    description: `Comprá ${product.title} online. ${product.description.substring(0, 100)}... Conocé medidas y precios de Tender Original.`,
    alternates: {
      canonical: `https://www.tender.com.ar/producto/${product.sku}`,
    },
    openGraph: {
      title: `${product.title} | Tender®`,
      description: product.description,
      images: [{ url: `https://www.tender.com.ar${product.images[0]}` }],
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySku(resolvedParams.sku);

  if (!product) {
    notFound();
  }

  const lowestPrice = Math.min(...product.sizes.map(s => s.price));
  const highestPrice = Math.max(...product.sizes.map(s => s.price));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images.map(img => `https://www.tender.com.ar${img}`),
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Tender®"
    },
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
      <ProductClientPage product={product} sku={resolvedParams.sku} />
    </>
  );
}