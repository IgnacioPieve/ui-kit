import { cn } from "../lib/cn";
import { Skeleton } from "./ui/skeleton";

export interface SkeletonListProps {
  /** Cuántas filas fantasma. Las que entren en una pantalla, no más. */
  count?: number;
  /** Clases de cada fila; sirve sobre todo para darle el alto de la de verdad. */
  className?: string;
}

/**
 * La lista mientras carga: unas filas del alto que van a tener las reales.
 *
 * Cinco pantallas escribían el mismo `Array.from(...).map(<Skeleton />)` con
 * cinco largos y tres separaciones distintas, y tres más mostraban un spinner
 * centrado —que además de verse distinto colapsa el alto de la página y hace
 * saltar todo cuando llegan los datos—.
 *
 * `aria-hidden` porque no hay nada que leer: son cajas grises.
 */
export function SkeletonList({ count = 3, className }: SkeletonListProps) {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={cn("h-16 w-full", className)} />
      ))}
    </div>
  );
}
