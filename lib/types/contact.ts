import { z } from "zod";

export const LocationOptions = [
  { value: "boras", label: "Borås" },
  { value: "goteborg", label: "Göteborg" },
  { value: "malmo", label: "Malmö" },
  { value: "helsingborg", label: "Helsingborg" },
  { value: "kalmar", label: "Kalmar" },
  { value: "karlskrona", label: "Karlskrona" },
  { value: "kristianstad", label: "Kristianstad" },
  { value: "halmstad", label: "Halmstad" },
  { value: "varberg", label: "Varberg" },
  { value: "vaxjo", label: "Växjö" },
  { value: "jonkoping", label: "Jönköping" },
];

export const contactSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  location: z.enum(
    LocationOptions.map((option) => option.value) as [string, ...string[]]
  ),
  email: z.email("Ange en giltig e-postadress"),
  message: z.string().min(1, "Meddelande är obligatoriskt"),
  phone: z.string().min(1, "Telefonnummer är obligatoriskt"),
  subject: z.string().min(1, "Ämne är obligatoriskt"),
  website: z.string().optional(),
});

export type TContactSchema = z.infer<typeof contactSchema>;
