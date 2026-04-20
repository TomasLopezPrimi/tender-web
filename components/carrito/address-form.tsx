import { MapPin } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ClientFormValues, PROVINCIAS_AR } from "@/types/checkout";

interface AddressFormProps {
  register: UseFormRegister<ClientFormValues>;
  errors: FieldErrors<ClientFormValues>;
}

export default function AddressForm({ register, errors }: AddressFormProps) {
  const addrErrors = errors.address;

  const inputClass = (hasError: boolean) =>
    `w-full bg-gray-50 border rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-300 focus:ring-red-400"
        : "border-gray-200 focus:ring-[var(--tender-cyan)]"
    }`;
    
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <MapPin size={14} className="text-[var(--tender-cyan)]" />
        Dirección de entrega
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="address.calle" className="text-sm font-medium text-gray-700">Calle *</label>
          <input
            type="text" id="address.calle"
            {...register("address.calle")}
            className={inputClass(!!addrErrors?.calle)}
            placeholder="Ej. Av. Corrientes"
          />
          {addrErrors?.calle && <p className="text-xs text-red-500 mt-1">{addrErrors.calle.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="address.numero" className="text-sm font-medium text-gray-700">Número *</label>
          <input
            type="text" id="address.numero"
            {...register("address.numero")}
            className={inputClass(!!addrErrors?.numero)}
            placeholder="Ej. 1234"
          />
          {addrErrors?.numero && <p className="text-xs text-red-500 mt-1">{addrErrors.numero.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="address.codigo_postal" className="text-sm font-medium text-gray-700">Código Postal *</label>
          <input
            type="text" id="address.codigo_postal"
            {...register("address.codigo_postal")}
            className={inputClass(!!addrErrors?.codigo_postal)}
            placeholder="Ej. 1414 o B1636"
          />
          {addrErrors?.codigo_postal && <p className="text-xs text-red-500 mt-1">{addrErrors.codigo_postal.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="address.ciudad" className="text-sm font-medium text-gray-700">Ciudad *</label>
          <input
            type="text" id="address.ciudad"
            {...register("address.ciudad")}
            className={inputClass(!!addrErrors?.ciudad)}
            placeholder="Ej. Buenos Aires"
          />
          {addrErrors?.ciudad && <p className="text-xs text-red-500 mt-1">{addrErrors.ciudad.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="address.provincia" className="text-sm font-medium text-gray-700">Provincia *</label>
          <select
            id="address.provincia"
            {...register("address.provincia")}
            className={inputClass(!!addrErrors?.provincia)}
          >
            <option value="" disabled>Seleccioná una provincia</option>
            {PROVINCIAS_AR.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
          {addrErrors?.provincia && <p className="text-xs text-red-500 mt-1">{addrErrors.provincia.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="address.piso" className="text-sm font-medium text-gray-700">Piso</label>
          <input
            type="text" id="address.piso"
            {...register("address.piso")}
            className={inputClass(false)}
            placeholder="Ej. 3"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="address.departamento" className="text-sm font-medium text-gray-700">Departamento</label>
          <input
            type="text" id="address.departamento"
            {...register("address.departamento")}
            className={inputClass(false)}
            placeholder="Ej. A"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="address.referencias" className="text-sm font-medium text-gray-700">Referencias</label>
          <input
            type="text" id="address.referencias"
            {...register("address.referencias")}
            className={inputClass(false)}
            placeholder="Ej. Portero eléctrico 3A"
          />
        </div>

        <div className="flex items-center gap-3 md:col-span-2">
          <input
            type="checkbox" id="address.es_barrio_privado"
            {...register("address.es_barrio_privado")}
            className="h-4 w-4 rounded border-gray-300 text-[var(--tender-cyan)] focus:ring-[var(--tender-cyan)]"
          />
          <label htmlFor="address.es_barrio_privado" className="text-sm text-gray-700">
            Es barrio privado / country
          </label>
        </div>
      </div>
    </div>
  );
}

