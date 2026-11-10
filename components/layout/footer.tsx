import { config } from "@/config"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react"
import Link from "next/link"


export default function Footer() {
  return (
    <footer className="bg-[var(--tender-navy-mid)] text-white" aria-label="Pie de página">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="h-7 w-auto select-none"
              style={{ filter: "brightness(0) invert(1)" }}
              draggable={false}
            />
            <div className="mt-6 max-w-xs">
              <p className="text-sm text-white/70 leading-relaxed">
                <strong className="text-white">Tender® Original Argentina.</strong> 
                {/* Líderes en sistemas de secado de ropa. 
                Calidad garantizada y durabilidad oficial para cada hogar del país. */}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/80">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>Showroom presencial de lun a vie de 9 a 17 h</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>Av. San Martín 2513 (Florida, Vicente López)</span>
              </div>
              <a
                href="mailto:ventas@tender.com.ar"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>ventas@tender.com.ar</span>
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { icon: <Instagram size={18} />, label: "Instagram", href: "https://www.instagram.com/tenderargentina/" },
                { icon: <Facebook size={18} />, label: "Facebook", href: "https://www.facebook.com/tenderoriginal/" },
                { icon: <Youtube size={18} />, label: "YouTube", href: "https://www.youtube.com/@tender8687" },
                // { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#linkedin" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[var(--tender-cyan)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--tender-cyan)] mb-4">
              Teléfonos
            </h3>
            <div className="space-y-3">
              {config.allNumbers.map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  
                  className="flex items-center gap-2 md:justify-end text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[var(--tender-cyan)]" aria-hidden="true" />
                  <span>{phone.label} · {phone.number}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[var(--tender-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-2">
          
          {/* Copyright y Desarrollador */}
          <div className="text-white/50 text-xs flex flex-col sm:flex-row items-center text-center sm:text-left gap-1 sm:gap-0">
            <span>&copy; {new Date().getFullYear()} Tender Argentina. Todos los derechos reservados.</span>
            
            {/* El separador solo se ve en pantallas medianas/grandes */}
            <span className="hidden sm:inline mx-2 opacity-30">|</span>
            
            <span>
              <span className="opacity-70">Desarrollado por </span>
              <a
                href="https://appteck.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--tender-cyan)] transition-colors whitespace-nowrap"
              >
                Appteck
              </a>
            </span>
          </div>

          {/* Enlaces legales */}
          <div className="flex justify-center items-center gap-6 mt-4 sm:mt-0 z-10 relative">
            <Link href="/terminos-y-condiciones/" className="text-white/50 hover:text-white/80 text-xs transition-colors text-center">
              Términos y condiciones
            </Link>
            <span className="text-white/30 text-[10px]">•</span>
            <Link href="/politica-de-privacidad/" className="text-white/50 hover:text-white/80 text-xs transition-colors text-center">
              Políticas de privacidad
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}
