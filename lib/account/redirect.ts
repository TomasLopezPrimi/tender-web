export function safeAccountRedirect(value?: string | null, fallback = "/cuenta") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.includes("://") || value.includes("\\") || /%5c/i.test(value)) return fallback;
  return value;
}
