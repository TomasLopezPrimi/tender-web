import { NextRequest, NextResponse } from "next/server";

import { config } from "@/config";
import { safeAccountRedirect } from "@/lib/account/redirect";
import { clearCustomerSession, refreshCustomerSession } from "@/lib/account/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const next = safeAccountRedirect(request.nextUrl.searchParams.get("next") || "/cuenta");
  const failure = safeAccountRedirect(request.nextUrl.searchParams.get("failure"), "");
  const refreshed = await refreshCustomerSession();

  if (refreshed) return NextResponse.redirect(new URL(next, config.SITE_URL));

  await clearCustomerSession();
  if (failure) return NextResponse.redirect(new URL(failure, config.SITE_URL));

  const loginUrl = new URL("/cuenta/ingresar", config.SITE_URL);
  loginUrl.searchParams.set("next", next);
  return NextResponse.redirect(loginUrl);
}
