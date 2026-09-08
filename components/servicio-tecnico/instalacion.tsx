"use client";

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Info, ArrowRight, ZoomIn, X } from "lucide-react"

const zones = [
  { name: "CABA", desc: "Ciudad de Buenos Aires" },
  { name: "Zona norte", desc: "AMBA" },
  { name: "Primer cordón", desc: "Sectores sujetos a consulta" },
]

const serviceCards = [
  {
    id: "instalacion",
    title: "Instalamos tu Tender®",
    description: "Instalación paga en CABA, zona norte del AMBA y sectores del primer cordón, sujeta a consulta.",
    image: "/images/servicio-tecnico/install-1.jpg", 
    cta: "Consultá por tu localidad"
  },
  {
    id: "reparacion",
    title: "Reparación y asesoramiento",
    description: "Consultá al equipo técnico para evaluar tu caso y coordinar la atención.",
    image: "/images/servicio-tecnico/install-2.jpg", 
    cta: "Consultar atención"
  },
  {
    id: "garantia",
    title: "Garantía Tender®",
    description: "Los productos cuentan con 1 año de garantía y la instalación con 3 meses de garantía.",
    image: "/images/servicio-tecnico/install-3.jpg", 
    cta: "Hacer una consulta"
  }
]

export default function InstallationsAndShipping() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="py-20 bg-background" aria-labelledby="shipping-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Encabezado Alineado con la Estética General --- */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2
            id="shipping-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-(--tender-text-dark) tracking-wide text-balance mb-4"
          >
            Instalaciones y <span className="text-(--tender-navy)">Envíos</span>
          </h2>
          <div className="gold-line mx-auto mb-6" />
          <p className="mt-4 text-(--tender-text-muted) text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Nuestros Técnicos te garantizan la colocación óptima de tu Tender®. <br className="hidden md:block" />
             Instalación paga, reparación y asesoramiento en CABA, zona norte del AMBA y sectores del primer cordón, sujetos a consulta.
          </p>
        </div>

        {/* --- Bloque Superior: Mapa + Info --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          
          {/* Mapa Interactivo */}
          <div className="lg:col-span-7 relative w-full rounded-xl overflow-hidden shadow-xl animate-fade-in-up border border-border">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative w-full block group cursor-zoom-in focus:outline-ring/50"
              aria-label="Ampliar mapa de zonas de cobertura"
            >
              <Image 
                src="/images/producto/instalaciones-envios.png"
                alt="Mapa de zonas de envíos e instalaciones Tender" 
                width={800}
                height={600}
                className="w-full h-auto object-contain bg-white transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              
              {/* Overlay Lupa */}
              <div className="absolute inset-0 bg-(--tender-navy)/0 group-hover:bg-[var(--tender-navy)]/10 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/95 text-[var(--tender-navy)] p-4 rounded-full opacity-0 transform scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl border border-border">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </button>
            <p className="text-center text-xs text-[var(--tender-text-muted)] mt-3 lg:hidden">
              Tocá el mapa para ampliarlo
            </p>
          </div>

          {/* Textos Informativos */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            
            <h3 className="text-xl font-semibold text-[var(--tender-navy)] mb-6 flex items-center gap-2 font-serif">
              <MapPin className="w-5 h-5 text-[var(--tender-cyan)]" />
              Zonas de Cobertura
            </h3>

            {/* Lista de Zonas */}
            <ul className="space-y-3 mb-10">
              {zones.map((zone, idx) => (
                <li key={idx} className="flex items-center text-sm md:text-base border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="font-semibold w-24 text-[var(--tender-navy)]">{zone.name}:</span>
                  <span className="text-[var(--tender-text-muted)]">{zone.desc}</span>
                </li>
              ))}
            </ul>

            {/* Bloques de Notas y Alertas (Estilo más refinado) */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Info className="w-5 h-5 text-[var(--tender-cyan)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--tender-text-muted)] leading-relaxed">
                  <strong className="text-[var(--tender-text-dark)] font-semibold">Cobertura:</strong> Confirmamos cada instalación según la ubicación y las condiciones del espacio.
                </p>
              </div>

              <div className="bg-[var(--tender-navy)]/5 border border-[var(--tender-navy)]/10 rounded-xl p-4 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Info className="w-5 h-5 text-[var(--tender-navy)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--tender-text-dark)] leading-relaxed">
                  <strong className="font-semibold text-[var(--tender-navy)]">Colocaciones:</strong> La instalación es paga. En los tenders colgantes, nunca abras la caja del mecanismo.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* --- Bloque Inferior: Tarjetas de Servicios Estilo "SpacesSection" --- */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCards.map((card, idx) => (
            <article 
              key={card.id} 
              className="flex flex-col p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-[var(--tender-cyan)]/50 hover:shadow-md group animate-fade-in-up"
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Imagen pequeña tipo thumbnail (opcional, si preferís solo texto, podés sacar este div) */}
              <div className="relative w-full aspect-[2/1] rounded-lg mb-6 overflow-hidden bg-muted">
                <Image 
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null; 
                    
                    // 2. Asignamos la imagen por defecto (el SVG en base64 o un '/images/placeholder.jpg')
                    // e.currentTarget.src = '';
                  }}
                />
              </div>

              <h3 className="text-lg font-semibold text-[var(--tender-navy)] mb-2 font-serif">
                {card.title}
              </h3>
              
              <p className="text-sm text-[var(--tender-text-muted)] leading-relaxed flex-1 mb-4">
                {card.description}
              </p>
              
              <Link 
                href="#contacto"
                className="inline-flex items-center text-sm font-semibold text-[var(--tender-cyan)] hover:underline transition-colors mt-auto"
              >
                {card.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </article>
          ))}
        </div>

      </div>

      {/* --- MODAL (Lightbox) PARA EL MAPA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
          <div 
            className="absolute inset-0 bg-[var(--tender-navy)]/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/20">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-[var(--tender-navy)] hover:bg-[var(--tender-cyan)] text-white rounded-full transition-colors shadow-lg focus:outline-ring/50"
              aria-label="Cerrar mapa"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full overflow-auto p-4 bg-white flex items-center justify-center">
              <Image 
                src="/images/producto/instalaciones-envios.png"
                alt="Mapa ampliado" 
                width={1600}
                height={1200}
                className="max-w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
