import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export default function FieldErrors({ meta }: FieldErrorsProps) {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ZodError, index) => (
    <p
      key={index}
      className="text-destructive text-sm font-medium absolute bg-card shadow-lg rounded-lg p-2 z-10"
    >
      {message}
    </p>
  ));
}
