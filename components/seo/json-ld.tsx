/**
 * Server component that injects a valid JSON-LD script tag into the HTML.
 *
 * Usage (server components only — no "use client"):
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 *
 * Security: the JSON is serialized with JSON.stringify and HTML special characters
 * (<, >, &, ') are escaped to prevent script injection if data ever includes
 * user-controlled content.
 */

interface JsonLdProps {
  /** A valid Schema.org JSON-LD object (or array of objects). */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Escapes HTML special characters inside a JSON string so the script tag
 * cannot be broken by values containing </script> or similar sequences.
 */
function escapeJsonForHtml(json: string): string {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

/**
 * Renders a `<script type="application/ld+json">` tag server-side.
 * Must be used only in server components (no "use client").
 */
export default function JsonLd({ data }: JsonLdProps) {
  const json = escapeJsonForHtml(JSON.stringify(data));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
