import Hero from "components/header/hero";
import Blocks from "components/flexible-content/block";
import { getPage } from "@lib/data/page";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPositions } from "@lib/data/employment";
import Jobs from "./_components/jobs";
import { webPageSchema } from "@lib/seo/schema";
import JsonLd from "components/JsonLd";
import { getServerQueryClient } from "@lib/query-client";
import { absoluteUrl } from "@lib/utils/url";

export async function generateMetadata(
    { },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const page = await getPage("karriar");
    const canonical = absoluteUrl("/karriar");
    return generatePageMetadata(
        page,
        parent,
        canonical,
        "Karriär",
        "Se Spoltecs lediga tjänster och bli en del av vårt team. Vi söker medarbetare inom spolning, sugning, relining och rörinspektion."
    );
}

export default async function KarriarPage() {
    const page = await getPage("karriar");

    const queryClient = getServerQueryClient();

    await queryClient
        .infiniteQuery({
            queryKey: ["positions"],
            queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
                getPositions(pageParam, 9),
            initialPageParam: undefined as string | undefined,
        })
        .catch(() => undefined);

    const dehydratedState = dehydrate(queryClient);

    if (!page) {
        notFound();
    }

    const canonical = absoluteUrl("/karriar");
    const schema = webPageSchema(page, "CollectionPage", canonical);

    return (
        <>
            <JsonLd json={schema} id={"karriar-collection-page"} />
            <main key={`karriar`}>
                <Hero
                    title={page?.title}
                    subtitle={page?.gqlHeroFields?.underrubrik || ""}
                    text={page?.gqlHeroFields?.introduktionstext || ""}
                    image={page?.gqlHeroFields?.bild?.mediaItemUrl}
                    width={page?.gqlHeroFields?.bild?.mediaDetails?.width}
                    height={page?.gqlHeroFields?.bild?.mediaDetails?.height}
                />
                <section className="section contain">
                    <HydrationBoundary state={dehydratedState}>
                        <Jobs />
                    </HydrationBoundary>
                </section>

                <Blocks blocks={page?.gqlBlocks?.blocks || []} />

            </main>
        </>
    );
}
