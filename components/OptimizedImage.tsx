import Image from "next/image";
import { useState } from "react";
import { getBlurPlaceholder } from "@lib/utils/blur-placeholder";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  context?: "hero" | "content" | "thumbnail" | "icon";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const OptimizedImage = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  style,
  priority = false,
  quality = 70,
  sizes = "(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 100vw",
  placeholder = "blur",
  blurDataURL,
  context = "content",
  objectFit = "cover",
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const imageStyle = {
    objectFit,
    ...style,
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      style={imageStyle}
      priority={priority}
      quality={quality}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL || getBlurPlaceholder(context)}
      onLoad={() => setIsLoading(false)}
      onError={() => setIsLoading(false)}
      {...props}
    />
  );
};

export default OptimizedImage;
