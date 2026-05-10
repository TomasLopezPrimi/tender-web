import { Trash2 } from "lucide-react";
import { CartItem, ProductSize } from "@/types/products";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateSize: (id: string, sizeName: string, price: number, linkPago?: string | null) => void;
  formatPrice: (price: number) => string;
  availableSizes?: ProductSize[];
}

export default function CartItemCard({ item, onRemove, onUpdateSize, formatPrice, availableSizes }: CartItemCardProps) {
  const sizes = availableSizes ?? [];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-50 pb-6 last:border-0 last:pb-0">
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 text-lg">{item.nombre}</h3>
        
        <div className="mt-2 flex items-center gap-2">
          <label htmlFor={`size-${item.id}`} className="text-sm text-gray-500">Medida:</label>
          {sizes.length > 0 ? (
            <select
              id={`size-${item.id}`}
              value={item.medida}
              onChange={(e) => {
                const newSizeName = e.target.value;
                const newSizeObj = sizes.find(s => s.name === newSizeName);
                if (newSizeObj) {
                  onUpdateSize(item.id, newSizeObj.name, newSizeObj.price, newSizeObj.link_pago);
                }
              }}
              className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)] cursor-pointer"
            >
              {sizes.map((size) => (
                <option key={size.name} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-sm font-medium text-gray-700">{item.medida}</span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
      </div>
      
      <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <p className="font-bold text-[var(--tender-cyan)] text-lg">
          {formatPrice(item.precio * item.cantidad)}
        </p>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
        >
          <Trash2 size={18} />
          <span className="sm:hidden">Eliminar</span>
        </button>
      </div>
    </div>
  );
}