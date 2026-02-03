import type { TextBildBlock } from "@lib/types/page";
import { cn } from "@lib/utils";
import handleParse from "@lib/utils/parse";
import { buttonVariants } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TextImageProps {
  data: TextBildBlock | any;
  ordinal: number | undefined;
}

export default function TextImage(props: TextImageProps) {
  if (!props?.data?.textBody?.rubrik) return null;
  const isbackground = props?.data?.installningar?.bakgrund;
  const iseven = props.ordinal && props.ordinal % 2 === 0;
  return (
    <section className="contain-outer section" data-ordinal={props.ordinal}>
      <div
        className={cn(
          "",
          isbackground
            ? "bg-brand-lightblue rounded-xl p-4 md:px-8 md:py-12 lg:py-24"
            : ""
        )}
      >
        <div>
          <div
            className={cn(
              "flex flex-col gap-4 md:flex-row md:gap-10",
              iseven ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="md:w-full ">
              {props?.data?.bilder && props?.data?.bilder[0]?.mediaItemUrl && (
                <Image
                  src={props.data.bilder[0].mediaItemUrl}
                  height={props.data.bilder[0].mediaDetails.height}
                  width={props.data.bilder[0].mediaDetails.width}
                  className="object-contain rounded-xl"
                  alt={props.data.bilder[0]?.altText || ""}
                  sizes="(max-width: 768px) 92vw, (max-width: 1400px) 45vw, 615px"
                />
              )}
            </div>
            <div className="md:flex md:flex-col md:justify-center md:w-full">
              <div>
                <h2>{props.data.textBody.rubrik}</h2>
                {props.data?.textBody?.text && (
                  <div className="parsed pb-4 lg:max-w-[80%]">
                    {handleParse(props.data.textBody.text)}
                  </div>
                )}

                {props.data?.textBody?.knapp?.url && (
                  <div>
                    <Link
                      className={cn(
                        "w-full md:w-fit",
                        buttonVariants({ variant: "default", size: "lg" })
                      )}
                      href={props.data.textBody.knapp.url}
                      aria-label={`Läs mer om ${props.data.textBody.rubrik}`}
                    >
                      {props.data.textBody.knapp.text}
                      <span className="sr-only">
                        Läs mer om {props.data.textBody.rubrik}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
