import Link from "next/link";

import { confirmEmailChangeAction } from "@/actions/customer-auth";
import { AuthCard } from "@/components/cuenta/account-ui";

export default async function ConfirmEmailChangePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const result = token ? await confirmEmailChangeAction(token) : null;
  return (
    <AuthCard title="Confirmar cambio de email" intro="Confirmamos el nuevo correo asociado a tu cuenta.">
      {result?.ok ? (
        <div className="space-y-4">
          <p className="rounded-sm border border-green-200 bg-green-50 p-3 text-sm text-green-700">Tu nuevo email fue confirmado correctamente.</p>
          <Link href="/cuenta/ingresar" className="block rounded-sm bg-[var(--tender-navy)] px-4 py-3 text-center text-sm font-bold text-white">Ingresar</Link>
        </div>
      ) : (
        <p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">El enlace es inválido o expiró.</p>
      )}
    </AuthCard>
  );
}
