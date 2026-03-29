import { UIProduct } from "@/types/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: UIProduct }) {
  // Formateo del precio (Desde $X.XXX)
  const menorPrecio = "Desde " + product.priceRange.split(" ")[0];
  const isCyanBadge = product.badgeColor === "bg-[var(--tender-cyan)]";

  return (
    <Link
      href={`/producto/${product.sku}`}
      className="group flex flex-col h-full bg-card rounded-xl overflow-hidden transition-all duration-500 w-full max-w-sm mx-auto 
                 border border-[var(--tender-navy)]/10 shadow-sm
                 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--tender-cyan)]/10 hover:border-[var(--tender-cyan)]/40"
    >
      {/* --- CONTENEDOR DE IMAGEN --- */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--tender-gray-bg)]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge Flotante */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 flex items-center justify-center z-10 backdrop-blur-md border text-[9px] font-black px-3 py-1.5 rounded-full tracking-tighter shadow-sm transition-all duration-500 group-hover:left-4
              ${isCyanBadge
                ? "bg-[var(--tender-cyan)]/90 text-white border-[var(--tender-cyan)]/20"
                : "bg-white/90 text-[var(--tender-navy)] border-white/40"}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* --- CUERPO DE LA TARJETA --- */}
      <div className="flex flex-col flex-grow p-6 text-center justify-between bg-card">

        <div className="space-y-2">
          {/* Título: Centrado, Sans-serif, altura fija para 2 líneas */}
          <h3 className="text-[15px] md:text-[16px] font-bold text-[var(--tender-navy)] leading-tight tracking-tight 
                         transition-colors duration-300 group-hover:text-[var(--tender-cyan)] 
                         line-clamp-2 h-[2.5em] flex items-center justify-center">
            {product.title}
          </h3>

          {/* Precio: Estilo Boutique (Chico, espaciado y centrado) */}
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--tender-text-muted)] font-bold">
            {menorPrecio}
          </p>
        </div>

        {/* --- FOOTER / ACCIÓN --- */}
        <div className="mt-6 pt-4 border-t border-[var(--tender-navy)]/5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--tender-navy)]/30 
                           group-hover:text-[var(--tender-cyan)] group-hover:translate-x-1 transition-all duration-300">
            Ver detalles
          </span>

          <div className="bg-[var(--tender-cyan)]/10 p-1.5 rounded-full text-[var(--tender-cyan)] 
                          opacity-0 -translate-x-4 transition-all duration-500 ease-out 
                          group-hover:opacity-100 group-hover:translate-x-0">
            <ArrowRight size={14} strokeWidth={3} />
          </div>
        </div>
      </div>
    </Link>
  );
}