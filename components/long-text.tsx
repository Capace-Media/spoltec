import type { ComponentPropsWithoutRef } from "react";

type TextLevel = "p" | "span" | "div";

interface LongTextProps extends ComponentPropsWithoutRef<"p"> {
  text: string;
  as: TextLevel;
  length?: number;
}

export default function LongText({
  text,
  as,
  length = 75,
  ...props
}: LongTextProps) {
  const TextTag = as;
  const isTextTruncated = text.length > length;
  const displayText = isTextTruncated
    ? text.substring(0, length) + "..."
    : text;

  return (
    <TextTag {...props} title={isTextTruncated ? text : undefined}>
      {displayText}
    </TextTag>
  );
}
