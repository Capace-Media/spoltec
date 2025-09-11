import positions from "@data/static-positions.json";
import Image from "next/image";
import Link from "next/link";
import type { LedigaTjansterBlock } from "@lib/types/page";
interface AvailablePositionsProps {
  data: LedigaTjansterBlock;
}

const AvailablePositions = ({ data }: AvailablePositionsProps) => {
  if (!data || !data?.jobsText || !data?.rubrik) return null;
  return (
    <>
      <div className="text-center section contain">
        <div className="max-w-[700px] mx-auto">
          <h2>{data.rubrik}</h2>
          <p>{data.jobsText}</p>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
          {positions?.length > 0 &&
            positions.map((position: any) => {
              return (
                <Link
                  className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full md:w-[48%]  lg:w-[32%] xl:w-[24%] text-white p-7 bg-brand-blue text-left rounded-xl"
                  key={position?.slug}
                  href={`/${position?.slug}`}
                  aria-label={`Läs mer om ${position.title}`}
                >
                  <Image
                    src={
                      position?.gqlPositionFields?.bild?.mediaItemUrl ||
                      "/images/spoltec-cta-bg.jpg"
                    }
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    className="transition-all opacity-0 group-hover:opacity-20"
                    alt={
                      position?.gqlPositionFields?.bild?.altText
                        ? position?.gqlPositionFields?.bild?.altText
                        : position.title
                    }
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div>
                    <h3 className="text-xl text-white">{position.title}</h3>
                    <p className="mt-3 text-sm">
                      {position?.gqlPositionFields?.underrubrik || ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-end space-x-3">
                    <p>Läs mer</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <rect fill="none" height="24" width="24" />
                      <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                    </svg>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AvailablePositions;
