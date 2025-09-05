import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
import { Star } from "lucide-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  image?: string;
  title: string;
  subtitle?: string;
  text?: string;
  usp?: { text: string }[];
}

const Hero = ({ image, title, subtitle, text, usp }: HeroProps) => {
  return (
    <>
      <section
        className="relative pt-[138px] contain-outer"
        aria-labelledby="hero-heading"
        role="banner"
      >
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
              priority
            />
          )}

          <div className="flex items-center contain h-96">
            <div className="max-w-lg text-white">
              <h1 className="text-white">{title}</h1>
              {subtitle && (
                <p className="block mb-3 font-bold text-lg">{subtitle}</p>
              )}
              {text && <div className="hero-description">{parse(text)}</div>}
              <div className="pt-10">
                {usp && usp.length > 0 && (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                    {usp?.map((item) => (
                      <li key={item.text} className="flex items-center gap-2">
                        <Star className="size-4" /> {item.text}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                  href="/kontakta-oss"
                  aria-label="Kontakta oss för mer information"
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
