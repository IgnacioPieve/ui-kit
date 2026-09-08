import { useCallback, useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

export interface Autosave {
  status: AutosaveStatus;
  /** Dispara un guardado. Si ya hay uno en curso, encola exactamente uno más. */
  save: () => void;
  /** Waits for pending saves; false means the last save failed. */
  flush: () => Promise<boolean>;
}

export function useAutosave(save: () => Promise<unknown>): Autosave {
  const [status, setStatus] = useState<AutosaveStatus>("idle");

  // Ref para que el callback pueda cambiar en cada render (lee estado fresco)
  // sin recrear `run` ni invalidar los handlers ya cableados.
  const saveRef = useRef(save);
  saveRef.current = save;

  const running = useRef<Promise<void> | null>(null);
  const queued = useRef(false);
  const failed = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

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
          failed.current = false;
          if (mounted.current) setStatus("saved");
        } catch {
          failed.current = true;
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
    await running.current;
    return !failed.current;
  }, []);

  return { status, save: trigger, flush };
}
