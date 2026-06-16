"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/images/historia/historia-1.jpeg",
  "/images/historia/historia-2.jpeg",
  "/images/historia/historia-3.jpeg",
  "/images/historia/historia-4.jpeg",
]

export default function HistorySection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

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
    goTo(current === 0 ? images.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === images.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
    setDragOffset(0)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    setDragOffset(e.touches[0].clientX - touchStartX)
  }

  const onTouchEnd = () => {
    if (touchStartX === null) return
    const threshold = 50
    if (dragOffset > threshold) prev()
    else if (dragOffset < -threshold) next()
    setTouchStartX(null)
    setDragOffset(0)
  }

  return (
    <section
      id="historia"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-[var(--tender-navy)] via-[var(--tender-navy-mid)] to-[var(--tender-navy)]"
      aria-label="Historia"
    >
      {/* Glow de acento detrás del carrusel */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] pointer-events-none blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, var(--tender-cyan) 0%, transparent 70%)",
        }}
      />

      {/* Textura sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-black/20 touch-pan-y select-none"
          style={{ aspectRatio: "16/10" }}
          aria-roledescription="carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 ease-out ${
                dragOffset !== 0 ? "transition-none" : "transition-all duration-700"
              } ${
                i === current
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }`}
              style={
                i === current && dragOffset !== 0
                  ? { transform: `translateX(${dragOffset}px)` }
                  : undefined
              }
              aria-hidden={i !== current}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Flechas (solo desde tablet/desktop; en mobile se usa swipe) */}
          <button
            onClick={prev}
            className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[var(--tender-gold)] backdrop-blur-sm rounded-full p-3 text-white hover:text-[var(--tender-navy)] border border-white/15 transition-all duration-300 hover:scale-110"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={26} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[var(--tender-gold)] backdrop-blur-sm rounded-full p-3 text-white hover:text-[var(--tender-navy)] border border-white/15 transition-all duration-300 hover:scale-110"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={26} strokeWidth={1.5} />
          </button>

        </div>

        {/* Indicadores (debajo de la imagen) */}
        <div
          className="mt-6 flex justify-center gap-2.5"
          role="tablist"
          aria-label="Indicadores"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ver imagen ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? "bg-[var(--tender-gold)] w-9"
                  : "bg-white/40 w-2 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
