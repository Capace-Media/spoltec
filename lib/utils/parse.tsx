import React from "react";
import parse, {
  domToReact,
  type DOMNode,
  type Element,
} from "html-react-parser";

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

              // Remove all styling attributes
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
