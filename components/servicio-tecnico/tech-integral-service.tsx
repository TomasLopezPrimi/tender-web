// components/tech-service/tech-integral-service.tsx
import Image from "next/image"
import { AlertTriangle } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Service de Caja",
    description: "Reparamos la cinta, el resorte y la perilla de freno. Evaluando el estado de los componentes, reemplazamos la caja completa si es necesario.",
    imageSrc: "/images/servicio-tecnico/service-caja.jpg" // Reemplazar con tu URL
  },
  {
    id: 2,
    title: "Service de Parrilla",
    description: "Cambiamos los hilos, los esquineros y los soportes centrales. Ante un mayor deterioro, reemplazamos la parrilla completa.",
    imageSrc: "/images/servicio-tecnico/service-parrilla.jpg" // Reemplazar con tu URL
  },
  {
    id: 3,
    title: "Service de Cordones",
    description: "Reemplazamos todos los cordones que sostienen la parrilla. En caso de avería de las roldanas, también serán reemplazadas.",
    imageSrc: "/images/servicio-tecnico/service-cordones.jpg" // Reemplazar con tu URL
  }
]

export default function TechIntegralService() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Encabezado --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-serif text-(--tender-navy) mb-6">
            Reparación y asesoramiento
          </h2>
          <div className="gold-line mx-auto mb-6" />
          <p className="text-lg text-(--tender-text-muted) leading-relaxed">
            Evaluamos reparaciones del sistema de elevación, la parrilla de tendido y los cordones. Consultanos para recibir asesoramiento sobre tu caso.
          </p>
        </div>

        {/* --- Grilla de Servicios --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="animate-fade-in-up flex flex-col group"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Contenedor de Imagen */}
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-(--tender-gray-bg) mb-6">
                <Image 
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Textos */}
              <h3 className="text-xl font-serif text-(--tender-navy) mb-3">
                {service.title}
              </h3>
              <p className="text-(--tender-text-muted) leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* --- Advertencia y CTA --- */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          
          {/* Caja de Advertencia */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
            <div className="bg-amber-100 p-4 rounded-full shrink-0">
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            </div>
            <p className="text-sm md:text-base text-amber-900 leading-relaxed max-w-4xl mx-auto text-center">
              <strong className="font-semibold">ADVERTENCIA: NO abrir la caja elevadora. </strong> <br></br>De lo contrario, corre el riesgo de inutilizarla y/o perder la garantía.
            </p>
          </div>

          {/* Botón de Acción */}
          {/* <div className="text-center">
            <button className="inline-flex items-center gap-3 bg-(--tender-cyan) hover:bg-cyan-400 text-white font-semibold tracking-wide uppercase text-sm px-8 py-4 rounded-full transition-all hover:shadow-lg hover:shadow-(--tender-cyan)/30 hover:-translate-y-0.5">
              Ver Service Total
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}

        </div>

      </div>
    </section>
  )
}
