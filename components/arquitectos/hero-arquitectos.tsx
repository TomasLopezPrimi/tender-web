import { ArrowDown } from "lucide-react"

export default function HeroArquitectos() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[var(--tender-gray-bg)] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
        
        <span className="text-[var(--tender-cyan)] font-semibold tracking-wider uppercase text-sm mb-4 block">
          Programa Exclusivo
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance mb-6">
          Soluciones para <span className="text-[var(--tender-navy)]">Arquitectos</span> y Profesionales
        </h1>
        
        <div className="gold-line mb-6" />
        
        <p className="mt-4 max-w-2xl mx-auto text-[var(--tender-text-muted)] text-base md:text-lg text-balance">
          Integramos diseño, funcionalidad y calidad en cada proyecto. 
          Descubrí los beneficios exclusivos, librerías 3D y asesoramiento 
          personalizado para tus obras.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a 
            href="#consultas" 
            className="bg-[var(--tender-navy)] hover:bg-[var(--tender-navy-mid)] text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg"
          >
            Cotizar Proyecto
          </a>
          <a 
            href="#beneficios" 
            className="flex items-center gap-2 text-[var(--tender-navy)] hover:text-[var(--tender-cyan)] px-6 py-3 font-medium transition-colors"
          >
            Ver beneficios <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}