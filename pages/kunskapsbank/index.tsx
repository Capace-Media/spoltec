import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import { fetchGraphQL } from "@lib/wp/fetchGraphQL";
import getPage from "@modules/pages/lib/getPage";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import PostsPagination from "components/PostsPagination";
import { NextPage } from "next";

import { FETCH_POSTS } from "@modules/blog/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface BlogProps {
  page: any;
}

type PostNode = {
  id: string;
  title: string;
};

type PostsResponse = {
  posts: {
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
    edges: {
      node: PostNode;
    }[];
  };
};

const Blog: NextPage = ({ page }: BlogProps) => {
  const fetchPosts = async (
    context: QueryFunctionContext<string[], string | null>
  ): Promise<PostsResponse["posts"]> => {
    const { pageParam = null } = context;

    const variables = {
      first: 9,
      after: pageParam,
    };

    const data = await fetchGraphQL<PostsResponse>(FETCH_POSTS, variables);

    return data.posts;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<PostsResponse["posts"], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialPageParam: null,
  });

  console.log("data =====>", data);
  return (
    <div>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>

      <div className="text-center section contain">
        <div className="max-w-[700px] mx-auto">
          <h2>Artiklar</h2>
        </div>
        <section className="">
          {data?.pages.map((page, pageIndex) => (
            <ul
              className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2"
              key={pageIndex}
            >
              {page.edges.map(({ node }) => (
                <li key={node.id}>
                  <Post data={node} />
                </li>
              ))}
            </ul>
          ))}
        </section>
        <div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="btn"
          >
            {isFetchingNextPage
              ? "Laddar mer..."
              : hasNextPage
              ? "Ladda mer"
              : "Inga fler Artiklar hittades.."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const data = await getPage("kunskapsbank");

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: data,
    },
  };
};

export const Post = ({ data }) => {
  const limit = (string = "", limit = 0) => {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    } else {
      return string;
    }
  };
  return (
    <Link
      className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-[100%] text-white p-7 bg-brand-blue text-left rounded-xl"
      key={data.id}
      href={`/kunskapsbank/${data?.slug}`}
      aria-label={`Läs mer om ${data?.title}`}
    >
      <Image
        src={
          data?.gqlHeroFields?.bild?.mediaItemUrl
            ? data?.gqlHeroFields?.bild?.mediaItemUrl
            : data?.bild?.mediaItemUrl
            ? data?.bild?.mediaItemUrl
            : "https://via.placeholder.com/2560x1707/2C4696/2C4696"
        }
        fill
        style={{
          objectFit: "cover",
        }}
        className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
        alt={data.title}
      />
      <div>
        <h3 className="text-xl text-white md:text-2xl">{data.title}</h3>
        <p className="mt-3 text-sm">
          {limit(
            data?.introduktionstext ||
              data?.gqlHeroFields?.introduktionstext ||
              data?.underrubrik ||
              data?.gqlHeroFields?.underrubrik ||
              "",
            140
          )}
        </p>
      </div>
      <div className="flex items-center justify-end space-x-3">
        <p>Läs mer</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-current"
        >
          <rect fill="none" height="24" width="24" />
          <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
        </svg>
      </div>
    </Link>
  );
};
