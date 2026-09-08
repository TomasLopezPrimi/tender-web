// components/tech-service/tech-contact-section.tsx
import { config } from "@/config"
import { ShieldCheck, CheckCircle2, Award, Headset } from "lucide-react"

export default function TechContactSection() {
  return (
    <section className="py-20 md:py-32 bg-(--tender-gray-bg)" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- Columna 1: Garantía --- */}
          <div className="animate-fade-in-up bg-gradient-to-br from-(--tender-navy) to-(--tender-navy-mid) p-8 md:p-12 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-(--tender-navy)/20 border border-white/10">
            
            <ShieldCheck className="absolute -right-12 -bottom-12 w-64 h-64 opacity-[0.03] text-white rotate-12" />
            
            <div className="relative z-10">
              {/* Badge Calidad Certificada Mejorado (Dorado + Ícono + Glow) */}
              <div className="inline-flex items-center gap-2 bg-(--tender-gold)/10 border border-(--tender-gold)/30 px-4 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(200,160,50,0.15)] backdrop-blur-sm">
                <Award className="w-4 h-4 text-(--tender-gold)" />
                <span className="text-(--tender-gold-light) text-[11px] font-bold tracking-widest uppercase">
                  Calidad Certificada
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
                Garantía Oficial Tender®
              </h2>
              
              <p className="text-white/80 leading-relaxed mb-8 text-lg font-light text-balance">
                Todos nuestros productos cuentan con <strong className="font-semibold text-white">1 año de garantía oficial</strong>. 
                Fabricamos bajo estándares de alta calidad para asegurar que tu Tender sea una inversión de por vida.
              </p>
              
              <div className="h-px w-full bg-white/10 mb-8" />

              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-sm md:text-base text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-(--tender-cyan) shrink-0" />
                  <span className="font-light">Garantía de instalación por 3 meses.</span>
                </li>
                <li className="flex items-center gap-4 text-sm md:text-base text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-(--tender-cyan) shrink-0" />
                  <span className="font-light">Reparación y asesoramiento técnico.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- Columna 2: Contacto Técnico --- */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-3xl md:text-4xl font-serif text-(--tender-navy) mb-4">
              ¿Necesitás un Service?
            </h3>
            
            <div className="gold-line ml-0 mb-6" />
            
            <p className="text-(--tender-text-muted) mb-10 text-lg leading-relaxed text-balance">
              Si necesitás una reparación, instalación paga o asesoramiento, comunicate directamente con nuestro departamento técnico.
            </p>
            
            <div className="space-y-5">
              
              {/* Botón WhatsApp (Con SVG Oficial) */}
              <a 
                href="https://api.whatsapp.com/send/?phone=5491131876811"  
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-border/50 hover:border-[#25D366] hover:shadow-xl hover:shadow-[#25D366]/10 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="bg-[#25D366]/10 text-[#25D366] p-3.5 rounded-xl group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  {/* SVG Oficial de WhatsApp */}
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">WHATSAPP TÉCNICO</p>
                  <p className="text-(--tender-navy) font-semibold text-lg">{config.whatsappNumber}</p>
                </div>
              </a>

              {/* Botón Soporte/Email (Con ícono Headset de Lucide) */}
              <a 
                href="mailto:service@tender.com.ar" 
                className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-border/50 hover:border-(--tender-cyan) hover:shadow-xl hover:shadow-(--tender-cyan)/10 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="bg-(--tender-cyan)/10 text-(--tender-cyan) p-3.5 rounded-xl group-hover:bg-(--tender-cyan) group-hover:text-white transition-colors duration-300">
                  <Headset size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold tracking-wider mb-1">SOPORTE POR EMAIL</p>
                  <p className="text-(--tender-navy) font-semibold text-lg">{config.emailVentas}</p>
                </div>
              </a>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
