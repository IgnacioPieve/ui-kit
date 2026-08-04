import { useMemo, useRef, useState, type ReactNode } from "react";
import { Input } from "./ui/input";
import { useClickOutside } from "../hooks/useClickOutside";
import { cn } from "../lib/cn";

export interface AutocompleteProps<T> {
  value: string;
  onChange: (value: string) => void;
  options: T[];
  /** Clave única de la opción. Default: la opción convertida a string. */
  getKey?: (option: T) => string;
  /** Texto que se escribe en el input al elegir. Default: la opción como string. */
  getLabel?: (option: T) => string;
  /** Render de la fila del dropdown. Default: `getLabel`. */
  renderOption?: (option: T) => ReactNode;
  /** Qué hacer al elegir. Default: escribir `getLabel` en el input. */
  onSelect?: (option: T) => void;
  /** El servidor ya filtró: no aplicar filtro local por substring. */
  serverFiltered?: boolean;
  maxOptions?: number;
  placeholder?: string;
  id?: string;
  className?: string;
  /** Enter cuando no hay ninguna opción resaltada. */
  onEnter?: () => void;
}

/**
 * Input con sugerencias, navegable por teclado (↑ ↓ Enter Esc).
 *
 * Sirve tanto para listas de strings (médicos, instituciones, tipos) como para
 * objetos con render propio, pasando `renderOption` + `onSelect`.
 */
export function Autocomplete<T = string>({
  value,
  onChange,
  options,
  getKey = (o) => String(o),
  getLabel = (o) => String(o),
  renderOption,
  onSelect,
  serverFiltered = false,
  maxOptions = 8,
  placeholder,
  id,
  className,
  onEnter,
}: AutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false));

  const filtered = useMemo(() => {
    if (serverFiltered) return options.slice(0, maxOptions);
    const term = value.trim().toLowerCase();
    return options
      .filter((option) => {
        const lower = getLabel(option).toLowerCase();
        // Esconde la coincidencia exacta: no aporta nada elegir lo ya escrito.
        return lower !== term && (term === "" || lower.includes(term));
      })
      .slice(0, maxOptions);
  }, [options, value, serverFiltered, maxOptions, getLabel]);

  const choose = (option: T) => {
    if (onSelect) onSelect(option);
    else onChange(getLabel(option));
    setOpen(false);
    setHighlight(-1);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHighlight(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            if (open && highlight >= 0 && filtered[highlight]) {
              e.preventDefault();
              choose(filtered[highlight]);
            } else if (onEnter) {
              e.preventDefault();
              onEnter();
            }
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-40 mt-1 max-h-72 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {filtered.map((option, i) => (
            <li key={getKey(option)}>
              <button
                type="button"
                className={cn(
                  "w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
                  i === highlight && "bg-accent"
                )}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  // mousedown + preventDefault: elegir antes de que el input
                  // pierda el foco y el click-outside cierre la lista.
                  e.preventDefault();
                  choose(option);
                }}
              >
                {renderOption ? renderOption(option) : getLabel(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
