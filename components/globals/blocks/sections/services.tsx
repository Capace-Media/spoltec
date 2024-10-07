// app/components/Services.tsx

"use client";

import articlesData from "@data/static-articles.json";
import categoriesData from "@data/static-categories.json";
import servicesDataRaw from "@data/static-services.json";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FC, useMemo } from "react";

// Define TypeScript interfaces for better type safety
interface Service {
  slug?: string;
  uri?: string;
  title: string; // Made required
  gqlHeroFields?: {
    bild?: {
      mediaItemUrl?: string;
    };
    introduktionstext?: string;
    underrubrik?: string | null;
  };
  bild?: {
    mediaItemUrl?: string;
  };
  introduktionstext?: string;
  underrubrik?: string | null;
}

interface Article {
  slug: string;
  gqlArtikel?: {
    artiklar?: ArticleDetail[];
  };
}

interface ArticleDetail {
  slug?: string;
  // Add other properties as needed, allowing nulls if applicable
}

interface Category {
  name?: string | null;
  // Add other properties as needed
}

interface ServicesProps {
  content: {
    rubrik?: string;
    servicesText?: string;
  };
}

// Utility function to limit string length
const limit = (str: string, max: number): string => {
  return str.length > max ? `${str.substring(0, max)}...` : str;
};

// Type guard to check if an item is of type Service
const isService = (item: any): item is Service => {
  return (item as Service).title !== undefined;
};

// Type guard to check if an item is of type Category
const isCategory = (item: any): item is Category => {
  return (item as Category).name !== undefined;
};

// Type guard to check if an item is of type ArticleDetail
const isArticleDetail = (item: any): item is ArticleDetail => {
  return (item as ArticleDetail).slug !== undefined;
};

// ServiceCard Component
interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, index }) => {
  const serviceUri =
    service.uri?.replace("/services/", "") ||
    service.slug ||
    `service-${index}`;

  const imageUrl =
    service.gqlHeroFields?.bild?.mediaItemUrl ||
    service.bild?.mediaItemUrl ||
    "https://via.placeholder.com/2560x1707/2C4696/2C4696";

  const introText =
    service.introduktionstext ||
    service.gqlHeroFields?.introduktionstext ||
    service.underrubrik ||
    "";

  return (
    <Link
      className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full text-white p-7 bg-brand-blue text-left rounded-xl"
      key={`${service.slug || index}`}
      href={`/tjanster/${serviceUri}`}
    >
      <Image
        src={imageUrl}
        fill
        style={{ objectFit: "cover" }}
        className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
        alt={service.title || "Service Image"}
      />
      <div>
        <h3 className="text-xl text-white md:text-2xl">
          {service.title || "Service Title"}
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
};

// CategoryCard Component (Assuming you want to render categories)
interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <div
      key={`${category.name || index}`}
      className="mb-3 p-7 bg-gray-200 rounded-xl"
    >
      <h3 className="text-xl">{category.name || "Category Name"}</h3>
      {/* Add more category details as needed */}
    </div>
  );
};

// ArticleCard Component (Assuming you want to render articles)
interface ArticleCardProps {
  article: ArticleDetail;
  index: number;
}

const ArticleCard: FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <div
      key={`${article.slug || index}`}
      className="mb-3 p-7 bg-white rounded-xl shadow"
    >
      <h3 className="text-xl">{article.slug || "Article Title"}</h3>
      {/* Add more article details as needed */}
    </div>
  );
};

const Services: FC<ServicesProps> = ({ content }) => {
  const params = useParams();

  console.log("data =====>", content);
  // Using optional chaining to handle potential null or undefined params
  const slug = typeof params?.slug === "string" ? params.slug : undefined;

  // Convert cityArray to Set for faster lookup
  const citySet = useMemo(
    () =>
      new Set([
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
      ]),
    []
  );

  // Explicitly type servicesData as Service[]
  const servicesDataTyped: Service[] = servicesDataRaw as Service[];

  // Memoize matchArray to avoid recalculating on every render
  const matchArray = useMemo(() => {
    return servicesDataTyped.filter((service: Service) =>
      Array.from(citySet).some((city) => service.title.includes(city))
    );
  }, [citySet, servicesDataTyped]);

  // Memoize the result array based on slug
  const res = useMemo(() => {
    if (!slug) {
      return servicesDataTyped.filter(
        (service: Service) => !matchArray.includes(service)
      );
    }

    if (slug.includes("tjanster")) {
      return matchArray.filter((service: Service) =>
        slug.includes(service.slug || "")
      );
    }

    if (slug === "kunskapsbank") {
      return categoriesData;
    }

    const filteredArticles: Article[] = articlesData.filter(
      (article: Article) => article.slug === slug
    );

    if (
      filteredArticles.length > 0 &&
      filteredArticles[0].slug === slug &&
      filteredArticles[0].gqlArtikel?.artiklar
    ) {
      return filteredArticles[0].gqlArtikel.artiklar;
    }

    return [];
  }, [slug, servicesDataTyped, matchArray, categoriesData, articlesData]);

  return (
    <div className="text-center section contain">
      <div className="max-w-[700px] mx-auto">
        <h2>{content?.rubrik || ""}</h2>
        <p>{content?.servicesText || ""}</p>
      </div>
      <div className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2">
        {res.map((item, index) => {
          if (isService(item)) {
            return (
              <ServiceCard
                key={item.slug || index}
                service={item}
                index={index}
              />
            );
          }

          if (isCategory(item)) {
            return (
              <CategoryCard
                key={item.name || index}
                category={item}
                index={index}
              />
            );
          }

          if (isArticleDetail(item)) {
            return (
              <ArticleCard
                key={item.slug || index}
                article={item}
                index={index}
              />
            );
          }

          // Optionally handle unknown types
          console.warn("Unknown item type:", item);
          return null;
        })}
      </div>
    </div>
  );
};

export default Services;
