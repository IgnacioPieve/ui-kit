import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "../lib/cn";
import { labels } from "../labels";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Muestra una X para vaciar el campo cuando tiene contenido. */
  clearable?: boolean;
  clearLabel?: string;
  /**
   * Toma el foco al montarse. Para un buscador dentro de un diálogo: se abre
   * para escribir, y obligar a hacer un click más es puro trámite.
   */
  autoFocus?: boolean;
}

/**
 * Buscador con lupa y botón de limpiar.
 *
 * **No trae ancho ni `flex-1`**: cómo se reparte el espacio es una decisión del
 * contenedor, no del campo. Para que ocupe el resto de una fila, `className="flex-1"`
 * en el call site.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = labels.search,
  className,
  clearable = true,
  clearLabel = labels.clear,
  autoFocus,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn("pl-9", clearable && value && "pr-9")}
      />
      {clearable && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={clearLabel}
          title={clearLabel}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
