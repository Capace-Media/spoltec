import { z } from "zod";

export const LocationOptions = [
  { value: "Malmö", label: "Malmö" },
  { value: "Göteborg", label: "Göteborg" },
  { value: "Helsingborg", label: "Helsingborg" },
  { value: "Borås", label: "Borås" },
  { value: "Kristianstad Eslöv", label: "Kristianstad Eslöv" },
  { value: "Jönköping", label: "Jönköping" },
  { value: "Kalmar", label: "Kalmar" },
  { value: "Karlskrona", label: "Karlskrona" },
  { value: "Varberg", label: "Varberg" },
  { value: "Växjö", label: "Växjö" },
  { value: "Stockholm", label: "Stockholm" },
  { value: "Övrigt", label: "Övrigt" },
];

export const contactSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  address: z.string().min(3, "Adress är obligatoriskt"),
  zip: z.string().optional(),
  city: z.string().min(3, "Ort är obligatoriskt"),
  email: z.email("Ange en giltig e-postadress"),
  message: z.string().min(1, "Meddelande är obligatoriskt"),
  phone: z.string().min(1, "Telefonnummer är obligatoriskt"),
  subject: z.string().min(1, "Ämne är obligatoriskt"),
  website: z.string().optional(),
});

export type TContactSchema = z.infer<typeof contactSchema>;
