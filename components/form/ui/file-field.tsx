import React from "react";

import { useFieldContext } from "../useAppForm";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import FieldErrors from "./field-error";

type FileFieldProps = {
  label: string;
  description?: string;
  optional?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value">;

export default function FileField({
  label,
  description,
  optional = false,
  ...inputProps
}: FileFieldProps) {
  const field = useFieldContext<File | null>();

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-2 w-full">
        <Label htmlFor={field.name}>
          {label} {!optional ? <span className="text-destructive">*</span> : ""}
        </Label>
        <Input
          id={field.name}
          type="file"
          className="h-auto py-2 file:mr-3 file:rounded-md file:border file:px-3 file:py-1"
          aria-invalid={
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          }
          onChange={(e) => field.handleChange(e.target.files?.[0] ?? null)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
