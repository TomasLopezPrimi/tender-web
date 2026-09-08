import { Metadata } from "next";
import ContactSection from "@/components/home/contact-section";
import InstallationsAndShipping from "@/components/servicio-tecnico/instalacion";
import { baseProductMetadata } from "@/lib/products";
import { getHydratedProducts } from "@/lib/api/catalog";
import CategorySection from "@/components/productos/category-section";
import CategoryTabs from "@/components/productos/category-tabs";
import { absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/seo/json-ld";
import Link from "next/link";

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
  title: 'Tenders de ropa: colgantes y rebatibles | Tender®',
  description: 'Conocé los tenders de ropa Tender®: modelos colgantes de techo y rebatibles de pared para elegir según tu espacio.',
  alternates: {
    canonical: absoluteUrl('/productos'),
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
        
        <section className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl text-(--tender-navy) md:text-4xl">
            Tenders de ropa colgantes y rebatibles
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-(--tender-text-muted) leading-relaxed">
            Elegí un tendedero de ropa según dónde lo vas a instalar: los modelos colgantes aprovechan el techo y los rebatibles se pliegan sobre la pared.
          </p>
          <p className="mt-4 text-sm text-(--tender-text-muted)">
            ¿Necesitás ayuda? <Link href="/como-elegir-un-tender" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">Leé cómo elegir un tender según tu espacio</Link> o <Link href="/tienda" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">consultá los modelos y precios para comprar</Link>.
          </p>
        </section>

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
