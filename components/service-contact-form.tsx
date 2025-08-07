"use client";
import { submitContactForm } from "actions/contact";
import { useState } from "react";
import { Button } from "./ui/button";

interface ServiceContactFormProps {
  subject: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({ subject }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Add subject to form data
    formData.append("subject", subject);

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
      <div className=" shadow-sm w-full bg-white p-6 lg:max-w-[399px] rounded-lg">
        <p className="text-brand-blue font-bold text-[18px]">
          Begär en gratis offert så hör vi av oss inom 24 timmar
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
              placeholder="Ditt namn"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Telefon"
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
              placeholder="E-post"
              required
            />
          </div>

          {/* Message Field */}
          <div className="sm:col-span-2">
            <textarea
              name="message"
              id="message"
              className="block p-2.5 w-full text-sm text-brand-blue bg-gray-50 rounded-lg shadow-xs border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Skriv ditt meddelande här..."
              rows={4}
            ></textarea>
          </div>

          {/* Submission Status Messages */}
          {status === "error" && (
            <p className="text-red-500">Fel: {errorMessage}</p>
          )}
          {status === "success" && (
            <p className="text-green-500">Ditt meddelande har skickats!</p>
          )}

          {/* Submit Button */}
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Skickar..." : "Skicka förfrågan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceContactForm;
