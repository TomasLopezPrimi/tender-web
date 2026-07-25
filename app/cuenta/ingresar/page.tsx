import { redirect } from "next/navigation";

import { LoginSplit } from "@/components/cuenta/login-split";
import { getCustomerProfile } from "@/lib/account/api";
import { safeAccountRedirect } from "@/lib/account/redirect";
import { getCustomerRefreshToken } from "@/lib/account/session";

const oauthErrors: Record<string, string> = {
  google_state: "No pudimos validar el inicio con Google. Volvé a intentarlo desde este botón.",
  google_code: "Google no devolvió el permiso necesario. Probá iniciar sesión otra vez.",
  google_backend: "No pudimos completar el ingreso con Google. Reintentá en unos segundos.",
  google_config: "El ingreso con Google no está disponible ahora. Probá con email o reintentá más tarde.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const safeNext = safeAccountRedirect(next);
  if (await getCustomerProfile()) redirect(safeNext);
  if (await getCustomerRefreshToken()) redirect(`/api/customer/session/refresh?next=${encodeURIComponent(safeNext)}`);
  return <LoginSplit next={safeNext} oauthError={error ? oauthErrors[error] : undefined} />;
}
