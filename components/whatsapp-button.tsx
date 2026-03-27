"use client"

import { config } from "@/config"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const [showAutoTooltip, setShowAutoTooltip] = useState(false)
  
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [showButton, setShowButton] = useState(false)

  const phone = config.whatsappNumber

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    const tooltipTimer = setTimeout(() => {
      if (!isChatOpen) setShowAutoTooltip(true)
    }, 3500) // 2000ms + 1500ms

    const hideTimer = setTimeout(() => {
      setShowAutoTooltip(false)
    }, 8500)

    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTimer)
    }
  }, [isChatOpen])

  const handleSendMessage = () => {
    const finalMessage = userMessage.trim() !== "" 
      ? userMessage 
      : "Hola, tengo una consulta sobre los productos Tender."
    
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`
    window.open(href, "_blank", "noopener,noreferrer")
    
    setIsChatOpen(false)
    setUserMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const isTooltipVisible = (hovered || showAutoTooltip) && !isChatOpen

  return (
    <>
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

      <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none transition-all duration-500 ease-out origin-bottom 
        ${showButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
        
        {/* --- 1. VENTANA DE CHAT --- */}
        <div
          className={`relative bg-[var(--background)] text-[var(--tender-text-dark)] rounded-2xl shadow-2xl border border-[var(--border)] transition-all duration-300 ease-out origin-bottom-right overflow-hidden
            w-[calc(100vw-2rem)] sm:w-[340px]
            ${isChatOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible' : 'opacity-0 translate-y-8 scale-95 invisible absolute bottom-16'}`}
        >
          {/* Header del Chat: Mantengo tu diseño que estaba muy bien */}
          <div className="bg-[var(--tender-navy)] p-4 flex justify-between items-start text-white rounded-t-2xl">
            <div className="flex flex-col gap-2 mt-0.5">
              <Image 
                src="/images/logo-tender.svg" 
                alt="Tender Logo" 
                width={100} 
                height={24} 
                className="h-4 w-auto sm:h-5 brightness-0 invert opacity-95" 
              />
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]"></span>
                <p className="text-[11px] text-white/80 m-0 font-medium tracking-wide uppercase">Lunes a viernes de 9 a 17</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 -mr-1 -mt-1"
              aria-label="Cerrar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Cuerpo del Chat */}
          <div className="p-4 bg-[var(--tender-gray-bg)]">
            <div className="bg-[var(--card)] p-3.5 rounded-xl rounded-tl-sm shadow-sm text-sm text-[var(--tender-text-dark)] mb-4 max-w-[90%] border border-[var(--border)] leading-relaxed">
              <p className="mb-1 font-medium text-[var(--tender-navy)]">
                Hola. Te damos la bienvenida a Tender Original.
              </p>
              <p className="text-[var(--tender-text-muted)] text-[13px]">
                ¿En qué te podemos ayudar? Escribí tu consulta y te respondemos a la brevedad.
              </p>
            </div>

            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu duda (Enter para enviar)..."
              className="w-full p-3 text-sm bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] rounded-lg focus:outline-none focus:border-[#25d366] focus:ring-1 focus:ring-[#25d366] resize-none"
              rows={3}
            ></textarea>

            <button
              onClick={handleSendMessage}
              className="mt-3 w-full bg-[#25d366] hover:bg-[#20b858] text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>Enviar por WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" /></svg>
            </button>
          </div>
        </div>

        {/* --- 2. BURBUJA DE TOOLTIP ORIGINAL --- */}
        {/* {!isChatOpen && (
          <div
            className={`absolute bottom-[72px] right-0 bg-[var(--tender-navy)] text-white rounded-2xl p-4 shadow-xl shadow-[var(--tender-navy)]/10 border border-[var(--tender-navy)] transition-all duration-300 ease-out w-[260px] sm:max-w-[280px] origin-bottom-right
              ${isTooltipVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-2 scale-95 invisible'}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/></svg>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">Atención al Cliente</span>
                <p className="text-[13px] leading-relaxed text-white/80 mt-1">
                  ¿Tenés alguna duda sobre medidas o envíos?
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[var(--tender-navy)] rotate-45 border-r border-b border-[var(--tender-navy)]"></div>
          </div>
        )} */}

        {/* --- 3. BOTÓN REDONDO PRINCIPAL --- */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 p-4 w-14 h-14 pointer-events-auto
                     hover:scale-105 active:scale-95 
                     ${isChatOpen ? 'bg-[var(--tender-navy)] text-white shadow-xl hover:bg-[var(--tender-navy-mid)]' : 'bg-[#25d366] text-white shadow-lg hover:shadow-xl animate-pulse-green'}`}
          aria-label={isChatOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
        >
          {/* Vuelve el punto rojo clásico de notificación para llamar la atención */}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-[10px] font-bold items-center justify-center border border-white">1</span>
            </span>
          )}

          <div className={!isChatOpen ? "whatsapp-icon-wrapper flex items-center justify-center" : "flex items-center justify-center"}>
            {isChatOpen ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  )
}