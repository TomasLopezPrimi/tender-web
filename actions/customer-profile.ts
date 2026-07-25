"use server";

import { revalidatePath } from "next/cache";

import { config } from "@/config";
import { authHeaders, refreshCustomerSession } from "@/lib/account/session";

export type ProfileActionState = { ok?: boolean; error?: string; message?: string };

async function sendProfileRequest(path: string, method: "PATCH" | "POST", body: unknown): Promise<ProfileActionState> {
  const headers = await authHeaders();
  if (!headers.Authorization) return { error: "Iniciá sesión para guardar cambios." };

  try {
    const postProfile = (requestHeaders: Record<string, string>) => fetch(`${config.BACKEND_URL}${path}`, {
      method,
      headers: { ...requestHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    let response = await postProfile(headers);
    if (response.status === 401 && headers.Authorization) {
      const refreshed = await refreshCustomerSession();
      if (refreshed) {
        response = await postProfile({ Authorization: `Bearer ${refreshed}` });
      }
    }
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { error: typeof data?.detail === "string" ? data.detail : "No pudimos guardar los cambios." };
    }
  } catch {
    return { error: "No pudimos conectar con el servidor." };
  }

  revalidatePath("/cuenta");
  return { ok: true, message: "Cambios guardados." };
}

export async function updateCustomerProfileAction(_state: ProfileActionState, formData: FormData) {
  const dni = String(formData.get("dni") || "").trim();
  const originalDni = String(formData.get("original_dni") || "").trim();
  const body: Record<string, string | null> = {
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    phone: String(formData.get("phone") || "") || null,
    usuario_instagram: String(formData.get("usuario_instagram") || "") || null,
  };

  if (!originalDni || dni !== originalDni) body.dni = dni;
  if (formData.has("estudio_empresa")) body.estudio_empresa = String(formData.get("estudio_empresa") || "") || null;

  return sendProfileRequest("/perfil/me", "PATCH", body);
}

export async function requestProfessionalStatusAction(_state: ProfileActionState, formData: FormData) {
  return sendProfileRequest("/perfil/me/profesional", "POST", {
    rubro_profesional: String(formData.get("rubro_profesional") || ""),
    matricula_profesional: String(formData.get("matricula_profesional") || "") || null,
    cuit: String(formData.get("cuit") || ""),
    estudio_empresa: String(formData.get("estudio_empresa") || "") || null,
  });
}
