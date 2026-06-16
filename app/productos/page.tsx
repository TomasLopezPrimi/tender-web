import { Metadata } from "next";
import ContactSection from "@/components/home/contact-section";
import InstallationsAndShipping from "@/components/servicio-tecnico/instalacion";
import { baseProductMetadata } from "@/lib/products";
import { getHydratedProducts } from "@/lib/api/catalog";
import CategorySection from "@/components/productos/category-section";
import CategoryTabs from "@/components/productos/category-tabs";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/seo/json-ld";

export const revalidate = 60;

type CategoryType = "colgante" | "rebatible";

const categoryConfig = {
  colgante: {
    type: "Colgante" as const,
    title: "Al Nivel de tu Ropa",
    subtitle: "Ideal para techos de todo tipo. Con mayor regulación de altura y caja reductora de peso.",
    heroImage: "/images/producto/tender-col-hero.jpg",
    bgColor: "bg-background",
  },
  rebatible: {
    type: "Rebatible" as const,
    title: "Optimizá tu Espacio",
    subtitle: "Perfecto para paredes. Se pliega a 90 grados ocupando el mínimo espacio cuando no se utiliza.",
    heroImage: "/images/producto/tender-reb-hero.jpg",
    bgColor: "bg-muted/20",
  },
};

export const metadata: Metadata = {
  title: 'Tienda - Tender®',
  description: 'Comprá Tender® Online! Comprar Tender colgante, Tender Rebatible y Tender Plegable. Todos los modelo y todas las medidas de Tender Original.',
  alternates: {
    canonical: absoluteUrl('/tienda'),
  }
};

interface ProductosPageProps {
  searchParams: Promise<{ tipo?: string }>;
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const { tipo } = await searchParams;
  const active: CategoryType = tipo === "rebatible" ? "rebatible" : "colgante";

  const { products } = await getHydratedProducts(baseProductMetadata);

  const codeFilter = active === "colgante" ? "COL" : "REB";
  const categoryProducts = products.filter((p) => p.code.includes(codeFilter));

  const config = categoryConfig[active];
  const video = categoryProducts[0]?.videoUrl;
  const features = categoryProducts[0]?.features || [];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": absoluteUrl(`/producto/${product.sku}`)
    }))
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <JsonLd data={itemListSchema} />
        
        <h1 className="sr-only">
          Tender Original: Catálogo de Modelos Colgantes y Rebatibles
        </h1>

        <CategoryTabs active={active} />

        <CategorySection
          type={config.type}
          title={config.title}
          subtitle={config.subtitle}
          heroImage={config.heroImage}
          videoUrl={video}
          features={features}
          productsData={categoryProducts}
          bgColor={config.bgColor}
        />

        <InstallationsAndShipping />

      </main>

      <ContactSection />
    </div>
  );
}