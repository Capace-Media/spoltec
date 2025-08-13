"use client";
import { useRef, useState } from "react";

const Video = ({ data }: any) => {
  const videoUrl = data?.video?.mediaItemUrl;
  const fallbackUrl = data?.video?.mediaItemUrl;
  const thumbnailUrl = data?.thumbnailurl?.mediaItemUrl;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="contain-outer section">
      <video
        ref={videoRef}
        className="block"
        style={{ width: "100%", height: "auto", borderRadius: "20px" }}
      >
        <source src={videoUrl} type="video/webm" />
        <source src={fallbackUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
          }}
          onClick={togglePlay}
        >
          <button className="bg-black bg-opacity-50 text-white text-2xl font-bold px-4 py-2 rounded-sm">
            ▶ Spela
          </button>
        </div>
      )}
    </section>
  );
};

export default Video;
