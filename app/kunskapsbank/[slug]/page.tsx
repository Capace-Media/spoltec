import Hero from "components/header/hero";
import { getPost } from "@lib/data/post";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import WP from "@lib/wp/wp";
import { generatePageMetadata } from "@lib/utils";
import Blocks from "components/flexible-content/block";
import JsonLd from "components/JsonLd";
import { breadcrumbsSchema } from "@lib/seo/schema";
import { absoluteUrl } from "@lib/utils/url";

export const dynamicParams = true;

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
  const { data } = await WP(GET_POSTS_QUERY);

  const postPaths =
    data?.posts?.nodes
      ?.filter((post: any) => post?.slug && typeof post.slug === "string")
      ?.map((post: any) => ({ slug: post.slug })) || [];

  return postPaths;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug);

  return generatePageMetadata(post, parent);
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
        entityId: `${canonical}#article`,
      },
    ],
    canonical
  );

  return (
    <div key={post.title}>
      <JsonLd json={bread} id="breadcrumbs-schema" />
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
    </div>
  );
}
