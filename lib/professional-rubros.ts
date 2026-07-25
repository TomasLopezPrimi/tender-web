import type { ProfessionalRubro } from "@/types/customer";

export const professionalRubros: Array<{ value: ProfessionalRubro; label: string }> = [
  { value: "ARQUITECTO", label: "Arquitectura" },
  { value: "DISENADOR_INTERIORISTA", label: "Diseño / interiorismo" },
  { value: "INMOBILIARIA", label: "Inmobiliaria" },
  { value: "CONSTRUCTORA_DESARROLLADORA", label: "Constructora / desarrolladora" },
  { value: "DECORADOR", label: "Decoración" },
  { value: "OTRO", label: "Otro rubro" },
];

export function getProfessionalRubroLabel(value?: string | null) {
  return professionalRubros.find((item) => item.value === value)?.label ?? value ?? null;
}
