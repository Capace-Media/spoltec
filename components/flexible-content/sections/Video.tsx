"use client";
import { useRef, useState, useEffect } from "react";

interface VideoProps {
  data: {
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
    // Additional fields that could be added to CMS
    title?: string;
    description?: string;
    duration?: number;
  };
}

const Video = ({ data }: VideoProps) => {
  const videoUrl = data?.video?.mediaItemUrl;
  const thumbnailUrl = data?.thumbnailurl?.mediaItemUrl;
  const videoAltText = data?.video?.altText || "Video content";
  const thumbnailAltText = data?.thumbnailurl?.altText || "Video thumbnail";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Generate unique IDs for accessibility
  const videoId = `video-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = `${videoId}-description`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Generate structured data for SEO
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data?.title || videoAltText,
    description: data?.description || `Video: ${videoAltText}`,
    contentUrl: videoUrl,
    thumbnailUrl: thumbnailUrl,
    uploadDate: new Date().toISOString(),
    ...(duration && { duration: `PT${Math.round(duration)}S` }),
    ...(data?.video?.mediaDetails && {
      width: data.video.mediaDetails.width,
      height: data.video.mediaDetails.height,
    }),
  };

  if (!videoUrl) {
    return null;
  }

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />

      <section
        className="contain-outer section"
        aria-labelledby={data?.title ? `${videoId}-title` : undefined}
        role="region"
      >
        {data?.title && (
          <h2 id={`${videoId}-title`} className="sr-only">
            {data.title}
          </h2>
        )}

        <div className="relative">
          <video
            ref={videoRef}
            id={videoId}
            className="block w-full h-auto rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderRadius: "20px" }}
            controls
            preload="metadata"
            poster={thumbnailUrl}
            aria-label={videoAltText}
            aria-describedby={data?.description ? descriptionId : undefined}
            // SEO and accessibility attributes
            title={data?.title || videoAltText}
          >
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/mp4" />
            <track
              kind="captions"
              srcLang="sv"
              label="Svenska undertexter"
              // Add caption file URL when available
            />
            Your browser does not support the video tag.
          </video>

          {/* Custom play button overlay - only shown when not playing */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-[20px]"
              onClick={togglePlay}
              role="button"
              tabIndex={0}
              aria-label={`Spela video: ${videoAltText}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
            >
              <button
                className="bg-black bg-opacity-50 text-white text-2xl font-bold px-6 py-3 rounded-lg hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                aria-label="Spela video"
              >
                ▶ Spela
              </button>
            </div>
          )}
        </div>

        {/* Video description for SEO and accessibility */}
        {data?.description && (
          <div id={descriptionId} className="mt-4 text-sm text-gray-600">
            <p className="sr-only">{data.description}</p>
          </div>
        )}

        {/* Video metadata for SEO */}
        {duration && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="sr-only">Videolängd: {formatTime(duration)}</span>
          </div>
        )}
      </section>
    </>
  );
};

export default Video;
