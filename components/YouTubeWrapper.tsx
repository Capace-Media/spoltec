"use client";

import dynamic from "next/dynamic";

// Dynamically import the YouTube component to prevent SSR issues
const PrivacyEnhancedYouTube = dynamic(
  () => import("./PrivacyEnhancedYouTube"),
  { ssr: false }
);

interface YouTubeWrapperProps {
  videoId: string;
  title: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function YouTubeWrapper(props: YouTubeWrapperProps) {
  return <PrivacyEnhancedYouTube {...props} />;
}
