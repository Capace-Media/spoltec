"use client";

import Script from "next/script";

const TRUSTINDEX_ID = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID;

export default function GoogleTrustIndex() {
    if (!TRUSTINDEX_ID) {
        return null;
    }
    return (
        <div className="w-fit py-8">
            <div
                data-src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`}
                data-id={TRUSTINDEX_ID}
                className="trustindex-widget"
            />
            <Script
                id="trustindex-loader"
                src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_ID}`}
                strategy="afterInteractive"
            />
        </div>
    );
}