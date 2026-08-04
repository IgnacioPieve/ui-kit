import { useState } from "react";
import { Download, File as FileIcon, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { fileKind } from "../lib/files";
import { formatFileSize } from "../lib/format";
import { labels } from "../labels";

export interface FilePreviewProps {
  /** URL desde donde se sirve el archivo. */
  url: string;
  filename: string;
  contentType?: string | null;
  size?: number;
  /** Miniatura / chip en vez de la previsualización completa. */
  compact?: boolean;
  downloadLabel?: string;
}

function DownloadCard({
  url,
  filename,
  size,
  downloadLabel,
}: {
  url: string;
  filename: string;
  size?: number;
  downloadLabel: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
      <FileIcon className="h-8 w-8 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{filename}</p>
        {size !== undefined && (
          <p className="text-xs text-muted-foreground">{formatFileSize(size)}</p>
        )}
      </div>
      <Button asChild variant="outline" size="sm">
        <a href={url} download={filename}>
          <Download className="h-4 w-4" />
          {downloadLabel}
        </a>
      </Button>
    </div>
  );
}

/**
 * Previsualiza un archivo según su tipo: imagen (con lightbox), PDF embebido,
 * audio, video, o una tarjeta de descarga como fallback.
 */
export function FilePreview({
  url,
  filename,
  contentType,
  size,
  compact,
  downloadLabel = labels.download,
}: FilePreviewProps) {
  const [lightbox, setLightbox] = useState(false);
  const kind = fileKind(contentType);

  if (compact) {
    if (kind === "image") {
      return (
        <img
          src={url}
          alt={filename}
          className="h-20 w-20 rounded-md border object-cover"
        />
      );
    }
    return (
      <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
        {kind === "pdf" ? (
          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className="truncate">{filename}</span>
      </div>
    );
  }

  switch (kind) {
    case "image":
      return (
        <>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="block overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={url}
              alt={filename}
              className="max-h-80 w-auto object-contain"
            />
          </button>
          <Dialog open={lightbox} onOpenChange={setLightbox}>
            <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
              <img
                src={url}
                alt={filename}
                className="max-h-[85vh] w-full rounded-md object-contain"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    case "pdf":
      return (
        <div className="space-y-2">
          <iframe
            src={url}
            title={filename}
            className="h-[28rem] w-full rounded-md border"
          />
          <Button asChild variant="outline" size="sm">
            <a href={url} target="_blank" rel="noreferrer">
              <FileText className="h-4 w-4" />
              {filename}
            </a>
          </Button>
        </div>
      );
    case "audio":
      return <audio controls src={url} className="w-full" />;
    case "video":
      return (
        <video controls src={url} className="max-h-80 w-full rounded-md border" />
      );
    default:
      return (
        <DownloadCard
          url={url}
          filename={filename}
          size={size}
          downloadLabel={downloadLabel}
        />
      );
  }
}
