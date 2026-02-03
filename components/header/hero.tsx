import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServiceContactForm from "@components/service-contact-form";
import ServiceForm from "@components/service-form";

interface HeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
  isCommercialPage?: boolean;
  slug?: string;
  width?: number;
  height?: number;
}

const Hero = (props: HeroProps) => {
  return (
    <section
      className="lg:px-10 lg:mx-auto lg:max-w-360"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div
        className={cn(
          `lg:relative lg:rounded-xl lg:overflow-hidden`,
          props.isCommercialPage ? "lg:h-[690px]" : "lg:h-[460px]"
        )}
      >
        {props.image && (
          <Image
            src={props.image}
            width={props.width}
            height={props.height}
            className="h-[200px] lg:absolute lg:h-full object-cover w-full px-4 lg:px-0"
            alt={props.title || "Hero image"}
            priority
            fetchPriority="high"
            sizes="(max-width: 1200px) 98vw, 1300px"
          />
        )}
        <span className="lg:absolute lg:z-10 lg:bg-black/50 lg:w-full lg:h-full lg:top-0 lg:left-0" />

        <div className="p-4 lg:p-16 lg:grid lg:grid-cols-2  lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full lg:z-20">
          <div className="lg:text-white">
            <h1 className="lg:text-white">{props.title}</h1>
            {props.subtitle && (
              <p className="lg:pb-2">
                <strong>{props.subtitle}</strong>
              </p>
            )}

            {props.text && <p className="lg:pb-2">{props.text}</p>}
            {props.usp && props.usp.length > 0 && (
              <ul className="text-sm pb-2 lg:grid lg:grid-cols-2 lg:space-y-3 lg:pt-4">
                {props.usp?.map((item) => (
                  <li key={item.text} className="flex items-center gap-2 pb-1">
                    <Star className="size-4" /> {item.text}
                  </li>
                ))}
              </ul>
            )}

            {!props.isCommercialPage ? (
              <Link
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full lg:w-fit"
                )}
                href="/kontakta-oss"
                aria-label="Kontakta oss för mer information"
              >
                Kontakta oss
              </Link>
            ) : (
              <div className="flex flex-col gap-2 pb-6 lg:flex-row lg:gap-2 lg:pt-4">
                <Link
                  href="/akut-hjalp"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                >
                  Kontakta Jouren
                </Link>
                <a
                  href={`tel:040474012`}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" })
                  )}
                >
                  Ring 040-47 40 12
                </a>
              </div>
            )}
          </div>
          {/* {props.isCommercialPage && (
            <ServiceContactForm subject={props.title} slug={props.slug} />
          )} */}
          {props.isCommercialPage && (
            <div className="w-full flex justify-end">
              <ServiceForm subject={props.title} slug={props.slug} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
