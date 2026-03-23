// components/carrito/ClientForm.tsx
import { User, Mail, Phone } from "lucide-react";
import { ClientData } from "@/types/checkout";

interface ClientFormProps {
  formData: ClientData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function ClientForm({ formData, onChange, error }: ClientFormProps) {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4 flex items-center gap-2">
        <User size={20} className="text-[var(--tender-cyan)]" />
        Tus Datos
      </h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre *</label>
          <input
            type="text" id="nombre" name="nombre"
            value={formData.nombre} onChange={onChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
            placeholder="Ej. Juan"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="apellido" className="text-sm font-medium text-gray-700">Apellido *</label>
          <input
            type="text" id="apellido" name="apellido"
            value={formData.apellido} onChange={onChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
            placeholder="Ej. Pérez"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="dni" className="text-sm font-medium text-gray-700">DNI *</label>
          <input
            type="text" id="dni" name="dni"
            value={formData.dni} onChange={onChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
            placeholder="Sin puntos ni espacios"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={onChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono *</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel" id="phone" name="phone"
              value={formData.phone} onChange={onChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
              placeholder="Cód. área + Número"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="usuario_instagram" className="text-sm font-medium text-gray-700">Instagram (Opcional)</label>
          <input
            type="text" id="usuario_instagram" name="usuario_instagram"
            value={formData.usuario_instagram || ""} onChange={onChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
            placeholder="@tu_usuario"
          />
        </div>
      </div>
    </div>
  );
}