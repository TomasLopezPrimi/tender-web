"use client"

import { useState } from "react"
import { Phone, Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    consulta: "",
    newsletter: false,
    captcha: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit
    alert("Formulario enviado (mock)")
  }

  return (
    <section id="contacto" className="py-20 bg-[var(--tender-gray-bg)]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left side - Info */}
          <div>
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide mb-2"
            >
              Contactanos
            </h2>
            <div className="gold-line !mx-0 mb-6" />
            <p className="text-[var(--tender-text-muted)] text-base mb-8">
              Dejanos tus datos y un representante se comunicará a la brevedad
            </p>

            {/* Phone numbers */}
            <div className="space-y-4">
              {[
                { number: "11 5151-7715", href: "tel:+541151517715" },
                { number: "11 4931-6465", href: "tel:+541149316465" },
                { number: "15 3187-6811", href: "tel:+5491131876811" },
              ].map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  className="flex items-center gap-3 text-[var(--tender-navy)] hover:text-[var(--tender-cyan)] transition-colors group"
                >
                  <Phone
                    size={18}
                    className="text-[var(--tender-cyan)] group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">{phone.number}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    required
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData({ ...formData, apellido: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    required
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="consulta"
                  className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                >
                  Dejanos tu consulta <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="consulta"
                  required
                  rows={4}
                  value={formData.consulta}
                  onChange={(e) =>
                    setFormData({ ...formData, consulta: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-[var(--tender-cyan)] focus:ring-[var(--tender-cyan)]"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-[var(--tender-text-muted)]"
                >
                  Deseo recibir más información y ofertas
                </label>
              </div>

              {/* Simple captcha */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--tender-text-muted)]">
                  11 + 13 =
                </span>
                <input
                  type="text"
                  value={formData.captcha}
                  onChange={(e) =>
                    setFormData({ ...formData, captcha: e.target.value })
                  }
                  className="w-20 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300 text-center"
                  placeholder="?"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--tender-cyan)] hover:bg-[var(--tender-cyan)]/90 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[var(--tender-cyan)]/25"
              >
                <Send size={18} />
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
