"use client";

import { contactSchema, type TContactSchema } from "@lib/types/contact";
import useAppForm from "./form/useAppForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  getReadableLocation,
  getReadableService,
} from "@lib/contact-form/utils";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";

interface ServiceContactFormProps {
  subject: string;
  slug?: string;
}

export default function ServiceForm(props: ServiceContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const readableLocation = useMemo(
    () => (props.slug ? getReadableLocation(props.slug) : null),
    [props.slug]
  );

  const readableService = useMemo(
    () => (props.slug ? getReadableService(props.slug) : null),
    [props.slug]
  );

  const defaultValues = {
    name: "",
    email: "",
    message: "",
    phone: "",
    subject:
      readableService && readableLocation
        ? `${readableService} i ${readableLocation}`
        : props.subject,
    website: "",
  } as TContactSchema;

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const transformedData = contactSchema.parse(value);

        const response = await fetch("/api/contact-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        });

        if (!response.ok) {
          console.log("Form submission failed", response);
          setStatus("error");
          return;
        }

        setStatus("success");
      } catch (error) {
        console.error("Form submission error:", error);
        setStatus("error");
      }
    },
  });

  return (
    <Card className="lg:max-w-[399px] lg:min-w-[399px] xl:max-w-[499px] xl:min-w-[399px] w-full ">
      <CardHeader>
        <CardTitle>
          Få kostnadsfri offert på professionell
          {readableService ? ` ${readableService.toLowerCase()}` : " service"}
          {readableLocation ? ` i ${readableLocation}` : ""}
        </CardTitle>
        <CardDescription>
          Certifierade tekniker kontaktar dig inom 24 timmar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Success Message */}
        {status === "success" ? (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Tack för din förfrågan!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Vi har mottagit din förfrågan och kommer att kontakta dig
                    inom 24 timmar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 0"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Fel: Vi har inte kunnat skicka din förfrågan. Vänligen försök
                  igen senare.
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <Button onClick={() => setStatus("idle")}>
                    Vänligen försök igen senare.
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : status === "loading" ? (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="animate-spin h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Skickar din förfrågan...
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Vänligen vänta medan vi skickar din förfrågan.</p>
                </div>
              </div>
            </div>
          </div>
        ) : status === "idle" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Ditt fullständiga namn"
                  name="name"
                  type="text"
                  placeholder="Anna Andersson"
                />
              )}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => (
                <field.TextField
                  label="Telefonnummer för kontakt"
                  name="phone"
                  type="text"
                  placeholder="070-123 45 67"
                />
              )}
            </form.AppField>
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  label="E-postadress"
                  name="email"
                  type="email"
                  placeholder="anna.andersson@email.se"
                />
              )}
            </form.AppField>
            <form.AppField name="message">
              {(field) => (
                <field.TextareaField
                  label="Beskriv vad ni behöver hjälp med"
                  name="message"
                  placeholder="Hej! Jag behöver hjälp med att rensa avloppet i köket. Det går långsamt och luktar illa. Kan ni komma och kolla?"
                />
              )}
            </form.AppField>
            <form.AppField name="website">
              {(field) => (
                <field.TextField
                  label="Webbplats"
                  name="website"
                  type="text"
                  placeholder="https://www.example.com"
                  hidden={true}
                  labelHidden={true}
                />
              )}
            </form.AppField>
            <form.AppForm>
              <form.SubmitButton className="w-full">
                Få gratis offert nu
              </form.SubmitButton>
            </form.AppForm>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
