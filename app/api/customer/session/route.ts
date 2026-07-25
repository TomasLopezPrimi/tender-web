import { NextResponse } from "next/server";

import { authHeaders } from "@/lib/account/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = await authHeaders();
  return NextResponse.json({ isLoggedIn: Boolean(headers.Authorization) });
}
