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
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={props.className}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-4 animate-spin mr-2" />
              Skickar...
            </>
          ) : (
            props.children
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}
