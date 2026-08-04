# Referencia de tokens

Los tokens son variables CSS definidas en `src/styles.css` y mapeadas a clases de
Tailwind por el preset. **Son la única fuente de color del sistema**: cambiar el
look de todas las apps es cambiar estos valores.

## Formato

Tripletas HSL sin `hsl()`:

```css
:root { --primary: 199 89% 48%; }
.dark { --primary: 199 89% 52%; }
```

Así Tailwind puede componer opacidad — `bg-primary/10` se expande a
`hsl(var(--primary) / 0.1)`. Con un color ya cerrado eso no sería posible.

El tema oscuro se activa con la clase `dark` en `<html>`, que es lo que maneja
`useTheme` y lo que lee `darkMode: "class"` del preset.

## Colores

Cada par es fondo + color de texto que va encima.

| Token | Clases de Tailwind | Claro | Oscuro | Para qué |
|---|---|---|---|---|
| `--background` / `--foreground` | `bg-background` `text-foreground` | `0 0% 100%` | `222 24% 9%` | Fondo y texto de la página. |
| `--card` / `--card-foreground` | `bg-card` `text-card-foreground` | `0 0% 100%` | `222 22% 12%` | Superficie de tarjetas. |
| `--popover` / `--popover-foreground` | `bg-popover` `text-popover-foreground` | `0 0% 100%` | `222 22% 12%` | Dropdowns, listas de autocomplete. |
| `--primary` / `--primary-foreground` | `bg-primary` `text-primary` | `199 89% 48%` | `199 89% 52%` | Acción principal, links, acentos. |
| `--secondary` / `--secondary-foreground` | `bg-secondary` | `220 14% 96%` | `217 19% 18%` | Acción secundaria, chips neutros. |
| `--muted` / `--muted-foreground` | `bg-muted` `text-muted-foreground` | `220 14% 96%` | `217 19% 16%` | Fondos apagados y texto de apoyo. |
| `--accent` / `--accent-foreground` | `bg-accent` | `220 14% 94%` | `217 19% 20%` | Hover de items interactivos. |
| `--destructive` / `--destructive-foreground` | `bg-destructive` `text-destructive` | `0 72% 51%` | `0 63% 50%` | Borrar, errores. |
| `--success` / `--success-foreground` | `bg-success` `text-success` | `142 71% 40%` | `142 60% 45%` | Estado OK (p. ej. "Pagado"). |
| `--warning` / `--warning-foreground` | `bg-warning` `text-warning` | `38 92% 44%` | `38 88% 55%` | Estado pendiente. |
| `--border` | `border-border`, y el default de todo borde | `220 13% 91%` | `217 19% 20%` | Bordes y separadores. |
| `--input` | `border-input` | `220 13% 88%` | `217 19% 24%` | Borde de campos de formulario. |
| `--ring` | `ring-ring` | `199 89% 48%` | `199 89% 52%` | Anillo de foco. |

`--border` además es el `borderColor.DEFAULT` del preset, así que el preflight de
Tailwind ya pinta **todo** borde con el token y no hace falta declararlo.

## Radios

| Token | Clases | Valor |
|---|---|---|
| `--radius` | `rounded-lg` | `0.75rem` |
| — | `rounded-md` | `calc(var(--radius) - 2px)` |
| — | `rounded-sm` | `calc(var(--radius) - 4px)` |

Cambiando solo `--radius` se ajusta la redondez de todo el sistema.

## Tipografía y layout

| Qué | Valor |
|---|---|
| `font-sans` | `Inter, system-ui, sans-serif` |
| `container` | Centrado, padding `1.5rem`, ancho máximo `1100px` en `2xl`. |
| `body` | `font-feature-settings: "cv11", "ss01"` y antialiasing. |

Las apps cargan Inter desde Google Fonts en su `index.html`. Si no está
disponible, cae a la fuente del sistema.

## Clases utilitarias del kit

Definidas en `styles.css`, fuera de Tailwind:

| Clase | Para qué |
|---|---|
| `.markdown` | Estilos del contenido renderizado por `<Markdown />`: párrafos, listas, código, tablas, citas. |
| `.no-spinner` | Oculta las flechitas de un `<input type="number">`. |

## Cómo cambiar la estética de todas las apps

1. Editar los valores en `src/styles.css` (y el preset si se agrega un token nuevo).
2. `npm run build` y commitear el `dist/`.
3. Taggear la versión nueva.
4. En cada app, subir el tag y reconstruir el frontend.

Ver [development.md](development.md#publicar-una-versión).
