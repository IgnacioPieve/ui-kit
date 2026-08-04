import { useEffect, useRef } from "react";
import { Spinner } from "./ui/spinner";

export interface InfiniteScrollTriggerProps {
  /** Se dispara cuando el centinela entra en viewport. */
  onLoadMore: () => void;
  /** `false` cuando ya no quedan páginas: no observa nada. */
  enabled?: boolean;
  /** Muestra el spinner y evita disparar de nuevo mientras carga. */
  loading?: boolean;
}

/**
 * Centinela para scroll infinito. Hay que renderizarlo al final de la lista;
 * cuando se vuelve visible pide la página siguiente.
 */
export function InfiniteScrollTrigger({
  onLoadMore,
  enabled = true,
  loading = false,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Ref para que el observer no se recree en cada render por cambiar la closure.
  const loadMoreRef = useRef(onLoadMore);
  loadMoreRef.current = onLoadMore;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreRef.current();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, loading]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="flex items-center justify-center py-8">
      {loading && <Spinner />}
    </div>
  );
}
