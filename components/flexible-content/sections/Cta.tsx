"use client";

import Image from "next/image";
import Link from "next/link";
import CTABGIMAGE from "../../../public/images/spoltec-cta-bg.jpg";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";
import { usePathname } from "next/navigation";
import { getBlurPlaceholder } from "@lib/utils/blur-placeholder";

const CallToAction = () => {
  const sectionId = "serviceavtal-cta";
  const pathname = usePathname();

  if (
    pathname === "/serviceavtal" ||
    pathname === "/karriar" ||
    pathname === "/kontakta-oss"
  ) {
    return null;
  }

  return (
    <section
      className="px-4 lg:px-10 lg:mx-auto lg:max-w-360"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="relative h-[400px] lg:h-[480px] w-full rounded-xl overflow-hidden">
        <Image
          src={CTABGIMAGE}
          width={CTABGIMAGE.width}
          height={CTABGIMAGE.height}
          className="absolute h-full object-cover w-full top-0 left-0"
          alt="En man som drar en slang - Spoltec serviceavtal"
          role="img"
          sizes="(max-width: 1200px) 98vw, 1300px"
        />
        <span className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        <div className="text-white absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center text-center px-2 md:px-22 lg:px-64 xl:px-96">
          <h2 className="text-white">Undvik obehagliga överraskningar</h2>
          <p className="pb-4 text-white text-lg">
            <strong>Teckna ett serviceavtal idag</strong>
          </p>

          <p>
            Ett serviceavtal är till för dig som vill kunna planera dina
            avloppskostnader. Avtalet är helt anpassat efter förutsättningarna i
            ditt avloppssystem och baseras på en fast månadskostnad under
            avtalstiden.
          </p>

          <div role="navigation" aria-label="Serviceavtal åtgärder">
            <Link
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" })
              )}
              href="/serviceavtal"
              aria-label="Läs mer om serviceavtal - öppnas på samma sida"
            >
              Läs mer om serviceavtal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
