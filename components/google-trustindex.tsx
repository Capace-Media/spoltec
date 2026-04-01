"use client";

import { useEffect, useRef } from "react";

const TRUSTINDEX_ID = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID;

export default function GoogleTrustIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !TRUSTINDEX_ID || loadedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadedRef.current = true;
          observer.disconnect();

          const script = document.createElement("script");
          script.src = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`;
          script.async = true;
          node.appendChild(script);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!TRUSTINDEX_ID) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-fit py-2">
      <div
        data-src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`}
        data-id={TRUSTINDEX_ID}
        className="trustindex-widget"
      />
    </div>
  );
}
