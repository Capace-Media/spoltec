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
import { useMemo } from "react";

interface ServiceContactFormProps {
  subject: string;
  slug?: string;
}

export default function ServiceForm(props: ServiceContactFormProps) {
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
  } as TContactSchema;

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async (data) => {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        body: JSON.stringify(data.value),
      });
      if (response.ok) {
        console.log("Form submitted successfully", response);
      } else {
        console.log("Form submission failed", response);
      }
    },
  });
  return (
    <Card className="lg:max-w-[399px] lg:min-w-[399px] xl:max-w-[499px] xl:min-w-[499px] w-full ">
      <CardHeader>
        <CardTitle>
          {" "}
          Få kostnadsfri offert på professionell
          {readableService ? ` ${readableService.toLowerCase()}` : " service"}
          {readableLocation ? ` i ${readableLocation}` : ""}
        </CardTitle>
        <CardDescription>
          Certifierade tekniker kontaktar dig inom 24 timmar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(e);
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
      </CardContent>
    </Card>
  );
}
