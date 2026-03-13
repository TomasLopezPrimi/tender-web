"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carla Valente",
    role: "Estudiante",
    image: "/images/testimonial-1.jpg",
    quote:
      "Junto a mi novio, decidimos tener un departamento funcional y la decisión de instalar un Tender fue vital, ya que contamos con poco espacio. Por lo tanto seguimos la recomendación de mi tía Ana y vimos que Tender original era la mejor opción.",
  },
  {
    id: 2,
    name: "Florencio Rusconi",
    role: "Comerciante",
    image: "/images/testimonial-2.jpg",
    quote:
      "En los '60, mi hermano y yo eramos los colocadores de Tender en Flores y Barrio Norte. Aún tengo las cajas de mechas con el mango y el taladro metálico. Recuerdo que no se rompían nunca. Sólo lo sacábamos cuando los usuarios se mudaban. ¡Excelente producto!",
  },
  {
    id: 3,
    name: "Susana Almidón",
    role: "Nutricionista",
    image: "/images/testimonial-3.jpg",
    quote:
      "Nuestro Tender lo compramos hace 18 años y hubo momentos, cuando mis hijos eran pequeños, lo usábamos todos los días. Solo tuvimos que cambiar el hilo de tendido cuando descubrimos que Belén se colgaba y lo usaba como hamaca.",
  },
  {
    id: 4,
    name: "Alejandro Levy",
    role: "Arquitecto",
    image: "/images/testimonial-4.jpg",
    quote:
      "Hace varios años, que recomiendo a mis clientes usar \"Tenders originales\", ya que son los únicos que tienen una excelente calidad. Además de la amplia variedad de tamaños, nos hicieron algunos a medida y quedaron realmente geniales.",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 400)
    },
    [isAnimating]
  )

  const prev = useCallback(() => {
    goTo(current === 0 ? testimonials.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === testimonials.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section
      id="testimonios"
      className="py-20 bg-[var(--tender-gray-bg)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
          >
            Nuestros Clientes
          </h2>
          <div className="gold-line mt-4" />
          <p className="mt-4 text-[var(--tender-text-muted)] text-base">
            No hay mejor aval para nuestros productos que la opinión de nuestros clientes.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 text-center max-w-2xl mx-auto border border-border/50">
                    {/* Quote icon */}
                    <Quote
                      size={36}
                      className="mx-auto mb-6 opacity-20"
                      style={{ color: "var(--tender-gold)" }}
                      aria-hidden="true"
                    />

                    {/* Quote text */}
                    <blockquote className="text-[var(--tender-text-dark)] text-base md:text-lg leading-relaxed font-serif italic mb-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-[var(--tender-gold)]/30">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <cite className="not-italic">
                        <span className="block text-[var(--tender-navy)] font-semibold">
                          {testimonial.name}
                        </span>
                        <span className="block text-sm text-[var(--tender-text-muted)]">
                          {testimonial.role}
                        </span>
                      </cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-[var(--tender-navy)] hover:text-white rounded-full p-3 text-[var(--tender-navy)] shadow-lg transition-all duration-300"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-[var(--tender-navy)] hover:text-white rounded-full p-3 text-[var(--tender-navy)] shadow-lg transition-all duration-300"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[var(--tender-navy)] w-6 h-2.5"
                    : "bg-[var(--tender-navy)]/20 w-2.5 h-2.5 hover:bg-[var(--tender-navy)]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
