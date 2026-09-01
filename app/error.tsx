"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="contain section">
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1>Något gick fel</h1>
        <p className="text-lg pb-6">
          Sidan kunde inte visas just nu. Försök igen, eller kontakta oss om
          problemet kvarstår.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Försök igen
          </button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Till startsidan
          </Link>
          <a
            href="tel:040474012"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Ring 040-47 40 12
          </a>
        </div>
      </div>
    </main>
  );
}
