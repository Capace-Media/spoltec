"use client";
import { submitContactForm } from "actions/contact";
import { useState, useMemo } from "react";
import { Button } from "./ui/button";

// Move constants outside component to avoid recreation
const LOCATION_MAP: { [key: string]: string } = {
  boras: "Borås",
  goteborg: "Göteborg",
  malmo: "Malmö",
  helsingborg: "Helsingborg",
  kalmar: "Kalmar",
  karlskrona: "Karlskrona",
  kristianstad: "Kristianstad",
  halmstad: "Halmstad",
  varberg: "Varberg",
  vaxjo: "Växjö",
  jonkoping: "Jönköping",
};

// Add service mapping
const SERVICE_MAP: { [key: string]: string } = {
  avloppsspolning: "Avloppsspolning",
  relining: "Relining",
  oljeavskiljare: "Oljeavskiljare",
  rorinspektion: "Rörinspektion",
  kanaltatning: "Kanaltätning",
  kvicksilversanering: "Kvicksilversanering",
};

// Pre-compile regex outside component
const LOCATION_REGEX =
  /-(boras|goteborg|malmo|helsingborg|kalmar|karlskrona|kristianstad|halmstad|varberg|vaxjo|jonkoping)$/;

// Add service regex - matches service at the beginning of slug
const SERVICE_REGEX =
  /^(avloppsspolning|relining|oljeavskiljare|rorinspektion|kanaltatning|kvicksilversanering)/;

// Move function outside component to avoid recreation
const getReadableLocation = (slug: string): string | null => {
  const match = slug.match(LOCATION_REGEX);
  if (match) {
    return LOCATION_MAP[match[1] as keyof typeof LOCATION_MAP] || null;
  }
  return null;
};

// Add service extraction function
const getReadableService = (slug: string): string | null => {
  const match = slug.match(SERVICE_REGEX);
  if (match) {
    return SERVICE_MAP[match[1] as keyof typeof SERVICE_MAP] || null;
  }
  return null;
};

interface ServiceContactFormProps {
  subject: string;
  slug?: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({
  subject,
  slug,
}) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Memoize both location and service calculations
  const readableLocation = useMemo(
    () => (slug ? getReadableLocation(slug) : null),
    [slug]
  );

  const readableService = useMemo(
    () => (slug ? getReadableService(slug) : null),
    [slug]
  );

  // Handle form submission with server action
  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    setErrorMessage(null);

    // Check honeypot field
    const honeypot = formData.get("honeypot") as string;
    if (honeypot !== "") {
      setStatus("error");
      setErrorMessage("Submission failed. Possible bot detected.");
      return;
    }

    let newsubject;

    if (readableService && readableLocation) {
      newsubject = `${readableService} i ${readableLocation}`;
    } else {
      newsubject = subject;
    }

    // Add subject to form data
    formData.append("subject", newsubject);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus("success");
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong");
      }
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className=" flex items-center justify-center w-full">
      <div className=" shadow-xl w-full bg-background p-6 lg:max-w-[399px] rounded-lg">
        <h2 className="text-brand-blue font-bold text-[18px] mb-2">
          Få kostnadsfri offert på professionell
          {readableService ? ` ${readableService.toLowerCase()}` : " service"}
          {readableLocation ? ` i ${readableLocation}` : ""}
        </h2>
        <p className="text-brand-blue text-sm mb-4">
          Certifierade tekniker kontaktar dig inom 24 timmar
        </p>
        <form id="contact-form" action={handleSubmit} className="space-y-4">
          {/* Honeypot Field (Hidden) */}
          <div style={{ display: "none" }}>
            <label htmlFor="honeypot">Do not fill this field</label>
            <input
              type="text"
              name="honeypot"
              id="honeypot"
              className="honeypot"
            />
          </div>

          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Ditt fullständiga namn"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="text"
              name="phone"
              id="phone"
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Telefonnummer för kontakt"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="E-postadress"
              required
            />
          </div>

          {/* Message Field */}
          <div className="sm:col-span-2">
            <textarea
              name="message"
              id="message"
              className="block p-2.5 w-full text-sm text-brand-blue bg-gray-50 rounded-lg shadow-xs border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Beskriv ditt avloppsproblem eller dina behov..."
              rows={4}
            ></textarea>
          </div>

          {/* Submission Status Messages */}
          {status === "error" && (
            <p className="text-red-500">Fel: {errorMessage}</p>
          )}
          {status === "success" && (
            <p className="text-green-500">
              Tack! Vi kontaktar dig inom 24 timmar.
            </p>
          )}

          {/* Submit Button */}

          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="w-full"
          >
            {status === "loading"
              ? "Skickar förfrågan..."
              : "Få gratis offert nu"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ServiceContactForm;
