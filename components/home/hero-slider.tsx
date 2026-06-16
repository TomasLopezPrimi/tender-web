"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  image: string
  alt: string
  imagePosition?: string
}

// Banners para DESKTOP — horizontal / apaisado. Recomendado: 2560×1440 px (16:9)
const desktopSlides: Slide[] = [
  {
    id: 1,
    image: "/images/banners/banner-01.jpg",
    alt: "Tender con ropa",
    imagePosition: "object-[center_35%]",
  },
  {
    id: 2,
    image: "/images/banners/banner-02.jpg",
    alt: "Banner Tender",
  },
  // {
  //   id: 3,
  //   image: "/images/banners/banner-03.jpg",
  //   alt: "Banner Tender",
  // },
  // {
  //   id: 4,
  //   image: "/images/banners/banner-04.jpg",
  //   alt: "Banner Tender",
  // },
  {
    id: 5,
    image: "/images/banners/banner-05.jpg",
    alt: "Banner Tender",
  },
]

// Banners para CELULAR — vertical / parado. Recomendado: 1080×1920 px (9:16)
// Debe tener la MISMA cantidad de slides que desktopSlides (se emparejan por posición).
const mobileSlides: Slide[] = [
  {
    id: 1,
    image: "/images/banners/mobile/banner-01.jpg",
    alt: "Tender con ropa",
  },
  {
    id: 2,
    image: "/images/banners/mobile/banner-02.jpg",
    alt: "Banner Tender",
  },
  // {
  //   id: 3,
  //   image: "/images/banners/mobile/banner-03.jpg",
  //   alt: "Banner Tender",
  // },
  // {
  //   id: 4,
  //   image: "/images/banners/mobile/banner-04.jpg",
  //   alt: "Banner Tender",
  // },
  {
    id: 5,
    image: "/images/banners/mobile/banner-05.jpg",
    alt: "Banner Tender",
  },
]

const slideCount = desktopSlides.length

export default function HeroSlider() {
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

  if (slideCount === 0) return null

  return (
    <section
      className="relative w-full overflow-hidden bg-[var(--tender-navy)] h-[calc(100svh-var(--navbar-height))]"
      aria-label="Carrusel de productos destacados"
      aria-roledescription={hasMultipleSlides ? "carousel" : "banner"}
    >
      {/* Capa desktop — visible desde md hacia arriba */}
      {desktopSlides.map((slide, i) => (
        <div
          key={`desktop-${slide.id}`}
          className={
            `absolute inset-0 hidden md:block transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`
        }
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
        </div>
      ))}

      {/* Capa celular — visible por debajo de md */}
      {mobileSlides.map((slide, i) => (
        <div
          key={`mobile-${slide.id}`}
          className={
            `absolute inset-0 md:hidden transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`
        }
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
        </div>
      ))}

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
        </>
      )}
    </section>
  )
}
