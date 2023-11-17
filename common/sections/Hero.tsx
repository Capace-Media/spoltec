import parse from "html-react-parser";
import Image from "next/image";
import Blocks from "../components/Blocks";
interface HeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
}

const Hero = ({ image, title, subtitle, text }: HeroProps) => {
  const handleReadMore = () => {
    const el = document.querySelector("#content");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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

          <div className="flex items-center contain h-96">
            <div className="max-w-lg text-white">
              <h1 className="text-white">{title}</h1>
              <strong className="block mb-3">{subtitle}</strong>
              {text && parse(text)}
              <button
                onClick={() => handleReadMore()}
                className="block mt-10 btn bg-brand-orange"
              >
                Läs mer om <span className="lowercase">{title}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <Blocks blocks={} /> */}
    </>
  );
};

export default Hero;
