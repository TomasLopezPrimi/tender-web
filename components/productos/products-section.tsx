import { getGlobalDiscountLabel, shouldShowGlobalDiscountLabel } from "@/lib/pricing"
import { getHydratedProducts } from "@/lib/api/catalog"
import { baseProductMetadata } from "@/lib/products"
import { UIProduct } from "@/types/products"
import Link from "next/link"
import ProductsCarousel from "./products-carousel"

interface ProductsSectionProps {
  needTitle?: boolean
}

export default async function ProductsSection({ needTitle = true }: ProductsSectionProps) {
  const { products, pricingConfig } = await getHydratedProducts(baseProductMetadata)
  const showGlobalLabel = shouldShowGlobalDiscountLabel(pricingConfig)
  const globalLabel = getGlobalDiscountLabel(pricingConfig)

  const displayProducts: UIProduct[] = products.map(p => {
    if (showGlobalLabel) {
      return {
        ...p,
        badge: globalLabel,
        badgeColor: "bg-rose-500",
      };
    }

    let uiProps = {};
    if (p.sku === "tender-col-6h") {
      uiProps = { badge: "Más vendido", badgeColor: "bg-[var(--tender-cyan)]" };
    } else if (p.sku === "tender-reb-6h") {
      // uiProps = { badge: "Nuevo", badgeColor: "bg-[var(--tender-navy)]" };
    }
    return { ...p, ...uiProps };
  });

  
  return (
    <section id="productos" className="bg-background py-12 md:py-16" aria-labelledby="products-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--tender-cyan)">
            Tendederos de ropa
          </p>
          <h1
            id="products-heading"
            className={needTitle
              ? "mt-3 font-serif text-3xl text-(--tender-navy) text-balance md:text-4xl"
              : "sr-only"}
          >
            Un Tender para cada espacio
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-(--tender-text-muted) md:mx-auto">
            Elegí el modelo que mejor se adapta a tu hogar y a tu forma de secar.
          </p>
          <div className="mt-4 text-sm md:flex md:justify-center">
            <Link
              href="/productos"
              className="inline-flex min-h-11 items-center py-3 font-semibold text-(--tender-navy) underline decoration-(--tender-cyan) underline-offset-4 hover:text-(--tender-cyan)"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ProductsCarousel products={displayProducts} />
        </div>
      </div>
    </section>
  )
}

