import { downloadBlob, filenameFromDisposition } from "./browser";
import { log } from "./logger";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

async function responseError(response: Response): Promise<HttpError> {
  let message = response.statusText || `HTTP ${response.status}`;
  try {
    const { detail } = await response.json();
    if (typeof detail === "string" && detail.trim()) {
      message = detail;
    } else if (Array.isArray(detail)) {
      const messages = detail.flatMap((item: unknown) => {
        if (!item || typeof item !== "object" || !("msg" in item)) return [];
        return typeof item.msg === "string" ? [item.msg] : [];
      });
      if (messages.length) message = messages.join("; ");
    }
  } catch {
    // Proxies may return HTML or an empty body.
  }
  return new HttpError(response.status, message);
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

export interface HttpClientOptions {
  trace?: boolean;
}

/** Lo que se muestra como payload de una request al tracearla. */
function tracedPayload(init?: RequestInit): unknown {
  const body = init?.body;
  if (body === undefined || body === null) return undefined;
  if (body instanceof FormData) {
    return Object.fromEntries(
      [...body.entries()].map(([key, value]) => [
        key,
        value instanceof File ? `File(${value.name}, ${value.size}b)` : value,
      ]),
    );
  }
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

export function createHttpClient(
  baseUrl = "",
  { trace = false }: HttpClientOptions = {},
): HttpClient {
  /** La llamada pelada. `request` le agrega el trace si está prendido. */
  async function send<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, init);
    if (!res.ok) throw await responseError(res);
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    if (!trace) return send<T>(path, init);
    const method = init?.method ?? "GET";
    const started = performance.now();
    log.request(method, path, tracedPayload(init));
    try {
      const data = await send<T>(path, init);
      log.response(method, path, started, data);
      return data;
    } catch (error) {
      log.failure(method, path, started, error);
      throw error;
    }
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
      const started = performance.now();
      if (trace) log.request("GET", path);
      try {
        const res = await fetch(`${baseUrl}${path}`);
        if (!res.ok) throw await responseError(res);
        const filename = filenameFromDisposition(
          res.headers.get("content-disposition"),
          fallbackName,
        );
        const blob = await res.blob();
        if (trace)
          log.response("GET", path, started, `${filename} (${blob.size}b)`);
        downloadBlob(blob, filename);
      } catch (error) {
        if (trace) log.failure("GET", path, started, error);
        throw error;
      }
    },
  };
}
