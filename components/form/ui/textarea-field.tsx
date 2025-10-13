import React from "react";

import { useFieldContext } from "../useAppForm";

import { Label } from "@components/ui/label";
import FieldErrors from "./field-error";
import { Textarea } from "@components/ui/textarea";

type TextareaFieldProps = {
  label: string;
  labelHidden?: boolean;
  disablFieldError?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextareaField({
  label,
  labelHidden = false,
  disablFieldError = false,
  ...inputProps
}: TextareaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label htmlFor={field.name} className={labelHidden ? "sr-only" : ""}>
          {label} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={field.name}
          aria-invalid={
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          }
          rows={4}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      {!disablFieldError && <FieldErrors meta={field.state.meta} />}
    </div>
  );
}
