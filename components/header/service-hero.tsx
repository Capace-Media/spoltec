import Image from "next/image";

import ServiceContactForm from "../service-contact-form";
import { Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import ServiceForm from "@components/service-form";
interface ServiceHeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
  width?: number;
  height?: number;
}

export default function ServiceHero(props: ServiceHeroProps) {
  return (
    <section className="lg:px-10 lg:mx-auto lg:max-w-360" role="banner">
      <div className="lg:relative lg:h-[600px] lg:rounded-xl lg:overflow-hidden ">
        {props.image && (
          <Image
            src={props.image}
            width={props.width}
            height={props.height}
            className="h-[200px] lg:absolute lg:h-full object-cover w-full px-4 lg:px-0"
            alt={props.title || "Service hero image"}
            priority
            fetchPriority="high"
            quality={50}
            sizes="(max-width: 1200px) 98vw, 1300px"
          />
        )}

        <span className="lg:absolute lg:z-10 lg:bg-black/50 lg:w-full lg:h-full lg:top-0 lg:left-0" />

        <div className="p-4 lg:p-16 lg:grid lg:grid-cols-2  lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full lg:z-20">
          <div className="lg:text-white">
            <h1 className="lg:text-white">{props.title}</h1>
            {props.subtitle && (
              <p>
                <strong className="">{props.subtitle}</strong>
              </p>
            )}

            {props.text && <p>{props.text}</p>}
            {props.usp && props.usp.length > 0 && (
              <ul className="text-sm pb-2 lg:grid lg:grid-cols-2 lg:space-y-3 lg:pt-4">
                {props.usp?.map((item) => (
                  <li key={item.text} className="flex items-center gap-2 pb-1">
                    <Star className="size-4" /> {item.text}
                  </li>
                ))}
              </ul>
            )}
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
          </div>
          <div className="w-full flex justify-end">
            {/* <ServiceContactForm subject={props.title} /> */}
            <ServiceForm subject={props.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
