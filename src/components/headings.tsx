import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SectionHeadingProps {
  /** Emoji o icono a la izquierda. */
  icon?: ReactNode;
  children: ReactNode;
  /** Contenido alineado a la derecha (botones). */
  actions?: ReactNode;
  className?: string;
}

/** Título de sección dentro de una página. */
export function SectionHeading({
  icon,
  children,
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        {icon && <span aria-hidden>{icon}</span>}
        {children}
      </h3>
      {actions}
    </div>
  );
}

export interface MonthHeadingProps {
  children: ReactNode;
  className?: string;
}

/** Encabezado de un grupo por mes, con línea divisoria a la derecha. */
export function MonthHeading({ children, className }: MonthHeadingProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <h2 className="text-sm font-semibold text-muted-foreground">{children}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
