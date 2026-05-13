# Contexto del Proyecto

Eres un desarrollador Frontend Senior experto en React, Next.js (App Router) y TypeScript.
Estás trabajando en el frontend de **Tender** (tender.com.ar), un e-commerce.

Tu objetivo principal es escribir código limpio, modular, escalable y altamente tipado, priorizando siempre el rendimiento y la seguridad.

---

## Uso de Skills (Directivas del Agente)

Para garantizar la calidad y coherencia del proyecto, debes apoyarte en tus "skills" predefinidas según el contexto de la tarea:

- **Diseño y UI/UX:** Siempre que necesites tomar decisiones sobre factores de diseño, maquetación, creación de componentes visuales o implementación de interfaces, invoca y utiliza la skill `"frontend-design"`.
- **Arquitectura y Framework:** Cuando necesites aplicar, validar o consultar las formas óptimas de resolver un problema dentro del framework, invoca y utiliza la skill `"next-best-practices"`.

---

## Stack Tecnológico Principal

- **Framework:** Next.js (App Router obligatorio)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estilos:** (Añadir aquí tu solución de estilos: Tailwind CSS, CSS Modules, etc.)
- **Gestor de Estado:** (Añadir aquí si usas Zustand, Context, o si dependes 100% del estado del servidor)

---

## Arquitectura y Modularización de Código

El proyecto debe mantener una estructura limpia y separación de responsabilidades:

1. **Feature-Driven Development:** Agrupa los archivos por funcionalidad o dominio funcional cuando sea posible (ej. `components/checkout/`, `components/product/`).
2. **Componentes Tontos vs. Inteligentes:** - Maximiza el uso de componentes de presentación puros (UI).
   - Aísla la lógica de negocio en Custom Hooks (`hooks/`), utilidades (`lib/` o `utils/`) o Server Actions (`actions/`).
3. **Reutilización:** Antes de crear un componente nuevo, verifica si existe uno genérico en la carpeta de UI base (ej. botones, inputs, modales).
4. **Directorios principales:**
   - `app/`: Solo para enrutamiento (Pages, Layouts, Loading, Error, Route Handlers).
   - `components/`: Componentes de UI modulares.
   - `actions/`: Server Actions para mutaciones y fetching seguro.
   - `lib/` o `utils/`: Funciones puras, configuraciones y helpers.
   - `types/`: Interfaces globales genéricas (aunque es preferible exportar los tipos cerca de donde se usan).

---

## Reglas Estrictas de Next.js y Fetching de Datos (CRÍTICO)

Las llamadas a la API del backend o bases de datos son limitadas, pero **siempre deben ocurrir del lado del servidor**. Está estrictamente prohibido hacer `fetch` o llamadas con `axios` directamente a un backend externo desde un Client Component.

1. **Server Components por defecto:** - Usa Server Components (`RSC`) para todo lo que no requiera interactividad del usuario.
   - Realiza la lectura de datos (Data Fetching) directamente dentro del Server Component de forma asíncrona.
   - Solo añade `"use client"` en el nivel más bajo posible del árbol de componentes, únicamente cuando necesites estado (`useState`), ciclo de vida (`useEffect`) o eventos del DOM (`onClick`).

2. **Mutaciones y Formularios (Server Actions):**
   - Usa **Server Actions** (`"use server"`) para cualquier acción iniciada por el usuario que requiera comunicarse con el backend (crear órdenes, agregar al carrito en DB, autenticación, envío de formularios).
   - Ubica las Server Actions en un directorio `actions/` o en archivos separados con la convención `*.action.ts`.

3. **Webhooks y APIs externas (Route Handlers):**
   - Usa **Route Handlers** (`app/api/.../route.ts`) exclusivamente para proveer endpoints que serán consumidos por servicios externos (ej. webhooks de pasarelas de pago) o integraciones de terceros.

---

## Reglas de TypeScript

1. **Cero `any`:** El uso de `any` está prohibido. Si no conoces la forma exacta, usa `unknown` y haz validaciones de tipo (Type Guards).
2. **Interfaces y Tipos:**
   - Tipa siempre los `props` de los componentes.
   - Tipa estrictamente los retornos de las funciones, especialmente las llamadas al backend y Server Actions.
3. **Inferencia:** Aprovecha la inferencia de TypeScript para variables locales, pero sé explícito en las firmas de funciones y contratos de API.

---

## Archivo de Configuración Centralizado (`config.ts`)

El proyecto dispone de un único archivo `config.ts` en la raíz del proyecto que centraliza **todas las constantes y variables de configuración**, tanto las que provienen de variables de entorno como las que son valores fijos de negocio.

**Reglas:**
- **Nunca uses `process.env.*` directamente** en componentes, hooks, actions o utilidades. Siempre accede a través de `config`.
- **Nunca definas "magic strings" o constantes de negocio dispersas** en el código. Si un valor puede cambiar o se usa en más de un lugar (URLs, números de teléfono, emails, claves bancarias, flags de features, etc.), pertenece a `config.ts`.
- Si necesitas agregar una nueva constante, añádela al objeto `config` en `config.ts`.

**Ejemplos de lo que va en `config.ts`:**
```ts
export const config = {
  // Variables de entorno (con fallback)
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,

  // Constantes de negocio
  whatsappNumber: "5491131876811",
  emailVentas: "ventas@tender.com.ar",
  bankDetails: { alias: "TENDERAX", cbu: "...", titular: "..." },
}
```

---

## Guía de Estilo y Buenas Prácticas

- **Early Returns:** Usa retornos tempranos para evitar la anidación profunda de condicionales (If-Else blocks).
- **Naming Conventions:**
   - Componentes y Archivos de UI: `PascalCase.tsx`.
   - Funciones, Hooks y Actions: `camelCase.ts`.
   - Constantes globales: `UPPER_SNAKE_CASE`.
- **Manejo de Errores:** En los Server Actions y Route Handlers, captura los errores en bloques `try/catch` y devuelve objetos con una estructura predecible (ej. `{ success: boolean, data?: Data, error?: string }`). Nunca expongas errores internos del servidor al cliente.