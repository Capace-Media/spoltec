// lib/seo/article.ts
import { GetPostQueryData, Post } from "@lib/types/post";
import type {
  WithContext,
  Article as ArticleSchema,
  BlogPosting as BlogPostingSchema,
  ImageObject,
} from "schema-dts";

type ArticleType = "Article" | "BlogPosting";

export function buildArticleSchema(
  post: Post,
  articleType?: ArticleType,
  canonical?: string
): WithContext<ArticleSchema | BlogPostingSchema> {
  const t: ArticleType = articleType ?? "Article";

  const img: ImageObject | undefined = post?.gqlHeroFields?.bild?.mediaItemUrl
    ? {
        "@type": "ImageObject",
        url: post.gqlHeroFields.bild.mediaItemUrl,
        caption: post.gqlHeroFields.bild.altText,
        // Only include width/height if you have actual dimension data
        // width: someWidthValue ? `${someWidthValue}px` : undefined,
        // height: someHeightValue ? `${someHeightValue}px` : undefined,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": t,
    "@id": `${canonical ?? ""}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical ?? "",
    },
    headline: post?.title ?? "",
    name: post?.title ?? "",
    description: post?.seo?.metaDesc ?? "",
    url: canonical ?? "",
    image: img,
    keywords: post?.seo?.focuskw ? [post?.seo?.focuskw] : undefined,
    inLanguage: "sv-SE",
    articleSection: "Kunskapsbank",
    author: { "@type": "Organization", name: "Spoltec Södra AB" },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.spoltec.se/#organization",
    },
    datePublished: post?.dateGmt ?? "",
    dateModified: post?.modifiedGmt ?? post?.dateGmt ?? "",
  };
}
