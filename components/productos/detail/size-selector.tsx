'use client';

import { ChevronDown } from 'lucide-react';
import { ProductSize } from '@/types/products';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  onChange: (size: ProductSize | null) => void;
}

export default function SizeSelector({ sizes, selectedSize, onChange }: SizeSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeObj = sizes.find((s) => s.name === e.target.value);
    onChange(sizeObj || null);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-(--tender-navy)">Medida del Tender (m)</label>
        {selectedSize && <button onClick={() => onChange(null)} className="text-[10px] text-(--tender-cyan) underline font-bold uppercase tracking-wider">Limpiar</button>}
      </div>
      <div className="relative group">
        <select value={selectedSize?.name || ""} onChange={handleChange} className="w-full appearance-none bg-white border border-gray-200 text-sm py-4 px-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--tender-cyan)/20 focus:border-(--tender-cyan) transition-all cursor-pointer font-medium text-(--tender-navy) shadow-sm hover:border-gray-300">
          <option value="" disabled>Elige una opción...</option>
          {sizes.map((size) => (
            <option key={size.name} value={size.name}>{size.name} metros</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-(--tender-cyan)"><ChevronDown size={18} /></div>
      </div>
    </div>
  );
}
