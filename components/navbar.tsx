"use client" // Es Client Component para manejar el estado del menú y usar el store de Zustand en el CartWidget

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
// Importamos el componente del carrito (asegurate de que la ruta sea correcta)
import CartWidget from "./cart-widget"

interface NavItem {
  label: string
  href: string
  highlighted?: boolean
  hasDropdown?: boolean
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "TIENDA", href: "/#productos" },
  // { label: "PRODUCTOS", href: "/#productos" }, 
  { label: "SERVICIO TÉCNICO", href: "/servicio-tecnico" },
  { label: "ARQUITECTOS", href: "/arquitectos" },
  { label: "CONTACTO", href: "/#contacto" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      {/* --- ROW 1: Logo & Controles Móviles (Diseño Equilibrado) --- */}
        <div className="flex items-center justify-between pt-3 pb-1">
          
          {/* IZQUIERDA: Pilar del Menú Hamburguesa */}
          {/* El div se mantiene siempre para equilibrar, el botón se oculta en desktop */}
          <div className="flex-1 flex justify-start">
            <button
              className="lg:hidden p-2 text-(--tender-navy) hover:text-(--tender-cyan) transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* CENTRO: Logo perfectamente centrado siempre */}
          <div className="shrink-0 flex justify-center">
            <Link href="/" aria-label="Tender inicio">
              <img
                src="/images/logo-tender.svg"
                alt="Tender®"
                className="h-7 w-auto"
                draggable={false}
              />
            </Link>
          </div>

          {/* DERECHA: Pilar del Carrito Móvil */}
          {/* El div se mantiene siempre, el CartWidget se oculta en desktop */}
          <div className="flex-1 flex justify-end items-center pr-2">
            <div className="lg:hidden">
              <CartWidget />
            </div>
          </div>
        </div>

        {/* --- ROW 2: Navegación (Desktop only) --- */}
        {/* Tal cual estaba, centrado abajo */}
        <nav className="hidden lg:flex items-center justify-center gap-1 pb-2.5" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          
          {/* Carrito ESCRITORIO (Se ve como un ítem más al lado de CONTACTO con separador) */}
          <div className="flex items-center ml-2 pl-3 border-l border-border/50">
            <CartWidget />
          </div>
        </nav>
      </div>

      {/* --- Menú Móvil (Drawer) --- */}
      {/* Tu lógica original de menú móvil */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top duration-300" role="navigation" aria-label="Menú móvil">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                  item.highlighted
                    ? "bg-(--tender-cyan) text-white text-center"
                    : "text-(--tender-navy) hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

// Componente Helper NavLink original
function NavLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded ${
        item.highlighted
          ? "bg-(--tender-cyan) text-white hover:bg-(--tender-cyan)/90"
          : "text-(--tender-text-dark) hover:text-(--tender-cyan)"
      }`}
    >
      {item.label}
      {item.hasDropdown && (
        <ChevronDown size={13} className="opacity-70" aria-hidden="true" />
      )}
    </Link>
  )
}