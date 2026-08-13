import * as React from "react";
import { cn } from "../../lib/cn";

export interface ToggleGroupOption<T extends string> {
  value: T;
  /** Lo que se ve: texto, un icono, o los dos. */
  label: React.ReactNode;
  /** Texto accesible cuando el label es solo un icono. */
  title?: string;
  disabled?: boolean;
}

export interface ToggleGroupProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ToggleGroupOption<T>[];
  size?: "sm" | "default";
  /** Ocupa todo el ancho, repartiendo las opciones en partes iguales. */
  block?: boolean;
  className?: string;
  /** Etiqueta del grupo para lectores de pantalla. */
  label?: string;
}

/**
 * Control segmentado: varias opciones excluyentes, una elegida.
 *
 * Botones nativos y no Radix a propósito. El foco por tabulación entre botones
 * ya funciona, y la alternativa costaría una dependencia más en el kit para
 * ganar el roving tabindex — que en un grupo de dos o tres opciones no cambia
 * nada.
 *
 * Es la forma correcta para un puñado de opciones que se comparan de un
 * vistazo (👍/😐/👎, timeline/calendario). Con más de cuatro, o si las opciones
 * no entran en una línea, va un `Select`.
 */
export function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
  size = "default",
  block = false,
  className,
  label,
}: ToggleGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        block && "flex w-full",
        className
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-label={option.title}
            aria-pressed={selected}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
              size === "sm" ? "h-7 px-2 text-xs" : "h-8 px-3 text-sm",
              block && "flex-1",
              selected
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
