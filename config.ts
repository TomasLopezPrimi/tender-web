function getSiteUrl() {
    const fallback = "http://localhost:3000";
    const isProductionServer = typeof window === "undefined" && process.env.NODE_ENV === "production";
    const value = process.env.SITE_URL || (isProductionServer ? undefined : fallback);

    if (!value) throw new Error("SITE_URL debe configurarse con https://tender.com.ar en producción.");

    try {
        const url = new URL(value);
        if (isProductionServer && (url.protocol !== "https:" || url.hostname !== "tender.com.ar")) {
            throw new Error();
        }
        return url.origin;
    } catch {
        throw new Error("SITE_URL debe ser una URL HTTPS válida de https://tender.com.ar en producción.");
    }
}

export const config = {
    whatsappNumber : "5491131876811",
    phone2: "+54 11 5151-7715",
    // phone3: "+54 11 4931-6465",
    allNumbers: [
        { number: "11 5151-7715", href: "tel:+541151517715" },
        // { number: "11 4931-6465", href: "tel:+541149316465" },
        { number: "15 3187-6811", href: "tel:+5491131876811" },
      ],
    emailVentas: "ventas@tender.com.ar",
    bankDetails : {
        alias: process.env.BANK_ALIAS!,
        cbu: process.env.BANK_CBU!,
        titular: process.env.BANK_ACCOUNT_HOLDER!
    },
    GOOGLE_ANALYTICS_ID: "G-VP3D951D7F",
    SITE_URL: getSiteUrl(),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY
}

export type BankDetails = typeof config.bankDetails;
