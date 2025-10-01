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
      className="relative mt-10 rounded-xl contain-outer md:mt-20"
      aria-labelledby={`${sectionId}-heading`}
      role="region"
    >
      <div className="relative overflow-hidden h-[500px] bg-black bg-section">
        <Image
          src={CTABGIMAGE}
          width={CTABGIMAGE.width}
          height={CTABGIMAGE.height}
          className=" h-full absolute object-cover opacity-40 top-0 left-0"
          alt="En man som drar en slang - Spoltec serviceavtal"
          role="img"
          quality={50}
          sizes="(max-width: 1200px) 90vw, 1300px"
          placeholder="blur"
          blurDataURL={getBlurPlaceholder("hero")}
        />

        <div className="text-center flex flex-col justify-center h-full  text-white px-4 md:px-44 lg:px-64 xl:px-92  ">
          <h2 id={`${sectionId}-heading`} className="text-white">
            Undvik obehagliga överraskningar
          </h2>
          <p className="pb-4 text-white text-xl">
            <strong>Teckna ett serviceavtal idag</strong>
          </p>

          <div>
            <p className="pb-6">
              Ett serviceavtal är till för dig som vill kunna planera dina
              avloppskostnader. Avtalet är helt anpassat efter förutsättningarna
              i ditt avloppssystem och baseras på en fast månadskostnad under
              avtalstiden.
            </p>
          </div>

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
