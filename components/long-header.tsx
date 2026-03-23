import type { ComponentPropsWithoutRef } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface LongHeaderProps extends ComponentPropsWithoutRef<"h1"> {
  text: string;
  as: HeadingLevel;
  length?: number;
}

export default function LongHeader({
  text,
  as,
  length = 25,
  className,
  style,
  ...props
}: LongHeaderProps) {
  const HeadingTag = as;
  const isTextTruncated = text.length > length;

  return (
    <HeadingTag
      {...props}
      title={isTextTruncated ? text : undefined}
      className={isTextTruncated ? `${className || ""} truncate` : className}
      style={
        isTextTruncated ? { ...style, maxWidth: `${length * 0.6}em` } : style
      }
    >
      {text}
    </HeadingTag>
  );
}
