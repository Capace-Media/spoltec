import React from "react";
import parse, {
  domToReact,
  type DOMNode,
  type Element,
} from "html-react-parser";

export default function handleParse(content: string): React.ReactElement {
  return (
    <>
      {content &&
        parse(content, {
          replace: (domNode: DOMNode) => {
            // Type guard to check if domNode is an Element
            if ((domNode as any).type === "tag") {
              const element = domNode as Element;

              // Filter out empty tags (tags with no meaningful content)
              if (isEmptyElement(element)) {
                return <></>; // Return empty fragment to remove the element
              }

              // Handle anchor tags - add target="_blank" for external links
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

              // Handle elements containing images
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
                }

                return <div>{domToReact(element.children as DOMNode[])}</div>;
              }
            }
          },
        })}
    </>
  );
}

// Helper function to check if an element is empty
function isEmptyElement(element: Element): boolean {
  // Tags that should be preserved even if empty (self-closing or meaningful when empty)
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

  // Check if element has no children
  if (!element.children || element.children.length === 0) {
    return true;
  }

  // Check if all children are empty text nodes or whitespace
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
