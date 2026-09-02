import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata, ResolvingMetadata } from "next";
import type { Page } from "@lib/types/page";
import type { Service } from "@lib/types/service";
import type { Post } from "@lib/types/post";
import type { Position } from "@lib/types/employment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generatePageMetadata(
  page: Page | Service | Post | Position | null,
  parent?: ResolvingMetadata,
  canonical?: string,
  fallbackTitle = "Spoltec funktionssäkrar ert avloppssystem",
  fallbackDescription = "Professionell hjälp med avloppsproblem i hela Sverige. Spoltec utför spolning, reparationer och underhåll av avloppssystem för hem och företag."
): Promise<Metadata> {
  const toAbs = (u?: string) =>
    u
      ? u.startsWith("http")
        ? u
        : new URL(u, "https://media.spoltec.se").toString()
      : undefined;

  // Yoast returns the literal strings "index"/"noindex" and "follow"/"nofollow".
  const resolveRobots = (
    noindex: string | null | undefined,
    nofollow: string | null | undefined
  ) => ({
    index: noindex !== "noindex",
    follow: nofollow !== "nofollow",
  });

  const alternates = canonical || page?.seo?.canonical
    ? { alternates: { canonical: canonical ?? page?.seo?.canonical } }
    : {};

  // No SEO data from the CMS: still emit the canonical the route knows about.
  if (!page?.seo) {
    return {
      title: page?.title || fallbackTitle,
      description: fallbackDescription,
      ...alternates,
    };
  }

  // Access and extend parent metadata if provided
  const previousImages = parent ? (await parent).openGraph?.images || [] : [];

  const ogImageUrl = toAbs(page.seo.opengraphImage?.sourceUrl);
  const ogImage = ogImageUrl
    ? {
        url: ogImageUrl,
        ...(page.seo.opengraphImage?.mediaDetails?.width && {
          width: page.seo.opengraphImage.mediaDetails.width,
        }),
        ...(page.seo.opengraphImage?.mediaDetails?.height && {
          height: page.seo.opengraphImage.mediaDetails.height,
        }),
        alt:
          page.seo.opengraphImage?.altText ||
          page.seo.opengraphTitle ||
          page.seo.title ||
          page.title ||
          fallbackTitle,
      }
    : undefined;

  const twitterImageUrl = toAbs(page.seo.twitterImage?.sourceUrl);
  const twitterImage = twitterImageUrl
    ? {
        url: twitterImageUrl,
        ...(page.seo.twitterImage?.mediaDetails?.width && {
          width: page.seo.twitterImage.mediaDetails.width,
        }),
        ...(page.seo.twitterImage?.mediaDetails?.height && {
          height: page.seo.twitterImage.mediaDetails.height,
        }),
        alt:
          page.seo.twitterImage?.altText ||
          page.seo.twitterTitle ||
          page.seo.title ||
          page.title ||
          fallbackTitle,
      }
    : undefined;

  return {
    title: page.seo.title || page.title || fallbackTitle,
    description: page.seo.metaDesc || fallbackDescription,
    openGraph: {
      title: page.seo.opengraphTitle || page.seo.title || page.title,
      description:
        page.seo.opengraphDescription || page.seo.metaDesc || undefined,
      siteName: page.seo.opengraphSiteName || "Spoltec",
      locale: "sv_SE",
      url: canonical ?? page.seo.canonical ?? undefined,
      images: ogImage ? [ogImage, ...previousImages] : [...previousImages],
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
      images: twitterImage ? [twitterImage] : undefined,
    },
    robots: resolveRobots(
      page.seo.metaRobotsNoindex,
      page.seo.metaRobotsNofollow
    ),
    ...alternates,
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
