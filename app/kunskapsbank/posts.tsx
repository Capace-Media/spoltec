"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@lib/data/post";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";

export default function Posts() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const posts = await getPosts(pageParam, 9);
      return posts;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => lastPage?.pageInfo.endCursor,
  });

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      await fetchNextPage();
      setIsLoadingMore(false);
    }
  };

  const allPosts = data?.pages.flatMap((page) => page?.edges || []) || [];

  // Function to limit text length like in Services component
  const limit = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Create a reusable skeleton component
  const PostSkeleton = () => (
    <div className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between w-full text-white p-7 bg-brand-blue rounded-xl animate-pulse">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 md:h-7 bg-white/20 rounded animate-pulse"></div>
          <div className="h-6 md:h-7 bg-white/20 rounded w-3/4 animate-pulse"></div>
        </div>

        {/* Description skeleton */}
        <div className="mt-3 space-y-2">
          <div className="h-4 bg-white/15 rounded animate-pulse"></div>
          <div className="h-4 bg-white/15 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-white/15 rounded w-2/3 animate-pulse"></div>
        </div>
      </div>

      {/* "Read more" skeleton */}
      <div className="flex items-center justify-end space-x-3 relative z-10">
        <div className="h-4 bg-white/20 rounded w-16 animate-pulse"></div>
        <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Posts Grid */}
      <div>
        <h2>Artiklar</h2>
        <p>
          Här hittar du artiklar om avloppssystem, avloppsrenovering och annat
          relaterat.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {allPosts.map((edge, index) => {
          const post = edge.node;
          const postUrl = `/kunskapsbank/${post.slug}`;

          // Use hero image or fallback to placeholder
          const imageUrl =
            post.gqlHeroFields?.bild?.mediaItemUrl ||
            "/images/spoltec-cta-bg.jpg";

          // Get intro text from available fields
          const introText =
            post.gqlHeroFields?.introduktionstext ||
            post.gqlHeroFields?.underrubrik ||
            "";

          return (
            <Link
              key={`${post.id}-${index}`}
              className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full text-white p-7 bg-brand-blue text-left rounded-xl"
              href={postUrl}
              itemScope
              itemType="https://schema.org/Article"
              aria-label={`Läs mer om ${post.title}`}
            >
              <Image
                src={imageUrl}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                alt={post.gqlHeroFields?.bild?.altText || post.title}
              />

              <div>
                <h3
                  className="text-xl text-white md:text-2xl"
                  itemProp="headline"
                >
                  {post.title}
                </h3>
                {introText && (
                  <p className="mt-3 text-sm" itemProp="description">
                    {limit(introText, 140)}
                  </p>
                )}
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

              {/* Hidden structured data for SEO */}
              <span itemProp="url" className="hidden">{`${
                process.env.NEXT_PUBLIC_MY_WEBSITE || "https://spoltec.se"
              }${postUrl}`}</span>
            </Link>
          );
        })}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {Array.from({ length: 6 }, (_, index) => (
            <PostSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      {/* No posts message */}

      {allPosts.length === 0 && !isFetchingNextPage && (
        <div className="text-center py-12">
          <p className="text-gray-500">Inga artiklar hittades.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage || isLoadingMore}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            {isFetchingNextPage || isLoadingMore ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Laddar fler artiklar...
              </>
            ) : (
              "Ladda fler artiklar"
            )}
          </button>
        </div>
      )}

      {/* Loading state for initial load */}
      {allPosts.length === 0 && isFetchingNextPage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {Array.from({ length: 6 }, (_, index) => (
            <PostSkeleton key={`skeleton-more-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}
