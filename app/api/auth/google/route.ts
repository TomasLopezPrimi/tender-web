import { randomBytes } from "crypto";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { config } from "@/config";
import { safeAccountRedirect } from "@/lib/account/redirect";

const STATE_COOKIE = "tender_google_oauth_state";
const NEXT_COOKIE = "tender_google_oauth_next";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 10 * 60,
};

export async function GET(request: NextRequest) {
  const next = safeAccountRedirect(request.nextUrl.searchParams.get("next"));

  if (!config.GOOGLE_CLIENT_ID) {
    const url = new URL("/cuenta/ingresar", request.url);
    url.searchParams.set("error", "google_config");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  const state = randomBytes(24).toString("base64url");
  const redirectUri = `${config.SITE_URL}/api/auth/google/callback`;
  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.search = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  }).toString();

  const jar = await cookies();
  jar.set(STATE_COOKIE, state, cookieOptions);
  jar.set(NEXT_COOKIE, next, cookieOptions);

  return NextResponse.redirect(googleUrl);
}
