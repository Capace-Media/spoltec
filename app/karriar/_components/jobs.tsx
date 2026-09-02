"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { cn } from "@lib/utils";
import { Button, buttonVariants } from "components/ui/button";
import { Spinner } from "components/ui/spinner";
import type { GetPositionsQueryData } from "@lib/types/employment";

const PAGE_SIZE = 9;

async function fetchPositions(
    after?: string,
    first: number = PAGE_SIZE
): Promise<GetPositionsQueryData["gqlAllEmployment"]> {
    const params = new URLSearchParams();
    if (after) params.set("after", after);
    params.set("first", first.toString());

    const response = await fetch(`/api/get-positions?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch positions");
    }
    return response.json();
}

function JobSkeleton() {
    return (
        <li className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
                <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-9 w-28 shrink-0 animate-pulse rounded-md bg-gray-200" />
        </li>
    );
}

export default function Jobs() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ["positions"],
            queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
                fetchPositions(pageParam, PAGE_SIZE),
            initialPageParam: undefined,
            getNextPageParam: (lastPage) =>
                lastPage?.pageInfo?.hasNextPage
                    ? lastPage.pageInfo.endCursor
                    : undefined,
        });

    const positions = data?.pages.flatMap((page) => page?.edges || []) || [];

    return (
        <div className="w-full">
            <div className="max-w-175">
                <h2>Lediga tjänster</h2>
                <p>
                    Vill du bli en del av Spoltec? Här hittar du våra lediga tjänster —
                    klicka på en tjänst för att läsa mer och ansöka.
                </p>
            </div>

            {isLoading ? (
                <ul className="mt-10 divide-y divide-brand-blue/10 border-y border-brand-blue/10">
                    {Array.from({ length: 3 }, (_, index) => (
                        <JobSkeleton key={`job-skeleton-${index}`} />
                    ))}
                </ul>
            ) : positions.length === 0 ? (
                <div className="py-12">
                    <p className="text-gray-500">
                        Just nu har vi inga lediga tjänster. Skicka gärna en spontanansökan
                        till{" "}
                        <a className="underline" href="mailto:info@spoltec.se">
                            info@spoltec.se
                        </a>
                        .
                    </p>
                </div>
            ) : (
                <ul className="mt-10 divide-y divide-brand-blue/10 border-y border-brand-blue/10">
                    {positions.map(({ node: position }) => (
                        <li
                            key={position.id}
                            className="group relative flex flex-col gap-4 py-6 transition-colors hover:bg-brand-blue/3 focus-within:bg-brand-blue/3 md:-mx-4 md:flex-row md:items-center md:justify-between md:px-4"
                        >
                            <div>
                                <h3 className="text-xl">
                                    <Link
                                        href={`/karriar/${position.slug}`}
                                        className="after:absolute after:inset-0 focus-visible:outline-none"
                                        aria-label={`Läs mer om ${position.title}`}
                                    >
                                        {position.title}
                                    </Link>
                                </h3>
                                {position.gqlPositionFields?.underrubrik && (
                                    <p className="mt-1 max-w-150 text-sm text-muted-foreground">
                                        {position.gqlPositionFields.underrubrik}
                                    </p>
                                )}
                            </div>
                            <span
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "pointer-events-none w-fit shrink-0 group-hover:bg-primary group-hover:text-primary-foreground"
                                )}
                                aria-hidden="true"
                            >
                                Läs mer
                                <ArrowRight className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {hasNextPage && (
                <div className="mt-10 text-center">
                    <Button
                        size="lg"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Spinner />
                                Laddar fler tjänster...
                            </>
                        ) : (
                            "Ladda fler tjänster"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
