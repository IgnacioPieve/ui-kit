import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export interface SelectionBarProps {
  /** Cuántas filas hay tildadas. En 0 la barra no existe. */
  count: number;
  /** El renglón chico: "3 facturas seleccionadas". Lo escribe la app. */
  label: ReactNode;
  /** El renglón grande: lo que suman. Ya formateado — el kit no sabe de plata. */
  total?: ReactNode;
  /** Acciones sobre lo tildado (normalmente un `<Button size="sm" />`). */
  children?: ReactNode;
  onClear: () => void;
  clearLabel?: string;
  className?: string;
}

/**
 * La barra flotante de lo seleccionado: cuántas filas, cuánto suman, qué se
 * puede hacer con ellas y una X para soltarlas.
 *
 * **Una sola tarjeta y no piezas sueltas flotando**: el total, el botón y la X
 * con su sombra cada uno envolvían en dos filas desparejas en el teléfono.
 *
 * **El aire de abajo también es de acá.** Una barra fija tapa la última fila
 * de la lista, y la forma de que no la tape es un espaciador de su mismo alto
 * al final de la página. Estaba escrita en dos apps y solo una se había
 * acordado del espaciador: en la otra, la última factura no se podía tildar
 * con la barra abierta.
 */
export function SelectionBar({
  count,
  label,
  total,
  children,
  onClear,
  clearLabel = labels.clearSelection,
  className,
}: SelectionBarProps) {
  if (count === 0) return null;

  return (
    <>
      <div aria-hidden className="h-20" />
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
        <Card
          role="status"
          className={cn(
            "pointer-events-auto flex max-w-full items-center gap-3 p-2 pl-3 shadow-lg",
            className
          )}
        >
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-xs text-muted-foreground">
              {label}
            </span>
            {total != null && (
              <span className="truncate font-bold tabular-nums">{total}</span>
            )}
          </div>

          {children}

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            aria-label={clearLabel}
            title={clearLabel}
            className="shrink-0"
          >
            <X />
          </Button>
        </Card>
      </div>
    </>
  );
}
