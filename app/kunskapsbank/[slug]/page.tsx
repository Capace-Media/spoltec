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

export const dynamicParams = false;

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

    console.log(`Generated ${postPaths.length} post paths for kunskapsbank`);
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
  return generatePageMetadata(post, parent, canonical);
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

  const bread = breadcrumbsSchema(
    [
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
        type: "Article",
      },
    ],
    canonical
  );
  const articleLD = articleSchema(post, canonical);

  return (
    <>
      <JsonLd json={bread} id="breadcrumbs-schema" />
      <JsonLd json={articleLD} id="article-schema" />
      <main key={post.title}>
        <Hero
          title={post?.title}
          subtitle={post?.gqlHeroFields?.underrubrik || ""}
          text={post?.gqlHeroFields?.introduktionstext || ""}
          image={post?.gqlHeroFields?.bild?.mediaItemUrl || ""}
        />
        <div id="content" className="w-full h-10 md:h-0"></div>
        <div>
          <Blocks blocks={post?.gqlBlocks?.blocks || []} />
        </div>
      </main>
    </>
  );
}
