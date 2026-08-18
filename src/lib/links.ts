/**
 * Helpers de URLs externas. Hermano de `files.ts`: ahí se clasifica un archivo
 * por su content-type, acá una URL por lo que se puede hacer con ella.
 */

export type LinkKind = "youtube" | "other";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
]);

/** Rutas de las que el id sale del segmento siguiente, no del query. */
const YOUTUBE_PATHS = new Set(["embed", "shorts", "live", "v"]);

/**
 * Normaliza a una URL http(s) navegable, o `null`.
 *
 * Todo lo demás (`javascript:`, `data:`, basura suelta) se descarta: estos
 * valores terminan en el `href` de un `<a>` y en el `src` de un iframe.
 */
export function safeUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  return parsed.href;
}

/** Host sin `www.`, para etiquetar un link cuando no hay título. */
export function linkHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** `90`, `90s`, `1m30s`, `1h2m3s` -> segundos. */
function parseTimestamp(value: string | null): number | null {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match || !match.slice(1).some(Boolean)) return null;
  const [h, m, s] = match.slice(1).map((part) => Number(part ?? 0) || 0);
  return h * 3600 + m * 60 + s;
}

/**
 * URL embebible de un video de YouTube, o `null` si la URL no lo es.
 *
 * Cubre las formas que uno pega de verdad: `watch?v=`, `youtu.be/`, `shorts/`,
 * `embed/` y `live/`, en cualquiera de los hosts de YouTube. Conserva el
 * timestamp (`?t=`) como `start`, que es la mitad de la gracia de compartir un
 * link a un momento puntual.
 *
 * Sale por `youtube-nocookie.com`: el reproductor embebido no debería dejarle
 * una cookie de tracking a quien solo quiere ver el video.
 */
export function youtubeEmbedUrl(url: string): string | null {
  const safe = safeUrl(url);
  if (!safe) return null;
  const parsed = new URL(safe);
  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);

  let id: string | null = null;
  if (host === "youtu.be") {
    id = segments[0] ?? null;
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (segments[0] === "watch") id = parsed.searchParams.get("v");
    else if (YOUTUBE_PATHS.has(segments[0] ?? "")) id = segments[1] ?? null;
  }
  if (!id || !/^[\w-]+$/.test(id)) return null;

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  const start = parseTimestamp(
    parsed.searchParams.get("t") ?? parsed.searchParams.get("start")
  );
  if (start) embed.searchParams.set("start", String(start));
  return embed.toString();
}

/** Clasifica una URL para elegir cómo mostrarla. */
export function linkKind(url: string): LinkKind {
  return youtubeEmbedUrl(url) ? "youtube" : "other";
}
