"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ... (Interfaz ProductCategory se mantiene igual) ...
interface ProductCategory {
  id: number
  name: string
  title: string
  description: string
  image: string
  cta: string
  ctaHref: string
}

// ... (Array productCategories se mantiene igual) ...
const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Tender Colgante",
    title: "Tender® Colgante",
    description: "Liviano y fácil de usar gracias a su estructura de aluminio y a su mecanismo de reducción de peso. Más de 60 medidas disponibles para todo tipo de espacios.",
    image: "/images/tender-colgante.jpg",
    cta: "Comprar Ahora!",
    ctaHref: "#tender-colgante",
  },
  {
    id: 2,
    name: "Tender Plegable",
    title: "Tender® Plegable",
    description: "Con pie de caño blanco. Puede plegarse cuando no se utiliza. Práctico para balcones, terrazas y espacios reducidos. Portátil y apropiado para secar la ropa bajo el sol.",
    image: "/images/tender-plegable.jpg",
    cta: "Consultar!",
    ctaHref: "#tender-plegable",
  },
  {
    id: 3,
    name: "Tender Rebatible",
    title: "Tender® Rebatible",
    description: "Ideal para el tendido a baja altura. Con dos posiciones, una de guardado y otra de uso a 90º. Ocupando solamente 10 cm desde la pared cuando está plegado.",
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
    // CAMBIO 1: Fondo claro azulado (usando tu variable --tender-gray-bg)
    <section id="espacios" className="py-24 bg-[var(--tender-gray-bg)]" aria-labelledby="spaces-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            id="spaces-heading"
            // CAMBIO 2: Textos vuelven a ser oscuros para fondo claro
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
          >
            Todo Espacio Tiene un{" "}
            <span className="text-[var(--tender-navy)]">Tender</span>
            <sup className="text-lg align-super text-[var(--tender-navy)]">®</sup>
          </h2>
          <div className="gold-line mt-6" />
          <p className="mt-5 text-[var(--tender-text-muted)] text-lg max-w-2xl mx-auto font-light">
            Nuestros equipos se adaptan perfectamente a los ambientes más diversos.
          </p>
        </div>

        {/* Main carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 bg-white border border-border/50"
            // CORRECCIÓN: Volvemos a la proporción original 16/10 para no cortar imágenes
            style={{ aspectRatio: "16/10" }}
            aria-label="Galería de espacios"
            aria-roledescription="carousel"
          >
            {productCategories.map((category, i) => (
              <div
                key={category.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                aria-hidden={i !== current}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={prev}
              // CAMBIO 3: Flechas adaptadas a fondo claro (blancas con borde sutil)
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[var(--tender-cyan)] rounded-full p-3 text-[var(--tender-navy)] hover:text-white shadow-lg transition-all duration-300 hover:scale-110 border border-border"
              aria-label="Categoría anterior"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[var(--tender-cyan)] rounded-full p-3 text-[var(--tender-navy)] hover:text-white shadow-lg transition-all duration-300 hover:scale-110 border border-border"
              aria-label="Siguiente categoría"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3"
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
                      // Puntos cyan para el activo sobre la foto
                      ? "bg-[var(--tender-cyan)] w-8 h-2.5 shadow-[0_0_8px_rgba(114,226,200,0.6)]"
                      : "bg-white/60 w-2.5 h-2.5 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category cards below carousel */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {productCategories.map((category, i) => (
            <article
              key={category.id}
              // CAMBIO 4: Tarjetas vuelven a fondo blanco (bg-white)
              className={`p-8 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col h-full ${
                i === current
                  ? "border-[var(--tender-cyan)] bg-white shadow-xl shadow-[var(--tender-cyan)]/5 -translate-y-2"
                  : "border-border bg-white hover:border-[var(--tender-cyan)]/50 hover:shadow-lg"
              }`}
              onClick={() => goTo(i)}
            >
              <h3 className={`text-xl font-serif mb-3 transition-colors ${i === current ? 'text-[var(--tender-cyan)]' : 'text-[var(--tender-navy)]'}`}>
                {category.title}
              </h3>
              <p className="text-sm text-[var(--tender-text-muted)] leading-relaxed mb-6 flex-grow">
                {category.description}
              </p>
              <div className="mt-auto pt-2">
                <a
                  href={category.ctaHref}
                  className={`inline-flex items-center text-sm font-semibold tracking-wide transition-colors ${
                    i === current 
                    ? "text-[var(--tender-cyan)] hover:text-[var(--tender-navy)]" 
                    : "text-[var(--tender-cyan)] hover:underline"
                  }`}
                >
                  {category.cta}
                  <ChevronRight size={16} className={`ml-1 transition-transform ${i === current ? 'translate-x-1' : ''}`} />
                </a>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  )
}