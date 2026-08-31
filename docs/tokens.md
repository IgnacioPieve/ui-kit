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
| `--destructive` / `--destructive-foreground` | `bg-destructive` `text-destructive` | `0 74% 42%` | `0 84% 65%` | Borrar, errores. |
| `--success` / `--success-foreground` | `bg-success` `text-success` | `142 76% 30%` | `142 62% 55%` | Estado OK (p. ej. "Pagado"). |
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
| `container` | Centrado, padding `1rem` y `1.5rem` de `sm` para arriba, ancho máximo `1100px` en `2xl`. |
| `body` | `font-feature-settings: "cv11", "ss01"` y antialiasing. |

Las apps cargan Inter desde Google Fonts en su `index.html`. Si no está
disponible, cae a la fuente del sistema.

## Clases utilitarias del kit

Definidas en `styles.css`, fuera de Tailwind:

| Clase | Para qué |
|---|---|
| `.markdown` | Estilos del contenido renderizado por `<Markdown />`: párrafos, listas, código, tablas, citas. |
| `.no-spinner` | Oculta las flechitas de un `<input type="number">`. |
| `.no-scrollbar` | Scroller sin barra visible, para una fila que en el teléfono se desplaza con el dedo (la nav del `AppShell`). |
| `.field-placeholder` | El texto que `DateInput` dibuja sobre un campo vacío. Solo existe para que suba a 16px en el teléfono junto con los campos. |

## Formularios en el teléfono

`styles.css` cierra los comportamientos de Safari en iOS que rompen el layout en
silencio. Están acá y no en cada app porque los causa el kit: la tipografía de
sus `Input` y el ancho nativo de los controles de fecha.

| Regla | Por qué |
|---|---|
| `input, select, textarea { font-size: 16px }` abajo de `sm` | iOS hace zoom al enfocar cualquier campo de menos de 16px —los del kit son de 14, 12 los `inputSize="sm"`— y **no lo deshace al salir**: la pantalla queda corrida y hay que pellizcar para volver. |
| `input[type="date"]` con `appearance: none` y `min-width: 0` | Safari lo trata como un control nativo con ancho propio: se sale de su caja en vez de encogerse. Hacen falta las dos reglas; con una sola sigue desbordando. |
| El campo de fecha **vacío** | Ninguna regla lo arregla: iOS no dibuja nada en un `input[type=date]` sin valor, y el `placeholder` del HTML no aplica a los campos de fecha. Un filtro sin `<Label>` queda en un rectángulo mudo hasta que tiene una fecha. Eso lo resuelve `DateInput`, que pone el texto él mismo —siempre, con o sin `placeholder`: sin él dibuja `dd/mm/aaaa`— y de paso deja el formato en español, que el nativo saca del idioma del navegador y no del `lang` del documento. |

El escritorio no se toca: la primera está detrás de un `max-width: 639px`.

## Cómo cambiar la estética de todas las apps

1. Editar los valores en `src/styles.css` (y el preset si se agrega un token nuevo).
2. `npm run build` y commitear el `dist/`.
3. Taggear la versión nueva.
4. En cada app, subir el tag y reconstruir el frontend.

Ver [development.md](development.md#publicar-una-versión).
