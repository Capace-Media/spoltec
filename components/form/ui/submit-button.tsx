import { useFormContext } from "@components/form/useAppForm";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={form.state.isSubmitting || !form.state.canSubmit}
      className={props.className}
    >
      {form.state.isSubmitting ? (
        <>
          <Spinner className="size-4 animate-spin" />
          {props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
}
