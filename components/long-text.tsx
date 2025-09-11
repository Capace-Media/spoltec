import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

type TextLevel = "p" | "span" | "div";

export default function LongText({
  text,
  as,
  length = 75,
  ...props
}: {
  text: string;
  as: TextLevel;
  length?: number;
  [key: string]: any;
}) {
  const TextTag = as;
  const limit = (string: string, length: number) => {
    if (!string) return "";
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  };

  const isTextTruncated = text.length > length;

  if (!isTextTruncated) {
    return <TextTag {...props}>{text}</TextTag>;
  }

  return (
    <Tooltip delayDuration={900}>
      <TooltipTrigger asChild>
        <TextTag {...props}>{limit(text, length)}</TextTag>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
