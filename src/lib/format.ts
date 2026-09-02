/**
 * El locale de los **números**, que no es el de las fechas.
 *
 * Toda la familia escribe la plata con **coma para los miles y punto para los
 * decimales** (`1,234,567.50`), mientras las fechas siguen en `es-AR`. Son dos
 * decisiones separadas y por eso son dos constantes: `LOCALE` para lo que se
 * lee como texto —"10 de marzo de 2025"— y ésta para lo que se lee como
 * número.
 *
 * Está acá y no en cada app porque ya se había desprendido en cuatro: `es-AR`
 * en supermercado y en gastos, `en-US` a mano en finanzas, y el `LOCALE` de las
 * fechas adentro de `formatCurrency`. Cuatro pantallas de la misma familia
 * mostrando la misma plata de dos formas distintas.
 */
export const MONEY_LOCALE = "en-US";

/**
 * Un número con los separadores de la familia. Sin símbolo de moneda.
 *
 * Es la pieza que comparten las apps que guardan la plata en unidades enteras
 * —pesos— en vez de centavos, que son las que no pueden usar `formatCurrency`.
 */
export function formatAmount(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat(MONEY_LOCALE, {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);
}

/**
 * El símbolo de cada moneda, elegido a mano.
 *
 * `Intl` con `style: "currency"` no sirve para esto: en `en-US` el peso sale
 * como `ARS 1,234.56` —el código entero, porque no es la moneda local del
 * locale— y con `currencyDisplay: "narrowSymbol"` sale como `$`, igual que el
 * dólar, que en una app con las dos monedas juntas es peor. El número lo
 * formatea `Intl` y el símbolo lo pone esta tabla.
 */
const SYMBOLS: Record<string, string> = {
  ARS: "$",
  USD: "US$",
  EUR: "€",
};

/**
 * Formatea un monto guardado en centavos.
 *
 * Los montos viajan como enteros para no arrastrar errores de punto flotante;
 * la división por 100 pasa solo al mostrarlos. Una moneda que no esté en la
 * tabla se muestra con su código, que es feo pero no miente.
 */
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
