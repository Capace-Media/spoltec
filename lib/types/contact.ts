import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  email: z.email("Ange en giltig e-postadress"),
  message: z.string().min(1, "Meddelande är obligatoriskt"),
  phone: z.string().min(1, "Telefonnummer är obligatoriskt"),
  subject: z.string().min(1, "Ämne är obligatoriskt"),
  website: z.string().optional(),
});

export type TContactSchema = z.infer<typeof contactSchema>;
