import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/images/Spoltec-water01.png";
import { buttonVariants } from "components/ui/button";
import { cn } from "@lib/utils";
import { Star } from "lucide-react";
import GoogleTrustIndex from "components/google-trustindex";


interface MainHeroProps {
  title?: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
}

const MainHero = (props: MainHeroProps) => {
  return (
    <>


      <section
        className="md:px-10 md:mx-auto md:max-w-360 md:bg-brand-lightblue md:rounded-xl md:overflow-hidden"
        aria-labelledby="hero-heading"
        role="banner"
      >
        <div className="md:relative md:w-full md:h-[600px]">
          <span
            className="md:w-[690px] md:h-[690px] md:rounded-full md:absolute md:top-0 md:-left-[15%] md:z-10 md:bg-linear-to-b md:from-brand-lightblue md:to-brand-blue md:opacity-10"
            aria-hidden="true"
          />
          <div className="md:grid md:grid-cols-2 md:gap-10 md:absolute md:top-0 md:left-0 md:w-full md:h-full md:z-20 md:py-20">
            <Image
              src={heroImage}
              width={heroImage?.width}
              height={heroImage?.height}
              className="overflow-hidden md:order-2 object-contain md:h-[480px]"
              priority
              fetchPriority="high"
              quality={75}
              alt="Spoltec avloppstjänster - professionell vattenbehandling och spolning av avloppssystem"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 600px"
            />
            <div className="px-4">
              <h1 id="hero-heading">
                {props.title
                  ? props.title
                  : "Avloppsspolning, relining och rörinspektion i Skåne & Mälardalen | Spoltec"}
              </h1>

              {props.subtitle && (
                <p>
                  <strong>
                    {props.subtitle
                      ? props.subtitle
                      : "Vi funktionssäkrar ert avloppssystem"}
                  </strong>
                </p>
              )}

              <p>
                {props.text
                  ? props.text
                  : "Spoltec erbjuder avloppsspolning, relining, rörinspektion och serviceavtal för både privatpersoner och företag. Med lokal närvaro i Skåne, Halland och Mälardalen hjälper vi er förebygga och lösa problem i avloppssystemet."}
              </p>


              {props.usp && props.usp.length > 0 && (
                <ul className="text-sm pb-2 lg:grid lg:grid-cols-2 lg:space-y-3 lg:pt-4">
                  {props.usp?.map((item) => (
                    <li key={item.text} className="flex items-center gap-2 pb-1">
                      <Star className="size-4" /> {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col lg:flex-row gap-2 pt-4">
                <Link
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" })
                  )}
                  href="/kontakta-oss"
                  aria-label="Kontakta Spoltec för hjälp med ert avloppssystem"
                >
                  Kontakta oss
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                  href="/akut-hjalp"
                  aria-label="Akut hjälp för ert avloppssystem"
                >
                  Kontakta Jouren
                </Link>
              </div>
              <GoogleTrustIndex />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainHero;
