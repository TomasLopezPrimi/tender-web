"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { CheckCircle2, HardHat, Mail } from "lucide-react";

import {
  registerCustomerAction,
  type AuthActionState,
} from "@/actions/customer-auth";
import {
  AuthDivider,
  AuthFooterLink,
  AuthMessage,
  AuthSplitShell,
  authInputClass,
  GoogleAuthButton,
} from "@/components/cuenta/auth-shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { professionalRubros } from "@/lib/professional-rubros";
import type { ProfessionalRubro } from "@/types/customer";

const initialState: AuthActionState = {};

function StateMessage({ state }: { state: AuthActionState }) {
  if (state.error) return <AuthMessage>{state.error}</AuthMessage>;
  return null;
}

export function RegisterSplit({ next = "/cuenta" }: { next?: string }) {
  const [state, action, pending] = useActionState(
    registerCustomerAction,
    initialState,
  );
  const [successOpen, setSuccessOpen] = useState(false);
  const [professionalMode, setProfessionalMode] = useState(false);
  const [rubro, setRubro] = useState<ProfessionalRubro>("ARQUITECTO");
  const loginHref = next === "/cuenta" ? "/cuenta/ingresar" : `/cuenta/ingresar?next=${encodeURIComponent(next)}`;

  useEffect(() => {
    setSuccessOpen(Boolean(state.ok && state.message));
  }, [state.ok, state.message]);

  return (
    <AuthSplitShell
      eyebrow="Alta de cuenta"
      title="Crear cuenta"
      description="Comprá con seguimiento de pedidos desde el primer día o dejá tu perfil listo para revisión profesional."
      panelTitle="Abrí tu cuenta y seguí todo desde un solo lugar."
      panelCopy="La experiencia está pensada para comprar fácil hoy y sumar condiciones profesionales cuando tu perfil quede aprobado."
      highlights={[
        { label: "Checkout más ágil", icon: "seguridad" },
        { label: "Historial y estado de órdenes", icon: "pedidos" },
        { label: "Solicitud profesional opcional", icon: "beneficios" },
      ]}
    >
      <>
        <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
          <DialogContent className="overflow-hidden rounded-[28px] border-0 p-0 shadow-2xl sm:max-w-xl">
            <div className="bg-[var(--tender-navy)] px-6 py-5 text-white sm:px-7">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 rounded-full bg-white/12 p-3 text-cyan-200">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <DialogHeader className="gap-2 text-left">
                  <DialogTitle className="text-xl font-black tracking-[0.02em] text-white">
                    Cuenta creada
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-6 text-cyan-50/90">
                    Ya dejamos tu alta lista. Solo falta verificar tu email para que puedas ingresar sin fricción.
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            <div className="space-y-5 px-6 py-6 sm:px-7">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-800">Revisá este correo</p>
                <div className="mt-3 flex items-center gap-3 text-[var(--tender-navy)]">
                  <span className="rounded-full bg-white p-2 text-[var(--tender-cyan)] shadow-sm">
                    <Mail className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold break-all">{state.email || "Tu email"}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>{state.message}</p>
                <ul className="space-y-2 text-slate-500">
                  <li>• Abrí el correo de Tender y tocá el enlace de verificación.</li>
                  <li>• Si no aparece, revisá spam o promociones.</li>
                  <li>• Después ya podés ingresar con tu email y contraseña.</li>
                </ul>
              </div>

              <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setSuccessOpen(false)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800 sm:w-auto"
                >
                  Entendido
                </button>
                <AuthFooterLink href={loginHref} label="Ir a ingresar" />
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-5">
          <GoogleAuthButton next={next} label="Crear con Google" />

          <AuthDivider label="o con tus datos" />

          <form action={action} className="space-y-4">
          <input
            type="hidden"
            name="tipo_cliente"
            value={professionalMode ? "PROFESIONAL" : "CLIENTE"}
          />
            <StateMessage state={state} />

          <button
            type="button"
            onClick={() => setProfessionalMode(!professionalMode)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm text-slate-600 transition-all hover:border-[var(--tender-cyan)] hover:bg-cyan-50/40 hover:text-[var(--tender-navy)]"
          >
            <span className="flex items-center gap-3">
              <span className="rounded-full bg-white p-2 text-[var(--tender-cyan)] shadow-sm">
                <HardHat size={16} />
              </span>
              <span>
                <span className="block font-semibold text-slate-800">Perfil profesional</span>
                <span className="block text-xs text-slate-500">
                  {professionalMode
                    ? "Se va a pedir tu rubro para revisión manual."
                    : "Activá esta opción si querés pedir beneficios profesionales."}
                </span>
              </span>
            </span>
            <span className={professionalMode ? "font-semibold text-[var(--tender-cyan)]" : "text-slate-400"}>
              {professionalMode ? "Activo" : "Opcional"}
            </span>
          </button>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>
              <input className={authInputClass} name="nombre" placeholder="Tu nombre" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Apellido</label>
              <input className={authInputClass} name="apellido" placeholder="Tu apellido" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">DNI</label>
              <input className={authInputClass} name="dni" placeholder="Solo números" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Teléfono</label>
              <input className={authInputClass} name="phone" placeholder="Opcional" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Usuario de Instagram</label>
              <input className={authInputClass} name="usuario_instagram" placeholder="Opcional" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                className={authInputClass}
                name="email"
                type="email"
                placeholder="tuemail@ejemplo.com"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Contraseña</label>
              <input
                className={authInputClass}
                name="password"
                type="password"
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                required
              />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              professionalMode
                ? "max-h-[32rem] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4 rounded-[24px] border border-cyan-100 bg-cyan-50/75 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-800">
                  Datos profesionales
                </p>
                <p className="mt-1 text-sm text-cyan-900/80">
                  Revisaremos estos datos para aprobarte el perfil. Mientras tanto podés comprar con las condiciones generales.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-cyan-950">Rubro profesional</label>
                  <select
                    className={authInputClass}
                    name="rubro_profesional"
                    value={rubro}
                    onChange={(event) => setRubro(event.target.value as ProfessionalRubro)}
                    required={professionalMode}
                  >
                    {professionalRubros.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-cyan-950">Estudio / empresa</label>
                  <input className={authInputClass} name="estudio_empresa" placeholder="Opcional" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-cyan-950">Matrícula profesional</label>
                  <input
                    className={authInputClass}
                    name="matricula_profesional"
                    placeholder="Opcional"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-cyan-950">CUIT</label>
                  <input
                    className={authInputClass}
                    name="cuit"
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </div>
          </div>

            <button
              className="w-full rounded-2xl bg-[var(--tender-navy)] px-4 py-3.5 text-sm font-extrabold uppercase tracking-[0.18em] text-white transition-all hover:bg-[var(--tender-navy-mid)] disabled:opacity-60"
              disabled={pending}
            >
              {pending ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>¿Ya tenés cuenta?</p>
            <AuthFooterLink href={loginHref} label="Ingresá" />
          </div>
        </div>
      </>
    </AuthSplitShell>
  );
}
