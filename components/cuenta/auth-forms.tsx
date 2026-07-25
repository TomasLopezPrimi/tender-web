"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { forgotPasswordAction, loginCustomerAction, registerCustomerAction, resendVerificationAction, resetPasswordAction, type AuthActionState } from "@/actions/customer-auth";
import { professionalRubros } from "@/lib/professional-rubros";
import type { ProfessionalRubro } from "@/types/customer";

const initialState: AuthActionState = {};
const inputClass = "w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]";
const buttonClass = "w-full rounded-sm bg-[var(--tender-navy)] px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-white transition hover:bg-[var(--tender-navy-mid)] disabled:opacity-60";

function StateMessage({ state }: { state: AuthActionState }) {
  if (state.error) return <p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{state.error}</p>;
  if (state.message) return <p className="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-700">{state.message}</p>;
  return null;
}

function GoogleButton({ next, label = "Continuar con Google" }: { next?: string; label?: string }) {
  return <a href={`/api/auth/google?next=${encodeURIComponent(next || "/cuenta")}`} className="flex w-full items-center justify-center rounded-sm border border-gray-200 bg-white px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-[var(--tender-navy)] transition hover:border-[var(--tender-cyan)]">{label}</a>;
}

export function LoginForm({ next, oauthError }: { next: string; oauthError?: string }) {
  const [state, action, pending] = useActionState(loginCustomerAction, initialState);
  return (
    <div className="space-y-4">
      {oauthError && <p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{oauthError}</p>}
      <GoogleButton next={next} />
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400"><span className="h-px flex-1 bg-gray-200" />O con email<span className="h-px flex-1 bg-gray-200" /></div>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <StateMessage state={state} />
        <input className={inputClass} name="email" type="email" placeholder="Email" required />
        <input className={inputClass} name="password" type="password" placeholder="Contraseña" required />
        <button className={buttonClass} disabled={pending}>Ingresar</button>
        <div className="flex justify-between text-sm text-gray-500">
          <Link href="/cuenta/recuperar-password" className="hover:text-[var(--tender-cyan)]">Olvidé mi contraseña</Link>
          <Link href="/cuenta/crear" className="hover:text-[var(--tender-cyan)]">Crear cuenta</Link>
        </div>
      </form>
    </div>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerCustomerAction, initialState);
  const [type, setType] = useState("CLIENTE");
  const [rubro, setRubro] = useState<ProfessionalRubro>("ARQUITECTO");
  return (
    <div className="space-y-4">
      <GoogleButton label="Crear con Google" />
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400"><span className="h-px flex-1 bg-gray-200" />O con tus datos<span className="h-px flex-1 bg-gray-200" /></div>
      <form action={action} className="space-y-4">
        <StateMessage state={state} />
        <div className="grid grid-cols-2 gap-2 rounded-sm bg-gray-100 p-1 text-sm font-bold">
        {[["CLIENTE", "Cliente"], ["PROFESIONAL", "Profesional"]].map(([value, label]) => (
          <label key={value} className={`cursor-pointer rounded-sm px-3 py-2 text-center ${type === value ? "bg-white text-[var(--tender-navy)] shadow-sm" : "text-gray-500"}`}>
            <input className="sr-only" type="radio" name="tipo_cliente" value={value} checked={type === value} onChange={() => setType(value)} />
            {label}
          </label>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input className={inputClass} name="nombre" placeholder="Nombre" required />
        <input className={inputClass} name="apellido" placeholder="Apellido" required />
        <input className={inputClass} name="dni" placeholder="DNI" required />
        <input className={inputClass} name="phone" placeholder="Teléfono" />
        <input className={inputClass} name="email" type="email" placeholder="Email" required />
        <input className={inputClass} name="password" type="password" minLength={8} placeholder="Contraseña" required />
        <input className={`${inputClass} md:col-span-2`} name="usuario_instagram" placeholder="Instagram (opcional)" />
      </div>
      {type === "PROFESIONAL" && (
        <div className="grid gap-3 rounded-sm border border-cyan-100 bg-cyan-50 p-3 md:grid-cols-2">
          <select className={`${inputClass} md:col-span-2`} name="rubro_profesional" value={rubro} onChange={(event) => setRubro(event.target.value as ProfessionalRubro)} required>
            {professionalRubros.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <input className={inputClass} name="matricula_profesional" placeholder="Matrícula profesional" required={rubro === "ARQUITECTO"} />
          <input className={inputClass} name="cuit" placeholder="CUIT" required />
          <p className="text-xs text-cyan-900 md:col-span-2">Se verificará la información y aprobaremos tu perfil profesional en los próximos días. Hasta entonces podés comprar normalmente.</p>
        </div>
      )}
        <button className={buttonClass} disabled={pending}>Crear cuenta</button>
      </form>
    </div>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, initialState);
  return <form action={action} className="space-y-4"><StateMessage state={state} /><input className={inputClass} name="email" type="email" placeholder="Email" required /><button className={buttonClass} disabled={pending}>Enviar enlace</button></form>;
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, initialState);
  return <form action={action} className="space-y-4"><StateMessage state={state} /><input type="hidden" name="token" value={token} /><input className={inputClass} name="password" type="password" minLength={8} placeholder="Nueva contraseña" required /><button className={buttonClass} disabled={pending}>Actualizar contraseña</button></form>;
}

export function ResendVerificationForm() {
  const [state, action, pending] = useActionState(resendVerificationAction, initialState);
  return <form action={action} className="mt-4 flex gap-2"><input className={inputClass} name="email" type="email" placeholder="Email" required /><button className="rounded-sm bg-[var(--tender-navy)] px-4 text-sm font-bold text-white disabled:opacity-60" disabled={pending}>Reenviar</button><StateMessage state={state} /></form>;
}
