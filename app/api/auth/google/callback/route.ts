import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { config } from "@/config";
import { safeAccountRedirect } from "@/lib/account/redirect";
import { setCustomerSession } from "@/lib/account/session";
import type { CustomerAuthResponse } from "@/types/customer";

const STATE_COOKIE = "tender_google_oauth_state";
const NEXT_COOKIE = "tender_google_oauth_next";

function loginRedirect(error: string, next: string) {
  const url = new URL("/cuenta/ingresar", config.SITE_URL);
  url.searchParams.set("error", error);
  url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const jar = await cookies();
  const expectedState = jar.get(STATE_COOKIE)?.value;
  const next = safeAccountRedirect(jar.get(NEXT_COOKIE)?.value);
  jar.delete(STATE_COOKIE);
  jar.delete(NEXT_COOKIE);

  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");

  if (!expectedState || !state || state !== expectedState) return loginRedirect("google_state", next);
  if (!code) return loginRedirect("google_code", next);

  const redirectUri = new URL("/api/auth/google/callback", config.SITE_URL).toString();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.INTERNAL_API_KEY) headers["X-Api-Key"] = config.INTERNAL_API_KEY;

  try {
    const response = await fetch(`${config.BACKEND_URL}/auth/clientes/google/callback`, {
      method: "POST",
      headers,
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
      cache: "no-store",
    });

    if (!response.ok) return loginRedirect("google_backend", next);
    await setCustomerSession((await response.json()) as CustomerAuthResponse);
    return NextResponse.redirect(new URL(next, config.SITE_URL));
  } catch {
    return loginRedirect("google_backend", next);
  }
}
