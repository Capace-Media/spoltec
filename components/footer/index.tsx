"use client";
import { Separator } from "components/ui/separator";
import footerLinks from "@data/footerlinks.json";
import { CallToAction } from "components/flexible-content/sections";

import { Facebook, Linkedin } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const pathname = usePathname();

  return (
    <footer>
      {pathname === "/serviceavtal" ||
      pathname === "/karriar" ||
      pathname === "/kontakta-oss" ? null : (
        <CallToAction />
      )}
      <div className="grid gap-10 md:grid-cols-2 contain section">
        <div className="text-center md:text-left">
          <h2>
            Har ni ett pågående avloppsproblem eller vill ni börja arbeta
            förebyggande?
          </h2>
          <p>Vi hjälper er! Kontakta Spoltec idag.</p>
        </div>
        <div className="text-center md:text-right">
          <a href="tel:040474012">
            <h3 className="text-4xl">040-47 40 12</h3>
          </a>
          <a href="mailto:info@spoltec.se">
            <p>info@spoltec.se</p>
          </a>
        </div>
      </div>
      <div className="mb-5 overflow-hidden contain-outer rounded-xl">
        <div className="pb-10 bg-section">
          <div className="contain">
            <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
              <div>
                <strong className="block mb-3">Spoltec Södra AB</strong>
                <p className="mb-6 pr-16">
                  Vårt företag startades 1991 och verksamheten drivs idag vidare
                  av en ägargrupp som har fokus på utveckling och nytänkande.
                  Styrkan ligger i vår kompetenta personal, miljötänkande,
                  garantier och säkerhet för våra kunder. Vi erbjuder ett brett
                  utbud av tjänster.
                </p>
                <a
                  href="https://www.uc.se/risksigill2/?showorg=556712-5363&language=swe&special="
                  title="Sigillet är utfärdat av UC AB. Klicka på bilden för information om UC:s Riskklasser."
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src="https://www.uc.se/ucsigill2/sigill?org=556712-5363&language=swe&product=lsa&special=&fontcolor=b&type=svg"
                    alt="God Kreditvärdighet"
                    height={70}
                    width={310}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 310px"
                  />
                </a>
              </div>
              <div>
                <strong className="block mb-3">Privat</strong>
                <ul className="space-y-[6px]">
                  {footerLinks?.privat?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={index + link?.href + link?.label}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Gå till ${link?.label}`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <strong className="block mb-3">Företag</strong>
                <ul className="space-y-[6px]">
                  {footerLinks?.foretag?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={link?.href + index + link?.label}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Gå till ${link?.label}`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <strong className="block mb-3">Information</strong>
                <ul className="space-y-[6px]">
                  {footerLinks?.information?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={link?.href + link?.label + index}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Gå till ${link?.label}`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col items-center justify-between space-y-3 text-sm md:flex-row pt-10">
              <div>Copyright © Spoltec Södra AB {new Date().getFullYear()}</div>
              <div className="flex h-5 items-center space-x-4 text-sm">
                <a
                  href="https://www.linkedin.com/company/spoltec-södra-ab/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin />
                  <span className="sr-only">Besök vår LinkedIn</span>
                </a>
                <Separator orientation="vertical" />
                <a
                  href="https://www.facebook.com/spoltec"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook />
                  <span className="sr-only">Besök vår Facebook</span>
                </a>
              </div>
              <div>
                Byggd med <span className="text-brand-orange">♥</span> av{" "}
                <a
                  className="hover:underline"
                  href="https://capace.se"
                  target="_blank"
                  rel="noreferrer"
                >
                  Capace Media | Webbyrå Malmö
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
