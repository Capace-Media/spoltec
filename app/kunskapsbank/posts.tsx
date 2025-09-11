"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@lib/data/post";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
import PostCard from "@components/post-card";
import { Post } from "@lib/types/post";

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
    initialPageParam: undefined, // Add this - must match server
    getNextPageParam: (lastPage, pages) => lastPage?.pageInfo.endCursor,
    // Remove refetchOnMount and staleTime for now to test hydration
  });

  const allPosts = data?.pages.flatMap((page) => page?.edges || []) || [];

  // Function to limit text length like in Services component
  const limit = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Create a reusable skeleton component
  const PostSkeleton = () => (
    <div className="group overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-sm transition duration-200 hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-5">
        <div className="space-y-2">
          <div className="h-6 md:h-7 bg-gray-200 rounded" />
          <div className="h-6 md:h-7 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-5 bg-gray-200 rounded" />
        </div>
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
            <PostCard
              key={`post-${index}`}
              post={post as Post}
              index={index}
              postUrl={postUrl}
              imageUrl={imageUrl}
              introText={introText}
              limit={limit}
            />
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
            onClick={() => fetchNextPage()}
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
