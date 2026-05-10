import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
import { CartItem } from '@/types/products';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (id: string) => void;
  updateItemSize: (oldId: string, newSizeName: string, newPrice: number, newLinkPago?: string | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          };
        } else {
          return { items: [...state.items, { ...newItem, cantidad: 1 }] };
        }
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      updateItemSize: (oldId, newSizeName, newPrice, newLinkPago) => set((state) => {
        const itemToUpdate = state.items.find((item) => item.id === oldId);
        if (!itemToUpdate) return state;

        const newId = `${itemToUpdate.sku}-${newSizeName}`;
        const existingItemWithNewSize = state.items.find((item) => item.id === newId);

        if (existingItemWithNewSize) {
          return {
            items: state.items
              .map((item) =>
                item.id === newId
                  ? { ...item, cantidad: item.cantidad + itemToUpdate.cantidad }
                  : item
              )
              .filter((item) => item.id !== oldId),
          };
        } else {
          return {
            items: state.items.map((item) =>
              item.id === oldId
                ? { ...item, id: newId, medida: newSizeName, precio: newPrice, link_pago: newLinkPago }
                : item
            ),
          };
        }
      }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'tender-cart-storage', 
    }
  )
);