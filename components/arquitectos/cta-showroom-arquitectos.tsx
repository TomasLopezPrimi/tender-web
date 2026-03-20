import Link from "next/link"
import { Box, ArrowRight, ScanFace } from "lucide-react"

export default function CtaShowroomArquitectos() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--tender-navy)] text-white shadow-2xl">
          
          {/* Fondos decorativos abstractos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--tender-cyan)]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="flex-1 space-y-6 text-center md:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                <ScanFace className="w-4 h-4 text-[var(--tender-cyan)]" />
                <span>Herramienta de Presentación</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-balance">
                Proyectá con Realidad Aumentada
              </h2>
              
              <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Elevá la presentación de tus proyectos. Mostrale a tu cliente exactamente cómo quedará el Tender® en su lavadero usando nuestro nuevo Showroom 3D inmersivo.
              </p>
              
              <div className="pt-2">
                <Link 
                  href="/showroom" 
                  className="inline-flex items-center gap-2 bg-[var(--tender-cyan)] hover:bg-cyan-600 text-white px-8 py-3.5 rounded-md font-medium transition-colors shadow-lg group"
                >
                  <Box className="w-5 h-5" />
                  Abrir Showroom 3D
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Elemento visual a la derecha */}
            <div className="hidden lg:flex w-1/3 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 rounded-full backdrop-blur-sm flex items-center justify-center shadow-inner">
                  <Box className="w-16 h-16 text-[var(--tender-cyan)] opacity-80" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}