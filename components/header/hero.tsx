import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
import { Star } from "lucide-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import ServiceContactForm from "@components/service-contact-form";

interface HeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
  isCommercialPage?: boolean;
  slug?: string;
}

const Hero = ({
  image,
  title,
  subtitle,
  text,
  usp,
  isCommercialPage,
  slug,
}: HeroProps) => {
  return (
    <>
      <section
        className="relative pt-[138px] contain-outer"
        aria-labelledby="hero-heading"
        role="banner"
      >
        <div className="overflow-hidden bg-black bg-section rounded-xl">
          {image && (
            <Image
              src={image}
              fill
              style={{
                objectFit: "cover",
                opacity: "0.4",
              }}
              alt={title}
              priority
              // 🚀 2025 LCP optimizations
              fetchPriority="high"
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          )}

          <div className="flex flex-col gap-10 lg:flex-row contain lg:gap-20">
            <div className="max-w-lg text-white">
              <div className="pb-3">
                <h1 className="text-white">{title}</h1>
                {subtitle && (
                  <p>
                    <strong className="block">{subtitle}</strong>
                  </p>
                )}
              </div>
              {text && (
                <p className="text-[.885rem] leading-[1.4rem]">{parse(text)}</p>
              )}
              {usp && usp.length > 0 && (
                <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                  {usp?.map((item) => (
                    <li key={item.text} className="flex items-center gap-2">
                      <Star className="size-4" /> {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className=" md:pt-6 flex flex-wrap gap-3">
                {!isCommercialPage ? (
                  <Link
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" })
                    )}
                    href="/kontakta-oss"
                    aria-label="Kontakta oss för mer information"
                  >
                    Kontakta oss
                  </Link>
                ) : (
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/kontakta-oss"
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" })
                      )}
                    >
                      Begär kostnadsfri offert
                    </Link>
                    <a
                      href={`tel:040474012`}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "lg" })
                      )}
                    >
                      Ring 040-47 40 12
                    </a>
                  </div>
                )}
              </div>
            </div>
            {isCommercialPage && (
              <ServiceContactForm subject={title} slug={slug} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
