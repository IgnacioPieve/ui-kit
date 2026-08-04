import { useEffect, type RefObject } from "react";

/**
 * Llama a `handler` cuando se hace mousedown fuera del elemento referenciado.
 * Se usa para cerrar dropdowns y autocompletes hechos a mano.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;
    function onMouseDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) handler();
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler, enabled]);
}
