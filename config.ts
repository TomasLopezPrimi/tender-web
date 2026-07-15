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
        alias: "TENDERAX",
        cbu: "0720146888000037236186",
        titular: "Axenfeld Ruth Haydee"
    },
    GOOGLE_ANALYTICS_ID: "G-VP3D951D7F",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY
}
