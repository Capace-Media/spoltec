// lib/seo/article.ts
import { GetPostQueryData } from "@lib/types/post";
import type {
  WithContext,
  Article as ArticleSchema,
  BlogPosting as BlogPostingSchema,
  ImageObject,
} from "schema-dts";

type ArticleType = "Article" | "BlogPosting";

export function buildArticleSchema(
  input: GetPostQueryData,
  articleType?: ArticleType
): WithContext<ArticleSchema | BlogPostingSchema> {
  const t: ArticleType = articleType ?? "Article";

  const img: ImageObject | undefined = input.post?.gqlHeroFields?.bild
    ?.mediaItemUrl
    ? {
        "@type": "ImageObject",
        url: input.post.gqlHeroFields.bild.mediaItemUrl,
        caption: input.post.gqlHeroFields.bild.altText,
        // Only include width/height if you have actual dimension data
        // width: someWidthValue ? `${someWidthValue}px` : undefined,
        // height: someHeightValue ? `${someHeightValue}px` : undefined,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": t,
    "@id": `${input.post?.seo?.canonical ?? ""}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.post?.seo?.canonical ?? "",
    },
    headline: input.post?.title ?? "",
    name: input.post?.title ?? "",
    description: input.post?.seo?.metaDesc ?? "",
    url: input.post?.seo?.canonical ?? "",
    image: img,
    keywords: input.post?.seo?.focuskw ? [input.post?.seo?.focuskw] : undefined,
    inLanguage: "sv-SE",
    articleSection: "Kunskapsbank",
    author: { "@type": "Organization", name: "Spoltec Södra AB" },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.spoltec.se/#organization",
    },
    datePublished: input.post?.dateGmt ?? "",
    dateModified: input.post?.modifiedGmt ?? input.post?.dateGmt ?? "",
  };
}
