import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { labels } from "../labels";

export interface CollapsibleProps {
  children: ReactNode;
  /** Alto colapsado en px (~3 líneas por defecto). */
  collapsedHeight?: number;
  showMoreLabel?: string;
  showLessLabel?: string;
}

/** Recorta contenido largo con un degradé y un toggle "mostrar más / menos". */
export function Collapsible({
  children,
  collapsedHeight = 80,
  showMoreLabel = labels.showMore,
  showLessLabel = labels.showLess,
}: CollapsibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  // `children` es un objeto nuevo en cada render, así que tenerlo en las deps
  // hacía leer `scrollHeight` —que fuerza layout— cada vez que el padre
  // renderizaba. Un ResizeObserver mide solo cuando el contenido cambia de
  // tamaño de verdad, que es la pregunta que estamos haciendo.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflowing(el.scrollHeight > collapsedHeight + 4);
    measure();
    const observer = new ResizeObserver(measure);
    // El alto del wrapper está clampeado por `maxHeight`: lo que crece o se
    // encoge es el contenido, así que se observan los hijos.
    for (const child of el.children) observer.observe(child);
    return () => observer.disconnect();
  }, [collapsedHeight]);

  return (
    <div>
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ maxHeight: expanded ? undefined : collapsedHeight }}
      >
        {children}
        {overflowing && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-medium text-primary hover:underline"
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      )}
    </div>
  );
}
