import Link from "next/link"
import { Box, ArrowRight, ScanFace } from "lucide-react"
import QRCode from "react-qr-code"

export default function CtaShowroomArquitectos() {
  return (
    <section className="relative py-16 bg-[var(--tender-navy)] text-white overflow-hidden shadow-2xl">
      
      {/* Fondos decorativos abstractos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--tender-cyan)]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex-1 space-y-6 text-center md:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
              <ScanFace className="w-4 h-4 text-[var(--tender-cyan)]" strokeWidth={1.5} />
              <span>Herramienta de Presentación</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-balance">
              Proyectá con Realidad Aumentada
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              Elevá la presentación de tus proyectos. Mostrale a tu cliente exactamente cómo quedará el Tender® en su lavadero usando nuestro nuevo Showroom 3D inmersivo.
            </p>
            
            {/* === CONTENEDOR DE BOTÓN Y QR CORREGIDO === */}
            {/* items-start asegura que la parte superior de las cajas se alinee perfecta */}
            <div className="pt-4 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              
              {/* Columna Izquierda: Botón principal + Texto */}
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Link 
                  href="/showroom" 
                  // 1. Altura fija: h-[72px]
                  className="inline-flex items-center justify-center gap-2 bg-[var(--tender-cyan)] hover:bg-cyan-600 text-white px-8 h-[72px] rounded-xl font-semibold transition-all shadow-lg group w-full sm:w-auto text-lg"
                >
                  <Box className="w-5 h-5" strokeWidth={2} />
                  Abrir Showroom 3D
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
                <span className="text-xs text-gray-400 font-medium pl-1 hidden sm:block">
                  No requiere instalación
                </span>
              </div>

              {/* Columna Derecha: Sección QR */}
              {/* 2. Altura fija idéntica: h-[72px] */}
              <div className="hidden sm:flex items-center gap-4 bg-white/5 p-2 pr-5 rounded-xl border border-white/10 h-[72px] shadow-sm">
                <div className="bg-white p-1.5 rounded-lg shrink-0">
                  <QRCode 
                    value="https://tender.com.ar/showroom" 
                    size={46} 
                    className="h-[46px] w-[46px]"
                  />
                </div>
                <p className="text-xs text-gray-300 max-w-[120px] leading-tight font-medium">
                  Escaneá para verlo en tu celular
                </p>
              </div>

            </div>
            {/* ========================================= */}
          </div>

          {/* Elemento visual a la derecha */}
          <div className="hidden lg:flex w-1/3 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 rounded-full backdrop-blur-sm flex items-center justify-center shadow-inner">
                <Box className="w-16 h-16 text-[var(--tender-cyan)] opacity-80" strokeWidth={1} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}