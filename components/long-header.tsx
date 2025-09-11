import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export default function LongHeader({
  text,
  as,
  length = 25,
  ...props
}: {
  text: string;
  as: HeadingLevel;
  length?: number;
  [key: string]: any;
}) {
  const HeadingTag = as;
  const isTextTruncated = text.length > length;

  if (!isTextTruncated) {
    return <HeadingTag {...props}>{text}</HeadingTag>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HeadingTag
          {...props}
          className={`${props.className || ""} truncate`}
          style={{
            ...props.style,
            maxWidth: `${length * 0.6}em`, // Approximate character width
          }}
        >
          {text}
        </HeadingTag>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
