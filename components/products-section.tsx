"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products, Product as BaseProduct } from "@/lib/products"

interface UIProduct extends BaseProduct {
  badge?: string;
  badgeColor?: string;
}

export default function ProductsSection() {
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
    // Reduje el padding vertical (py-12 en vez de py-20) para que ocupe menos alto de pantalla
    <section id="productos" className="py-12 md:py-16 bg-background" aria-labelledby="products-heading">
      {/* Contenedor más angosto (max-w-5xl) para achicar todas las tarjetas proporcionalmente */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2
            id="products-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
          >
            Productos Destacados{" "}
            <span className="text-[var(--tender-navy)]">Tender</span>
            <sup className="text-base align-super">®</sup>
          </h2>
          <div className="gold-line mt-3" />
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

function ProductCard({ product }: { product: UIProduct }) {
  return (
    <Link
      href={`/producto/${product.sku}`}
      className="group flex flex-col h-full rounded-xl overflow-hidden shadow-sm border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto w-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--tender-gray-bg)]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${product.badgeColor || "bg-[var(--tender-cyan)]"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide z-10 shadow-sm`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Padding reducido (p-4) y textos más compactos */}
      <div className="p-4 text-center flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[var(--tender-navy)] leading-snug mb-1">
            {product.title}
          </h3>
          <p className="text-xs md:text-sm text-[var(--tender-cyan)] font-semibold">
            {product.priceRange}
          </p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="inline-flex items-center justify-center gap-1.5 text-[var(--tender-navy-mid)] text-xs font-semibold group-hover:text-[var(--tender-cyan)] transition-colors duration-300">
            Ver detalles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}