import * as React from "react";
import { cn } from "../../lib/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cuánto se lleva hecho, en las mismas unidades que `max`. */
  value: number;
  /** El total. Con el default de 100, `value` es directamente un porcentaje. */
  max?: number;
  /** Al llegar al total la barra pasa a verde: "esto ya está". */
  completeVariant?: boolean;
}

/**
 * Barra de progreso.
 *
 * Toma `value` y `max` crudos en vez de un porcentaje ya calculado porque casi
 * siempre lo que hay a mano son dos enteros (12 de 19 capítulos), y hacer la
 * división afuera invita a dividir por cero cuando el total todavía es 0.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, completeVariant = true, className, ...props }, ref) => {
    const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
    const complete = completeVariant && max > 0 && value >= max;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            complete ? "bg-success" : "bg-primary"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
