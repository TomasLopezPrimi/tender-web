"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { UserRound, X, LogOut } from "lucide-react";

import {
  loginCustomerAction,
  logoutCustomerAction,
  type AuthActionState,
} from "@/actions/customer-auth";

const initialState: AuthActionState = {};

export default function AccountDropdown({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    loginCustomerAction,
    initialState,
  );
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (pending || state.error) {
      setOpen(true);
    }
  }, [pending, state.error]);

  if (!isLoggedIn) {
    return (
      <div
        ref={ref}
        className="relative"
        onFocusCapture={() => setOpen(true)}
        onBlurCapture={(event) => {
          const nextFocus = event.relatedTarget;
          if (nextFocus instanceof Node && ref.current?.contains(nextFocus)) return;
          setOpen(false);
        }}
      >
        <Link
          ref={triggerRef}
          href="/cuenta/ingresar"
          onMouseEnter={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wide text-(--tender-navy) hover:text-(--tender-cyan) transition-colors"
          aria-expanded={open}
          aria-label="Mi cuenta"
          aria-haspopup="dialog"
        >
          <UserRound size={16} />
          MI CUENTA
        </Link>

        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-sm border border-gray-100 bg-white p-5 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-black text-[var(--tender-navy-mid)]">
                Ingresar
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar"
              >
                <X size={14} />
              </button>
            </div>

            <a
              href="/api/auth/google?next=/cuenta"
              className="flex w-full items-center justify-center gap-2.5 rounded-sm border border-gray-200 bg-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[var(--tender-navy)] transition-all hover:border-[var(--tender-cyan)] hover:shadow-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continuar con Google
            </a>

            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                o con email
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <form action={action} className="space-y-3">
              <input type="hidden" name="next" value="/cuenta" />
              {state.error && (
                <p className="rounded-sm bg-red-50 p-2 text-xs text-red-600">
                  {state.error}
                </p>
              )}
              <input
                className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[var(--tender-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <input
                className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[var(--tender-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]"
                name="password"
                type="password"
                placeholder="Contraseña"
                required
              />
              <button
                className="w-full rounded-sm bg-[var(--tender-navy)] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:bg-[var(--tender-navy-mid)] disabled:opacity-60"
                disabled={pending}
              >
                {pending ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <Link
                href="/cuenta/recuperar-password"
                onClick={() => setOpen(false)}
                className="text-[var(--tender-text-muted)] hover:text-[var(--tender-cyan)] transition-colors"
              >
                Olvidé mi contraseña
              </Link>
              <Link
                href="/cuenta/crear"
                onClick={() => setOpen(false)}
                className="font-semibold text-[var(--tender-navy)] hover:text-[var(--tender-cyan)] transition-colors"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged in — simple "Mi cuenta" + "Cerrar sesión"
  return (
    <div
      ref={ref}
      className="relative"
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        const nextFocus = event.relatedTarget;
        if (nextFocus instanceof Node && ref.current?.contains(nextFocus)) return;
        setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href="/cuenta"
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-bold tracking-wide text-(--tender-navy) hover:text-(--tender-cyan) transition-colors"
        aria-expanded={open}
        aria-label="Mi cuenta"
        aria-haspopup="menu"
      >
        <UserRound size={16} />
        MI CUENTA
      </Link>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-sm border border-gray-100 bg-white p-3 shadow-lg"
        >
          <Link
            href="/cuenta"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm font-semibold text-[var(--tender-navy)] hover:bg-gray-50 hover:text-[var(--tender-cyan)] transition-colors"
          >
            <UserRound size={14} />
            Mi cuenta
          </Link>
          <form action={logoutCustomerAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
