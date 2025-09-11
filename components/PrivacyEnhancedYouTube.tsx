"use client";

import Image from "next/image";
import { useState } from "react";

interface PrivacyEnhancedYouTubeProps {
  videoId: string;
  title: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Privacy-enhanced YouTube embed component that:
 * - Uses YouTube's privacy-enhanced mode (youtube-nocookie.com)
 * - Only loads the iframe after user interaction
 * - Reduces third-party cookie usage
 * - Works with existing Cookiebot setup
 */
export default function PrivacyEnhancedYouTube({
  videoId,
  title,
  width = 560,
  height = 315,
  className = "",
}: PrivacyEnhancedYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadVideo = () => {
    setIsLoaded(true);
  };

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }

    return url; // Return as-is if no pattern matches
  };

  const cleanVideoId = extractVideoId(videoId);
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;

  // Use youtube-nocookie.com for privacy-enhanced embeds
  const embedUrl = `https://www.youtube-nocookie.com/embed/${cleanVideoId}?rel=0&modestbranding=1&fs=1&cc_load_policy=1&iv_load_policy=3&autohide=1&showinfo=0&controls=1&disablekb=1&playsinline=1`;

  // Show thumbnail with play button if not loaded yet
  if (!isLoaded) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <div
          className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
          onClick={handleLoadVideo}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleLoadVideo();
            }
          }}
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            width={width}
            height={height}
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
            <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* YouTube branding */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            YouTube
          </div>
        </div>
      </div>
    );
  }

  // Show the actual iframe
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <iframe
        src={embedUrl}
        title={title}
        width={width}
        height={height}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg"
        loading="lazy"
        // Privacy enhancements
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </div>
  );
}
