import { cn } from "@lib/utils";
import { Phone, Mail, Address } from "../../icons";
import handleParse from "@lib/utils/parse";

interface ContactInformationProps {
  data: {
    text: any;
    installningar: {
      bakgrund: boolean;
    };
    orter: Array<{
      phone: string;
      email: string;
      address: string;
      location: string;
    }>;
    fieldGroupName: string;
  };
}

export default function ContactInformation(props: ContactInformationProps) {
  return (
    <section
      className={cn(
        "contain-outer flex flex-col gap-20 my-8",
        props.data.installningar.bakgrund && "bg-section",
      )}
    >
      <div className="max-w-[95%] md:max-w-[65%] lg:max-w-[52%] md:mx-auto md:text-center pb-6 parsed">
        {handleParse(props.data.text)}
      </div>
      {props.data.orter.map((ort, i) => (
        <div key={i} className="flex flex-col gap-4 items-center">
          <h3>{ort.location}</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {ort.phone && (
              <div className="flex flex-col items-center justify-center">
                <a
                  id="contact-tel"
                  href={`tel:${ort.phone.replace(/\s+|-/g, "")}`}
                  className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
                >
                  <Phone />
                  <p className="font-semibold">{ort.phone}</p>
                </a>
              </div>
            )}
            {ort.email && (
              <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
                <a
                  id="contact-mail"
                  href="mailto:info@spoltec.se"
                  className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
                >
                  <Mail />
                  <p className="font-semibold">{ort.email}</p>
                </a>
              </div>
            )}
            {ort.address && (
              <div className="flex flex-col items-center justify-center space-y-4 text-brand-blue">
                <a
                  id="contact-address"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.google.com/maps/place/Spoltec+S%C3%B6dra+AB/@55.8321596,13.32522,15z/data=!4m5!3m4!1s0x0:0x908ee730d7835c04!8m2!3d55.8321596!4d13.32522"
                  className="flex flex-col items-center justify-center space-y-4 text-brand-blue"
                >
                  <Address />
                  <p className="font-semibold text-center">{ort.address}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
