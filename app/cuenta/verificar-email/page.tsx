import Link from "next/link";

import { confirmEmailChangeAction, verifyEmailAction } from "@/actions/customer-auth";
import { ResendVerificationForm } from "@/components/cuenta/auth-forms";
import { AuthCard } from "@/components/cuenta/account-ui";

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string; type?: string }> }) {
  const { token, type } = await searchParams;
  const result = token ? (type === "email-change" ? await confirmEmailChangeAction(token) : await verifyEmailAction(token)) : null;
  return <AuthCard title="Verificación de email" intro="Confirmamos la validez del enlace enviado a tu correo.">{result?.ok ? <div className="space-y-4"><p className="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-700">Email confirmado correctamente.</p><Link href="/cuenta/ingresar" className="block rounded-sm bg-[var(--tender-navy)] px-4 py-3 text-center text-sm font-bold text-white">Ingresar</Link></div> : <div><p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">El enlace es inválido o expiró.</p><ResendVerificationForm /></div>}</AuthCard>;
}
