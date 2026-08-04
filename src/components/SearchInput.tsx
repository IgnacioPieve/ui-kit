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
}

export function SearchInput({
  value,
  onChange,
  placeholder = labels.search,
  className,
  clearable = true,
  clearLabel = labels.clear,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
