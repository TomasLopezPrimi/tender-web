import { getGlobalDiscountLabel, shouldShowGlobalDiscountLabel } from "@/lib/pricing"
import { getHydratedProducts } from "@/lib/api/catalog"
import { baseProductMetadata } from "@/lib/products"
import { UIProduct } from "@/types/products"
import ProductsCarousel from "./products-carousel"

interface ProductsSectionProps {
  needTitle: boolean
}

export default async function ProductsSection({needTitle}: ProductsSectionProps) {
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
    <section id="productos" className="py-12 md:py-16 bg-background" aria-labelledby="products-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          {needTitle && (
            <>
              <h2
                id="products-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
              >
                Productos Destacados{" "}
                <span className="text-[var(--tender-navy)]">Tender</span>
                <sup className="text-base align-super">®</sup>
              </h2>
              <div className="gold-line mt-3" />
            </>
          )}
          <p className="mt-3 text-[var(--tender-text-muted)] text-sm md:text-base">
            Seleccioná el que más se adapta a tus necesidades.
          </p>
        </div>

        <ProductsCarousel products={displayProducts} />
      </div>
    </section>
  )
}

