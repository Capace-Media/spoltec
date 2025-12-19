import { Loader2 } from "lucide-react";
import { Spinner } from "@components/ui/spinner";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="size-8" />
    </div>
  );
}
