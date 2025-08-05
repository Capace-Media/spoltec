import Hero from "components/header/hero";
import { getPost } from "@lib/data/post";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import WP from "@lib/wp/wp";
import { generatePageMetadata } from "@lib/utils";
import Blocks from "components/flexible-content/block";

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
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  return generatePageMetadata(post, parent);
}

interface PageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div key={post.title}>
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
