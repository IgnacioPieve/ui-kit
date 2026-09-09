import type { ComponentType, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface EmptyStateProps {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  /** Acción sugerida (normalmente un `<Button />`). */
  action?: ReactNode;
  className?: string;
}

/** Caja punteada para listas vacías o búsquedas sin resultados. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border bg-card px-6 py-10 text-center sm:py-14",
        className,
      )}
    >
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon aria-hidden className="h-6 w-6 text-muted-foreground" />
        </span>
      )}
      <p className="font-medium">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
