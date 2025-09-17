import type { PostHighlightsBlock } from "@lib/types/page";
import type { ServicePostHighlightsBlock } from "@lib/types/service";
import Image from "next/image";
import Link from "next/link";
import LongHeader from "@components/long-header";
import LongText from "@components/long-text";
import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";

export default function BlogPosts({
  data,
}: {
  data: PostHighlightsBlock | ServicePostHighlightsBlock;
}) {
  const limit = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  const getGridColumns = (count: number): string => {
    const gridMapping: { [key: number]: string } = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    };

    return gridMapping[count] || "lg:grid-cols-3";
  };

  const postCount = data?.posts?.length || 0;

  return (
    <section className="contain-outer section">
      <div className="pb-6">
        <h2>{data.intro.title}</h2>
        {data?.intro?.text && <p>{data.intro.text}</p>}
      </div>
      <ul
        className={`grid gap-2 grid-cols-1 md:grid-cols-2 ${getGridColumns(
          postCount
        )}`}
      >
        {data.posts.map((post) => (
          <li key={post.id}>
            <Link
              className="group overflow-hidden rounded-xl border border-brand-blue/10 bg-white text-left shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 flex flex-col h-full"
              href={`/kunskapsbank/${post.slug}`}
              itemScope
              itemType="https://schema.org/Article"
              aria-label={`Läs mer om ${post.title}`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.gqlHeroFields?.bild?.mediaItemUrl}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
                  alt={post.gqlHeroFields?.bild?.altText || post.title}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              {post?.gqlHeroFields?.bild?.mediaItemUrl && (
                <span itemProp="image" className="sr-only">
                  {post?.gqlHeroFields?.bild?.mediaItemUrl}
                </span>
              )}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <LongHeader
                    text={post.title}
                    as="h3"
                    itemProp="headline"
                    className="text-xl"
                  />
                  {post.gqlHeroFields?.introduktionstext && (
                    <LongText
                      text={post.gqlHeroFields?.introduktionstext}
                      as="p"
                      length={140}
                      className="pt-2 text-sm"
                      itemProp="description"
                    />
                  )}
                </div>
                <div className="pt-2 flex items-center text-brand-blue">
                  <span className="text-sm font-medium">
                    Läs mer<span className="sr-only"> om {post.title}</span>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="ml-2 h-5 w-5 fill-current transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                  </svg>

                  {/* Hidden structured data for SEO */}
                  <span itemProp="url" className="sr-only">{`${
                    process.env.NEXT_PUBLIC_MY_WEBSITE ||
                    "https://www.spoltec.se"
                  }/kunskapsbank/${post.slug}`}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-8 flex justify-center">
        <Link
          href="/kunskapsbank"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          Se alla blogginlägg
        </Link>
      </div>
    </section>
  );
}
