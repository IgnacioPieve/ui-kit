import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

/**
 * El pie de un editor: pegado abajo en el teléfono, una fila más en escritorio.
 *
 * **El sangrado negativo tiene que ser exactamente el padding del `container`**
 * —1rem abajo de `sm`— para que la barra llegue de borde a borde sin pasarse.
 * Y por eso vive acá: ese padding es una decisión del preset, no de la app.
 * Escrito a mano en dos apps, una lo puso en `-mx-6` contra un container de
 * `px-4` y la página entera se iba 16px de costado en un iPhone —con el build
 * en verde, sin error, y sin nada cerca del botón que lo explicara—.
 *
 * Envuelve, además: son botones con `whitespace-nowrap`, así que tres de ellos
 * no se achican, se van.
 */
export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t bg-background/90 px-4 py-3 backdrop-blur",
        "sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0",
        className
      )}
    >
      {children}
    </div>
  );
}
