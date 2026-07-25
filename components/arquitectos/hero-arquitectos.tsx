import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HeroArquitectos() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center py-20 overflow-hidden">
      
      {/* Contenedor de la imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/arquitectos/arquitectos-hero.jpg" 
          alt="Proyectos de arquitectura y diseño interior"
          fill
          priority 
          className="object-cover object-center"
          quality={80} 
        />
        {/* 1. CAMBIO CLAVE: Añadimos un overlay oscuro para que el texto blanco resalte */}
        <div className="absolute inset-0 bg-black/40"></div> 
      </div>

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
        
        {/* 2. Cambiamos a text-white o un color cian muy claro y sombras oscuras */}
        <span className="text-cyan-300 font-semibold tracking-wider uppercase text-sm mb-4 block drop-shadow-md">
          Programa profesional
        </span>
        
        {/* 3. H1 en blanco puro con sombra oscura para profundidad */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide text-balance mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Soluciones para <span className="text-cyan-200">arquitectos</span> y profesionales
        </h1>
        
        <div className="gold-line mb-6 shadow-sm bg-yellow-500 h-1 w-24 mx-auto" />
        
        {/* 4. Párrafo en blanco con ligera opacidad (text-white/90) */}
        <p className="mt-4 max-w-2xl mx-auto text-white/90 text-base md:text-lg text-balance font-medium drop-shadow-sm">
          Integramos diseño, funcionalidad y calidad en cada proyecto. 
          Descubrí beneficios, librerías 3D y asesoramiento 
          personalizado para tus obras.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="#consultas" 
            className="bg-white text-navy-900 hover:bg-gray-100 px-8 py-3 rounded-md font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-[var(--tender-navy)]"
          >
            Cotizar Proyecto
          </a>
          {/* Botón secundario en blanco para que no se pierda */}
          <a 
            href="#beneficios" 
            className="flex items-center justify-center gap-2 text-white hover:text-cyan-200 px-6 py-3 font-medium transition-colors w-full sm:w-auto group"
          >
            Ver beneficios 
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
