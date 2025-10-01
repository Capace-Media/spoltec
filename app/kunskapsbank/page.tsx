import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosts } from "@lib/data/post";
import Posts from "./posts";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import { getServerQueryClient } from "@lib/query-client";
import type { GetPostsQueryData } from "@lib/types/post";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/kunskapsbank");
  const canonical = "https://www.spoltec.se/kunskapsbank";
  return generatePageMetadata(
    page,
    parent,
    canonical,
    "Kunskapsbank",
    "Läs våra artiklar och guider om avloppssystem, underhåll och renovering. Spoltec delar med sig av expertkunskap inom avloppsrenovering, spolning och inspektion."
  );
}

export default async function KunskapsBank() {
  const page = await getPage("kunskapsbank");

  // Use the dedicated server-side query client
  const queryClient = getServerQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
      getPosts(pageParam, 9),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => lastPage?.pageInfo?.endCursor,
  });

  const dehydratedState = dehydrate(queryClient);

  if (!page) {
    notFound();
  }

  const canonical = "https://www.spoltec.se/kunskapsbank";
  const schema = webPageSchema(page, "CollectionPage", canonical);

  return (
    <>
      <JsonLd json={schema} id={"kunskapsbank-collection-page"} />
      <main key={`kunskapsbank`}>
        <Hero
          title={page?.title}
          subtitle={page?.gqlHeroFields?.underrubrik || ""}
          text={page?.gqlHeroFields?.introduktionstext || ""}
          image={page?.gqlHeroFields?.bild?.mediaItemUrl}
          width={page?.gqlHeroFields?.bild?.mediaDetails?.width}
          height={page?.gqlHeroFields?.bild?.mediaDetails?.height}
        />

        <Blocks blocks={page?.gqlBlocks?.blocks || []} />

        <section className="text-center section contain">
          <HydrationBoundary state={dehydratedState}>
            <Posts />
          </HydrationBoundary>
        </section>
      </main>
    </>
  );
}
