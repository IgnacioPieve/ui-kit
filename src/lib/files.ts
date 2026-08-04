export type FileKind = "image" | "pdf" | "audio" | "video" | "other";

/** Clasifica un archivo por su content-type para elegir cómo previsualizarlo. */
export function fileKind(contentType: string | null | undefined): FileKind {
  if (!contentType) return "other";
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("audio/")) return "audio";
  if (contentType.startsWith("video/")) return "video";
  if (contentType === "application/pdf") return "pdf";
  return "other";
}
