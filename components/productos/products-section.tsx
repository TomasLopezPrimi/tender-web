import { getGlobalDiscountLabel, shouldShowGlobalDiscountLabel } from "@/lib/pricing"
import { getHydratedProducts } from "@/lib/api/catalog"
import { baseProductMetadata } from "@/lib/products"
import { UIProduct } from "@/types/products"
import Link from "next/link"
import ProductsCarousel from "./products-carousel"

export default async function ProductsSection() {
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--tender-cyan)">
            Desde 1947 · Industria argentina
          </p>
          <h1
            id="products-heading"
            className="mt-3 font-serif text-3xl text-(--tender-navy) text-balance md:text-4xl"
          >
            Tender® Original: tendederos de ropa argentinos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-(--tender-text-muted)">
            Fabricamos tendederos de ropa durables, con instalación, repuestos y servicio técnico.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
            <Link
              href="/tienda"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--tender-navy) px-5 py-3 font-semibold text-white transition-colors hover:bg-(--tender-cyan)"
            >
              Comprar en la tienda
            </Link>
            <Link
              href="/productos"
              className="inline-flex min-h-11 items-center justify-center px-3 py-3 font-semibold text-(--tender-navy) underline decoration-(--tender-cyan) underline-offset-4 hover:text-(--tender-cyan)"
            >
              Ver todos los productos
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

