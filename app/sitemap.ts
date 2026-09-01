import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import { TAGS } from "@lib/wp/tags";
import { SITE_URL } from "@lib/utils/url";
import type { MetadataRoute } from "next";

/**
 * Root sitemap: static routes + CMS pages under `/`.
 *
 * Services live in /tjanster/sitemap.xml and posts in
 * /kunskapsbank/sitemap.xml — no URL appears in more than one sitemap.
 */

type PageNode = { slug: string; modifiedGmt: string | null };

type PagesResponse = {
  pages: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: PageNode[];
  };
};

const GET_ALL_PAGES = `
  query GET_ALL_PAGES($after: String) {
    pages(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`;

async function fetchAllPages(): Promise<PageNode[]> {
  const nodes: PageNode[] = [];
  let after: string | null = null;

  // Paginate so coverage isn't silently capped at the first 100 pages.
  for (let i = 0; i < 20; i++) {
    const response: PagesResponse = await fetchGraphQL<PagesResponse>(
      GET_ALL_PAGES,
      { after },
      [TAGS.page, TAGS.sitemap]
    );

    nodes.push(...(response?.pages?.nodes ?? []));

    if (!response?.pages?.pageInfo?.hasNextPage) break;
    after = response.pages.pageInfo.endCursor;
    if (!after) break;
  }

  return nodes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/tjanster`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/akut-hjalp`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE_URL}/kontakta-oss`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${SITE_URL}/om-spoltec`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/kunskapsbank`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/cookiepolicy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  try {
    const pages = await fetchAllPages();

    // Slugs owned by a hand-written route above, or by another sitemap.
    const excluded = new Set([
      "hem",
      "akut-hjalp",
      "kontakta-oss",
      "kunskapsbank",
      "tjanster",
      "faq",
      "om-spoltec",
      "cookiepolicy",
      "undefined",
    ]);

    const seen = new Set(staticPages.map((entry) => entry.url));

    const dynamicPages: MetadataRoute.Sitemap = [];

    for (const page of pages) {
      if (!page?.slug || excluded.has(page.slug)) continue;

      const url = `${SITE_URL}/${page.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);

      const isLocationPage =
        /-(boras|goteborg|malmo|helsingborg|kalmar|karlskrona|kristianstad|halmstad|varberg|vaxjo|jonkoping|stockholm|skane)$/.test(
          page.slug
        );
      const isCommercialPage =
        page.slug.includes("avloppsspolning") ||
        page.slug.includes("relining") ||
        page.slug.includes("oljeavskiljare") ||
        page.slug.includes("rorinspektion") ||
        page.slug.includes("stamspolning");

      let priority = 0.8;
      if (isCommercialPage) priority = 0.9;
      else if (isLocationPage) priority = 0.85;

      dynamicPages.push({
        url,
        lastModified: page.modifiedGmt
          ? new Date(`${page.modifiedGmt}Z`)
          : undefined,
        changeFrequency: "weekly",
        priority,
      });
    }

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Still emit the known static routes rather than collapsing to one URL.
    return staticPages;
  }
}
