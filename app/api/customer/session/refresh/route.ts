import { NextRequest, NextResponse } from "next/server";

import { safeAccountRedirect } from "@/lib/account/redirect";
import { clearCustomerSession, refreshCustomerSession } from "@/lib/account/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const next = safeAccountRedirect(request.nextUrl.searchParams.get("next") || "/cuenta");
  const failure = safeAccountRedirect(request.nextUrl.searchParams.get("failure"), "");
  const refreshed = await refreshCustomerSession();

  if (refreshed) return NextResponse.redirect(new URL(next, request.url));

  await clearCustomerSession();
  if (failure) return NextResponse.redirect(new URL(failure, request.url));

  const loginUrl = new URL("/cuenta/ingresar", request.url);
  loginUrl.searchParams.set("next", next);
  return NextResponse.redirect(loginUrl);
}
