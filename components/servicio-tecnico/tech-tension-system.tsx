import Image from "next/image"

export default function TensionSystem() {
  return (
    <section className="bg-[var(--tender-navy)] py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- Columna Izquierda: Título y GIF (Ocupa más espacio) --- */}
          <div className="lg:col-span-7 flex flex-col animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 tracking-wide">
              Tensado y Amortiguación
            </h2>
            
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/20">
              {/* Usamos etiqueta img estándar para el GIF para asegurar su correcta reproducción sin que Next.js lo congele */}
              <img 
                src="/images/producto/resorte.gif" 
                alt="Sistema de tensado y amortiguación en movimiento" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* --- Columna Derecha: Textos e Imagen de Detalle --- */}
          <div className="lg:col-span-5 flex flex-col lg:pt-20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Dentro de los perfiles de la parrilla, se encuentra un sistema especial de tensado y 
              amortiguación de cada uno de los hilos de colgado.
            </p>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-10">
              A su vez cada hilo está compuesto por 14 alambres acerados, revestidos por una vaina 
              de PVC ranurada, que le otorga máxima resistencia y mayor durabilidad a todos nuestros productos.
            </p>

            {/* Imagen de Detalle */}
            <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/10">
              <Image 
                src="/images/producto/2.jpg" 
                alt="Detalle de alambres acerados y resorte" 
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}