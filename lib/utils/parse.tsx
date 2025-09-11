import React from "react";
import parse, {
  domToReact,
  type DOMNode,
  type Element,
} from "html-react-parser";
import YouTubeWrapper from "components/YouTubeWrapper";

/**
 * Parse HTML content to React elements
 * @param content string HTML content
 * @returns React.ReactElement
 */
export default function handleParse(content: string): React.ReactElement {
  return (
    <>
      {content &&
        parse(content, {
          replace: (domNode: DOMNode) => {
            if ((domNode as any).type === "tag") {
              const element = domNode as Element;

              if (isEmptyElement(element)) {
                return <></>;
              }

              // Handle iframes specially to preserve essential attributes
              if (element.name === "iframe") {
                const src = element.attribs?.src;

                // Check if this is a YouTube iframe
                if (
                  src &&
                  (src.includes("youtube.com") || src.includes("youtu.be"))
                ) {
                  // Extract video ID from YouTube URL
                  const videoId = extractYouTubeVideoId(src);

                  if (videoId) {
                    return (
                      <YouTubeWrapper
                        videoId={videoId}
                        title={element.attribs?.title || "YouTube Video"}
                        width={parseInt(element.attribs?.width || "560")}
                        height={parseInt(element.attribs?.height || "315")}
                        className={
                          element.attribs?.class ||
                          element.attribs?.className ||
                          ""
                        }
                      />
                    );
                  }
                }

                // Handle other iframes normally
                if (element.attribs) {
                  // Remove only styling-related attributes for iframes
                  delete element.attribs.style;
                  delete element.attribs.class;
                  delete element.attribs.className;
                  // Keep essential iframe attributes like src, width, height, frameborder, allowfullscreen, etc.
                  // Remove only data-mce-* attributes which are editor-specific
                  Object.keys(element.attribs).forEach((key) => {
                    if (key.startsWith("data-mce-")) {
                      delete element.attribs[key];
                    }
                  });
                }

                // Clean up iframe children (remove editor-specific spans)
                if (element.children) {
                  element.children = element.children.filter((child: any) => {
                    if (child.type === "tag" && child.name === "span") {
                      // Remove editor-specific spans
                      if (child.attribs?.["data-mce-type"] === "bookmark") {
                        return false;
                      }
                    }
                    return true;
                  });
                }

                return domToReact([element as DOMNode]);
              }

              // Remove all styling attributes for other elements
              if (element.attribs) {
                delete element.attribs.style;
                delete element.attribs.class;
                delete element.attribs.className;
                delete element.attribs.id;
                // Remove any other styling-related attributes
                Object.keys(element.attribs).forEach((key) => {
                  if (key.startsWith("data-") || key.startsWith("aria-")) {
                    delete element.attribs[key];
                  }
                });
              }

              if (element.name === "a") {
                if (
                  element.attribs?.href &&
                  !element.attribs.href.includes(
                    process.env.NEXT_PUBLIC_MY_WEBSITE || ""
                  ) &&
                  element.attribs.href.charAt(0) !== "/"
                ) {
                  element.attribs.target = "_blank";
                }
              }

              if (
                element.children?.some(
                  (child) =>
                    (child as any).type === "tag" &&
                    (child as any).name === "img"
                )
              ) {
                const imgElement = element.children.find(
                  (child) =>
                    (child as any).type === "tag" &&
                    (child as any).name === "img"
                ) as any;

                if (imgElement?.attribs) {
                  imgElement.attribs.decoding = "defer";
                  // Remove styling from images too
                  delete imgElement.attribs.style;
                  delete imgElement.attribs.class;
                  delete imgElement.attribs.className;
                  delete imgElement.attribs.id;
                }

                return <div>{domToReact(element.children as DOMNode[])}</div>;
              }
            }
          },
        })}
    </>
  );
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns video ID or null
 */
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * Check if an element is empty
 * @param element Element to check
 * @returns boolean
 */
function isEmptyElement(element: Element): boolean {
  const preserveTags = [
    "img",
    "br",
    "hr",
    "input",
    "meta",
    "link",
    "area",
    "base",
    "col",
    "embed",
    "source",
    "track",
    "wbr",
    "iframe",
  ];

  if (preserveTags.includes(element.name)) {
    return false;
  }

  if (!element.children || element.children.length === 0) {
    return true;
  }

  const hasOnlyWhitespace = element.children.every((child: any) => {
    if (child.type === "text") {
      return !child.data || child.data.trim() === "";
    }
    if (child.type === "tag") {
      return isEmptyElement(child);
    }
    return true;
  });

  return hasOnlyWhitespace;
}
