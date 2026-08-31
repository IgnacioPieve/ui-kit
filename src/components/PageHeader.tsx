import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface PageHeaderProps {
  /**
   * El "Volver".
   *
   * Lo trae la app porque el kit no conoce el router: normalmente un
   * `<Button asChild variant="ghost" size="sm"><Link to="…">…</Link></Button>`,
   * o un botón con `onClick` cuando hay que volver por historia o vaciar el
   * autoguardado antes de irse.
   */
  back?: ReactNode;
  /** El nombre de la pantalla. Se corta con puntos suspensivos, no envuelve. */
  title?: string;
  /**
   * Lo que le está pasando a **esta** página: el indicador de autoguardado, el
   * estado de un ticket. Va pegado al título y no con las acciones, porque no
   * es algo que se pueda tocar.
   */
  status?: ReactNode;
  /** Botones, contra el borde derecho. Envuelven en el teléfono. */
  actions?: ReactNode;
  className?: string;
}

/**
 * El encabezado de una pantalla de detalle: volver, qué es, y qué se puede
 * hacer con eso.
 *
 * **Envuelve, siempre.** Ocho pantallas escribían esta fila a mano y con cuatro
 * formas distintas —`justify-between` acá, `gap-3` allá, el indicador antes del
 * título en una y después en otra—, y ninguna envolvía: los botones del kit
 * llevan `whitespace-nowrap`, así que una fila de cuatro no se achica, se sale.
 * En el ticket de supermercado eso dejó el botón de borrar **fuera de la
 * pantalla**, sin manera de borrar un ticket desde el celular y con el build en
 * verde. Acá la fila envuelve y cada grupo es `shrink-0`.
 */
export function PageHeader({
  back,
  title,
  status,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {back}
      {(title || status) && (
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {title && (
            <h1 className="min-w-0 truncate text-lg font-semibold tracking-tight">
              {title}
            </h1>
          )}
          {status}
        </div>
      )}
      {actions && (
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
