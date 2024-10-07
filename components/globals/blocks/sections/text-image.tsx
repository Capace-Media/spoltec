import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
interface TextBildProps {
  content: any;
}

const TextBild = ({ content }: TextBildProps) => {
  return (
    <div className="contain-outer">
      <div
        className={`text-image ${
          content?.installningar?.bakgrund ? "bg-section" : "section"
        }`}
      >
        <div className="section-sm contain ">
          <section id="infoSection" className="flex gap-20">
            <div className="flex items-center w-full">
              <div>
                <h2>{content?.textBody?.rubrik}</h2>
                <div className="parsed">
                  {content?.textBody?.text && parse(content?.textBody?.text)}
                </div>
                {content?.textBody?.knapp?.url && (
                  <Link
                    className="mt-10 btn"
                    href={content?.textBody?.knapp?.url}
                  >
                    {content?.textBody?.knapp?.text}
                  </Link>
                )}
              </div>
            </div>
            <div className="w-full">
              {content?.bilder?.length > 1 ? (
                <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[500px]">
                  {content?.bilder &&
                    content.bilder.map((image: any, index: any) => (
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
                  {content?.bilder &&
                    content.bilder.map((image: any, index: any) => (
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

export default TextBild;
