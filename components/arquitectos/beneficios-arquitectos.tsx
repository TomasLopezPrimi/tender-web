import { Building2, HardHat, Layers, DraftingCompass } from "lucide-react"

const beneficios = [
  {
    icon: Building2,
    title: "Venta Corporativa",
    description: "Descuentos exclusivos por volumen para constructoras, estudios y desarrollos inmobiliarios."
  },
  {
    icon: HardHat,
    title: "Soporte y Asesoramiento",
    description: "Acompañamiento en obra y línea directa con nuestros especialistas técnicos para resolver cualquier desafío."
  },
  {
    icon: Layers,
    title: "Librerías BIM y CAD",
    description: "Modelos 3D y bloques de AutoCAD optimizados, listos para arrastrar e integrar en tus renders y planos."
  },
  {
    icon: DraftingCompass,
    title: "Adaptabilidad Total",
    description: "Soluciones de instalación flexibles para espacios atípicos, garantizando la estética y funcionalidad del diseño."
  }
]

export default function BeneficiosArquitectos() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance mb-6">
            Diseñado para potenciar tus proyectos
          </h2>
          <div className="gold-line mx-auto mb-6" />
          <p className="text-[var(--tender-text-muted)] text-base md:text-lg">
            Herramientas y ventajas pensadas para arquitectos, interioristas, constructoras y profesionales que proyectan espacios reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {beneficios.map((item, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute top-0 left-0 h-1 w-0 bg-[var(--tender-cyan)] transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--tender-navy)] transition-all duration-300">
                  <item.icon 
                    className="w-7 h-7 text-[var(--tender-navy)] group-hover:text-white transition-colors duration-300" 
                    strokeWidth={1.25}
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-[var(--tender-text-dark)] mb-3 group-hover:text-[var(--tender-navy)] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-[var(--tender-text-muted)] text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
