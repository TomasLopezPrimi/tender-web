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
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/espacio-balcon.jpg",
    alt: "Tender colgante instalado en techo",
    title: "Original como tu ropa",
    subtitle: "Tender® te ofrece la línea de tendederos más completa para secar y cuidar todas tus prendas. ¡Elegí el tuyo!",
    cta: "VER PRODUCTOS",
    ctaHref: "#productos",
  },
  {
    id: 2,
    image: "/images/country-blanco-1500-844-B.jpg",
    alt: "Casa premium con Tender instalado",
    title: "Diseño que eleva tu hogar",
    subtitle: "Calidad, elegancia y funcionalidad para los hogares más exigentes. La marca que define la categoría.",
    cta: "CONOCÉ MÁS",
    ctaHref: "#espacios",
  },
  {
    id: 3,
    image: "/images/espacio-lavadero.jpg",
    alt: "Tender en lavadero moderno",
    title: "Cada espacio merece un Tender®",
    subtitle: "Más de 60 medidas disponibles. Encontrá la solución perfecta para tu hogar.",
    cta: "VER PRODUCTOS",
    ctaHref: "#productos",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--tender-navy)]"
      style={{ height: "clamp(420px, 60vw, 640px)" }}
      aria-label="Carrusel de productos destacados"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-(--tender-navy)/80 via-(--tender-navy)/40 to-(--tender-navy)/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            {/* Ver Video button */}
            {/* <button className="mb-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors group">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/40 group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                <Play size={14} fill="currentColor" />
              </span>
              <span className="tracking-wider text-xs font-medium">Ver Video</span>
            </button> */}

            {/* Logo from real image */}
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="h-10 md:h-14 w-auto select-none"
              style={{ filter: "brightness(0) invert(1)" }}
              draggable={false}
            />

            <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl text-white font-serif tracking-wide">
              {slide.title}
            </h2>
            <div className="gold-line mt-4" />
            <p className="mt-4 text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>
            {slide.cta && (
              <a
                href={slide.ctaHref ?? "#"}
                className="mt-8 inline-block bg-(--tender-cyan) text-white px-10 py-3.5 rounded text-sm font-semibold tracking-widest hover:bg-(--tender-cyan)/90 transition-all duration-300 hover:shadow-lg hover:shadow-(--tender-cyan)/25"
              >
                {slide.cta}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 text-white/60 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 text-white/60 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full"
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5"
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
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
