import parse from "html-react-parser";
import Image from "next/image";

import ServiceContactForm from "../service-contact-form";
interface ServiceHeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
}

const ServiceHero = ({ image, title, subtitle, text }: ServiceHeroProps) => {
  return (
    <>
      <section className="relative pt-40 contain-outer">
        <div className="overflow-hidden bg-black bg-section rounded-xl">
          {image && (
            <Image
              src={image}
              fill
              style={{
                objectFit: "cover",
                opacity: "0.4",
              }}
              alt={title}
            />
          )}

          <div className="flex flex-col gap-10 lg:flex-row contain lg:gap-20">
            <div className="max-w-lg text-white">
              <h1 className="text-white">{title}</h1>
              <strong className="block mb-3">{subtitle}</strong>
              {text && parse(text)}
            </div>
            <ServiceContactForm subject={title} />
          </div>
        </div>
      </section>
      {/* <Blocks blocks={} /> */}
    </>
  );
};

export default ServiceHero;
