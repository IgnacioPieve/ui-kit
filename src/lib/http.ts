import { downloadBlob, filenameFromDisposition } from "./browser";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export interface HttpClient {
  /** URL absoluta de un path (para `<img src>`, `<a href>`, iframes…). */
  url(path: string): string;
  request<T>(path: string, init?: RequestInit): Promise<T>;
  get<T>(path: string, params?: QueryParams): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
  del<T>(path: string): Promise<T>;
  /** POST multipart (subida de archivos). */
  postForm<T>(path: string, form: FormData): Promise<T>;
  /** PATCH multipart. */
  patchForm<T>(path: string, form: FormData): Promise<T>;
  /** Descarga el path como archivo, respetando `Content-Disposition`. */
  download(path: string, fallbackName: string): Promise<void>;
}

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null | (string | number)[]
>;

/** Serializa params salteando `undefined`/`null` y expandiendo arrays. */
export function buildQuery(params: QueryParams = {}): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) qs.append(key, String(item));
    } else {
      qs.set(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}

/**
 * Cliente HTTP tipado sobre `fetch`.
 *
 * `baseUrl` vacío (el default) significa mismo origen: nginx hace de
 * reverse-proxy de `/api/` al backend, así que la app funciona desde cualquier
 * host o IP sin URLs hardcodeadas en el build.
 */
export function createHttpClient(baseUrl = ""): HttpClient {
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, init);
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        if (body?.detail) detail = body.detail;
      } catch {
        /* respuesta sin JSON: nos quedamos con el statusText */
      }
      throw new HttpError(res.status, detail);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  const json = (method: string, body?: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return {
    url: (path) => `${baseUrl}${path}`,
    request,
    get: (path, params) => request(`${path}${buildQuery(params)}`),
    post: (path, body) => request(path, json("POST", body)),
    patch: (path, body) => request(path, json("PATCH", body)),
    del: (path) => request(path, { method: "DELETE" }),
    postForm: (path, form) => request(path, { method: "POST", body: form }),
    patchForm: (path, form) => request(path, { method: "PATCH", body: form }),
    async download(path, fallbackName) {
      const res = await fetch(`${baseUrl}${path}`);
      if (!res.ok) throw new HttpError(res.status, res.statusText);
      const filename = filenameFromDisposition(
        res.headers.get("content-disposition"),
        fallbackName
      );
      downloadBlob(await res.blob(), filename);
    },
  };
}
