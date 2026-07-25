"use server";

import { redirect } from "next/navigation";

import { config } from "@/config";
import { safeAccountRedirect } from "@/lib/account/redirect";
import { clearCustomerSession, getCustomerRefreshToken, setCustomerSession } from "@/lib/account/session";
import type { CustomerAuthResponse } from "@/types/customer";

export type AuthActionState = { ok?: boolean; error?: string; message?: string; email?: string };

async function postBackend<T>(path: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  let response: Response;
  try {
    response = await fetch(`${config.BACKEND_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "No pudimos conectar con el servidor. Intentá nuevamente." };
  }

  if (!response.ok) {
    let error = "No pudimos completar la operación.";
    try {
      const data = await response.json();
      error = typeof data.detail === "string" ? data.detail : error;
    } catch {}
    return { ok: false, error };
  }

  return { ok: true, data: (await response.json()) as T };
}

export async function loginCustomerAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const next = safeAccountRedirect(String(formData.get("next") || "/cuenta"));
  const result = await postBackend<CustomerAuthResponse>("/auth/clientes/login", {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  });

  if (!result.ok) return { error: result.error };
  await setCustomerSession(result.data);
  redirect(next);
}

export async function registerCustomerAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const tipo = String(formData.get("tipo_cliente") || "CLIENTE");
  const isProfessional = tipo === "PROFESIONAL";
  const result = await postBackend("/auth/clientes/register", {
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni: String(formData.get("dni") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    phone: String(formData.get("phone") || ""),
    usuario_instagram: String(formData.get("usuario_instagram") || "") || null,
    tipo_cliente: tipo,
    rubro_profesional: isProfessional ? String(formData.get("rubro_profesional") || "") : null,
    matricula_profesional: isProfessional ? String(formData.get("matricula_profesional") || "") || null : null,
    cuit: isProfessional ? String(formData.get("cuit") || "") : null,
    estudio_empresa: isProfessional ? String(formData.get("estudio_empresa") || "") || null : null,
  });

  if (!result.ok) return { error: result.error };
  return {
    ok: true,
    email: String(formData.get("email") || ""),
    message: "Cuenta creada. Te enviamos un email para verificarla antes de ingresar.",
  };
}

export async function forgotPasswordAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const result = await postBackend("/auth/clientes/forgot-password", { email: String(formData.get("email") || "") });
  if (!result.ok) return { error: result.error };
  return { ok: true, message: "Si el email existe, recibirás un enlace para restablecer tu contraseña." };
}

export async function resetPasswordAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const result = await postBackend("/auth/clientes/reset-password", {
    token: String(formData.get("token") || ""),
    nueva_password: String(formData.get("password") || ""),
  });
  if (!result.ok) return { error: result.error };
  return { ok: true, message: "Contraseña actualizada. Ya podés ingresar." };
}

export async function verifyEmailAction(token: string) {
  return postBackend("/auth/clientes/verify-email", { token });
}

export async function resendVerificationAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const result = await postBackend("/auth/clientes/resend-verification", { email: String(formData.get("email") || "") });
  if (!result.ok) return { error: result.error };
  return { ok: true, message: "Si el email existe y falta verificarlo, recibirás un nuevo enlace." };
}

export async function confirmEmailChangeAction(token: string) {
  return postBackend("/auth/clientes/confirm-email-change", { token });
}

export async function logoutCustomerAction() {
  const refresh = await getCustomerRefreshToken();
  try {
    if (refresh) {
      await postBackend("/auth/clientes/logout", { refresh_token: refresh });
    }
  } finally {
    await clearCustomerSession();
  }
  redirect("/");
}
