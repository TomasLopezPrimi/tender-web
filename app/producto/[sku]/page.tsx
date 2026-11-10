import { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { getMetadataBySku } from "@/lib/products";
import { getHydratedProducts } from "@/lib/api/catalog";
import { getInterestFreeInstallments } from '@/config';
import ProductClientPage from '@/components/productos/product-client-page';
import ProductInfoSections from '@/components/productos/detail/product-info-sections';
import { SITE_URL, absoluteUrl } from '@/lib/site';
import JsonLd from '@/components/seo/json-ld';


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
      canonical: absoluteUrl(`/producto/${metadata.sku}`),
    },
    openGraph: {
      title: `${metadata.title} | Tender®`,
      description: metadata.description,
      images: [{ url: absoluteUrl(metadata.images[0]) }],
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const metadata = getMetadataBySku(resolvedParams.sku);

  if (!metadata) notFound();

  await connection();
  const interestFreeInstallments = getInterestFreeInstallments();

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
    "image": product.images.map((img: string) => absoluteUrl(img)),
    "description": product.description,
    "sku": product.sku,
    "brand": { "@type": "Brand", "@id": `${SITE_URL}/#brand`, "name": "Tender®" },
    "offers": {
      "@type": "AggregateOffer",
      "url": absoluteUrl(`/producto/${product.sku}`),
      "priceCurrency": "ARS",
      "lowPrice": lowestPrice,
      "highPrice": highestPrice,
      "offerCount": product.sizes.length,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="min-h-screen bg-white pb-20">
        <ProductClientPage
          product={product}
          sku={resolvedParams.sku}
          pricingConfig={pricingConfig}
          interestFreeInstallments={interestFreeInstallments}
        />
        <ProductInfoSections product={product} />
      </main>
    </>
  );
}
