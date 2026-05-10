import { Metadata } from "next"; 
import ContactSection from "@/components/home/contact-section";
import { baseProductMetadata } from "@/lib/products";
import { getHydratedProducts } from "@/lib/catalog";
import CategorySection from "@/components/productos/category-section";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tienda - Tender®',
  description: 'Comprá Tender® Online! Comprar Tender colgante, Tender Rebatible y Tender Plegable. Todos los modelo y todas las medidas de Tender Original.',
  alternates: {
    canonical: 'https://www.tender.com.ar/tienda', 
  }
};

export default async function ProductosPage() {
  const { products } = await getHydratedProducts(baseProductMetadata);

  const colgantes = products.filter((p) => p.code.includes("COL"));
  const rebatibles = products.filter((p) => p.code.includes("REB"));

  const colganteVideo = colgantes[0]?.videoUrl;
  const colganteFeatures = colgantes[0]?.features || [];
  
  const rebatibleVideo = rebatibles[0]?.videoUrl;
  const rebatibleFeatures = rebatibles[0]?.features || [];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.tender.com.ar/producto/${product.sku}`
    }))
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        
        <h1 className="sr-only">
          Tender Original: Catálogo de Modelos Colgantes y Rebatibles
        </h1>
        
        <CategorySection 
          type="Colgante"
          title="Al Nivel de tu Ropa"
          subtitle="Ideal para techos de todo tipo. Con mayor regulación de altura y caja reductora de peso."
          heroImage="/images/producto/tender-col-hero.jpg"
          videoUrl={colganteVideo}
          features={colganteFeatures}
          productsData={colgantes}
          bgColor="bg-background"
        />

        <CategorySection 
          type="Rebatible"
          title="Optimizá tu Espacio"
          subtitle="Perfecto para paredes. Se pliega a 90 grados ocupando el mínimo espacio cuando no se utiliza."
          heroImage="/images/producto/tender-reb-hero.jpg"
          videoUrl={rebatibleVideo}
          features={rebatibleFeatures}
          productsData={rebatibles}
          bgColor="bg-muted/20"
        />

      </main>

      <ContactSection />
    </div>
  );
}