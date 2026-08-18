import { ExternalLink, Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { linkHost, safeUrl, youtubeEmbedUrl } from "../lib/links";
import { cn } from "../lib/cn";
import { labels } from "../labels";

export interface LinkPreviewProps {
  url: string;
  /** Texto del link. Default: el host. */
  title?: string;
  /** Chip en línea en vez del reproductor embebido. */
  compact?: boolean;
  openLabel?: string;
  className?: string;
}

/**
 * Muestra una URL externa: reproductor embebido si es YouTube, y si no un
 * botón para abrirla en otra pestaña.
 *
 * Es el hermano de `FilePreview` para lo que no se sube sino que se enlaza. Lo
 * que no sea http(s) igual se renderiza como texto: guardarlo y no mostrarlo
 * es peor que mostrarlo sin poder abrirlo.
 */
export function LinkPreview({
  url,
  title,
  compact,
  openLabel = labels.openLink,
  className,
}: LinkPreviewProps) {
  const href = safeUrl(url);
  const label = title || (href ? linkHost(href) : url);

  if (!href) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground",
          className
        )}
      >
        <Link2 className="h-4 w-4 shrink-0" />
        <span className="truncate">{url}</span>
      </div>
    );
  }

  const openButton = (
    <Button asChild variant="outline" size="sm">
      <a href={href} target="_blank" rel="noreferrer noopener">
        <ExternalLink className="h-4 w-4" />
        {compact || title ? label : openLabel}
      </a>
    </Button>
  );

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          "flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm hover:bg-accent",
          className
        )}
      >
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{label}</span>
      </a>
    );
  }

  const embed = youtubeEmbedUrl(href);
  if (embed) {
    return (
      <div className={cn("space-y-2", className)}>
        <iframe
          src={embed}
          title={label}
          className="aspect-video w-full rounded-md border"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {openButton}
      </div>
    );
  }

  return <div className={cn(className)}>{openButton}</div>;
}
