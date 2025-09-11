import type { VideoObject } from "schema-dts";

interface VideoData {
  video?: {
    mediaItemUrl: string;
    altText?: string;
    mediaDetails?: {
      width: number;
      height: number;
      file: string;
    };
  };
  thumbnailurl?: {
    mediaItemUrl: string;
    altText?: string;
  };
  title?: string;
  description?: string;
}

export const buildVideoSchema = (data: VideoData): VideoObject => {
  const videoUrl = data?.video?.mediaItemUrl;
  const thumbnailUrl = data?.thumbnailurl?.mediaItemUrl;
  const videoAltText = data?.video?.altText || "Video content";
  const videoTitle = data?.title || videoAltText;

  if (!videoUrl) {
    throw new Error("Video URL is required for video schema");
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: videoTitle,
    description: data?.description || `Video: ${videoAltText}`,
    contentUrl: videoUrl,
    uploadDate: new Date().toISOString(),
  } as VideoObject;

  // Add thumbnail if available
  if (thumbnailUrl) {
    schema.thumbnailUrl = thumbnailUrl;
  }

  // Add dimensions if available
  if (data?.video?.mediaDetails) {
    (schema as any).width = data.video.mediaDetails.width;
    (schema as any).height = data.video.mediaDetails.height;
  }

  return schema;
};
