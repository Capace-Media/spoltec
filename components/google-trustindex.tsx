"use client";

import Script from "next/script";
import { useState } from "react";

const TRUSTINDEX_ID = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID;

export default function GoogleTrustIndex() {
  const [isVisible, setIsVisible] = useState(false);

  if (!TRUSTINDEX_ID) {
    return null;
  }

  return (
    <div
      ref={(node) => {
        if (!node) return;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { rootMargin: "200px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
      }}
      className="w-fit py-8"
    >
      {isVisible && (
        <>
          <div
            data-src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`}
            data-id={TRUSTINDEX_ID}
            className="trustindex-widget"
          />
          <Script
            id="trustindex-loader"
            src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`}
            strategy="lazyOnload"
          />
        </>
      )}
    </div>
  );
}
