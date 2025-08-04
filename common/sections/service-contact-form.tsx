"use client";
import { useState } from "react";

interface ServiceContactFormProps {
  subject: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({ subject }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    honeypot: "", // Honeypot field
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    // If honeypot field is filled, it's likely a bot
    if (formData.honeypot !== "") {
      setStatus("error");
      setErrorMessage("Submission failed. Possible bot detected.");
      return;
    }

    try {
      const response = await fetch("/api/service/contact/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, subject }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        honeypot: "", // Reset honeypot field
      });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot Field (Hidden) */}
          <div style={{ display: "none" }}>
            <label htmlFor="honeypot">Do not fill this field</label>
            <input
              type="text"
              id="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="honeypot"
            />
          </div>

          {/* Name Field */}
          <div>
            {/* <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-brand-blue"
            >
              Namn
            </label> */}
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Ditt namn"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            {/* <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-brand-blue"
            >
              Telefon
            </label> */}
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Telefon"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            {/* <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-brand-blue"
            >
              E-post
            </label> */}
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-brand-blue text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="E-post"
              required
            />
          </div>

          {/* Message Field */}
          <div className="sm:col-span-2">
            {/* <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-brand-blue"
            >
              Meddelande
            </label> */}
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
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
            <button
              type="submit"
              className="btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Skickar..." : "Skicka förfrågan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceContactForm;
