/** Locale único para todas las apps. */
export const LOCALE = "es-AR";

/**
 * Parsea `"YYYY-MM-DD"` (o un ISO completo) como fecha local.
 *
 * `new Date("2025-03-10")` la interpreta como UTC y en zonas horarias negativas
 * cae un día antes; esto evita ese corrimiento.
 */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** `10 de marzo de 2025` */
export function formatDate(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** `10 mar 2025` */
export function formatShortDate(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** `10 de marzo` (sin año, para agrupados donde el año ya está en el header) */
export function formatDayMonth(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
  });
}

/** `Marzo de 2025` — acepta un ISO o un `Date`. */
export function formatMonthYear(value: string | Date): string {
  const date = typeof value === "string" ? parseLocalDate(value) : value;
  const label = date.toLocaleDateString(LOCALE, {
    month: "long",
    year: "numeric",
  });
  return capitalize(label);
}

/** `YYYY-MM`, para agrupar por mes. */
export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

/** Fecha de hoy en `YYYY-MM-DD` (local, no UTC). */
export function todayISO(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

export function capitalize(value: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
