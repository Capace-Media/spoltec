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
  const [isMounted, setIsMounted] = useState(false);

  const videoId = `video-${
    videoUrl
      ?.split("/")
      .pop()
      ?.replace(/[^a-zA-Z0-9]/g, "") || "default"
  }`;
  const descriptionId = `${videoId}-description`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <section className="contain-outer section">
        <div className="relative">
          <video
            className="block w-full h-auto rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderRadius: "20px" }}
            controls
            preload="metadata"
            poster={thumbnailUrl}
          >
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    );
  }

  return (
    <>
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
            title={data?.title || videoAltText}
          >
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" srcLang="sv" label="Svenska undertexter" />
            Your browser does not support the video tag.
          </video>
        </div>

        {data?.description && (
          <div id={descriptionId} className="mt-4 text-sm text-gray-600">
            <p className="sr-only">{data.description}</p>
          </div>
        )}

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
