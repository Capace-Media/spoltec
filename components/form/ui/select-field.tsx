import React from "react";

import { useFieldContext } from "../useAppForm";
import { Label } from "@components/ui/label";
import FieldErrors from "./field-error";
import { NativeSelect, NativeSelectOption } from "@components/ui/native-select";

type TextFieldProps = {
  label: string;
  labelHidden?: boolean;
  disablFieldError?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function TextField({
  label,
  labelHidden = false,
  disablFieldError = false,
  options,
  placeholder,
  ...inputProps
}: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-2 w-full">
        <Label htmlFor={field.name} className={labelHidden ? "sr-only" : ""}>
          {label} <span className="text-destructive">*</span>
        </Label>
        <NativeSelect
          id={field.name}
          aria-invalid={
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          }
          className="w-full"
          defaultValue=""
          value={field.state.value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            field.handleChange(e.target.value)
          }
          {...inputProps}
        >
          <NativeSelectOption value="" disabled selected>
            {placeholder || "Välj ett alternativ"}
          </NativeSelectOption>
          {options.map((option: { value: string; label: string }) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      {!disablFieldError && <FieldErrors meta={field.state.meta} />}
    </div>
  );
}
