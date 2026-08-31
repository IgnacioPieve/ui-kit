import { useState, type ComponentType, type ReactNode } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface FilterToolbarProps {
  /** El buscador. Va solo en su fila y crece: pasale `className="flex-1"`. */
  search?: ReactNode;
  /** La acción principal de la pantalla ("Agregar…"), al lado del buscador. */
  action?: ReactNode;
  /** Controles siempre a la vista: los que se tocan todos los días. */
  children?: ReactNode;
  /**
   * Lo que vive detrás de "Filtros": lo de vez en cuando.
   *
   * Cada hijo es una celda de una grilla de dos columnas (una sola en el
   * teléfono), normalmente un `Field`. Para uno que ocupe el ancho entero —una
   * fila de chips, un grupo largo—, `className="sm:col-span-2"`.
   */
  panel?: ReactNode;
  /** Cuántos filtros están puestos. Es el número del badge. */
  activeCount?: number;
  /** Muestra "Limpiar filtros" cuando hay alguno puesto. */
  onClear?: () => void;
  /** Alineado a la derecha; normalmente el conteo de resultados. */
  results?: ReactNode;
  /** El panel arranca abierto (una pantalla que es sobre todo filtrar). */
  defaultOpen?: boolean;
  filtersLabel?: string;
  clearLabel?: string;
  className?: string;
}

/**
 * La barra de buscar y filtrar. Misma forma en todas las apps.
 *
 * Cinco pantallas resolvían esto cinco veces: dos `Select` sueltos en una fila,
 * una grilla de dos columnas, chips en una fila propia, un "limpiar" que
 * aparecía en una sí y en otra no. Cada una defendible sola; todas juntas,
 * cinco maneras de hacer la misma pregunta.
 *
 * El reparto es por frecuencia, no por tipo de control: **arriba lo de todos
 * los días** —el buscador, la acción principal, los dos o tres chips que se
 * tocan siempre— y **detrás de "Filtros" lo de vez en cuando**. Un filtro
 * escondido igual se anuncia: el badge del botón cuenta lo que está puesto, así
 * que una lista corta nunca es un misterio con el panel cerrado.
 */
export function FilterToolbar({
  search,
  action,
  children,
  panel,
  activeCount = 0,
  onClear,
  results,
  defaultOpen = false,
  filtersLabel = labels.filters,
  clearLabel = labels.clearFilters,
  className,
}: FilterToolbarProps) {
  const [open, setOpen] = useState(defaultOpen);
  // Los chips van en su propia fila y el botón de "Filtros", el "Limpiar" y el
  // conteo en la de abajo, siempre. Todo junto en un solo `flex-wrap`, lo que
  // caía en cada línea dependía de cuántos chips tuviera cada app: en una
  // entraba el conteo al lado del botón y en la otra bajaba solo, y dos
  // pantallas con la misma barra terminaban leyéndose distinto.
  const hasBar = Boolean(panel || results || onClear);

  return (
    <div className={cn("space-y-3", className)}>
      {(search || action) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {search}
          {action}
        </div>
      )}

      {children && (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      )}

      {hasBar && (
        <div className="flex flex-wrap items-center gap-2">
          {panel && (
            <Button
              variant={open ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              <SlidersHorizontal />
              {filtersLabel}
              {activeCount > 0 && <Badge variant="primary">{activeCount}</Badge>}
              <ChevronDown
                className={cn("transition-transform", open && "rotate-180")}
              />
            </Button>
          )}

          {onClear && activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground"
            >
              <X />
              {clearLabel}
            </Button>
          )}

          {results !== undefined && results !== null && (
            <span className="ml-auto text-sm tabular-nums text-muted-foreground">
              {results}
            </span>
          )}
        </div>
      )}

      {panel && open && (
        // La grilla la pone la barra y no cada pantalla. Las cinco apps
        // escribían su propio `grid gap-3 sm:grid-cols-2` adentro del panel
        // —salvo la que puso tres columnas y la que no puso ninguna—, así que
        // el mismo panel tenía un ritmo distinto en cada una. Acá cada hijo es
        // una celda y el call site solo dice cuáles ocupan las dos.
        <div className="grid gap-4 rounded-lg border bg-muted/40 p-3 sm:grid-cols-2">
          {panel}
        </div>
      )}
    </div>
  );
}

export interface FilterChipProps {
  selected: boolean;
  onClick: () => void;
  /** Emoji o icono a la izquierda. */
  icon?: ReactNode;
  children: ReactNode;
  title?: string;
  className?: string;
}

/**
 * Un filtro independiente que se prende y se apaga.
 *
 * Para conjuntos donde varias respuestas conviven —categorías, etiquetas—: cada
 * chip es su propia pregunta de sí o no. Cuando las respuestas son excluyentes
 * va `FilterChipGroup`, que las mete en una cápsula y las hace verse como lo
 * que son: una sola pregunta.
 */
export function FilterChip({
  selected,
  onClick,
  icon,
  children,
  title,
  className,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5 [&_svg]:shrink-0",
        selected
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </button>
  );
}

export interface FilterChipOption<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  /** El color del texto cuando está prendida. Por defecto, el del contenido. */
  activeClassName?: string;
  title?: string;
}

export interface FilterChipGroupProps<T extends string> {
  /** No se ve: el grupo se lee por el fondo. Es para el lector de pantalla. */
  label: string;
  options: FilterChipOption<T>[];
  /** `null` es "no me importa", que es el estado natural de un filtro. */
  value: T | null;
  onChange: (next: T | null) => void;
  className?: string;
}

/**
 * Una pregunta y sus respuestas, en una cápsula.
 *
 * El fondo es lo que agrupa: sin él, siete chips en fila son siete opciones
 * sueltas que hay que leer enteras para entender que "Visto" y "Estrenado" no
 * son lo mismo. Adentro son excluyentes —una pregunta, una respuesta— pero
 * entre cápsulas se acumulan, que es como se piden las cosas útiles: sin ver
 * **y** estrenado es lo que puedo poner esta noche.
 *
 * Se apaga tocando la respuesta prendida, y por eso no es `ToggleGroup`: aquel
 * obliga a tener siempre una elegida, que para un filtro significa agregarle un
 * "Todos" a cada grupo — una opción más para decir que no hay filtro.
 */
export function FilterChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: FilterChipGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        // Scrollea adentro suyo si no entra. Cuatro respuestas de nombre largo
        // se salen de un teléfono angosto, y una cápsula que se sale no se
        // puede alcanzar: la última opción queda cortada contra el borde y no
        // hay gesto que la traiga. Los chips ya son `shrink-0`, así que lo que
        // se mueve es la cápsula y no el texto de adentro.
        "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-muted p-1",
        className
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            title={option.title}
            onClick={() => onChange(active ? null : option.value)}
            className={cn(
              "inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? cn("bg-background shadow-sm", option.activeClassName ?? "text-foreground")
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
