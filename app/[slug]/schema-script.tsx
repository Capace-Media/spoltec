export default function SchemaScript({ raw }: { raw?: string }) {
  if (!raw) return null;

  // Try 2 passes in case it's double-encoded: "\"{...}\""
  let v: unknown = raw;
  console.log("hello v string", v);
  for (let i = 0; i < 2; i++) {
    if (typeof v === "string") {
      try {
        v = JSON.parse(v);
      } catch {
        break;
      }
    }
  }

  if (!v || typeof v !== "object") return null; // still not an object -> bail

  return (
    <script
      id="dynamic-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(v).replace(/</g, "\\u003c"),
      }}
    />
  );
}
