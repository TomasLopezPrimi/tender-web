"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  loginCustomerAction,
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

const initialState: AuthActionState = {};

function StateMessage({ state }: { state: AuthActionState }) {
  if (state.error) return <AuthMessage>{state.error}</AuthMessage>;
  if (state.message) return <AuthMessage tone="success">{state.message}</AuthMessage>;
  return null;
}

export function LoginSplit({
  next,
  oauthError,
}: {
  next: string;
  oauthError?: string;
}) {
  const [state, action, pending] = useActionState(
    loginCustomerAction,
    initialState,
  );
  const createAccountHref = next === "/cuenta" ? "/cuenta/crear" : `/cuenta/crear?next=${encodeURIComponent(next)}`;

  return (
    <AuthSplitShell
      eyebrow="Acceso Tender"
      title="Ingresar"
      description="Entrá para seguir tus pedidos, reutilizar direcciones y activar tus beneficios cuando comprás con cuenta."
      panelTitle="Tu cuenta lista para comprar mejor."
      panelCopy="Con sesión iniciada podés retomar compras, revisar órdenes y mantener tu perfil profesional en un mismo lugar."
      highlights={[
        { label: "Seguimiento de pedidos", icon: "pedidos" },
        { label: "Direcciones guardadas", icon: "seguridad" },
        { label: "Beneficios profesionales", icon: "profesional" },
      ]}
    >
      <div className="space-y-5">
        {oauthError && <AuthMessage>{oauthError}</AuthMessage>}

        <GoogleAuthButton next={next} label="Continuar con Google" />

        <AuthDivider label="o con email" />

        <form action={action} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <StateMessage state={state} />

          <div className="grid gap-4">
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                id="login-email"
                className={authInputClass}
                name="email"
                type="email"
                placeholder="tuemail@ejemplo.com"
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700">
                  Contraseña
                </label>
                <Link
                  href="/cuenta/recuperar-password"
                  className="text-xs font-semibold text-[var(--tender-text-muted)] transition-colors hover:text-[var(--tender-cyan)]"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
              <input
                id="login-password"
                className={authInputClass}
                name="password"
                type="password"
                placeholder="Tu contraseña"
                required
              />
            </div>
          </div>

          <button
            className="w-full rounded-2xl bg-[var(--tender-navy)] px-4 py-3.5 text-sm font-extrabold uppercase tracking-[0.18em] text-white transition-all hover:bg-[var(--tender-navy-mid)] disabled:opacity-60"
            disabled={pending}
          >
            {pending ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>¿Todavía no tenés cuenta?</p>
          <AuthFooterLink href={createAccountHref} label="Crear cuenta" />
        </div>
      </div>
    </AuthSplitShell>
  );
}
