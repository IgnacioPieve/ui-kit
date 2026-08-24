/**
 * Observabilidad de desarrollo por consola.
 *
 * La conversación con el backend la loguea `createHttpClient` cuando se lo crea
 * con `{ trace: true }` — no hay que instrumentar endpoint por endpoint. Lo que
 * queda para la app es `log.event`: los hechos de dominio que no son una
 * request y que igual conviene poder seguir desde las devtools.
 *
 * Los grupos vienen colapsados: la consola queda legible de un vistazo y el
 * detalle está a un click. No usar `console.log` suelto en componentes — todo
 * pasa por acá para que el formato sea uniforme.
 */

const STYLES = {
  request: "color:#0284c7;font-weight:600",
  response: "color:#16a34a;font-weight:600",
  failure: "color:#dc2626;font-weight:600",
  event: "color:#9333ea;font-weight:600",
} as const;

type Kind = keyof typeof STYLES;

function group(kind: Kind, label: string, body: () => void): void {
  console.groupCollapsed(`%c${label}`, STYLES[kind]);
  body();
  console.groupEnd();
}

const ms = (started: number) => `${(performance.now() - started).toFixed(0)}ms`;

export const log = {
  request(method: string, path: string, payload?: unknown): void {
    group("request", `→ ${method} ${path}`, () => {
      if (payload !== undefined) console.log("payload:", payload);
    });
  },

  response(method: string, path: string, started: number, data: unknown): void {
    group("response", `← ${method} ${path} · ${ms(started)}`, () => {
      console.log("data:", data);
    });
  },

  failure(method: string, path: string, started: number, error: unknown): void {
    group("failure", `✕ ${method} ${path} · ${ms(started)}`, () => {
      console.error(error);
    });
  },

  /** Un hecho de dominio digno de seguir, que no es una request. */
  event(scope: string, message: string, data?: unknown): void {
    group("event", `● ${scope} · ${message}`, () => {
      if (data !== undefined) console.log(data);
    });
  },
};
