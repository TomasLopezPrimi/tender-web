import { RegisterSplit } from "@/components/cuenta/register-split";
import { safeAccountRedirect } from "@/lib/account/redirect";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;

  return <RegisterSplit next={safeAccountRedirect(next)} />;
}
