import { ShieldCheck, PenTool, Award, Zap } from "lucide-react"

const razones = [
  {
    icon: ShieldCheck,
    title: "Calidad Constructiva",
    description: "Materiales nobles como el aluminio anodizado y acero inoxidable que garantizan durabilidad extrema sin óxido."
  },
  {
    icon: PenTool,
    title: "Diseño Funcional",
    description: "Sistemas estéticos que se integran a la arquitectura del hogar sin romper la armonía visual del ambiente."
  },
  {
    icon: Award,
    title: "Trayectoria",
    description: "Décadas siendo el estándar en el mercado argentino. Si es un tendedero de techo, tiene que ser un Tender®."
  },
  {
    icon: Zap,
    title: "Instalación Rápida",
    description: "Proveemos manuales detallados, videos paso a paso y soporte para que tu equipo instale sin contratiempos."
  }
]

export default function RazonesElegirnos() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance">
            Por qué los profesionales nos eligen
          </h2>
          <div className="gold-line mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {razones.map((razon, index) => (
            <div key={index} className="flex gap-4 items-start animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="w-12 h-12 shrink-0 bg-[var(--tender-navy)] rounded-lg flex items-center justify-center shadow-md">
                <razon.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--tender-text-dark)] mb-2">
                  {razon.title}
                </h3>
                <p className="text-[var(--tender-text-muted)] leading-relaxed">
                  {razon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}