import { Shield, Wrench, Building2, Users } from "lucide-react"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  cta?: string
  href: string
}

const services: Service[] = [
  {
    icon: <Shield size={32} className="text-[var(--tender-cyan)]" aria-hidden="true" />,
    title: "Máxima Garantía",
    description:
      "Un año de Garantía Tender® en todos nuestros productos.",
    href: "#garantia",
  },
  {
    icon: <Wrench size={32} className="text-[var(--tender-cyan)]" aria-hidden="true" />,
    title: "Servicio Técnico",
    description:
      "Todo para la instalación y reparación de los equipos. Disponemos de los repuestos originales con garantía.",
    href: "#servicio-tecnico",
  },
  {
    icon: <Building2 size={32} className="text-[var(--tender-cyan)]" aria-hidden="true" />,
    title: "Para Arquitectos",
    description:
      "Accedé a beneficios exclusivos y visualiza en RA nuestros productos e incorporarlos a tus proyectos.",
    href: "#arquitectos",
  },
  {
    icon: <Users size={32} className="text-[var(--tender-cyan)]" aria-hidden="true" />,
    title: "Ser Distribuidor",
    description:
      "Ofrecemos la venta, colocación y service a distribuidores del interior y del exterior del país.",
    href: "#distribuidores",
  },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 bg-background" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance"
          >
            A tu servicio
          </h2>
          <div className="gold-line mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <a
              key={i}
              href={service.href}
              className="group p-8 rounded-xl border border-border bg-card hover:border-[var(--tender-cyan)]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--tender-cyan)]/10 mb-5 group-hover:bg-[var(--tender-cyan)]/20 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-[var(--tender-navy)] font-semibold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--tender-text-muted)] leading-relaxed">
                {service.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
