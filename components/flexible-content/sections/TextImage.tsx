import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
interface TextImageProps {
  data: any;
}

const TextImage = ({ data }: TextImageProps) => {
  return (
    <div className="contain-outer ">
      <div
        className={`text-image ${
          data?.installningar?.bakgrund ? "bg-section" : "section"
        }`}
      >
        <div className="section-sm contain ">
          <section
            id="infoSection"
            className="flex flex-col lg:flex-row gap-20"
          >
            <div className="flex items-center w-full">
              <div>
                <h2>{data.textBody.rubrik}</h2>
                <div className="parsed">
                  {data?.textBody?.text && parse(data.textBody.text)}
                </div>
                {data?.textBody?.knapp?.url && (
                  <Link className="mt-10 btn" href={data.textBody.knapp.url}>
                    {data.textBody.knapp.text}
                  </Link>
                )}
              </div>
            </div>
            <div className="w-full">
              {data?.bilder?.length > 1 ? (
                <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[500px]">
                  {data?.bilder &&
                    data.bilder.map((image: any, index: any) => (
                      <div
                        key={image?.mediaItemUrl || index}
                        data-image={index}
                        className="relative rounded-xl"
                      >
                        {image?.mediaItemUrl && (
                          <Image
                            src={image.mediaItemUrl}
                            fill
                            style={{
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                            alt={image?.altText}
                          />
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full h-full ">
                  {data?.bilder &&
                    data.bilder.map((image: any, index: any) => (
                      <div
                        key={image?.mediaItemUrl || index}
                        data-image={index}
                        className="relative w-full h-full"
                      >
                        {image?.mediaItemUrl && (
                          <Image
                            src={image.mediaItemUrl}
                            fill
                            style={{
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                            alt={image?.altText}
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TextImage;
