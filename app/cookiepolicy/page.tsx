import type { Metadata } from "next";
import CookiebotDeclaration from "./declaration";

export const metadata: Metadata = {
  title: "Cookiepolicy | Spoltec",
  description:
    "Information om vilka cookies Spoltec använder på spoltec.se och hur du hanterar ditt samtycke.",
  alternates: {
    canonical: "/cookiepolicy",
  },
};

export default function Page() {
  return (
    <main className="max-w-300 mx-auto px-2">
      <h1>Cookiepolicy</h1>
      <CookiebotDeclaration />
    </main>
  );
}
