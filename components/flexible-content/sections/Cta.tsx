import Image from "next/image";
import Link from "next/link";
import CTABGIMAGE from "../../../public/images/spoltec-cta-bg.jpg";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";

const CallToAction = () => {
  const sectionId = "serviceavtal-cta";

  return (
    <section
      className="relative mt-10 rounded-xl contain-outer md:mt-20"
      aria-labelledby={`${sectionId}-heading`}
      role="region"
    >
      <div className="overflow-hidden bg-black bg-section">
        <Image
          src={CTABGIMAGE}
          fill
          style={{
            objectFit: "cover",
            opacity: "0.4",
            objectPosition: "top",
          }}
          alt="En man som drar en slang - Spoltec serviceavtal"
          role="img"
        />
        <div className="contain">
          <div className="text-center flex flex-col justify-center h-[500px] text-white h96 contain max-w-[700px]">
            <header>
              <h2 id={`${sectionId}-heading`} className="text-white">
                Undvik obehagliga överraskningar
              </h2>
              <p className="pb-4 text-white text-xl">
                <strong>Teckna ett serviceavtal idag</strong>
              </p>
            </header>

            <div>
              <p className="pb-6">
                Ett serviceavtal är till för dig som vill kunna planera dina
                avloppskostnader. Avtalet är helt anpassat efter
                förutsättningarna i ditt avloppssystem och baseras på en fast
                månadskostnad under avtalstiden.
              </p>
            </div>

            <div role="navigation" aria-label="Serviceavtal åtgärder">
              <Link
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" })
                )}
                href="/serviceavtal"
                aria-label="Läs mer om serviceavtal - öppnas på samma sida"
              >
                Läs mer om serviceavtal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
