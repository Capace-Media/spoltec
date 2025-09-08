import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/images/Spoltec-water01.png";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";

interface MainHeroProps {
  title?: string;
  subtitle?: string;
  text?: string;
}

const MainHero = ({ title, subtitle, text }: MainHeroProps) => {
  return (
    <section
      className="contain-outer"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="overflow-hidden mt-5 rounded-xl pt-[94px] md:pt-[120px] bg-brand-lightblue py-10 md:py-20">
        <div className="grid lg:grid-cols-[4fr_5fr] contain">
          <div className="relative flex items-center">
            <span
              className="w-[690px] h-[690px] rounded-full absolute -top-1/4 -left-1/2 bg-linear-to-b from-brand-lightblue to-brand-blue opacity-10"
              aria-hidden="true"
            />
            <div className="relative">
              <h1
                id="hero-heading"
                className="text-2xl md:text-3xl font-bold mb-0 pb-2 "
              >
                {title
                  ? title
                  : "Avloppsspolning, relining och rörinspektion i Skåne & Mälardalen | Spoltec"}
              </h1>
              {subtitle && (
                <p className="text-gray-700 text-xl leading-relaxed mb-0 pb-3">
                  <strong>
                    {subtitle
                      ? subtitle
                      : "Vi funktionssäkrar ert avloppssystem"}
                  </strong>
                </p>
              )}
              <p className=" text-gray-700 leading-relaxed mb-0 pb-3">
                {text
                  ? text
                  : "Spoltec erbjuder avloppsspolning, relining, rörinspektion och serviceavtal för både privatpersoner och företag. Med lokal närvaro i Skåne, Halland och Mälardalen hjälper vi er förebygga och lösa problem i avloppssystemet."}
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
          <figure className="hidden lg:block -mb-20  aspect-w-16 aspect-h-12">
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
