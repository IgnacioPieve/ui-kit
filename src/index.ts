/**
 * @pieve/ui — design system compartido.
 *
 * Los estilos NO se importan desde acá: cada app hace
 * `import "@pieve/ui/styles.css"` en su `main.tsx`, antes de su propio
 * `index.css`, para garantizar el orden de las capas.
 */

export * from "./components";
export * from "./hooks";
export * from "./lib";
export {
  createHttpClient,
  buildQuery,
  HttpError,
  type HttpClient,
  type HttpClientOptions,
  type QueryParams,
} from "./lib/http";
export { log } from "./lib/logger";
export { labels, type Labels } from "./labels";
