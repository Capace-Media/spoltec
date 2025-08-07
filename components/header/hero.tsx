import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
}

const Hero = ({ image, title, subtitle, text }: HeroProps) => {
  return (
    <>
      <section className="relative pt-[138px] contain-outer">
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

          <div className="flex items-center contain h-96">
            <div className="max-w-lg text-white">
              <h1 className="text-white">{title}</h1>
              <strong className="block mb-3">{subtitle}</strong>
              {text && parse(text)}
              <div>
                <Link
                  className="inline-block mt-10 btn bg-brand-orange "
                  href="/kontakta-oss"
                >
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
