"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface VideoSourceProps {
  videoUrl: string;
  thumbnailUrl?: string;
  videoAltText: string;
  videoTitle: string;
  description?: string;
  mediaDetails?: {
    width: number;
    height: number;
    file: string;
  };
}

interface VideoState {
  isLoading: boolean;
  hasError: boolean;
  isIntersecting: boolean;
  isPlaying: boolean;
}

const VideoSource = ({
  videoUrl,
  thumbnailUrl,
  videoAltText,
  videoTitle,
  description,
  mediaDetails,
}: VideoSourceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoState, setVideoState] = useState<VideoState>({
    isLoading: true,
    hasError: false,
    isIntersecting: false,
    isPlaying: false,
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVideoState((prev) => ({ ...prev, isIntersecting: true }));
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px 0px", // Start loading 50px before video comes into view
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video event handlers
  const handleLoadStart = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isLoading: true, hasError: false }));
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  const handleError = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isLoading: false, hasError: true }));
  }, []);

  const handlePlay = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const handlePause = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Loading state */}
      {videoState.isLoading && videoState.isIntersecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-[20px] z-10">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-600">Loading video...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {videoState.hasError && (
        <div className="flex items-center justify-center bg-gray-100 rounded-[20px] p-8">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-sm text-gray-600 mb-2">Failed to load video</p>
            <button
              onClick={() => {
                setVideoState((prev) => ({
                  ...prev,
                  hasError: false,
                  isLoading: true,
                }));
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="text-sm text-blue-500 hover:text-blue-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      {!videoState.hasError && (
        <video
          ref={videoRef}
          className="block w-full h-auto rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          controls
          preload={videoState.isIntersecting ? "metadata" : "none"}
          poster={thumbnailUrl}
          aria-label={videoAltText}
          title={videoTitle}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
          playsInline
          tabIndex={0}
          width={mediaDetails?.width}
          height={mediaDetails?.height}
        >
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" srcLang="sv" label="Swedish" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play button overlay for better UX */}
      {!videoState.isIntersecting && !videoState.hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-[20px] cursor-pointer group">
          <div className="bg-card bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 transition-all">
            <svg
              className="w-8 h-8 text-gray-800"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Video status for screen readers */}
      <div className="sr-only" aria-live="polite">
        {videoState.isLoading && "Video is loading"}
        {videoState.hasError && "Video failed to load"}
        {videoState.isPlaying && "Video is playing"}
        {!videoState.isPlaying &&
          !videoState.isLoading &&
          !videoState.hasError &&
          "Video is paused"}
      </div>
    </div>
  );
};

export default VideoSource;
