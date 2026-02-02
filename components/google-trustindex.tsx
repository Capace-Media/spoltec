"use client";

import Script from "next/script";

const TRUSTINDEX_WIDGET_ID = "1ed2b2c63a3e795649860e7dc8c";

export default function GoogleTrustIndex() {
    return (
        <div className="contain py-8">
            <div
                data-src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`}
                data-id={TRUSTINDEX_WIDGET_ID}
                className="trustindex-widget"
            />
            <Script
                id="trustindex-loader"
                src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`}
                strategy="afterInteractive"
            />
        </div>
    );
}