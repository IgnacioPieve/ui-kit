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

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) setOverflowing(el.scrollHeight > collapsedHeight + 4);
  }, [children, collapsedHeight]);

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
