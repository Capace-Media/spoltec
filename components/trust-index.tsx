"use client";

export default function TrustIndex() {
  const widgetHtml = `<div>…your Trustindex embed snippet…</div>`;

  return <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />;
}
