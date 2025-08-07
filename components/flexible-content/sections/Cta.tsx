import Image from "next/image";
import Link from "next/link";
import CTABGIMAGE from "../../../public/images/spoltec-cta-bg.jpg";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";

interface CallToActionProps {}

const CallToAction = ({}: CallToActionProps) => {
  return (
    <div className="relative mt-10 rounded-xl contain-outer md:mt-20">
      <div className="overflow-hidden bg-black bg-section">
        <Image
          src={CTABGIMAGE}
          fill
          style={{
            objectFit: "cover",
            opacity: "0.4",
            objectPosition: "top",
          }}
          alt={`A man pulling a hose`}
        />
        <div className="contain">
          <div className="text-center flex flex-col justify-center h-[500px] text-white h96 contain max-w-[700px]">
            <div>
              <h2 className="text-white">Undvik obehagliga överraskningar</h2>
              <h3 className="mb-4 text-white">Teckna ett serviceavtal idag</h3>
              <p>
                Ett serviceavtal är till för dig som vill kunna planera dina
                avloppskostnader. Avtalet är helt anpassat efter
                förutsättningarna i ditt avloppssystem och baseras på en fast
                månadskostnad under avtalstiden.
              </p>
              <Link
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" })
                )}
                href="/serviceavtal"
              >
                Läs mer om serviceavtal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
