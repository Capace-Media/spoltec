import { z } from "zod";

/** Kept below Vercel's request body limit, since the CV is uploaded inline. */
export const MAX_CV_BYTES = 4 * 1024 * 1024;

export const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const applicationSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  email: z.email("Ange en giltig e-postadress"),
  phone: z.string().min(1, "Telefonnummer är obligatoriskt"),
  message: z.string().min(1, "Meddelande är obligatoriskt"),
  linkedin: z.string().optional(),
  /** Title of the job opening the application belongs to. */
  position: z.string().min(1, "Tjänst är obligatoriskt"),
  positionUrl: z.string().optional(),
  website: z.string().optional(),
});

export const cvFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_CV_BYTES, "Filen får vara högst 4 MB")
  .refine(
    (file) => ACCEPTED_CV_TYPES.includes(file.type),
    "Ladda upp ditt CV som PDF eller Word-dokument"
  );

/** Client-side shape: same fields plus the CV that gets attached to the email. */
export const applicationFormSchema = applicationSchema.extend({
  cv: cvFileSchema.nullable(),
});

export type TApplicationSchema = z.infer<typeof applicationSchema>;
export type TApplicationFormSchema = z.infer<typeof applicationFormSchema>;
