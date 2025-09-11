import { videoSchema } from "../../../../lib/seo/schema";
import VideoSource from "./source";

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
  };
}

const Video = ({ data }: VideoProps) => {
  const videoUrl = data?.video?.mediaItemUrl;
  const thumbnailUrl = data?.thumbnailurl?.mediaItemUrl;
  const videoAltText = data?.video?.altText || "Video content";
  const videoTitle = data?.title || videoAltText;

  if (!videoUrl) {
    return null;
  }

  // Generate structured data server-side for better SEO
  const videoStructuredData = videoSchema(data);

  return (
    <>
      {/* Structured data - server-side rendered for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />

      <section className="contain-outer section">
        <VideoSource
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          videoAltText={videoAltText}
          videoTitle={videoTitle}
          description={data?.description}
          mediaDetails={data?.video?.mediaDetails}
        />

        {/* Video description */}
        {data?.description && (
          <div className="mt-4 text-sm text-gray-600">
            <p>{data.description}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Video;
