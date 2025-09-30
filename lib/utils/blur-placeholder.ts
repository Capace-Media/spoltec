// lib/utils/blur-placeholder.ts
/**
 * Optimized blur placeholder for better performance
 * This is a smaller, more efficient base64 encoded blur placeholder
 * that reduces the initial payload while maintaining good UX
 */
export const OPTIMIZED_BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

/**
 * Generate a color-specific blur placeholder
 * @param color - Hex color code (e.g., "#2C4696")
 * @returns Base64 encoded blur placeholder with the specified color
 */
export const generateColorBlurPlaceholder = (
  color: string = "#2C4696"
): string => {
  // Extract RGB values from hex color
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Create a simple 1x1 pixel with the specified color
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, 1, 1);
  }

  return canvas.toDataURL("image/jpeg", 0.1);
};

/**
 * Get the appropriate blur placeholder based on context
 * @param context - The context where the image is used
 * @returns Optimized blur placeholder string
 */
export const getBlurPlaceholder = (
  context: "hero" | "content" | "thumbnail" | "icon" = "content"
): string => {
  switch (context) {
    case "hero":
      // For hero images, use a slightly larger placeholder for better LCP
      return OPTIMIZED_BLUR_PLACEHOLDER;
    case "thumbnail":
    case "icon":
      // For small images, use a minimal placeholder
      return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";
    default:
      return OPTIMIZED_BLUR_PLACEHOLDER;
  }
};
