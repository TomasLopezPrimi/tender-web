import { BadgePercent, Headset, Cuboid, Ruler } from "lucide-react"

const beneficios = [
  {
    icon: BadgePercent,
    title: "Venta Corporativa",
    description: "Descuentos exclusivos por volumen para constructoras y desarrollos inmobiliarios."
  },
  {
    icon: Headset,
    title: "Asesoramiento Técnico",
    description: "Acompañamiento en obra y soporte técnico directo con nuestros especialistas."
  },
  {
    icon: Cuboid,
    title: "Librerías BIM y CAD",
    description: "Modelos 3D y bloques de AutoCAD listos para integrar en tus renders y planos."
  },
  {
    icon: Ruler,
    title: "A Medida",
    description: "Soluciones adaptables a espacios complejos y requerimientos específicos de diseño."
  }
]

export default function BeneficiosArquitectos() {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance">
            Beneficios del Programa
          </h2>
          <div className="gold-line mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((item, index) => (
            <div 
              key={index} 
              className="p-6 bg-card rounded-lg border border-border hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-[var(--tender-gray-bg)] rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-[var(--tender-cyan)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--tender-text-dark)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--tender-text-muted)] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}