import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

export interface SpinnerProps {
  className?: string;
  /** Centra el spinner en un bloque con padding vertical. */
  center?: boolean;
}

export function Spinner({ className, center }: SpinnerProps) {
  const icon = (
    <Loader2 className={cn("h-5 w-5 animate-spin text-primary", className)} />
  );
  if (!center) return icon;
  return <div className="flex items-center justify-center py-12">{icon}</div>;
}
