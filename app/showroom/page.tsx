"use client"

import { useState, useEffect } from "react"
import QRCode from "react-qr-code"
import { Box, Layers, ScanFace, SmartphoneNfc, Info } from "lucide-react"

const modelos3D = [
  {
    id: "d0530aa0ace342d8827887ae501f3d87",
    title: "Tender Colgante",
    description: "Explorá el modelo principal en detalle desde todos los ángulos."
  },
  {
    id: "11035d4a1ac54e74b133ca5667c7d88a",
    title: "Instalación Clásica",
    description: "Visualizá cómo queda el sistema completo ya instalado."
  },
  {
    id: "5c9b59678d054f378fb0aa35766ef2d0",
    title: "Caja Elevadora",
    description: "Conocé el mecanismo interno de nuestra caja reductora de peso."
  }
]

export default function ShowroomPage() {
  const [activeModel, setActiveModel] = useState(modelos3D[0])
  const [isMounted, setIsMounted] = useState(false)

  const showroomUrl = "https://tender.com.ar/showroom"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      
      <main className="min-h-screen bg-[var(--tender-navy)] text-white pt-20 pb-12 flex flex-col">
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col">
          
          {/* Encabezado */}
          <div className="mb-8 pt-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
              <Box className="w-4 h-4 text-[var(--tender-cyan)]" />
              <span>Herramienta Interactiva</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide text-balance">
              Showroom <span className="text-[var(--tender-cyan)]">Virtual</span> y AR
            </h1>
            <p className="mt-3 text-gray-300 max-w-2xl text-base md:text-lg">
              Interactuá con nuestros productos. Rotá, hacé zoom y proyectalos en escala 1:1 real en tu lavadero o balcón usando proyectores de Realidad Aumentada.
            </p>
          </div>

          {/* Layout Principal: 1 columna en mobile, 12 columnas en desktop */}
          <div className="flex flex-col lg:flex-row gap-8 flex-grow">
            
            {/* PANEL LATERAL: Controles y QR (Ocupa 4 columnas de 12 en desktop) */}
            <div className="w-full lg:w-4/12 flex flex-col gap-6">
              
              {/* Selector de Modelos */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[var(--tender-cyan)]" />
                  Seleccionar Modelo
                </h3>
                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 snap-x">
                  {modelos3D.map((modelo) => (
                    <button
                      key={modelo.id}
                      onClick={() => setActiveModel(modelo)}
                      className={`flex-shrink-0 lg:flex-shrink w-64 lg:w-full text-left p-4 rounded-xl border transition-all duration-300 snap-center ${
                        activeModel.id === modelo.id
                          ? "bg-[var(--tender-cyan)]/10 border-[var(--tender-cyan)] shadow-[0_0_15px_rgba(114,228,200,0.15)]"
                          : "bg-black/20 border-white/5 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="font-semibold text-white mb-1">{modelo.title}</div>
                      <div className="text-sm text-gray-400 leading-snug">{modelo.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* MÓDULO INTELIGENTE: Realidad Aumentada */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden animate-fade-in-up flex-grow" style={{ animationDelay: '200ms' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--tender-cyan)]/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <ScanFace className="w-5 h-5 text-[var(--tender-cyan)]" />
                  Proyectá en tu espacio
                </h3>
                
                {/* LÓGICA RESPONSIVE: Qué mostrar según el dispositivo */}
                
                {/* 1. Vista para Desktop (Muestra el QR) */}
                <div className="hidden lg:block mt-4">
                  <p className="text-sm text-gray-300 mb-6">
                    Estás viendo esto desde una PC. Para usar la Realidad Aumentada y ver el Tender en tu casa, <strong>escaneá este código con tu celular</strong>.
                  </p>
                  
                  {isMounted && (
                    <div className="bg-white p-4 rounded-xl inline-block shadow-xl mx-auto w-full max-w-[200px] mb-2">
                      <QRCode
                        value={showroomUrl}
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                      />
                    </div>
                  )}
                  <p className="text-xs text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <SmartphoneNfc className="w-3 h-3" /> Requiere un visualizador de Realidad Aumentada
                  </p>
                </div>

                {/* 2. Vista para Mobile (Instrucciones directas, oculta el QR) */}
                <div className="block lg:hidden mt-3">
                  <p className="text-sm text-gray-300 mb-4">
                    Seguí estos pasos:
                  </p>
                  <ol className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-3">
                      <span className="bg-[var(--tender-cyan)]/20 text-[var(--tender-cyan)] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                      <span>Tocá el modelo 3D para activarlo.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-[var(--tender-cyan)]/20 text-[var(--tender-cyan)] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                      <span>Buscá el ícono de <strong>AR</strong> que aparecerá en la esquina inferior del visor.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-[var(--tender-cyan)]/20 text-[var(--tender-cyan)] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                      <span>Equipate con tu <strong>Cardboard</strong> </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-[var(--tender-cyan)]/20 text-[var(--tender-cyan)] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">4</span>
                      <span>Apuntá al techo o pared para proyectarlo.</span>
                    </li>
                  </ol>
                </div>
              </div>

            </div>

            {/* VISOR PRINCIPAL (Ocupa 8 columnas de 12 en desktop) */}
            <div className="w-full lg:w-8/12 flex flex-col animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative w-full h-[50vh] lg:h-full min-h-[400px] bg-black/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex-grow">
                
                {/* Iframe de Sketchfab */}
                <iframe
                  title={activeModel.title}
                  className="absolute inset-0 w-full h-full"
                  src={`https://sketchfab.com/models/${activeModel.id}/embed?autostart=1&ui_theme=dark&dnt=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                ></iframe>
                
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                <Info className="w-4 h-4" />
                <span>Interactuá arrastrando la imagen. Usá el scroll para acercar o alejar.</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}