import { useCallback, useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

export interface Autosave {
  status: AutosaveStatus;
  /** Dispara un guardado. Si ya hay uno en curso, encola exactamente uno más. */
  save: () => void;
  /** Espera a que no quede nada pendiente. Para navegar sin perder cambios. */
  flush: () => Promise<void>;
}

/**
 * Autoguardado serializado.
 *
 * `save()` se llama al terminar de editar un campo (blur, o change en los
 * controles donde el cambio ya es el final: selects, switches, archivos). El
 * hook garantiza que **nunca haya dos guardados en vuelo a la vez**: si llega
 * uno mientras otro corre, se encola uno solo al final. Sin eso, dos PATCH
 * concurrentes pueden llegar al backend en orden invertido y dejar guardado el
 * valor viejo.
 *
 * No muestra toasts: el feedback va en `<AutosaveIndicator />`, que es
 * silencioso y no interrumpe.
 */
export function useAutosave(save: () => Promise<unknown>): Autosave {
  const [status, setStatus] = useState<AutosaveStatus>("idle");

  // Ref para que el callback pueda cambiar en cada render (lee estado fresco)
  // sin recrear `run` ni invalidar los handlers ya cableados.
  const saveRef = useRef(save);
  saveRef.current = save;

  const running = useRef<Promise<void> | null>(null);
  const queued = useRef(false);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const run = useCallback(async (): Promise<void> => {
    if (running.current) {
      queued.current = true;
      return running.current;
    }

    const exec = (async () => {
      do {
        queued.current = false;
        if (mounted.current) setStatus("saving");
        try {
          await saveRef.current();
          if (mounted.current) setStatus("saved");
        } catch {
          if (mounted.current) setStatus("error");
          queued.current = false;
          return;
        }
      } while (queued.current);
    })();

    running.current = exec;
    try {
      await exec;
    } finally {
      running.current = null;
    }
  }, []);

  const trigger = useCallback(() => {
    void run();
  }, [run]);

  const flush = useCallback(async () => {
    await (running.current ?? Promise.resolve());
  }, []);

  return { status, save: trigger, flush };
}
