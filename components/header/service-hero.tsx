import Image from "next/image";

import ServiceContactForm from "../service-contact-form";
import { Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import handleParse from "@lib/utils/parse";
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
  return (
    <>
      <section className="relative pt-40 contain-outer" role="banner">
        <div className="relative overflow-hidden bg-black bg-section rounded-xl">
          {image && (
            <Image
              src={image}
              fill
              style={{
                objectFit: "cover",
                opacity: "0.4",
              }}
              alt={title || "Service hero image"}
              priority
              fetchPriority="high"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          )}

          <div className="flex flex-col gap-10 lg:flex-row contain lg:gap-20">
            <div className="max-w-lg text-white">
              <div className="">
                <h1 className="text-white">{title}</h1>
                {subtitle && (
                  <p>
                    <strong className="block">{subtitle}</strong>
                  </p>
                )}
              </div>
              {text && (
                <p className="text-[.885rem] leading-[1.4rem]">
                  {handleParse(text)}
                </p>
              )}
              {usp && usp.length > 0 && (
                <ul className="md:pt-6 pt-4 grid sm:grid-cols-2 gap-3 text-sm">
                  {usp?.map((item) => (
                    <li key={item.text} className="flex items-center gap-2">
                      <Star className="size-4" /> {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <div className="md:pt-6 pt-4 flex flex-wrap gap-3">
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
            </div>
            <ServiceContactForm subject={title} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHero;
