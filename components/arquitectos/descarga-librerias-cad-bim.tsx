import { FileText, Download, Layers3, Zap } from "lucide-react"

const archivos = [
  {
    tipo: "DWG",
    format: "AutoCAD / Planos 2D",
    description: "Bloques de vista superior y lateral con cotas técnicas de todos los modelos."
  },
  {
    tipo: "SKP",
    format: "SketchUp / Modelo 3D",
    description: "Modelos 3D de alta definición listos para integrar en tus renders y escenas."
  },
  {
    tipo: "RVT",
    format: "Revit / BIM Family",
    description: "Familias BIM parametrizadas con datos técnicos para proyectos estructurales."
  }
]

export default function DescargaLibreriasCadBim() {
  return (
    <section id="librerias" className="py-16 md:py-24 bg-[var(--tender-gray-bg)] border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium border border-border text-[var(--tender-navy)] mb-4 shadow-sm">
            <Layers3 className="w-4 h-4 text-[var(--tender-cyan)]" />
            <span>Recursos Profesionales</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance mb-4">
            Librerías Digitales
          </h2>
          <p className="text-[var(--tender-text-muted)] text-base md:text-lg max-w-2xl mx-auto">
            Descargá los archivos técnicos de Tender® en los formatos más utilizados de la industria para integrarlos instantáneamente a tus planos, memorias y renders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {archivos.map((archivo, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-20 h-20 bg-[var(--tender-navy)]/5 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-[var(--tender-cyan)]/20">
                <FileText className="w-10 h-10 text-[var(--tender-cyan)]" />
              </div>
              
              <div className="flex-1 space-y-3 mb-6">
                <h3 className="text-2xl font-bold text-[var(--tender-navy)] tracking-tight">
                  Format <span className="text-[var(--tender-cyan)]">.{archivo.tipo}</span>
                </h3>
                <p className="text-sm font-semibold text-[var(--tender-text-dark)] uppercase tracking-wider">
                  {archivo.format}
                </p>
                <p className="text-[var(--tender-text-muted)] text-sm leading-relaxed">
                  {archivo.description}
                </p>
              </div>
              
              <button className="flex items-center gap-2.5 bg-[var(--tender-navy)] hover:bg-[var(--tender-navy-mid)] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg w-full justify-center mt-auto">
                <Download className="w-5 h-5" />
                Descargar Librería
              </button>
            </div>
          ))}
        </div>
        
        {/* Banner de contacto para otros formatos */}
        <div className="mt-16 bg-white p-6 md:p-8 rounded-2xl border border-border flex flex-col md:flex-row items-center gap-6 shadow-md animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Zap className="w-12 h-12 text-[var(--tender-cyan)] shrink-0" />
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-semibold text-[var(--tender-text-dark)] mb-1">
              ¿Necesitás un formato específico?
            </h4>
            <p className="text-sm md:text-base text-[var(--tender-text-muted)]">
              Si el archivo que buscás no está disponible en este listado, contactanos para solicitar asesoramiento técnico personalizado.
            </p>
          </div>
          <a 
            href="#consultas" 
            className="text-white bg-[var(--tender-cyan)] hover:bg-cyan-600 px-6 py-3 rounded-md font-medium transition-colors shrink-0 shadow-md whitespace-nowrap"
          >
            Solicitar Archivos
          </a>
        </div>

      </div>
    </section>
  )
}