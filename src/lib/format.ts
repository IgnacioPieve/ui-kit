export const MONEY_LOCALE = "en-US";

export function formatAmount(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat(MONEY_LOCALE, {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);
}

const SYMBOLS: Record<string, string> = {
  ARS: "$",
  USD: "US$",
  EUR: "€",
};

export function formatCurrency(cents: number, currency: string): string {
  const symbol = SYMBOLS[currency] ?? currency;
  return `${symbol} ${formatAmount(cents / 100, 2)}`;
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
