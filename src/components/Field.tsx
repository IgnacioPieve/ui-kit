import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Label } from "./ui/label";

export interface FieldProps {
  label: string;
  /** Para que el `<label>` apunte al control cuando es uno solo. */
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Un control con su título encima. La unidad de todo formulario y de todo
 * panel de filtros de la familia.
 *
 * Estaba escrito veintidós veces —`<div className="space-y-1.5"><Label …>`— en
 * siete archivos de cuatro apps. No es que costara escribirlo: es que cada
 * copia es una oportunidad de que una quede en `space-y-2`, y entonces dos
 * formularios de la misma familia respiran distinto sin que nadie sepa por qué.
 *
 * **El título va en `block`**, y eso no es cosmético: un `<label>` es inline,
 * así que al lado de un hijo inline —una cápsula de chips— se le sentaba en la
 * misma línea, mientras que al lado de un `<Input>` (block) quedaba arriba. El
 * mismo componente daba dos layouts según lo que le tocara adentro.
 *
 * **El `min-w-0`** deja que el campo se angoste cuando es celda de una grilla:
 * una celda mide `min-width: auto` —el ancho de su contenido— así que algo que
 * sabe scrollear adentro suyo ensanchaba la celda, la grilla y la página, y se
 * veía como el teléfono yéndose de costado.
 */
export function Field({ label, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cn("min-w-0 space-y-1.5", className)}>
      <Label className="block" htmlFor={htmlFor}>
        {label}
      </Label>
      {children}
    </div>
  );
}
