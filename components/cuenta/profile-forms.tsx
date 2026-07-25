"use client";

import { useActionState, useEffect, useState } from "react";
import { Check, ChevronDown, PencilLine, X } from "lucide-react";

import { requestProfessionalStatusAction, updateCustomerProfileAction, type ProfileActionState } from "@/actions/customer-profile";
import { isProfessionalCustomer } from "@/lib/customer";
import { professionalRubros } from "@/lib/professional-rubros";
import type { CustomerProfile, ProfessionalRubro } from "@/types/customer";

const initialState: ProfileActionState = {};
const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--tender-cyan)] focus:ring-4 focus:ring-cyan-100/60 sm:text-sm";
const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--tender-navy)] px-5 text-sm font-bold text-white transition hover:bg-[var(--tender-navy-mid)] disabled:cursor-wait disabled:opacity-60";

function StateMessage({ state, successMessage }: { state: ProfileActionState; successMessage: string }) {
  if (state.error) return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 md:col-span-2">{state.error}</p>;
  if (state.message) return <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-700 md:col-span-2"><Check className="h-4 w-4" /> {successMessage}</p>;
  return null;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 border-b border-slate-100 py-3 last:border-0">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="min-w-0 break-words text-right text-sm font-medium text-slate-700">{value?.trim() || "Sin cargar"}</p>
    </div>
  );
}

export function ProfileCompletionForm({ profile }: { profile: CustomerProfile }) {
  const [state, action, pending] = useActionState(updateCustomerProfileAction, initialState);
  const [editing, setEditing] = useState(false);
  const professional = isProfessionalCustomer(profile.tipo_cliente);
  const missing = [!profile.dni && "DNI", !profile.phone && "teléfono"].filter(Boolean);

  useEffect(() => {
    if (state.message) {
      setEditing(false);
    }
  }, [state.message]);

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold text-[var(--tender-navy-mid)]">Datos personales</h2>
        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-[var(--tender-navy)]"
          aria-expanded={editing}
        >
          {editing ? <X className="h-4 w-4" /> : <PencilLine className="h-4 w-4" />}
          {editing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {missing.length ? (
        <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2.5 text-sm leading-5 text-amber-900">
          Completá {missing.join(" y ")} para agilizar tus compras.
        </p>
      ) : null}

      {!editing ? (
        <div>
          <Field label="Nombre" value={`${profile.nombre} ${profile.apellido}`} />
          {professional && profile.estudio_empresa ? <Field label="Estudio" value={profile.estudio_empresa} /> : null}
          <Field label="DNI" value={profile.dni} />
          <Field label="Teléfono" value={profile.phone} />
          <Field label="Instagram" value={profile.usuario_instagram} />
        </div>
      ) : null}

      <div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${editing ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <form action={action} className="grid gap-3 border-t border-slate-200 pt-5 md:grid-cols-2">
            <StateMessage state={state} successMessage="Datos actualizados" />
            <input type="hidden" name="original_dni" value={profile.dni ?? ""} />
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Nombre<input className={inputClass} name="nombre" defaultValue={profile.nombre ?? ""} required /></label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Apellido<input className={inputClass} name="apellido" defaultValue={profile.apellido ?? ""} required /></label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">DNI<input className={inputClass} name="dni" inputMode="numeric" defaultValue={profile.dni ?? ""} required /></label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Teléfono<input className={inputClass} name="phone" inputMode="tel" defaultValue={profile.phone ?? ""} required /></label>
            {professional ? <label className="grid gap-1.5 text-xs font-semibold text-slate-600 md:col-span-2">Estudio / empresa <span className="font-normal text-slate-400">Opcional</span><input className={inputClass} name="estudio_empresa" defaultValue={profile.estudio_empresa ?? ""} /></label> : null}
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600 md:col-span-2">Instagram <span className="font-normal text-slate-400">Opcional</span><input className={inputClass} name="usuario_instagram" defaultValue={profile.usuario_instagram ?? ""} /></label>
            <div className="md:col-span-2">
              <button className={`${buttonClass} w-full sm:w-auto`} disabled={pending}>{pending ? "Guardando…" : "Guardar cambios"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalRequestForm({ profile }: { profile: CustomerProfile }) {
  const [state, action, pending] = useActionState(requestProfessionalStatusAction, initialState);
  const [rubro, setRubro] = useState<ProfessionalRubro>("ARQUITECTO");
  if (isProfessionalCustomer(profile.tipo_cliente)) return null;

  return (
    <details className="group mt-6 border-t border-slate-200 pt-6">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[var(--tender-navy-mid)]">
        <span>Solicitar cuenta profesional</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <form action={action} className="mt-4 grid gap-3">
        <StateMessage state={state} successMessage="Solicitud enviada" />
        <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Rubro
          <select className={inputClass} name="rubro_profesional" value={rubro} onChange={(event) => setRubro(event.target.value as ProfessionalRubro)} required>
            {professionalRubros.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Estudio / empresa <span className="font-normal text-slate-400">Opcional</span>
          <input className={inputClass} name="estudio_empresa" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-slate-600">Matrícula {rubro !== "ARQUITECTO" ? <span className="font-normal text-slate-400">Opcional</span> : null}
          <input className={inputClass} name="matricula_profesional" required={rubro === "ARQUITECTO"} />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-slate-600">CUIT
          <input className={inputClass} name="cuit" inputMode="numeric" required />
        </label>
        <button className={`${buttonClass} mt-1 w-full`} disabled={pending}>{pending ? "Enviando…" : "Enviar solicitud"}</button>
      </form>
    </details>
  );
}
