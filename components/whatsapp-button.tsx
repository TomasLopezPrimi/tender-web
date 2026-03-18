"use client"

import { useState, useEffect } from "react"

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const [showAutoTooltip, setShowAutoTooltip] = useState(false)
  
  // Datos del contacto
  const phone = "5491140000000" // Cambiar por tu número real
  const message = encodeURIComponent("Hola, tengo una consulta sobre los productos Tender.")
  const href = `https://wa.me/${phone}?text=${message}`

  // EFECTO: Mostrar el tooltip automáticamente por unos segundos al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutoTooltip(true)
    }, 1500) // Aparece 1.5 seg después de cargar

    const hideTimer = setTimeout(() => {
      setShowAutoTooltip(false)
    }, 6500) // Se oculta 5 seg después

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Determinar si el tooltip debe ser visible
  const isTooltipVisible = hovered || showAutoTooltip

  return (
    <>
      {/* Definición de animaciones en CSS puro */}
      <style>{`
        @keyframes custom-pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @keyframes icon-wiggle {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-5deg); }
          20%, 40%, 60%, 80% { transform: rotate(5deg); }
        }

        .animate-pulse-green {
          animation: custom-pulse-green 2.5s infinite;
        }

        .whatsapp-icon-wrapper {
          animation: icon-wiggle 1s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>

      {/* Contenedor principal fixed */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
        
        {/* --- 1. BURBUJA DE CHAT FLOTANTE (TOOLTIP) --- */}
        <div
          className={`relative bg-white text-[var(--tender-text-dark)] rounded-2xl p-4 shadow-xl border border-gray-100 transition-all duration-300 ease-out max-w-[280px] origin-bottom-right
            ${isTooltipVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tender-gray-bg)] flex items-center justify-center border border-gray-200 mt-1">
               <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/></svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--tender-navy)]">Atención al Cliente</span>
              <p className="text-[13px] leading-relaxed text-[#555]">
                ¿Tenés alguna duda sobre medidas o envíos? Escribinos por Whatsapp, estamos para ayudarte.
              </p>
            </div>
          </div>
          
          {/* Triangulito de la burbuja */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
        </div>

        {/* --- 2. BOTÓN REDONDO DE WHATSAPP --- */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center justify-center bg-[#25d366] text-white rounded-full shadow-lg transition-all duration-300 p-4 
                     hover:scale-105 active:scale-95 animate-pulse-green
                     [box-shadow:0_4px_14px_0_rgba(37,211,102,0.4)] hover:[box-shadow:0_6px_20px_0_rgba(37,211,102,0.6)]"
          aria-label="Contactar por WhatsApp"
        >
          {/* --- 3. INDICADOR DE MENSAJE NO LEÍDO (BADGE) --- */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-[10px] font-bold items-center justify-center">1</span>
          </span>

          {/* --- 4. ÍCONO DE WHATSAPP --- */}
          <div className="whatsapp-icon-wrapper flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </a>
      </div>
    </>
  )
}