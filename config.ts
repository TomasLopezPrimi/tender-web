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

export function getInterestFreeInstallments(): number | null {
    const value = process.env.CUOTAS_SIN_INTERES?.trim();
    if (!value || !/^\d+$/.test(value)) return null;

    const installments = Number(value);
    return Number.isSafeInteger(installments) && installments > 0 ? installments : null;
}

function getContactNumber(value: string | undefined, name: string) {
    const number = value?.trim();
    if (!number || !/^[1-9]\d{7,14}$/.test(number)) {
        throw new Error(`${name} debe contener el número internacional, solo dígitos, sin +, espacios ni guiones.`);
    }
    return number;
}

const whatsappNumber = getContactNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "NEXT_PUBLIC_WHATSAPP_NUMBER");
const callsNumber = getContactNumber(process.env.NEXT_PUBLIC_CALLS_NUMBER, "NEXT_PUBLIC_CALLS_NUMBER");

export const config = {
    whatsappNumber,
    callsNumber,
    allNumbers: [
        { label: "Solo WhatsApp", number: `+${whatsappNumber}`, href: `https://wa.me/${whatsappNumber}` },
        { label: "Solo llamadas", number: `+${callsNumber}`, href: `tel:+${callsNumber}` },
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
