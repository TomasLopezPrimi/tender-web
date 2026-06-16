'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ShoppingCartIcon } from 'lucide-react';
import { useCartStore } from '@/hooks/use-cart-store';
import { Product, ProductSize } from '@/types/products';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: ProductSize | null;
}

export default function AddToCartButton({ product, selectedSize }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const [isAdded, setIsAdded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      id: `${product.sku}-${selectedSize.name}`,
      sku: product.sku,
      nombre: product.title,
      medida: selectedSize.name,
      precio: selectedSize.price,
      link_pago: selectedSize.link_pago,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasItemsInCart = items.length > 0;

  return (
    <div className="flex flex-col gap-3">
      <button onClick={handleAdd} disabled={!selectedSize} className={`group flex items-center justify-center gap-3 w-full py-5 rounded-xl font-black tracking-widest text-xs transition-all ${selectedSize ? isAdded ? 'bg-green-500 text-white' : 'bg-(--tender-navy) text-white hover:bg-(--tender-cyan) hover:shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
        {isAdded ? <Check size={18} /> : <ShoppingCartIcon size={18} className="opacity-50" />}
        {isAdded ? 'AÑADIDO CON ÉXITO' : 'AÑADIR AL CARRITO'}
      </button>
      {isMounted && hasItemsInCart && <Link href="/carrito" className="flex items-center justify-center py-4 text-xs font-bold text-(--tender-navy) border-2 border-(--tender-navy) rounded-xl hover:bg-gray-50 transition-all uppercase tracking-widest">Finalizar Compra</Link>}
    </div>
  );
}
