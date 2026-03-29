import { config } from '@/config';
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateDiscountedPrice(originalPrice: number, method: string = 'transferencia'): number {
  const TRANSFER_DISCOUNT = config.descuentoTransferencia
  if (method === 'transferencia') {
    return originalPrice * TRANSFER_DISCOUNT;
  }
  // Si agregas otros métodos a futuro, los manejas aquí
  return originalPrice;
}

// const displayPrice = `Desde ${formatter.format(minPrice)}`;