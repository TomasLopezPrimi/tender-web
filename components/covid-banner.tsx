import { ShieldCheck } from "lucide-react"

export default function CovidBanner() {
  return (
    <section className="py-12 bg-[var(--tender-navy)]" aria-labelledby="covid-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck size={32} className="text-[var(--tender-cyan)]" aria-hidden="true" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2
              id="covid-heading"
              className="text-xl md:text-2xl font-semibold text-white mb-2"
            >
              Cuidamos la ropa y tu salud
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              La seguridad de nuestros clientes, trabajadores y proveedores son prioridad.
              Por eso seguimos un estricto protocolo de prevención ante el covid-19 en la
              fabricación, manipulación, envío e instalación de todos nuestro equipos.
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <a
              href="#protocolo"
              className="inline-block px-6 py-2.5 border border-[var(--tender-cyan)] text-[var(--tender-cyan)] font-semibold text-sm rounded hover:bg-[var(--tender-cyan)] hover:text-white transition-colors"
            >
              Protocolo Covid-19
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
