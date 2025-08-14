import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

interface TextImageProps {
  data: any;
  ordinal: number;
}

const TextImage = ({ data, ordinal }: TextImageProps) => {
  console.log(ordinal);
  return (
    <section className="contain-outer section" data-ordinal={ordinal}>
      <div
        className={`text-image ${
          data?.installningar?.bakgrund ? "bg-section" : "section"
        }`}
      >
        <div className="section-sm contain ">
          <div
            className={`flex flex-col gap-20 ${
              ordinal % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
          >
            <div className="flex items-center w-full">
              <div>
                <h2>{data.textBody.rubrik}</h2>
                <div className="parsed pb-10">
                  {data?.textBody?.text && parse(data.textBody.text)}
                </div>
                {data?.textBody?.knapp?.url && (
                  <Link
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" })
                    )}
                    href={data.textBody.knapp.url}
                  >
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextImage;
