import Image from "next/image";
import Link from "next/link";
import type { Post } from "@lib/types/post";
import LongHeader from "./long-header";

export default function PostCard({
  post,
  index,
  postUrl,
  imageUrl,
  introText,
  limit,
}: {
  post: Post;
  index: number;
  postUrl: string;
  imageUrl: string;
  introText: string;
  limit: (text: string, length: number) => string;
}) {
  return (
    <Link
      key={`${post.id}-${index}`}
      className="group overflow-hidden rounded-xl border border-brand-blue/10 bg-white text-left shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 flex flex-col h-full"
      href={postUrl}
      itemScope
      itemType="https://schema.org/Article"
      aria-label={`Läs mer om ${post.title}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageUrl}
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
      {imageUrl && (
        <span itemProp="image" className="sr-only">
          {imageUrl}
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
          {introText && (
            <p className="pt-2 text-sm" itemProp="description">
              {limit(introText, 140)}
            </p>
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
            process.env.NEXT_PUBLIC_MY_WEBSITE || "https://www.spoltec.se"
          }/kunskapsbank/${postUrl}`}</span>
        </div>
      </div>
    </Link>
  );
}
