"use client";
import services from "@data/static-services.json";
import type { TjansterBlock } from "@lib/types/page";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

// Extract to a shared utility file (lib/utils/text.ts)
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

interface ServicesProps {
  data: TjansterBlock;
}

interface StaticService {
  title: string;
  slug: string;
  uri: string;
  gqlHeroFields: {
    underrubrik: string | null;
    introduktionstext: string;
    bild: {
      mediaItemUrl: string;
    };
  };
  introduktionstext?: string;
  underrubrik?: string;
  bild?: {
    mediaItemUrl: string;
  };
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  // Move city list to a constant outside component or to a data file
  const CITY_NAMES = useMemo(
    () => [
      "Borås",
      "Göteborg",
      "Halmstad",
      "Helsingborg",
      "Jönköping",
      "Kalmar",
      "Karlskrona",
      "Kristianstad",
      "Malmö",
      "Varberg",
      "Växjö",
    ],
    []
  );

  // Memoize filtered services to prevent unnecessary recalculations
  const filteredServices = useMemo(() => {
    return (services as StaticService[]).filter(
      (service) => !CITY_NAMES.some((city) => service.title?.includes(city))
    );
  }, [CITY_NAMES]);

  const getServiceUri = (service: StaticService, index: number): string => {
    return (
      service?.uri?.replace("/services/", "") ||
      service?.slug ||
      `service-${index}`
    );
  };

  const getImageUrl = (service: StaticService): string => {
    return (
      service?.gqlHeroFields?.bild?.mediaItemUrl ||
      service?.bild?.mediaItemUrl ||
      "https://via.placeholder.com/2560x1707/2C4696/2C4696"
    );
  };

  const getIntroText = (service: StaticService): string => {
    return (
      service?.introduktionstext ||
      service?.gqlHeroFields?.introduktionstext ||
      service?.underrubrik ||
      service?.gqlHeroFields?.underrubrik ||
      ""
    );
  };

  return (
    <section
      className="contain-outer section"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[700px] mx-auto">
        {data?.rubrik && (
          <h2 id="services-heading" className="text-center">
            {data.rubrik}
          </h2>
        )}
        {data?.serviceText && <p className="text-center">{data.serviceText}</p>}
      </div>

      <div
        className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2"
        role="list"
        aria-label="Lista över tjänster"
      >
        {filteredServices.map((service, index) => {
          const serviceUri = getServiceUri(service, index);
          const imageUrl = getImageUrl(service);
          const introText = getIntroText(service);

          return (
            <Link
              className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full text-white p-7 bg-brand-blue text-left rounded-xl transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
              key={service.slug || `service-${index}`}
              href={`/tjanster/${serviceUri}`}
              itemScope
              itemType="https://schema.org/Service"
              aria-label={`Läs mer om ${service?.title}`}
              role="listitem"
            >
              <Image
                src={imageUrl}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                alt={
                  service?.title ? `Bild för ${service.title}` : "Servicebild"
                }
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              <div>
                <h3 className="text-xl text-white md:text-2xl" itemProp="name">
                  {service?.title || "Service Title"}
                </h3>
                {introText && (
                  <p className="mt-3 text-sm" itemProp="description">
                    {truncateText(introText, 140)}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <span className="text-sm">
                  Läs mer
                  <span className="sr-only"> om {service?.title}</span>
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
              </div>
              <span itemProp="url" className="sr-only">{`${
                process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se"
              }/tjanster/${service.slug}`}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
