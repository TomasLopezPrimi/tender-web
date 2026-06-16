import { Ruler } from 'lucide-react';
import { ProductSize } from '@/types/products';
import { calcHangingSpace } from '@/lib/product-detail';

interface HangingSpaceNoteProps {
  sku: string;
  selectedSize: ProductSize | null;
}

export default function HangingSpaceNote({ sku, selectedSize }: HangingSpaceNoteProps) {
  const hangingSpace = selectedSize ? calcHangingSpace(sku, selectedSize.name) : null;

  return (
    <div className="min-h-[100px] mb-8">
      {hangingSpace && (
        <div className="bg-gradient-to-r from-(--tender-gray-bg) to-transparent p-5 rounded-2xl border border-gray-100 flex items-center gap-5 animate-in fade-in zoom-in duration-300">
          <div className="bg-white p-3 rounded-xl text-(--tender-cyan) shadow-sm border border-gray-50"><Ruler size={24} /></div>
          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--tender-text-muted) font-bold mb-0.5">Espacio de colgado</p>
            <p className="text-lg font-serif text-(--tender-navy)"><span className="font-bold">{hangingSpace}</span> <span className="text-sm">metros</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
