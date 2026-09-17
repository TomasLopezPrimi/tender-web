"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const desktopSlides = [
  // { id: 5, image: "/images/banners/banner-05.jpg", alt: "Tienda Tender" },
  { id: 1, image: "/images/banners/banner-01.jpg", alt: "Tienda Tender - Tendederos originales de fábrica" },
]

const mobileSlides = [
  // { id: 5, image: "/images/banners/mobile/banner-05.jpg", alt: "Tienda Tender" },
  { id: 1, image: "/images/banners/mobile/banner-01.jpg", alt: "Tienda Tender - Tendederos originales de fábrica" },
]

const slideCount = desktopSlides.length

export default function TiendaHero() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const hasMultipleSlides = slideCount > 1

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 1000)
    },
    [isAnimating]
  )

  const prev = useCallback(() => {
    goTo(current === 0 ? slideCount - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === slideCount - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    if (!hasMultipleSlides) return

    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, hasMultipleSlides])

  return (
    <section
      className="relative w-full overflow-hidden h-[calc(100svh-var(--navbar-height))]"
      aria-label="Carrusel tienda"
      aria-roledescription={hasMultipleSlides ? "carousel" : "banner"}
    >
      {/* Capa desktop */}
      {desktopSlides.map((slide, i) => (
        <div
          key={`desktop-${slide.id}`}
          className={`absolute inset-0 hidden md:block transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Capa mobile */}
      {mobileSlides.map((slide, i) => (
        <div
          key={`mobile-${slide.id}`}
          className={`absolute inset-0 md:hidden transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-[25%_center]"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/*
      <div className="absolute inset-x-4 bottom-12 z-30 text-center text-white md:bottom-16">
        <h1 className="font-serif text-3xl drop-shadow-md md:text-5xl">Comprar tenders de ropa Tender®</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm drop-shadow-md md:text-base">Compará modelos, medidas y precios para elegir el tender que buscás.</p>
      </div>
      */}

      {hasMultipleSlides && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white/50 hover:text-white transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm rounded-full"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white/50 hover:text-white transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm rounded-full"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </>
      )}
    </section>
  )
}
