import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPosts } from "@lib/data/post";
import Posts from "./posts";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";

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
    "Kunskapsbank - Spoltec",
    "Kunskapsbank"
  );
}

export default async function KunskapsBank() {
  const page = await getPage("kunskapsbank");

  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const posts = await getPosts(pageParam, 9);
      return posts;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => lastPage.node.pageInfo.endCursor,
  });

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
