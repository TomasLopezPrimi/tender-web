import { ResetPasswordForm } from "@/components/cuenta/auth-forms";
import { AuthCard } from "@/components/cuenta/account-ui";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <AuthCard title="Nueva contraseña" intro="Elegí una contraseña nueva para tu cuenta.">{token ? <ResetPasswordForm token={token} /> : <p className="text-sm text-red-600">El enlace no incluye un token válido.</p>}</AuthCard>;
}
