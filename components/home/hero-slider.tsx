"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface Slide {
  id: number
  image: string
  alt: string
  title: string
  subtitle: string
  cta?: string
  ctaHref?: string
  imagePosition?: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/tender-ropa.jpg",
    alt: "Tender con ropa",
    title: "Original como tu ropa",
    subtitle: "La marca que le dio nombre al tendedero Argentino",
    cta: "VER PRODUCTOS",
    ctaHref: "#productos",
    imagePosition: "object-[25%_center] md:object-[center_35%]",
  },

  // {
  //   id: 3,
  //   image: "/images/espacio-balcon.jpg",
  //   alt: "Casa premium con Tender instalado",
  //   title: "Diseño que eleva tu hogar",
  //   subtitle: "Calidad, elegancias y funcionalidad para los hogares más exigentes. La marca que define la categoría.",
  //   cta: "CONOCÉ MÁS",
  //   ctaHref: "#espacios",
  // },
  // {
  //   id: 4,
  //   image: "/images/espacio-lavadero.jpg",
  //   alt: "Tender en lavadero moderno",
  //   title: "Cada espacio merece un Tender®",
  //   subtitle: "Más de 60 medidas disponibles. Encontrá la solución perfecta para tu hogar.",
  //   cta: "VER PRODUCTOS",
  //   ctaHref: "#productos",
  // },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const hasMultipleSlides = slides.length > 1

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating]
  )

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    if (!hasMultipleSlides) return

    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, hasMultipleSlides])

  if (slides.length === 0) return null

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--tender-navy)] h-[85vh] min-h-[600px] 2xl:max-h-[900px]"
      aria-label="Carrusel de productos destacados"
      aria-roledescription={hasMultipleSlides ? "carousel" : "banner"}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className={`object-cover ${slide.imagePosition || "object-center"}`}
            priority={i === 0}
            sizes="100vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-(--tender-navy)/90 from-10% via-(--tender-navy)/0 via-60% to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-28 md:pb-36 px-6 z-10">
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="hidden md:block md:h-14 w-auto select-none mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
              draggable={false}
            />

            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-serif tracking-wide max-w-4xl drop-shadow-md">
              {slide.title}
            </h2>
            
            <div className="gold-line mt-6 opacity-80" />
            
            <p className="mt-5 text-white/90 text-sm md:text-lg max-w-2xl leading-relaxed drop-shadow">
              {slide.subtitle}
            </p>
            
            {slide.cta && (
              <a
                href={slide.ctaHref ?? "#"}
                className="mt-8 inline-block bg-(--tender-cyan) text-white px-10 py-3.5 rounded text-sm font-semibold tracking-widest hover:bg-(--tender-cyan)/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
              >
                {slide.cta}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* CAMBIO 2: Renderizar controles solo si hay más de un slide */}
      {hasMultipleSlides && (
        <>
          {/* Prev/Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm rounded-full"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm rounded-full"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          {/* Dot indicators */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
            role="tablist"
            aria-label="Indicadores del carrusel"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir a diapositiva ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-white w-8 h-2.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    : "bg-white/40 w-2.5 h-2.5 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}