"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductCategory {
  id: number
  name: string
  title: string
  description: string
  image: string
  cta: string
  ctaHref: string
}

const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Tender Colgante",
    title: "Tender® Colgante",
    description:
      "Liviano y fácil de usar gracias a su estructura de aluminio y a su mecanismo de reducción de peso. Más de 60 medidas disponibles para todo tipo de espacios.",
    image: "/images/tender-colgante.jpg",
    cta: "Comprar Ahora!",
    ctaHref: "#tender-colgante",
  },
  {
    id: 2,
    name: "Tender Plegable",
    title: "Tender® Plegable",
    description:
      "Con pie de caño blanco. Puede plegarse cuando no se utiliza. Práctico para balcones, terrazas y espacios reducidos. Portátil y apropiado para secar la ropa bajo el sol.",
    image: "/images/tender-plegable.jpg",
    cta: "Consultar!",
    ctaHref: "#tender-plegable",
  },
  {
    id: 3,
    name: "Tender Rebatible",
    title: "Tender® Rebatible",
    description:
      "Ideal para el tendido a baja altura. Con dos posiciones, una de guardado y otra de uso a 90º. Ocupando solamente 10 cm desde la pared cuando está plegado.",
    image: "/images/tender-rebatible.jpg",
    cta: "Comprar Ahora!",
    ctaHref: "#tender-rebatible",
  },
]

export default function SpacesSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 500)
    },
    [isAnimating]
  )

  const prev = useCallback(() => {
    goTo(current === 0 ? productCategories.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === productCategories.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="espacios" className="py-20 bg-background" aria-labelledby="spaces-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="spaces-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
          >
            Todo Espacio Tiene un{" "}
            <span className="text-[var(--tender-navy)]">Tender</span>
            <sup className="text-lg align-super">®</sup>
          </h2>
          <div className="gold-line mt-4" />
          <p className="mt-4 text-[var(--tender-text-muted)] text-base max-w-2xl mx-auto">
            Nuestros equipos se adaptan perfectamente a los ambientes más diversos.
          </p>
        </div>

        {/* Main carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative rounded-xl overflow-hidden shadow-xl"
            style={{ aspectRatio: "16/10" }}
            aria-label="Galería de espacios"
            aria-roledescription="carousel"
          >
            {productCategories.map((category, i) => (
              <div
                key={category.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                aria-hidden={i !== current}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 text-[var(--tender-navy)] shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Categoría anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 text-[var(--tender-navy)] shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Siguiente categoría"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
              role="tablist"
              aria-label="Indicadores de categoría"
            >
              {productCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Ver ${productCategories[i].name}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-white w-6 h-2.5"
                      : "bg-white/60 w-2.5 h-2.5 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category cards below carousel */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {productCategories.map((category, i) => (
            <article
              key={category.id}
              className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                i === current
                  ? "border-[var(--tender-cyan)] bg-[var(--tender-cyan)]/5 shadow-lg shadow-[var(--tender-cyan)]/10"
                  : "border-border bg-card hover:border-[var(--tender-cyan)]/50 hover:shadow-md"
              }`}
              onClick={() => goTo(i)}
            >
              <h3 className="text-lg font-semibold text-[var(--tender-navy)] mb-2 font-serif">
                {category.title}
              </h3>
              <p className="text-sm text-[var(--tender-text-muted)] leading-relaxed mb-4">
                {category.description}
              </p>
              <a
                href={category.ctaHref}
                className="inline-block text-sm font-semibold text-[var(--tender-cyan)] hover:underline transition-colors"
              >
                {category.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
