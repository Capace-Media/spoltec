import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPosts } from "@lib/data/post";
import Posts from "./posts";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/kunskapsbank");
  return generatePageMetadata(
    page,
    parent,
    "Kunskapsbank - Spoltec",
    "Kunskapsbank"
  );
}

// Generate JSON-LD structured data
function generateBlogStructuredData(initialPosts: any) {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE || "https://spoltec.se";

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Spoltec Kunskapsbank",
    description:
      "Expertkunskap om avlopp, spolning och underhåll från Spoltecs specialister",
    url: `${baseUrl}/kunskapsbank`,
    inLanguage: "sv-SE",
    publisher: {
      "@type": "Organization",
      name: "Spoltec",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/spoltec-logo-new.png`,
        width: 300,
        height: 100,
      },
    },
    blogPost:
      initialPosts?.edges?.map((edge: any) => {
        const post = edge.node;
        const postUrl = `${baseUrl}/kunskapsbank/${post.slug}`;

        return {
          "@type": "BlogPosting",
          headline: post.title,
          description:
            post.gqlHeroFields?.underrubrik ||
            post.gqlHeroFields?.introduktionstext ||
            post.title,
          url: postUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl,
          },
          author: {
            "@type": "Organization",
            name: "Spoltec",
          },
          publisher: {
            "@type": "Organization",
            name: "Spoltec",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/images/spoltec-logo-new.png`,
            },
          },
          image: {
            "@type": "ImageObject",
            url:
              post.gqlHeroFields?.bild?.mediaItemUrl ||
              `${baseUrl}/images/spoltec-cta-bg.jpg`,
            width: 1200,
            height: 630,
          },
          keywords: [
            "avlopp",
            "spolning",
            "rörinspektion",
            "relining",
            "underhåll",
            "Spoltec",
          ],
          inLanguage: "sv-SE",
          isPartOf: {
            "@type": "Blog",
            "@id": `${baseUrl}/kunskapsbank`,
          },
        };
      }) || [],
  };
}

export default async function KunskapsBank() {
  const page = await getPage("kunskapsbank");

  // Fetch initial posts for schema
  const initialPosts = await getPosts(undefined, 9);
  const structuredData = generateBlogStructuredData(initialPosts);

  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const posts = await getPosts(pageParam, 9);
      return posts;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => lastPage.pageInfo.endCursor,
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Proper JSON-LD using Next.js Script component */}
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />

        <section className="text-center section contain">
          <HydrationBoundary state={dehydratedState}>
            <Posts />
          </HydrationBoundary>
        </section>
      </div>
    </>
  );
}
