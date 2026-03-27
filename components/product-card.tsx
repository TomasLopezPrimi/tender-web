import { UIProduct } from "@/types/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: UIProduct }) {
  const menorPrecio = "Desde " + product.priceRange.split(" ")[0];
  const isCyanBadge = product.badgeColor === "bg-[var(--tender-cyan)]";

  return (
    <Link
      href={`/producto/${product.sku}`}
      // AQUÍ ESTÁ LA MAGIA: Borde más notorio y sombra base sutil
      className="group flex flex-col h-full bg-card rounded-xl overflow-hidden transition-all duration-500 w-full max-w-sm mx-auto 
                 border border-[var(--tender-navy)]/15 shadow-sm shadow-[var(--tender-navy)]/5 
                 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--tender-cyan)]/15 hover:border-[var(--tender-cyan)]/50"
    >
      {/* Contenedor de Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--tender-gray-bg)]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 flex items-center justify-center z-10 backdrop-blur-md border text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-sm transition-transform duration-500 group-hover:scale-105
              ${isCyanBadge 
                ? "bg-[var(--tender-cyan)]/90 text-white border-[var(--tender-cyan)]/30" 
                : "bg-white/90 text-[var(--tender-navy)] border-white/40"}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-5 justify-between bg-card">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[var(--tender-navy)] leading-snug mb-2 transition-colors duration-300 group-hover:text-[var(--tender-cyan)] line-clamp-2">
            {product.title}
          </h3>
        </div>

        {/* Footer integrado */}
        <div className="mt-4 flex items-end justify-between overflow-hidden">
          <p className="text-sm md:text-base text-[var(--tender-text-muted)] font-medium">
            {menorPrecio}
          </p>
          
          {/* Llamado a la acción (Aparece en hover) */}
          <span className="flex items-center gap-1.5 text-[var(--tender-cyan)] text-xs font-bold uppercase tracking-wider opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
            Detalles <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}