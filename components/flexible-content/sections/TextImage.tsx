import { cn } from "@lib/utils";
import handleParse from "@lib/utils/parse";
import { buttonVariants } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TextImageProps {
  data: any;
  ordinal: number | undefined;
}

const TextImage = ({ data, ordinal }: TextImageProps) => {
  if (!data.textBody.text) return null;
  return (
    <section className="contain-outer section" data-ordinal={ordinal}>
      <div
        className={`text-image ${
          data?.installningar?.bakgrund ? "bg-section" : ""
        }`}
      >
        <div
          className={
            data?.installningar?.bakgrund ? "py-5 md:py-10 contain " : ""
          }
        >
          <div
            className={`flex flex-col gap-20 ${
              ordinal && ordinal % 2 === 0
                ? "lg:flex-row"
                : "lg:flex-row-reverse"
            }`}
          >
            <div className="flex items-center w-full">
              <div>
                <h2>{data.textBody.rubrik}</h2>
                {data?.textBody?.text && (
                  <div className="parsed pb-10">
                    {handleParse(data.textBody.text)}
                  </div>
                )}

                {data?.textBody?.knapp?.url && (
                  <div>
                    <Link
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" })
                      )}
                      href={data.textBody.knapp.url}
                      aria-label={`Läs mer om ${data.textBody.rubrik}`}
                    >
                      {data.textBody.knapp.text}
                      <span className="sr-only">
                        Läs mer om {data.textBody.rubrik}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full hidden lg:block">
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
                            alt={image?.altText || "Text image"}
                            quality={75}
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                            alt={image?.altText || "Text image"}
                            quality={75}
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
