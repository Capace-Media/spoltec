import parse from "html-react-parser";
import Image from "next/image";

import ServiceContactForm from "../service-contact-form";
import { Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
interface ServiceHeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
}

const ServiceHero = ({
  image,
  title,
  subtitle,
  text,
  usp,
}: ServiceHeroProps) => {
  console.log(usp);
  return (
    <>
      <section className="relative pt-40 contain-outer" role="banner">
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
            />
          )}

          <div className="flex flex-col gap-10 lg:flex-row contain lg:gap-20">
            <div className="max-w-lg text-white">
              <div className="pb-3">
                <h1 className="text-white">{title}</h1>
                {subtitle && <strong className="block">{subtitle}</strong>}
              </div>
              {text && <p>{parse(text)}</p>}
              {usp && usp.length > 0 && (
                <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                  {usp?.map((item) => (
                    <li key={item.text} className="flex items-center gap-2">
                      <Star className="size-4" /> {item.text}
                    </li>
                  ))}
                </ul>
              )}
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
            </div>
            <ServiceContactForm subject={title} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHero;
