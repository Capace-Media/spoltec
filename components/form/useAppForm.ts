import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import TextField from "./ui/text-field";
import TextareaField from "./ui/textarea-field";
import SubmitButton from "./ui/submit-button";
import SelectField from "./ui/select-field";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export default useAppForm;
