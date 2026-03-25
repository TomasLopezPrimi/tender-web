"use client"

import { products} from "@/lib/products"
import { UIProduct } from "@/types/products"
import ProductCard from "./product-card"

interface ProductsSectionProps {
  needTitle: boolean
}

export default function ProductsSection({needTitle}: ProductsSectionProps) {
  const displayProducts: UIProduct[] = products.map(p => {
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

        {/* Grilla: 
          - Mobile: 1 columna (grid-cols-1)
          - Tablet: 2 columnas (sm:grid-cols-2)
          - Desktop: 6 columnas para hacer el truco de 3 y 2 centrados
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
          {displayProducts.map((product, index) => {
            // En móvil ocupa todo (1 col). En desktop ocupa 2 de las 6 columnas.
            let gridClasses = "col-span-1 lg:col-span-2";

            // Centramos el 4to producto en la fila de abajo solo en pantallas grandes
            if (index === 3) {
              gridClasses += " lg:col-start-2";
            }

            return (
              <div key={product.sku} className={gridClasses}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

