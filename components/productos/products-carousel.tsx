"use client"

import { UIProduct } from "@/types/products"
import ProductCard from "./product-card"

interface ProductsCarouselProps {
  products: UIProduct[]
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  return (
    <>
      {/* Mobile: horizontal scroll carousel */}
      <div className="sm:hidden -mx-4 px-4">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.sku}
              className="snap-center shrink-0 w-[80vw] max-w-xs"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* Scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {products.map((product) => (
            <div key={product.sku} className="w-1.5 h-1.5 rounded-full bg-[var(--tender-navy)] opacity-30" />
          ))}
        </div>
      </div>

      {/* Tablet + Desktop: grid layout */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
        {products.map((product, index) => {
          let gridClasses = "col-span-1 lg:col-span-2"
          if (index === 3) {
            gridClasses += " lg:col-start-2"
          }
          return (
            <div key={product.sku} className={gridClasses}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
    </>
  )
}
