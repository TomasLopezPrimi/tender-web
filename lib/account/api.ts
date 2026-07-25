import "server-only";

import { notFound, redirect } from "next/navigation";

import { config } from "@/config";
import { authHeaders, refreshCustomerSession } from "@/lib/account/session";
import type { CustomerAddress, CustomerEmails, CustomerOrderDetail, CustomerOrderSummary, CustomerOrderVisit, CustomerProfile, Paginated } from "@/types/customer";

async function customerFetch<T>(path: string): Promise<T | null> {
  let headers = await authHeaders();
  if (!headers.Authorization) return null;

  let response: Response;
  try {
    response = await fetch(`${config.BACKEND_URL}${path}`, {
      headers,
      cache: "no-store",
    });
  } catch {
    return null;
  }

  if (response.status === 401) {
    const token = await refreshCustomerSession();
    if (token) {
      headers = { Authorization: `Bearer ${token}` };
      try {
        response = await fetch(`${config.BACKEND_URL}${path}`, { headers, cache: "no-store" });
      } catch {
        return null;
      }
      if (response.status !== 401) {
        if (response.status === 404) notFound();
        if (!response.ok) return null;
        return response.json() as Promise<T>;
      }
    }
    return null;
  }
  if (response.status === 404) notFound();
  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export async function requireCustomerProfile() {
  const profile = await getCustomerProfile();
  if (!profile) redirect("/cuenta/ingresar?next=/cuenta");
  return profile;
}

export async function getCustomerProfile() {
  return customerFetch<CustomerProfile>("/perfil/me");
}

export async function getCustomerEmails() {
  return customerFetch<CustomerEmails>("/perfil/me/emails");
}

export async function getCustomerAddresses() {
  return (await customerFetch<CustomerAddress[]>("/perfil/me/direcciones")) ?? [];
}

export async function getCustomerOrders(limit = 20) {
  const data = await customerFetch<Paginated<CustomerOrderSummary>>(`/perfil/me/pedidos?limit=${limit}`);
  return data?.items ?? [];
}

export async function getCustomerOrder(id: string) {
  return customerFetch<CustomerOrderDetail>(`/perfil/me/pedidos/${id}`);
}

export async function getCustomerOrderVisits(id: string) {
  if (!config.INTERNAL_API_KEY) return [] as CustomerOrderVisit[];

  try {
    const response = await fetch(`${config.BACKEND_URL}/logistica/visitas?id_orden=${encodeURIComponent(id)}&limit=50`, {
      headers: { "X-Api-Key": config.INTERNAL_API_KEY },
      cache: "no-store",
    });

    if (!response.ok) return [] as CustomerOrderVisit[];

    const data = await response.json() as Paginated<CustomerOrderVisit>;
    return data.items ?? [];
  } catch {
    return [] as CustomerOrderVisit[];
  }
}

export async function getCheckoutCustomerData() {
  const profile = await getCustomerProfile();
  if (!profile) return null;
  const addresses = await getCustomerAddresses();
  return { profile, addresses };
}
