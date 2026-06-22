"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const container = document.getElementById("CookiebotDeclaration");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://consent.cookiebot.com/6e90d32a-24e5-4ede-b5a5-f3650b321fe2/cd.js";
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="max-w-300 mx-auto px-2">
      <h1>Cookiepolicy</h1>
      <div id="CookiebotDeclaration" />
    </div>
  );
}
