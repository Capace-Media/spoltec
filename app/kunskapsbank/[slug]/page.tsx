import Hero from "components/header/hero";
import { getPost } from "@lib/data/post";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { generatePageMetadata } from "@lib/utils";
import Blocks from "components/flexible-content/block";
import JsonLd from "components/JsonLd";
import { articleSchema, breadcrumbsSchema } from "@lib/seo/schema";
import { absoluteUrl } from "@lib/utils/url";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";

import BreadcrumbsComponent from "components/breadcrumbs";

export const dynamicParams = true;

type GetPostsQueryData = {
  posts: {
    nodes: {
      slug: string;
    }[];
  };
};

const GET_POSTS_QUERY = `
  query GET_POSTS {
    posts(first: 10) {
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  try {
    const response = await fetchGraphQL<GetPostsQueryData>(
      GET_POSTS_QUERY,
      {},
      ["posts"]
    );

    const postPaths =
      response.posts?.nodes
        ?.filter((post: any) => post?.slug && typeof post.slug === "string")
        ?.map((post: any) => ({ slug: post.slug })) || [];

    return postPaths;
  } catch (error) {
    console.error("Error generating static params for kunskapsbank:", error);
    return []; // Return empty array instead of failing
  }
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug);

  const canonical = `https://www.spoltec.se/kunskapsbank/${params.slug}`;
  const meta = await generatePageMetadata(post, parent, canonical);
  return {
    ...meta,
    openGraph: { ...(meta.openGraph || {}), type: "article" },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage(props: PageProps) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const canonical = await absoluteUrl(`/kunskapsbank/${params.slug}`);

  // Breadcrumb items for both structured data and visual breadcrumbs
  const breadcrumbItems = [
    {
      name: "Hem",
      url: await absoluteUrl("/"),
    },
    {
      name: "Kunskapsbank",
      url: await absoluteUrl("/kunskapsbank"),
    },
    {
      name: post?.title ?? "",
      url: canonical,
      current: true,
    },
  ];

  const bread = breadcrumbsSchema(
    breadcrumbItems.map((item) => ({
      name: item.name,
      url: item.url,
      type: undefined,
    })),
    canonical
  );
  const articleLD = articleSchema(post, canonical);

  const publishedDate = post?.date ? new Date(post.date) : undefined;
  const modifiedDate = post?.modifiedGmt
    ? new Date(post.modifiedGmt)
    : undefined;
  const showUpdated =
    modifiedDate &&
    publishedDate &&
    modifiedDate.getTime() !== publishedDate.getTime();

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />
      <JsonLd json={articleLD} id="article-schema" />

      {/* Visual breadcrumbs - crawlers can follow these links! */}

      <main key={post.title}>
        <article>
          <Hero
            title={post?.title}
            subtitle={post?.gqlHeroFields?.underrubrik || ""}
            text={post?.gqlHeroFields?.introduktionstext || ""}
            image={post?.gqlHeroFields?.bild?.mediaItemUrl || ""}
            width={post?.gqlHeroFields?.bild?.mediaDetails?.width}
            height={post?.gqlHeroFields?.bild?.mediaDetails?.height}
          />
          <div className="lg:flex lg:justify-between lg:items-center">

            <BreadcrumbsComponent items={breadcrumbItems} />
            <section
              aria-label="Artikeldatum"
              className="text-sm text-muted-foreground contain-outer"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {publishedDate && (
                  <span>
                    Publicerad{" "}
                    <time dateTime={publishedDate.toISOString()}>
                      {publishedDate.toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                )}

                {showUpdated && modifiedDate && (
                  <span aria-label="Senast uppdaterad">
                    Uppdaterad{" "}
                    <time dateTime={modifiedDate.toISOString()}>
                      {modifiedDate.toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                )}
              </div>
            </section>
          </div>

          <div>
            <Blocks blocks={post?.gqlBlocks?.blocks || []} />
          </div>
        </article>
      </main>
    </>
  );
}
