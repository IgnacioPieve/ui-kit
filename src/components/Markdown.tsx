import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../lib/cn";

export interface MarkdownProps {
  children: string;
  className?: string;
}

/**
 * Markdown liviano (GFM) para resúmenes y notas.
 * Los estilos viven en la clase `.markdown` de `styles.css`.
 */
export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("markdown", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
