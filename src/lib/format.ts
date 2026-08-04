import { LOCALE } from "./dates";

/**
 * Formatea un monto guardado en centavos.
 *
 * Los montos viajan como enteros para no arrastrar errores de punto flotante;
 * la división por 100 pasa solo al mostrarlos.
 */
export function formatCurrency(cents: number, currency: string): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

/** `1,4 MB` */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
