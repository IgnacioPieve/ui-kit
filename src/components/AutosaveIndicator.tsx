import { Check, CircleAlert, Loader2 } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";
import type { AutosaveStatus } from "../hooks/useAutosave";

export interface AutosaveIndicatorProps {
  status: AutosaveStatus;
  savingLabel?: string;
  savedLabel?: string;
  errorLabel?: string;
  className?: string;
}

/**
 * Feedback silencioso del autoguardado.
 *
 * A propósito no usa toasts: guardar es constante y un toast por campo sería
 * ruido. Esto vive al lado del título y solo se nota si lo mirás — salvo el
 * error, que sí se pinta en rojo porque ahí hay algo que hacer.
 */
export function AutosaveIndicator({
  status,
  savingLabel = labels.saving,
  savedLabel = labels.saved,
  errorLabel = labels.saveError,
  className,
}: AutosaveIndicatorProps) {
  if (status === "idle") return null;

  const content = {
    saving: { icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />, text: savingLabel },
    saved: { icon: <Check className="h-3.5 w-3.5" />, text: savedLabel },
    error: { icon: <CircleAlert className="h-3.5 w-3.5" />, text: errorLabel },
  }[status];

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-1.5 text-xs",
        status === "error" ? "text-destructive" : "text-muted-foreground",
        className
      )}
    >
      {content.icon}
      {content.text}
    </span>
  );
}
