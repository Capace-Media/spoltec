import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/images/Spoltec-water01.png";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";

interface MainHeroProps {}

const MainHero = ({}: MainHeroProps) => {
  return (
    <section
      className="contain-outer"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="overflow-hidden mt-5 rounded-xl pt-[150px] bg-brand-lightblue py-10 md:py-20">
        <div className="grid lg:grid-cols-[4fr_5fr] gap-20 contain">
          <div className="relative flex items-center">
            <span
              className="w-[690px] h-[690px] rounded-full absolute -top-1/4 -left-1/2 bg-linear-to-b from-brand-lightblue to-brand-blue opacity-10"
              aria-hidden="true"
            />
            <div className="relative space-y-5">
              <h1 id="hero-heading">Vi funktionssäkrar ert avloppssystem</h1>
              <p className=" text-gray-700 leading-relaxed">
                Spoltec har lång erfarenhet och stor kunskap om underhåll och
                renovering av alla förekommande avloppssystem. Vi arbetar
                dessutom med miljövänliga metoder - utan bisfenol och epoxi.
              </p>
              <div className="pt-4">
                <Link
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" })
                  )}
                  href="/kontakta-oss"
                  aria-label="Kontakta Spoltec för hjälp med ert avloppssystem"
                >
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
          <figure className="hidden lg:block -mb-20 aspect-w-16 aspect-h-12">
            <Image
              src={heroImage}
              fill
              style={{
                objectFit: "contain",
              }}
              priority
              alt="Spoltec avloppstjänster - professionell vattenbehandling och spolning av avloppssystem"
              sizes="(min-width: 1460px) 747px, (min-width: 1220px) calc(42.73vw + 132px), (min-width: 780px) calc(90.71vw - 449px), (min-width: 440px) calc(100vw - 80px), calc(88.33vw - 31px)"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
