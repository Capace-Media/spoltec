import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
interface TextImageProps {
  data: any;
}

const TextImage = ({ data }: TextImageProps) => {
  console.log("data.bilder =====>", data?.bilder?.length);
  return (
    <div className="contain-outer">
      <div
        className={`text-image ${
          data?.installningar?.bakgrund ? "bg-section" : "section"
        }`}
      >
        <div className="section-sm contain">
          <div className="grid gap-20 md:grid-cols-2">
            <div className="flex items-center">
              <div>
                <h2>{data.textBody.rubrik}</h2>
                <div className="parsed">
                  {data.textBody.text && parse(data.textBody.text)}
                </div>
                {data.textBody.knapp.url && (
                  <Link className="mt-10 btn" href={data.textBody.knapp.url}>
                    {data.textBody.knapp.text}
                  </Link>
                )}
              </div>
            </div>
            {data?.bilder?.length > 1 ? (
              <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[500px]">
                {data?.bilder &&
                  data.bilder.map((image: any, index: any) => (
                    <div
                      key={image?.mediaItemUrl || index}
                      data-image={index}
                      className="relative overflow-hidden rounded-xl"
                    >
                      {image?.mediaItemUrl && (
                        <Image
                          src={image.mediaItemUrl}
                          fill
                          style={{
                            objectFit: "cover",
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
                      className="relative overflow-hidden w-full h-full"
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
  );
};

export default TextImage;
