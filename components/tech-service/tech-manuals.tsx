import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Perforar el techo*.",
    description: " Realizar cuatro perforaciones, midiendo primero la distancia entre los puntos de sujeción de la parrilla.",
    footnote: "*Todas las perforaciones son con mecha de 6mm.",
    imageSrc: "/images/servicio-tecnico/paso-1.png" 
  },
  {
    id: 2,
    title: "Perforar la pared*",
    description: " en la que se colocará el sistema de elevación: Dos perforaciones para la caja y dos más alineadas verticalmente para los pitones con roldanas.",
    imageSrc: "/images/servicio-tecnico/paso-2.png"
  },
  {
    id: 3,
    title: "Pasar los hilos,",
    description: " tener en cuenta que NO DEBEN CRUZARSE EN EL TECHO. Una vez que se han pasado correctamente los hilos, atar la parrilla con los extremos y nivelarla. Finalmente, afirmar los hilos de colgado para estabilizarlos. Presionar la chapita con una pinza hasta dejar los hilos firmemente ajustados.",
    imageSrc: "/images/servicio-tecnico/paso-3.png"
  }
]

export default function InstallationSteps() {
  return (
    <section className="py-16 md:py-24 bg-[#1c3f5e]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- SECCIÓN DEL VIDEO --- */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl md:text-4xl font-serif text-white text-center mb-8">
            ¿Cómo instalar tu Tender Colgante?
          </h2>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/hiho4s3NoZc?rel=0" 
              title="Video Tutorial Tender"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy" // Agregado para optimizar la carga
            />
          </div>
        </div>

        {/* --- SECCIÓN DE PASOS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col">
              
              {/* Contenedor de la Imagen */}
              <div className="relative w-full aspect-4/3 bg-[#b1d0df] rounded-xl mb-6 flex items-center justify-center overflow-hidden shadow-lg border border-white/10">
                 <Image 
                    src={step.imageSrc} 
                    alt={`Ilustración del paso ${step.id}: ${step.title}`}
                    fill
                    className="object-contain p-4" 
                 />
                 
                 {/* Círculo con el número. Si usás Tailwind v4 nativo podrías poner bg-(--tender-navy) */}
                 <div className="absolute bottom-4 left-4 z-10 bg-[#1c3f5e] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">
                   {step.id}
                 </div>
              </div>

              {/* Textos del paso */}
              <div className="text-white text-sm md:text-base leading-relaxed tracking-wide">
                <p>
                  <span className="font-bold">{step.id}. {step.title}</span>
                  {step.description}
                </p>
                
                {step.footnote && (
                  <p className="mt-6 text-sm text-cyan-100/70">
                    {step.footnote}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}