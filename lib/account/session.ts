import "server-only";

import { cookies } from "next/headers";

import { config } from "@/config";
import type { CustomerTokenResponse } from "@/types/customer";

const ACCESS_COOKIE = "tender_customer_access";
const REFRESH_COOKIE = "tender_customer_refresh";
const COOKIE_PROBE = "tender_customer_cookie_probe";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function getCustomerAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

export async function getCustomerRefreshToken() {
  return (await cookies()).get(REFRESH_COOKIE)?.value ?? null;
}

export async function hasCustomerSession() {
  return Boolean(await getCustomerAccessToken());
}

export async function setCustomerSession(tokens: CustomerTokenResponse) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, tokens.access_token, { ...cookieOptions, maxAge: tokens.expires_in });
  jar.set(REFRESH_COOKIE, tokens.refresh_token, { ...cookieOptions, maxAge: 60 * 60 * 24 * 30 });
}

export async function clearCustomerSession() {
  const jar = await cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

async function canMutateCookies() {
  try {
    const jar = await cookies();
    jar.set(COOKIE_PROBE, "1", { path: "/", maxAge: 1 });
    jar.delete(COOKIE_PROBE);
    return true;
  } catch {
    return false;
  }
}

export async function refreshCustomerSession() {
  const refreshToken = await getCustomerRefreshToken();
  if (!refreshToken) return null;
  const canPersist = await canMutateCookies();
  if (!canPersist) return null;

  let response: Response;
  try {
    response = await fetch(`${config.BACKEND_URL}/auth/clientes/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    await clearCustomerSession();
    return null;
  }

  const tokens = (await response.json()) as CustomerTokenResponse;
  await setCustomerSession(tokens);
  return tokens.access_token;
}

export async function authHeaders(): Promise<Record<string, string>> {
  const token = await getCustomerAccessToken();
  if (token) return { Authorization: `Bearer ${token}` };

  const refreshed = await refreshCustomerSession();
  return refreshed ? { Authorization: `Bearer ${refreshed}` } : {};
}
