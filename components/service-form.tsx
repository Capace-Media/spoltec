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
  >("error");

  const readableLocation = useMemo(
    () => (props.slug ? getReadableLocation(props.slug) : null),
    [props.slug]
  );

  const readableService = useMemo(
    () => (props.slug ? getReadableService(props.slug) : null),
    [props.slug]
  );

  const defaultValues = {
    name: "Rick Centerhall",
    email: "rick@spoltec.se",
    message: "Hej, jag vill ha en offert på avloppsspolning",
    phone: "07070070707",
    subject:
      readableService && readableLocation
        ? `${readableService} i ${readableLocation}`
        : props.subject,
  } as TContactSchema;

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      const transformedData = contactSchema.parse(value);

      const response = await fetch("/api/contact-form", {
        method: "POST",
        body: JSON.stringify(transformedData),
      });

      console.log("RESPONSE => ", response);

      if (!response.ok) {
        console.log("Form submission failed", response);
        setStatus("error");
      }

      console.log("Form submitted successfully!");
      setStatus("success");
    },
  });

  // Debug form state
  console.log("Form state:", {
    isSubmitting: form.state.isSubmitting,
    isSubmitSuccessful: form.state.isSubmitSuccessful,
    canSubmit: form.state.canSubmit,
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
