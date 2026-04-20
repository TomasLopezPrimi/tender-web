// components/carrito/ClientForm.tsx
import { User, Mail, Phone } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ClientFormValues } from "@/types/checkout";

interface ClientFormProps {
  register: UseFormRegister<ClientFormValues>;
  errors: FieldErrors<ClientFormValues>;
  serverError?: string;
}

export default function ClientForm({ register, errors, serverError }: ClientFormProps) {
  const inputClass = (hasError: boolean) =>
    `w-full bg-gray-50 border rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-300 focus:ring-red-400"
        : "border-gray-200 focus:ring-[var(--tender-cyan)]"
    }`;

  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <User size={14} className="text-[var(--tender-cyan)]" />
        Datos personales
      </h3>
      
      {serverError && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre *</label>
          <input
            type="text" id="nombre"
            {...register("nombre")}
            className={inputClass(!!errors.nombre)}
            placeholder="Ej. Juan"
          />
          {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>}
        </div>
        
        <div className="space-y-1">
          <label htmlFor="apellido" className="text-sm font-medium text-gray-700">Apellido *</label>
          <input
            type="text" id="apellido"
            {...register("apellido")}
            className={inputClass(!!errors.apellido)}
            placeholder="Ej. Pérez"
          />
          {errors.apellido && <p className="text-xs text-red-500 mt-1">{errors.apellido.message}</p>}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="dni" className="text-sm font-medium text-gray-700">DNI *</label>
          <input
            type="text" id="dni"
            {...register("dni")}
            className={inputClass(!!errors.dni)}
            placeholder="Sin puntos ni espacios"
          />
          {errors.dni && <p className="text-xs text-red-500 mt-1">{errors.dni.message}</p>}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email" id="email"
              {...register("email")}
              className={`${inputClass(!!errors.email)} pl-9`}
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono *</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel" id="phone"
              {...register("phone")}
              className={`${inputClass(!!errors.phone)} pl-9`}
              placeholder="Cód. área + Número"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="usuario_instagram" className="text-sm font-medium text-gray-700">Instagram (Opcional)</label>
          <input
            type="text" id="usuario_instagram"
            {...register("usuario_instagram")}
            className={inputClass(false)}
            placeholder="@tu_usuario"
          />
        </div>
      </div>
    </div>
  );
}
