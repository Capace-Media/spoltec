// Services.tsx

import services from "@data/static-services.json";
import articles from "data/static-articles.json";
import categories from "data/static-categories.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface ServicesProps {
  data: any; // Keeping it as any since the structure is unknown
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  const router = useRouter();

  // Safely extract 'slug' as a string or undefined
  const slug =
    typeof router.query.slug === "string" ? router.query.slug : undefined;

  // Ensure 'articles' is treated as an array
  const filterArticles: any[] = slug
    ? articles.filter((article: any) => article.slug === slug)
    : [];

  // Safely access 'artiklar' or default to an empty array
  const relevantArticles: any[] = filterArticles[0]?.gqlArtikel?.artiklar || [];

  // Utility function to limit string length
  const limit = (str: string, max: number): string => {
    return str.length > max ? `${str.substring(0, max)}...` : str;
  };

  // List of cities to filter services
  const cityArray: string[] = [
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
  ];

  // Find services that match any city in the cityArray
  const matchArray: any[] = services.filter((service: any) =>
    cityArray.some((city) => service.title?.includes(city))
  );

  let res: any[] = [];

  // Determine what to display based on the slug
  if (!slug) {
    res = services.filter((service: any) => !matchArray.includes(service));
  } else if (slug.includes("tjanster")) {
    res = matchArray.filter((match: any) => slug.includes(match.slug));
  } else if (slug === "kunskapsbank") {
    res = categories;
  } else if (filterArticles.length > 0 && filterArticles[0].slug === slug) {
    res = relevantArticles;
  }

  return (
    <div className="text-center section contain">
      <div className="max-w-[700px] mx-auto">
        <h2>{data?.rubrik || "Rubrik"}</h2> {/* Added default text */}
        <p>{data?.servicesText || "Services text"}</p>{" "}
        {/* Added default text */}
      </div>
      <div className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2">
        {res.map((service, index) => {
          // Safely extract properties with fallback values
          const serviceUri =
            service?.uri?.replace("/services/", "") ||
            service?.slug ||
            `service-${index}`;

          const imageUrl =
            service?.gqlHeroFields?.bild?.mediaItemUrl ||
            service?.bild?.mediaItemUrl ||
            "https://via.placeholder.com/2560x1707/2C4696/2C4696";

          const introText =
            service?.introduktionstext ||
            service?.gqlHeroFields?.introduktionstext ||
            service?.underrubrik ||
            service?.gqlHeroFields?.underrubrik ||
            "";

          return (
            <Link
              className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full text-white p-7 bg-brand-blue text-left rounded-xl"
              key={`${service.slug || index}`} // Ensure unique key
              href={`/tjanster/${serviceUri}`}
            >
              <Image
                src={imageUrl}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                alt={service?.title || "Service Image"}
              />
              <div>
                <h3 className="text-xl text-white md:text-2xl">
                  {service?.title || "Service Title"}
                </h3>
                <p className="mt-3 text-sm">{limit(introText, 140)}</p>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <p>Läs mer</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
