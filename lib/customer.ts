import type { CustomerType } from "@/types/customer";

export function isProfessionalCustomer(type?: CustomerType | string | null) {
  return type === "PROFESIONAL" || type === "ARQUITECTO";
}

export function getCustomerTypeLabel(type?: CustomerType | string | null) {
  return isProfessionalCustomer(type) ? "PROFESIONAL" : type ?? "CLIENTE";
}
