// lib/seo/article.ts
import { Post } from "@lib/types/post";
import type { WithContext, Article, ImageObject } from "schema-dts";

export function buildArticleSchema(
  post: Post,

  canonical?: string
): WithContext<Article> {
  const url = canonical ?? "";
  const id = url ? `${url}#article` : undefined;

  const imageUrl = post?.gqlHeroFields?.bild?.mediaItemUrl;
  const image: ImageObject | undefined = imageUrl
    ? {
        "@type": "ImageObject",
        url: imageUrl,
        caption: post?.gqlHeroFields?.bild?.altText || post?.title || undefined,
      }
    : undefined;

  const datePublished = post?.dateGmt
    ? new Date(post.dateGmt).toISOString()
    : undefined;
  const dateModified =
    post?.modifiedGmt || post?.dateGmt
      ? new Date(post.modifiedGmt || post.dateGmt!).toISOString()
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    ...(id && { "@id": id }),
    ...(url && { mainEntityOfPage: { "@type": "WebPage", "@id": url }, url }),
    headline: post?.seo?.title || post?.title || undefined,
    name: post?.seo?.title || post?.title || undefined,
    description: post?.seo?.metaDesc || undefined,
    image,
    keywords: post?.seo?.focuskw ? [post.seo.focuskw] : undefined,
    inLanguage: "sv-SE",
    articleSection: "Kunskapsbank",
    author: {
      "@type": "Organization",
      "@id": "https://www.spoltec.se/#organization",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.spoltec.se/#organization",
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };
}
