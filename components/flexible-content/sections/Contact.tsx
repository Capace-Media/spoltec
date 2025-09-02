import { Phone, Mail, Address } from "../../icons";

const Contact = () => {
  return (
    <section className="contain-outer section">
      <div className={`section`}>
        <div className="contain">
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <p>
              Vill du veta mer om Spoltecmetoden, önskar rådgivning eller vill
              komma i kontakt med oss kring ett
              <br /> pågående projekt är du varmt välkommen att höra av dig till
              oss via följande kontaktuppgifter. Du
              <br /> kan också kontakta oss eller din kommun vid frågor kring
              oljeavskiljare och provtagning av vatten.
              <br /> Nya kunder når oss enklast via mejl där vi också mottar
              beställningar samt kan erbjuda ytterligare
              <br /> information om våra tjänster.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <a
                id="contact-tel"
                href="tel:040474012"
                className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
              >
                <Phone />
                <p className="font-semibold">040 - 47 40 12</p>
              </a>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
              <a
                id="contact-mail"
                href="mailto:info@spoltec.se"
                className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
              >
                <Mail />
                <p className="font-semibold">info@spoltec.se</p>
              </a>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
              <a
                id="contact-address"
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/place/Spoltec+S%C3%B6dra+AB/@55.8321596,13.32522,15z/data=!4m5!3m4!1s0x0:0x908ee730d7835c04!8m2!3d55.8321596!4d13.32522"
                className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
              >
                <Address />
                <p className="font-semibold text-center">
                  Grävmaskinsvägen 2, <br />
                  241 38 Eslöv
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
