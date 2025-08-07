import handleParse from "@lib/utils/parse";
import Image from "next/image";

interface BlurbsProps {
  data: any;
}

const Blurbs = ({ data }: BlurbsProps) => {
  return (
    <section className="contain-outer">
      <div
        className={`${data.installningar.bakgrund ? "bg-section" : "section"}`}
      >
        <div className="contain">
          <div>
            {data?.blurbText && (
              <div className="max-w-[85%] mx-auto text-center">
                {handleParse(data.blurbText)}
              </div>
            )}
            <div
              className={`grid  gap-5 md:gap-10 ${
                data?.blurbText ? "mt-20" : ""
              } ${
                data.blurbs.length == 4
                  ? "md:grid-cols-4"
                  : data?.blurbs?.length == 2
                  ? "md:grid-cols-2"
                  : data?.blurbs?.length == 6
                  ? "md:grid-cols-3"
                  : "md:grid-cols-3"
              }`}
              role="list"
            >
              {data.blurbs.map((blurb: any, index: number) => (
                <div
                  key={blurb?.rubrik || blurb?.underrubrik || blurb?.text}
                  className={`${
                    data?.blurbs?.length == 2
                      ? "flex flex-col justify-center items-center"
                      : ""
                  }`}
                  role="listitem"
                >
                  {blurb.bild && (
                    <figure
                      className="block w-10 h-10 mb-5 md:w-14 md:h-14 relative"
                      role="img"
                      aria-labelledby={`blurb-${index}-title`}
                    >
                      <Image
                        src={blurb?.bild?.mediaItemUrl}
                        alt={
                          blurb?.bild?.altText ||
                          blurb?.rubrik ||
                          data?.rubrik ||
                          "Service icon"
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(max-width: 768px) 40px, 56px"
                        loading={index < 3 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </figure>
                  )}
                  {blurb.rubrik && (
                    <h3
                      className={`text-lg ${
                        blurb.bild ? "text-brand-blue" : "text-brand-orange"
                      }`}
                    >
                      {blurb.rubrik}
                    </h3>
                  )}
                  {blurb.underrubrik && (
                    <h4 className="mb-3">{blurb.underrubrik}</h4>
                  )}
                  {handleParse(blurb.text)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blurbs;
