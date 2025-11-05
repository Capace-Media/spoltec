import { Separator } from "components/ui/separator";
import footerLinks from "@data/footerlinks.json";
import { CallToAction } from "components/flexible-content/sections";

import { Facebook, Linkedin } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <CallToAction />

      <section
        className="grid gap-10 md:grid-cols-2 contain section"
        aria-labelledby="contact-heading"
      >
        <div className="text-center md:text-left">
          <h2 id="contact-heading">
            Har ni ett pågående avloppsproblem eller vill ni börja arbeta
            förebyggande?
          </h2>
          <p>
            Vi hjälper er! Kontakta Spoltec idag för professionell avloppsteknik
            i Skåne.
          </p>
        </div>
        <address className="text-center md:text-right not-italic">
          <a
            href="tel:+4640474012"
            className="text-4xl hover:underline hover:text-brand-blue"
          >
            040-47 40 12
          </a>
          <a
            href="mailto:info@spoltec.se"
            className="hover:underline hover:text-brand-blue"
          >
            <p>info@spoltec.se</p>
          </a>
        </address>
      </section>
      <div className="mb-5 overflow-hidden contain-outer rounded-xl">
        <div className="pb-10 bg-section">
          <div className="contain">
            <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-2 lg:gap-10 gap-6 pb-6 lg:pb-10">
              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="block mb-3 font-bold text-lg">
                  Spoltec Södra AB
                </h3>
                <p className="pb-4 lg:pr-16">
                  Vårt företag startades 1991 och verksamheten drivs idag vidare
                  av en ägargrupp som har fokus på utveckling och nytänkande.
                  Styrkan ligger i vår kompetenta personal, miljötänkande,
                  garantier och säkerhet för våra kunder. Vi erbjuder ett brett
                  utbud av{" "}
                  <Link
                    href="/tjanster"
                    className="hover:text-brand-blue underline text-blue-600 font-normal"
                  >
                    avloppstjänster i Skåne
                  </Link>
                  .
                </p>
                {/* <a
                  href="https://www.uc.se/risksigill2/?showorg=556712-5363&language=swe&special="
                  title="Sigillet är utfärdat av UC AB. Klicka på bilden för information om UC:s Riskklasser."
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    src="https://www.uc.se/ucsigill2/sigill?org=556712-5363&language=swe&product=lsa&special=&fontcolor=b&type=svg"
                    alt="God Kreditvärdighet - UC Riskklass"
                    height={70}
                    width={310}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </a> */}
              </div>
              <nav aria-labelledby="privat-heading">
                <h3
                  id="privat-heading"
                  className="block mb-3 font-bold text-lg"
                >
                  Privat
                </h3>
                <ul className="space-y-[6px]" role="list">
                  {footerLinks?.privat?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={index + link?.href + link?.label}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Läs mer om ${link?.label} för privatpersoner`}
                          title={`${link?.label} - Avloppstjänster för privatpersoner i Skåne`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <nav aria-labelledby="foretag-heading">
                <h3
                  id="foretag-heading"
                  className="block mb-3 font-bold text-lg"
                >
                  Företag
                </h3>
                <ul className="space-y-[6px]" role="list">
                  {footerLinks?.foretag?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={link?.href + index + link?.label}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Läs mer om ${link?.label} för företag`}
                          title={`${link?.label} - Avloppstjänster för företag i Skåne`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <nav aria-labelledby="information-heading">
                <h3
                  id="information-heading"
                  className="block mb-3 font-bold text-lg"
                >
                  Information
                </h3>
                <ul className="space-y-[6px]" role="list">
                  {footerLinks?.information?.map((link: any, index) => {
                    return (
                      <li
                        className="hover:text-brand-blue"
                        key={link?.href + link?.label + index}
                      >
                        <Link
                          href={link?.href}
                          aria-label={`Läs mer om ${link?.label}`}
                          title={`${link?.label} - Spoltec avloppsteknik`}
                        >
                          {link?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <Separator />
            <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-2 lg:gap-10 gap-6 py-6 lg:py-10">
              <div>
                <h3 className="block mb-3 font-bold text-lg">
                  Spoltec Södra AB – Stockholm/Mälardalen
                </h3>
                <ul className="space-y-[6px]" role="list">
                  <li>
                    <a
                      href="https://www.google.com/maps/place/Ranhammarsv%C3%A4gen+20e,+168+67+Bromma/@59.3507454,17.9549415,16z/data=!3m1!4b1!4m6!3m5!1s0x465f9dfc62e85167:0xc8a875da5805589c!8m2!3d59.3507428!4d17.9598124!16s%2Fg%2F11nns94_q5?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>Ranhammarsvägen 20E</span>
                      <span>168 67 Bromma</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+46103333367"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>Växel: 010-333 33 67</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+47840025050"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>Direktnummer: 08-400 250 50</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:stockholm@spoltec.se"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>E-post: stockholm@spoltec.se</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-2">
                <h3 className="block mb-3 font-bold text-lg">
                  Spoltec Södra AB – Skåne/Eslöv
                </h3>
                <ul className="space-y-[6px]" role="list">
                  <li>
                    <a
                      href="https://www.google.com/maps/place/Spoltec+S%C3%B6dra+AB/@55.8321596,13.32522,15z/data=!4m5!3m4!1s0x0:0x908ee730d7835c04!8m2!3d55.8321596!4d13.32522"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>Grävmaskinsvägen 2</span>
                      <span>241 38 Eslöv</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+4640474012"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>Växel: 040 - 47 40 12</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="mailto:info@spoltec.se"
                      className="hover:text-brand-blue hover:underline font-normal flex flex-col"
                    >
                      <span>E-post: info@spoltec.se</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col items-center justify-between space-y-3 text-sm md:flex-row pt-10">
              <div>
                Copyright © <span>Spoltec Södra AB</span>{" "}
                {new Date().getFullYear()} - Avloppsteknik i Skåne
              </div>
              <nav
                aria-label="Sociala medier"
                className="flex h-5 items-center space-x-4 text-sm"
              >
                <a
                  href="https://www.linkedin.com/company/spoltec-södra-ab/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Följ Spoltec på LinkedIn"
                  title="Spoltec LinkedIn - Avloppsteknik Skåne"
                >
                  <Linkedin />
                  <span className="sr-only">Besök vår LinkedIn</span>
                </a>
                <Separator orientation="vertical" />
                <a
                  href="https://www.facebook.com/spoltec"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Följ Spoltec på Facebook"
                  title="Spoltec Facebook - Avloppsteknik Skåne"
                >
                  <Facebook />
                  <span className="sr-only">Besök vår Facebook</span>
                </a>
              </nav>
              <div>
                Byggd med{" "}
                <span className="text-brand-orange contrast-more:text-[#363636]">
                  ♥
                </span>{" "}
                av{" "}
                <a
                  className="hover:underline"
                  href="https://capace.se"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Capace Media - Webbyrå Malmö"
                >
                  Capace Media | Webbyrå Malmö
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
