import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata, ResolvingMetadata } from "next";
import { Page } from "@lib/types/page";
import { Service } from "@lib/types/service";
import { Post } from "@lib/types/post";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generatePageMetadata(
  page: Page | Service | Post | null,
  parent?: ResolvingMetadata,
  fallbackTitle = "Spoltec funktionssäkrar ert avloppssystem",
  fallbackDescription = "Professionell hjälp med avloppsproblem i hela Sverige. Spoltec utför spolning, reparationer och underhåll av avloppssystem för hem och företag."
): Promise<Metadata> {
  // If no page or SEO data, return basic metadata

  if (!page?.seo) {
    return {
      title: page?.title || fallbackTitle,
      description: fallbackDescription,
    };
  }

  // Access and extend parent metadata if provided
  const previousImages = parent ? (await parent).openGraph?.images || [] : [];

  return {
    title: page.seo.title || page.title || fallbackTitle,
    description: page.seo.metaDesc || fallbackDescription,
    openGraph: {
      title: page.seo.opengraphTitle || page.seo.title || page.title,
      description:
        page.seo.opengraphDescription || page.seo.metaDesc || undefined,
      siteName: page.seo.opengraphSiteName || undefined,
      images: page.seo.opengraphImage?.sourceUrl
        ? [page.seo.opengraphImage.sourceUrl, ...previousImages]
        : [...previousImages],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        page.seo.twitterTitle ||
        page.seo.opengraphTitle ||
        page.seo.title ||
        page.title,
      description:
        page.seo.twitterDescription ||
        page.seo.opengraphDescription ||
        page.seo.metaDesc ||
        undefined,
      images: page.seo.twitterImage?.sourceUrl
        ? [page.seo.twitterImage.sourceUrl]
        : undefined,
    },
    robots: {
      index: page.seo.metaRobotsNoindex !== "noindex",
      follow: page.seo.metaRobotsNofollow !== "nofollow",
    },
    ...(page.seo.canonical && {
      alternates: { canonical: page.seo.canonical },
    }),
  };
}

export const isBlacklistedPageSlug = (
  slug: string,
  blacklist: string[] = []
) => {
  if (blacklist.length > 0) {
    return blacklist.includes(slug);
  }

  return false;
};
