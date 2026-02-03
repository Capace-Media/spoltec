import handleParse from "@lib/utils/parse";
import Image from "next/image";

interface BlurbsProps {
  data: any;
}

const Blurbs = ({ data }: BlurbsProps) => {
  // Grid mapping based on number of blurbs
  const getGridColumns = (count: number): string => {
    const gridMapping: { [key: number]: string } = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-3",
      6: "md:grid-cols-3",
      7: "md:grid-cols-3",
      8: "md:grid-cols-4",
      9: "md:grid-cols-3",
      16: "md:grid-cols-4",
    };

    return gridMapping[count] || "md:grid-cols-3";
  };

  const blurbCount = data?.blurbs?.length || 0;

  return (
    <section className="contain-outer">
      <div
        className={`${data.installningar.bakgrund ? "bg-section mt-4 mb:mt-8" : "section"
          }`}
      >
        <div className={`${data.installningar.bakgrund ? "contain" : ""}`}>
          <div>
            {data?.blurbText && (
              <div className="max-w-[95%] md:max-w-[65%] lg:max-w-[52%] md:mx-auto md:text-center pb-6 parsed">
                {handleParse(data.blurbText)}
              </div>
            )}
            <ul
              className={`grid gap-5 md:gap-10 ${data?.blurbText ? "mt-8" : ""
                } ${getGridColumns(blurbCount)}`}
            >
              {data.blurbs.map((blurb: any, index: number) => (
                <li
                  key={blurb?.rubrik || blurb?.underrubrik || blurb?.text}
                  className={`${blurbCount === 2
                      ? "flex flex-col justify-center items-center"
                      : ""
                    }`}
                >
                  {blurb.bild && (
                    <div className="block mb-5 h-auto w-12">
                      <Image
                        src={blurb?.bild?.mediaItemUrl}
                        alt={
                          blurb?.bild?.altText ||
                          blurb?.rubrik ||
                          data?.rubrik ||
                          "Service icon"
                        }
                        width={blurb?.bild?.mediaDetails?.width}
                        height={blurb?.bild?.mediaDetails?.height}
                        className="object-contain h-auto w-full"
                        sizes="48px"
                      />
                    </div>
                  )}
                  {blurb.rubrik && (
                    <h3 className={`text-lg pb-1 text-heading`}>
                      {blurb.rubrik}
                    </h3>
                  )}
                  {blurb.underrubrik && (
                    <span className="mb-3 text-brand-orange text-sm ">
                      {blurb.underrubrik}
                    </span>
                  )}
                  {blurb.text && (
                    <div className="parsed">{handleParse(blurb.text)}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blurbs;
