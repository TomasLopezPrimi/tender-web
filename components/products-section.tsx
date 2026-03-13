"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  badge?: string
  badgeColor?: string
  price?: string
  href: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Tender Colgante 8H",
    image: "/images/Tender-Colgante-8H-1080x810-1.jpg",
    badge: "Más vendido",
    badgeColor: "bg-[var(--tender-cyan)]",
    href: "#tender-colgante-8h",
  },
  {
    id: 2,
    name: "Tender Colgante 6H",
    image: "/images/tender-colgante-6H-1080x810-1.jpg",
    href: "#tender-colgante-6h",
  },
  {
    id: 3,
    name: "Tender Colgante 4H",
    image: "/images/Tender-Rebatible-fdo-azul-4-HILOS.jpg",
    href: "#tender-colgante-4h",
  },
  {
    id: 4,
    name: "Tender Rebatible 6H",
    image: "/images/Tender-Rebatible-azul-6H-1080x810-ruido.jpg",
    badge: "Nuevo",
    badgeColor: "bg-[var(--tender-navy)]",
    href: "#tender-rebatible-6h",
  },
  // {
  //   id: 5,
  //   name: "Tender Rebatible 4H",
  //   image: "/images/product-rebatible.jpg",
  //   price: "$505.301,00",
  //   href: "#tender-rebatible-4h",
  // },
]

export default function ProductsSection() {
  return (
    <section id="productos" className="py-20 bg-background" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            id="products-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-(--tender-text-dark) tracking-wide text-balance"
          >
            Productos Destacados{" "}
            <span className="text-(--tender-navy)">Tender</span>
            <sup className="text-lg align-super">®</sup>
          </h2>
          <div className="gold-line mt-4" />
          <p className="mt-4 text-(--tender-text-muted) text-base">
            Seleccioná el que más se adapta a tus necesidades.
          </p>
        </div>

        {/* Product grid - 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.href}
      className="group block rounded-xl overflow-hidden shadow-sm border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-(--tender-navy)/10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 ${product.badgeColor || "bg-(--tender-cyan)"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h3 className="text-sm font-semibold text-[var(--tender-navy)] leading-snug">
          {product.name}
        </h3>
        {product.price && (
          <p className="mt-1.5 text-xs text-[var(--tender-cyan)] font-semibold">
            {product.price}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-[var(--tender-cyan)] text-xs font-medium group-hover:gap-2 transition-all duration-300">
          Ver más <ArrowRight size={12} />
        </span>
      </div>
    </a>
  )
}
