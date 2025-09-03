import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
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
  // Generate descriptive alt text instead of just using title
  const altText = image ? `${title} - Spoltec avloppstjänster` : "";

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
              alt={altText}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              // Add loading optimization
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
