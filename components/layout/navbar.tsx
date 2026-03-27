"use client" 

import Link from "next/link"
import { usePathname } from "next/navigation" 
import { useState } from "react"
import {  Layers, X, ChevronDown } from "lucide-react"
import CartWidget from "../cart-widget"
import NavLink from "./nav-link"

export interface NavItem {
  label: string
  href: string
  highlighted?: boolean
  hasDropdown?: boolean
  subItems?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "TIENDA", href: "/tienda" },
  { 
    label: "PRODUCTOS", 
    href: "/productos",
    hasDropdown: true,
    subItems: [
      { label: "Colgante 8 hilos", href: "/producto/tender-col-8h" },
      { label: "Colgante 6 hilos", href: "/producto/tender-col-6h" },
      { label: "Colgante 4 hilos", href: "/producto/tender-col-4h" },
      { label: "Rebatible 6 hilos", href: "/producto/tender-reb-6h" },
      { label: "Rebatible 4 hilos", href: "/producto/tender-reb-4h" },
    ]
  }, 
  { label: "SERVICIO TÉCNICO", href: "/servicio-tecnico" },
  { label: "SHOWROOM", href: "/showroom" },
  { label: "ARQUITECTOS", href: "/arquitectos" },
  { label: "CONTACTO", href: "/#contacto" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname() 

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      {/* --- ROW 1: Logo & Controles --- */}
        <div className="flex items-center justify-between pt-3 pb-1">
          
          {/* LADO IZQUIERDO: Menú + Logo (Mobile) */}
          <div className="flex-1 flex items-center gap-2">
            <button
              className="lg:hidden p-2 text-(--tender-navy) hover:text-(--tender-cyan) transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Layers size={22} />}
            </button>

            {/* Logo para versión móvil (más pequeño y pegado al menú) */}
            <div className="lg:hidden">
              <Link href="/" aria-label="Tender inicio" onClick={() => setMobileOpen(false)}>
                <img
                  src="/images/logo-tender.svg"
                  alt="Tender®"
                  className="h-5 w-auto" // Tamaño reducido en móvil (h-5 es menor que h-7)
                  draggable={false}
                />
              </Link>
            </div>
          </div>

          {/* CENTRO: Logo (Desktop solamente) */}
          <div className="hidden lg:flex shrink-0 justify-center">
            <Link href="/" aria-label="Tender inicio">
              <img
                src="/images/logo-tender.svg"
                alt="Tender®"
                className="h-7 w-auto"
                draggable={false}
              />
            </Link>
          </div>

          {/* LADO DERECHO: Carrito */}
          <div className="flex-1 flex justify-end items-center pr-2">
            <div className="lg:hidden">
              <CartWidget />
            </div>
          </div>
        </div>

        {/* --- ROW 2: Navegación (Desktop only) --- */}
        <nav className="hidden lg:flex items-center justify-center gap-1 pb-2.5" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          
          <div className="flex items-center ml-2 pl-3 border-l border-border/50">
            <CartWidget />
          </div>
        </nav>
      </div>
      {/* --- Menú Móvil (Drawer) --- */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top duration-300" role="navigation" aria-label="Menú móvil">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(item.href)

              return (
                <div key={item.label} className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                        item.highlighted
                          ? "bg-(--tender-cyan) text-white text-center"
                          : isActive
                          ? "text-(--tender-cyan) bg-muted/50" 
                          : "text-(--tender-navy) hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                    
                    {item.hasDropdown && (
                      <button
                        className="p-2 ml-1 text-(--tender-navy) hover:text-(--tender-cyan) transition-colors rounded hover:bg-muted"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenSubmenu(openSubmenu === item.label ? null : item.label);
                        }}
                        aria-expanded={openSubmenu === item.label}
                        aria-label={`Desplegar submenú de ${item.label}`}
                      >
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-200 ${
                            openSubmenu === item.label ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {item.hasDropdown && item.subItems && (
                    <div 
                      className={`flex flex-col gap-1 pl-6 pr-3 overflow-hidden transition-all duration-300 ${
                        openSubmenu === item.label ? "max-h-60 py-1 bg-muted/20 border-l-2 border-(--tender-cyan) ml-3 mt-1 mb-2 rounded-r opacity-100" : "max-h-0 opacity-0 m-0"
                      }`}
                    >
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-1.5 text-sm font-medium text-(--tender-text-dark) hover:text-(--tender-cyan) transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

