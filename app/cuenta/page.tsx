import { AccountDashboard, AccountShell } from "@/components/cuenta/account-ui";
import { getCustomerAddresses, getCustomerEmails, getCustomerOrders, requireCustomerProfile } from "@/lib/account/api";

export default async function AccountPage() {
  const profile = await requireCustomerProfile();
  const [emails, addresses, orders] = await Promise.all([getCustomerEmails(), getCustomerAddresses(), getCustomerOrders(20)]);
  return <AccountShell title="Mi cuenta"><AccountDashboard profile={profile} emails={emails} addresses={addresses} orders={orders} /></AccountShell>;
}
