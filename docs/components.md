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
| `Input` | `variant`, `inputSize` | `variant="ghost"` no dibuja borde hasta el hover o el foco: para tablas donde cada celda es editable y veinte bordes permanentes tapan el contenido. `variant="bare"` no dibuja **nada** —ni borde, ni fondo, ni anillo—, para un campo que *es* el contenido; **no trae indicación de foco, así que el contenedor tiene que darla** (`focus-within:ring-2`). `inputSize="sm"` para filas densas. Con `type="number"` **no muestra las flechitas**: nadie suma un precio de a uno, y en una tabla son veinte pares de flechas tapando el valor. |
| `Textarea` | — | `<textarea>` nativo estilado. |
| `Label` | — | |
| `Select` | — | `<select>` nativo + chevron. Nativo a propósito: en mobile abre el picker del sistema. |
| `Switch` | Radix `Switch` | `checked`, `onCheckedChange`. |
| `Checkbox` | Radix `Checkbox` | `checked`, `onCheckedChange`. Un solo tamaño (16px): es el blanco de toque en el teléfono, y lo que se ajusta desde una app es el espacio alrededor, no la casilla. Acepta `checked="indeterminate"` para una selección parcial. |
| `Card` | `interactive?`, `asChild?` | Con `CardHeader` `CardTitle` `CardContent` `CardFooter`. `interactive` es la única respuesta a "esta tarjeta abre algo": hover, cursor y anillo de foco, que seis pantallas contestaban de tres maneras distintas. Con `asChild` la tarjeta **es** el `<Link>` en vez de un `<div onClick>` — que no entra en el orden de tabulación, no se abre en otra pestaña y no muestra a dónde va. |
| `Badge` | `variant` | `default` `primary` `success` `warning` `destructive` `outline`. |
| `Progress` | `value`, `max?`, `completeVariant?` | Barra de progreso. Toma los dos enteros crudos (12 de 19) en vez de un porcentaje: hacer la división afuera invita a dividir por cero cuando el total todavía es 0. Al llegar al total se pinta de `success`, salvo `completeVariant={false}`. |
| `ToggleGroup<T>` | `value`, `onChange`, `options`, `size?`, `block?`, `label?` | Control segmentado: opciones excluyentes que se comparan de un vistazo (👍/😐/👎, timeline/calendario). Botones nativos, sin Radix. Con más de cuatro opciones, o si no entran en una línea, va un `Select`. |
| `Skeleton` | — | Placeholder de carga. |
| `Spinner` | `className?` | Indicador de carga. Centrarlo es responsabilidad de quien lo usa. |
| `Dialog` | Radix `Dialog` | `DialogContent` acepta `hideClose`. Incluye `DialogHeader` `DialogTitle` `DialogDescription` `DialogFooter` `DialogTrigger` `DialogClose`. |
| `DropdownMenu` | Radix | Con `DropdownMenuTrigger` `DropdownMenuContent` `DropdownMenuItem` `DropdownMenuLabel` `DropdownMenuSeparator`. |
| `Toaster` / `toast` | — | Sonner. `<Toaster />` se monta una vez en el root; `toast.success(…)` / `toast.error(…)` desde cualquier lado. |

## Compuestos

| Componente | Props | Para qué |
|---|---|---|
| `AppShell` | `brand`, `nav?`, `actions?`, `children`, `className?` | Header sticky + contenedor principal. Layout base de todas las apps. Los links entre secciones van en `nav`, no en `actions`: en el teléfono bajan a una fila propia que scrollea sola, y el tema y los demás botones quedan siempre arriba a la derecha. Con todo junto en una fila, cuatro links y la marca se salen de un iPhone y la página entera scrollea de costado. |
| `AppBrand` | `icon`, `title`, `className?` | Icono + nombre con el tipografiado del sistema. Se pasa como `brand` de `AppShell`, opcionalmente envuelto en un link. |
| `ThemeToggle` | `label?` | Botón sol/luna. Usa `useTheme` internamente. |
| `AutosaveIndicator` | `status`, `savingLabel?`, `savedLabel?`, `errorLabel?` | Feedback silencioso del autoguardado ("Guardando… / Guardado"). A propósito no usa toasts: guardar es constante y un toast por campo sería ruido. |
| `SearchInput` | `value`, `onChange`, `placeholder?`, `clearable?`, `clearLabel?`, `autoFocus?` | Input con lupa y X para vaciar. `autoFocus` para el buscador de un diálogo, que se abre justamente para escribir. **No trae ancho ni `flex-1`**: para que ocupe el resto de una fila, `className="flex-1"`. |
| `DateInput` | `placeholder?`, `inputClassName?`, `clearable?`, `clearLabel?` + props de `Input` | **El campo de fecha del kit: es el único, para fechas opcionales y obligatorias.** Se ve **vacío**: iOS no dibuja nada en un `input[type=date]` sin valor —ni el `dd/mm/aaaa` de Chrome, ni el `placeholder`, que el HTML ignora acá—, así que el texto lo pone el kit encima del campo y se va al enfocarlo. **Lo dibuja siempre**, con o sin `placeholder`: sin él va `dd/mm/aaaa`, que además deja el formato en español donde el nativo lo saca del idioma del navegador. Pasá `placeholder` cuando el campo no traiga un `<Label>` pegado y haya que decir *cuál* es ("Desde", "Sin fecha") — solo el explícito se usa como `aria-label`. Se **vacía** con una X, prendida por defecto como en `SearchInput` y visible solo cuando hay fecha; la del navegador no alcanza (en Android no existe y donde existe es un blanco de toque de doce píxeles). Vaciar dispara el `onChange` que la app ya tiene, así que no hace falta un handler aparte. `className` va al contenedor. Para una fecha **obligatoria**, `clearable={false}`. |
| `EmptyState` | `icon?`, `title`, `description?`, `action?` | Caja punteada para listas vacías o búsquedas sin resultados. |
| `PageHeader` | `back?`, `title?`, `status?`, `actions?` | El encabezado de una pantalla de detalle. `back` lo trae la app (el kit no conoce el router); `status` es lo que le está pasando a la página —el indicador de autoguardado, el estado de un ticket— y va pegado al título porque no se toca; `actions` van contra el borde derecho. **Envuelve**: los botones del kit son `whitespace-nowrap`, así que una fila de cuatro no se achica sino que se sale de la pantalla, y eso una vez dejó el borrar de un ticket fuera del teléfono. |
| `SkeletonList` | `count?`, `className?` | Las filas fantasma de una lista que carga. `className` le da el alto de la fila real, para que no salte nada cuando lleguen los datos. Reemplaza al spinner centrado, que colapsa el alto y hace saltar la página entera al llegar los datos. |
| `FilterToolbar` | `search?`, `action?`, `children?`, `panel?`, `activeCount?`, `onClear?`, `results?`, `defaultOpen?`, `filtersLabel?`, `clearLabel?` | **La barra de buscar y filtrar de todas las apps.** Tres filas fijas: buscador y acción, los chips, y abajo "Filtros" con el conteo a la derecha. El `panel` es una **grilla de dos columnas** (una en el teléfono): cada hijo es una celda, y el que tenga que ocupar el ancho entero lo pide con `className="sm:col-span-2"`. Fijas a propósito — con todo en un solo `flex-wrap` lo que caía en cada línea dependía de cuántos chips tuviera cada app, y dos pantallas con la misma barra se leían distinto. El reparto es por frecuencia y no por tipo de control: en `children` lo de todos los días (chips, un `Select` corto), en `panel` lo de vez en cuando. Un filtro escondido igual se anuncia — `activeCount` es el badge del botón "Filtros"—, así que el panel cerrado nunca esconde por qué la lista está corta. `results` va a la derecha y sale del total de la consulta, no de lo que descargó el scroll. |
| `Field` | `label`, `htmlFor?`, `children`, `className?` | Un control con su título encima: la unidad de todo formulario y de todo panel de filtros. Estaba escrito veintidós veces a mano. El título va en `block` (un `<label>` es inline y se sentaba al lado de un hijo inline) y el campo lleva `min-w-0` para poder angostarse como celda de una grilla. `className="sm:col-span-2"` para el que ocupe las dos columnas del panel. Reemplaza a `FilterField`. |
| `FormActions` | `children`, `className?` | El pie de un editor: pegado abajo en el teléfono, una fila más de `sm` para arriba. El sangrado negativo es exactamente el padding del `container`, que es una decisión del preset y no de la app — escrito a mano en dos apps, una lo puso en `-mx-6` contra un `px-4` y la página se iba 16px de costado en un iPhone. |
| `FilterChip` | `selected`, `onClick`, `icon?`, `children`, `title?` | Filtro independiente de sí o no, para conjuntos donde varias respuestas conviven (categorías, etiquetas). |
| `FilterChipGroup<T>` | `label`, `options`, `value`, `onChange` | Una pregunta con respuestas excluyentes, en una cápsula: el fondo es lo que las agrupa. Si no entra en el ancho, la cápsula scrollea adentro suyo — cuatro respuestas de nombre largo se salen de un teléfono y la última quedaría cortada contra el borde, inalcanzable. Se apaga tocando la prendida, y por eso no es `ToggleGroup` — aquel obliga a tener siempre una elegida, que para un filtro es agregarle un "Todos" a cada grupo. Entre cápsulas los filtros se acumulan. |
| `ConfirmDialog` | `open`, `onOpenChange`, `title`, `description?`, `confirmLabel?`, `cancelLabel?`, `variant?`, `loading?`, `onConfirm` | Reemplazo del `confirm()` del browser: estilable, cierra con Escape, atrapa el foco. |
| `Collapsible` | `children`, `collapsedHeight?`, `showMoreLabel?`, `showLessLabel?` | Recorta contenido largo con degradé y toggle. |
| `CopyButton` | `value`, `label?`, `successMessage?`, `errorMessage?` | Copia al portapapeles con feedback y fallback para HTTP plano. |
| `Markdown` | `children`, `className?` | Markdown GFM. Los estilos viven en la clase `.markdown` de `styles.css`. |
| `Autocomplete<T>` | `value`, `onChange`, `options`, `getKey?`, `getLabel?`, `renderOption?`, `onSelect?`, `serverFiltered?`, `maxOptions?`, `onEnter?`, `onBlur?` | Input con sugerencias navegable por teclado (↑ ↓ Enter Esc). Sirve para listas de strings y para objetos con render propio. Con `serverFiltered` no filtra localmente. |
| `FileDropzone` | `onFiles`, `accept?`, `multiple?`, `disabled?`, `size?`, `active?`, `label?`, `activeLabel?`, `hint?` | Drag & drop + clic. `size="sm"` es una fila compacta en línea, con la misma altura que un `Button` para que alineen; `"lg"` una caja grande. `active` la resalta (p. ej. como destino de un pegado con Ctrl+V). `accept` usa el formato de react-dropzone: `{ "image/*": [] }`. |
| `CameraButton` | `onCapture`, `facing?`, `multiple?`, `label?` + props de `Button` | Abre la cámara del dispositivo. Va **aparte** del `FileDropzone`: el atributo `capture` fuerza la cámara y deja sin acceso a la galería, así que un mismo control no puede ofrecer ambas. En desktop los navegadores lo ignoran y abren el selector común. |
| `FilePreview` | `url`, `filename`, `contentType?`, `size?`, `compact?`, `downloadLabel?` | Previsualiza según el tipo: imagen con lightbox, PDF embebido, audio, video, o tarjeta de descarga. Con `compact`, miniatura o chip. |
| `LinkPreview` | `url`, `title?`, `compact?`, `openLabel?`, `className?` | El hermano de `FilePreview` para lo que no se sube sino que se enlaza: si la URL es de YouTube embebe el reproductor, y si no muestra un botón para abrirla en otra pestaña. Con `compact`, un chip en línea. |
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
| `groupByMonth(items, getDate)` | Agrupa por mes, del más reciente al más viejo. Devuelve `{ key, label, items }[]`. Los items sin fecha caen en el mes actual. |
| `todayISO()` | Hoy en `YYYY-MM-DD`, **local** (no UTC). |
| `capitalize(s)` | |
| `formatCurrency(cents, currency)` | Un monto guardado en **centavos**: `$ 1,234.56`. |
| `formatAmount(value, decimales = 0)` | Un número con los separadores de la familia, sin símbolo. Para las apps que guardan la plata en pesos enteros y no pueden usar `formatCurrency`. |
| `formatFileSize(bytes)` | `1,4 MB` |
| `fileKind(contentType)` | `"image" \| "pdf" \| "audio" \| "video" \| "other"` |
| `linkKind(url)` | `"youtube" \| "other"` |
| `safeUrl(url)` | La URL normalizada si es http(s), o `null`. Todo lo demás (`javascript:`, `data:`) se descarta antes de llegar a un `href` o a un `src`. |
| `youtubeEmbedUrl(url)` | URL embebible (`youtube-nocookie.com`) de un video de YouTube, o `null`. Cubre `watch?v=`, `youtu.be/`, `shorts/`, `embed/` y `live/`, y conserva el timestamp `?t=`. |
| `linkHost(url)` | El host sin `www.`, para etiquetar un link cuando no hay título. |
| `copyToClipboard(text)` | Con fallback para contexto no seguro (HTTP plano en la LAN). |
| `genId()` | Id local, con fallback si no hay `crypto.randomUUID`. |
| `downloadBlob(blob, filename)` / `downloadJson(data, filename)` | Disparan una descarga. |
| `filenameFromDisposition(header, fallback)` | Lee el `filename="…"` de un `Content-Disposition`. |

**Hay dos locales, y son dos decisiones distintas.** `LOCALE` (`es-AR`) es el de
las fechas, que se leen como texto: *10 de marzo de 2026*. `MONEY_LOCALE`
(`en-US`) es el de los números: **coma para los miles, punto para los
decimales** (`1,234,567.50`).

El símbolo de la moneda no lo pone `Intl` sino una tabla del kit (`ARS` → `$`,
`USD` → `US$`, `EUR` → `€`). Con `style: "currency"` en `en-US`, el peso sale
como `ARS 1,234.56` —el código entero, porque no es la moneda local del
locale— y con `currencyDisplay: "narrowSymbol"` sale como `$`, igual que el
dólar, que en una app con las dos monedas juntas es peor que feo.

## Cliente HTTP

```ts
const http = createHttpClient("", { trace: true });
const visits = await http.get<Visit[]>("/api/visits", { q: "control" });
```

`baseUrl` vacío —el default, y lo que usan las seis apps— significa mismo
origen: nginx hace de reverse-proxy de `/api/` al backend, así que la app
funciona desde cualquier host o IP sin URLs hardcodeadas en el build.

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

### Tracing

Con `{ trace: true }` el cliente loguea por consola cada request con su payload
y cada respuesta con su duración, en grupos colapsados. **Es del cliente y no de
cada endpoint a propósito**: el cliente ya conoce el método, el path final —con
query string— y el body; envolver cada llamada a mano obliga a repetir los tres,
y el día que uno se edita y el otro no, el log miente sin que falle nada.

Para los hechos de dominio que no son una request, el kit exporta `log`:

```ts
import { log } from "@pieve/ui";
log.event("receipt", `#${receipt.id} encolado para extraer`, receipt);
```

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
