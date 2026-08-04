# Referencia de componentes

Todo se importa desde la raíz del paquete:

```ts
import { AppShell, Button, SearchInput, useTheme, formatCurrency } from "@pieve/ui";
```

Todos los componentes aceptan `className` y lo mergean con `cn()`, así que una
app puede ajustar spacing sin forkear el componente. Los textos tienen defaults
en español (`src/labels.ts`) y se pisan por prop.

## Primitivas (`ui/`)

Estilo shadcn: sin estado propio, sin lógica de negocio.

| Componente | Props propias | Notas |
|---|---|---|
| `Button` | `variant`, `size`, `asChild` | Variantes: `default` `destructive` `outline` `secondary` `ghost` `link`. Tamaños: `default` `sm` `lg` `icon` `icon-sm`. Con `asChild` toma el hijo como elemento (para envolver un `<Link>`). |
| `Input` | — | `<input>` nativo estilado. |
| `Textarea` | — | `<textarea>` nativo estilado. |
| `Label` | — | |
| `Select` | — | `<select>` nativo + chevron. Nativo a propósito: en mobile abre el picker del sistema. |
| `Switch` | Radix `Switch` | `checked`, `onCheckedChange`. |
| `Card` | — | Con `CardHeader` `CardTitle` `CardContent` `CardFooter`. |
| `Badge` | `variant` | `default` `primary` `success` `warning` `destructive` `outline`. |
| `Skeleton` | — | Placeholder de carga. |
| `Spinner` | `center` | Con `center`, se centra en un bloque con padding. |
| `Dialog` | Radix `Dialog` | `DialogContent` acepta `hideClose`. Incluye `DialogHeader` `DialogTitle` `DialogDescription` `DialogFooter` `DialogTrigger` `DialogClose`. |
| `DropdownMenu` | Radix | Con `DropdownMenuTrigger` `DropdownMenuContent` `DropdownMenuItem` `DropdownMenuLabel` `DropdownMenuSeparator`. |
| `Toaster` / `toast` | — | Sonner. `<Toaster />` se monta una vez en el root; `toast.success(…)` / `toast.error(…)` desde cualquier lado. |

## Compuestos

| Componente | Props | Para qué |
|---|---|---|
| `AppShell` | `brand`, `actions?`, `children`, `className?` | Header sticky + contenedor principal. Layout base de todas las apps. |
| `AppBrand` | `icon`, `title`, `className?` | Icono + nombre con el tipografiado del sistema. Se pasa como `brand` de `AppShell`, opcionalmente envuelto en un link. |
| `ThemeToggle` | `label?` | Botón sol/luna. Usa `useTheme` internamente. |
| `AutosaveIndicator` | `status`, `savingLabel?`, `savedLabel?`, `errorLabel?` | Feedback silencioso del autoguardado ("Guardando… / Guardado"). A propósito no usa toasts: guardar es constante y un toast por campo sería ruido. |
| `SearchInput` | `value`, `onChange`, `placeholder?`, `clearable?`, `clearLabel?` | Input con lupa y X para vaciar. |
| `EmptyState` | `icon?`, `title`, `description?`, `action?` | Caja punteada para listas vacías o búsquedas sin resultados. |
| `ConfirmDialog` | `open`, `onOpenChange`, `title`, `description?`, `confirmLabel?`, `cancelLabel?`, `variant?`, `loading?`, `onConfirm` | Reemplazo del `confirm()` del browser: estilable, cierra con Escape, atrapa el foco. |
| `Collapsible` | `children`, `collapsedHeight?`, `showMoreLabel?`, `showLessLabel?` | Recorta contenido largo con degradé y toggle. |
| `CopyButton` | `value`, `label?`, `successMessage?`, `errorMessage?` | Copia al portapapeles con feedback y fallback para HTTP plano. |
| `Markdown` | `children`, `className?` | Markdown GFM. Los estilos viven en la clase `.markdown` de `styles.css`. |
| `Autocomplete<T>` | `value`, `onChange`, `options`, `getKey?`, `getLabel?`, `renderOption?`, `onSelect?`, `serverFiltered?`, `maxOptions?`, `onEnter?` | Input con sugerencias navegable por teclado (↑ ↓ Enter Esc). Sirve para listas de strings y para objetos con render propio. Con `serverFiltered` no filtra localmente. |
| `FileDropzone` | `onFiles`, `multiple?`, `disabled?`, `size?`, `active?`, `label?`, `activeLabel?`, `hint?` | Drag & drop + clic. `size="sm"` es una fila compacta en línea; `"lg"` una caja grande. `active` la resalta (p. ej. como destino de un pegado con Ctrl+V). |
| `FilePreview` | `url`, `filename`, `contentType?`, `size?`, `compact?`, `downloadLabel?` | Previsualiza según el tipo: imagen con lightbox, PDF embebido, audio, video, o tarjeta de descarga. Con `compact`, miniatura o chip. |
| `SectionHeading` | `icon?`, `children`, `actions?` | Título de sección dentro de una página. |
| `MonthHeading` | `children` | Encabezado de un grupo por mes, con línea divisoria. |
| `InfiniteScrollTrigger` | `onLoadMore`, `enabled?`, `loading?` | Centinela para scroll infinito. Se renderiza al final de la lista. |

## Hooks

| Hook | Devuelve | Notas |
|---|---|---|
| `useTheme()` | `{ theme, setTheme, toggle }` | Persiste en `localStorage` (`pieve-theme`), con la preferencia del sistema como default. Aplica la clase `dark` en `<html>`. |
| `useDebounce(value, delay?)` | el valor demorado | Default 300 ms. |
| `useClickOutside(ref, handler, enabled?)` | — | Para cerrar dropdowns hechos a mano. |
| `useAutosave(save)` | `{ status, save, flush }` | Autoguardado **serializado**: nunca hay dos guardados en vuelo, y si llega uno mientras otro corre se encola exactamente uno más. `flush()` espera lo pendiente antes de navegar. Ver abajo. |

## Helpers (`lib`)

| Función | Qué hace |
|---|---|
| `cn(...classes)` | Une clases de Tailwind resolviendo conflictos (la última gana). |
| `parseLocalDate(iso)` | Parsea `"YYYY-MM-DD"` como fecha **local**, evitando el corrimiento de un día que produce `new Date(iso)`. |
| `formatDate(iso)` | `10 de marzo de 2026` |
| `formatShortDate(iso)` | `10 mar 2026` |
| `formatDayMonth(iso)` | `10 de marzo` |
| `formatMonthYear(iso \| Date)` | `Marzo de 2026` |
| `monthKey(iso)` | `"2026-03"`, para agrupar. |
| `todayISO()` | Hoy en `YYYY-MM-DD`, **local** (no UTC). |
| `capitalize(s)` | |
| `formatCurrency(cents, currency)` | Formatea un monto guardado en centavos. |
| `formatFileSize(bytes)` | `1,4 MB` |
| `fileKind(contentType)` | `"image" \| "pdf" \| "audio" \| "video" \| "other"` |
| `copyToClipboard(text)` | Con fallback para contexto no seguro (HTTP plano en la LAN). |
| `genId()` | Id local, con fallback si no hay `crypto.randomUUID`. |
| `downloadBlob(blob, filename)` / `downloadJson(data, filename)` | Disparan una descarga. |
| `filenameFromDisposition(header, fallback)` | Lee el `filename="…"` de un `Content-Disposition`. |

El locale es `es-AR` para todo (`LOCALE`).

## Cliente HTTP

```ts
const http = createHttpClient(import.meta.env.VITE_API_URL ?? "");
const visits = await http.get<Visit[]>("/api/visits", { q: "control" });
```

`baseUrl` vacío significa mismo origen: nginx hace de reverse-proxy de `/api/` al
backend, así que la app funciona desde cualquier host o IP sin URLs hardcodeadas
en el build.

| Método | Notas |
|---|---|
| `url(path)` | URL absoluta, para `<img src>`, `<a href>`, iframes. |
| `get(path, params?)` | `params` saltea `undefined`/`null`/`""` y expande arrays. |
| `post` / `patch` / `del` | JSON. |
| `postForm` / `patchForm` | `multipart/form-data`. |
| `download(path, fallbackName)` | Respeta el `Content-Disposition` de la respuesta. |
| `request<T>(path, init?)` | Escotilla de escape. |

Los errores se lanzan como `HttpError` con `status` y el `detail` de FastAPI
como mensaje.

## Autoguardado

`useAutosave` existe por un motivo concreto: si cada campo dispara un `PATCH` al
perder el foco, dos peticiones concurrentes pueden llegar al backend en orden
invertido y dejar guardado el valor viejo. El hook serializa: mientras haya un
guardado en vuelo, los siguientes se colapsan en **uno solo** que corre al
terminar.

```tsx
const autosave = useAutosave(async () => {
  await api.updateExpense(id, formRef.current);
});

<Input onBlur={autosave.save} … />
<Switch onCheckedChange={(v) => { update({ payed: v }); autosave.save(); }} />
<AutosaveIndicator status={autosave.status} />
```

Dos reglas de uso:

- El callback tiene que leer el estado **por ref**, no por closure, para no
  guardar un valor viejo. El hook ya guarda la última versión del callback en
  cada render, pero el valor que ese callback lee es responsabilidad de la app.
- Antes de navegar, `await autosave.flush()`: si no, un guardado en vuelo puede
  quedar a mitad de camino cuando el componente se desmonta.
