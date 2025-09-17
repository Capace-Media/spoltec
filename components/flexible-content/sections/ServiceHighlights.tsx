import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import type { TjansterHighlightsBlock } from "@lib/types/page";

interface ServiceHighlightsProps {
  data: TjansterHighlightsBlock;
}

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function ServiceHighlights({ data }: ServiceHighlightsProps) {
  if (!data || !data?.intro?.title || data?.services?.length === 0) return null;
  return (
    <section
      className="contain-outer section"
      aria-labelledby="service-highlights-heading"
    >
      <div className="max-w-[700px] mx-auto text-center">
        <h2 id="service-highlights-heading">{data.intro.title}</h2>
        {data.intro.text && <p className="text-center">{data.intro.text}</p>}
      </div>

      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8"
        aria-label="Populära tjänster"
      >
        {data.services.map((service, index) => {
          const serviceUri = service.slug;
          const imageUrl = service.gqlHeroFields.bild?.mediaItemUrl;
          const introText = service.gqlHeroFields.introduktionstext;

          return (
            <li key={service.slug || `service-${index}`}>
              <Link
                href={`/tjanster/${serviceUri}`}
                className="group relative h-64 lg:h-72 overflow-hidden rounded-xl bg-brand-blue text-white p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                itemScope
                itemType="https://schema.org/Service"
                aria-label={`Läs mer om ${service?.title}`}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                    alt={
                      service.gqlHeroFields.bild?.altText ||
                      service.title ||
                      "Service image"
                    }
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                )}
                {imageUrl && (
                  <span itemProp="image" className="sr-only">
                    {imageUrl}
                  </span>
                )}

                <div>
                  <h3 className="text-lg md:text-xl text-white" itemProp="name">
                    {service.title || "Tjänst"}
                  </h3>
                  {introText && (
                    <p className="mt-2 text-sm" itemProp="description">
                      {truncateText(introText, 110)}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm">
                    Läs mer
                    <span className="sr-only"> om {service.title}</span>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                  </svg>
                  <span itemProp="url" className="sr-only">{`${
                    process.env.NEXT_PUBLIC_MY_WEBSITE ||
                    "https://www.spoltec.se"
                  }/tjanster/${service.slug}`}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center">
        <Link
          href="/tjanster"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          Se alla tjänster
        </Link>
      </div>
    </section>
  );
}
