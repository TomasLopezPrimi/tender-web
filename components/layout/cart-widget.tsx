"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingCart } from "lucide-react";

export default function CartWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link 
      href="/carrito" 
      className="relative flex items-center justify-center p-2 text-gray-600 transition-colors hover:text-(--tender-cyan)"
      aria-label="Ir al carrito"
    >
      <ShoppingCart size={24} strokeWidth={1.5} />
      
      {/* Solo mostramos el punto rojo si hay productos */}
      {totalItems > 0 && (
        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}