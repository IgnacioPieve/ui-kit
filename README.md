# ui-kit (`@pieve/ui`)

Design system compartido de mis proyectos personales: **tokens de color, preset
de Tailwind, componentes React y helpers**. La idea es que todas las apps se
vean y se comporten igual, y que un cambio —el buscador, el dropzone, la paleta—
se haga **en un solo lugar** y llegue a todas.

- **Repo público a propósito**: las apps lo instalan desde git durante el build
  de Docker, sin credenciales. Acá no hay nada sensible.
- Código en inglés, textos de UI en español.
- React 18 + TypeScript + Tailwind 3.

## Requisitos

- Docker (no hace falta Node en el host).

## Cómo lo usa una app

### 1. Dependencia

```jsonc
// frontend/package.json
{
  "dependencies": {
    "@pieve/ui": "github:IgnacioPieve/ui-kit#v0.1.0"
  }
}
```

Se apunta a un **tag**, no a `main`, para que un `npm install` no cambie la UI
sin querer. El `dist/` está commiteado: `npm install` no compila nada.

### 2. Estilos

En `src/main.tsx`, **antes** del CSS propio:

```ts
import "@pieve/ui/styles.css";
import "./index.css";
```

### 3. Tailwind

```ts
// frontend/tailwind.config.ts
import { defineAppConfig } from "@pieve/ui/preset";

export default defineAppConfig({
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
});
```

> `defineAppConfig` no es azúcar: Tailwind v3 no mergea el `content` de los
> presets, así que armar el config a mano deja los componentes del kit sin
> estilos **con el build en verde**. Ver
> [architecture.md](docs/architecture.md#la-trampa-del-content).

### 4. Componentes

```tsx
import { AppShell, AppBrand, Button, SearchInput, ThemeToggle } from "@pieve/ui";
```

## Qué hay adentro

| Módulo | Contenido |
|---|---|
| `styles.css` | Tokens HSL (claro/oscuro), estilos de `body`, `.markdown`, `.no-spinner`. |
| `preset` | Preset de Tailwind + `defineAppConfig`. |
| `ui/` | `Button` `Input` `Textarea` `Label` `Select` `Switch` `Card` `Badge` `Dialog` `DropdownMenu` `Skeleton` `Spinner` `Toaster`. |
| Compuestos | `AppShell` `AppBrand` `ThemeToggle` `SearchInput` `DateInput` `EmptyState` `ConfirmDialog` `Collapsible` `CopyButton` `Markdown` `Autocomplete` `FileDropzone` `FilePreview` `SectionHeading` `MonthHeading` `InfiniteScrollTrigger`. |
| Hooks | `useTheme` `useDebounce` `useClickOutside`. |
| Lib | `cn`, fechas, `formatCurrency`, `formatFileSize`, `fileKind`, `copyToClipboard`, `downloadBlob`, `genId`. |
| HTTP | `createHttpClient` — cliente `fetch` tipado que entiende los errores de FastAPI. Con `{ trace: true }` loguea toda la conversación por consola. |

Referencia completa en [`docs/components.md`](docs/components.md) y
[`docs/tokens.md`](docs/tokens.md).

## Desarrollo

```bash
D="docker run --rm -v $PWD:/app -w /app -e HOME=/tmp --user $(id -u):$(id -g) node:22-alpine"

$D npm install
$D npm run typecheck    # el gate del repo
$D npm run build        # -> dist/ (va commiteado)
```

Para publicar una versión: build, commit **incluyendo `dist/`**, tag, push, y
subir el tag en cada app. Detalle en
[`docs/development.md`](docs/development.md#publicar-una-versión).

## Documentación

Documentación completa en [`docs/`](docs/README.md): arquitectura, referencia de
componentes, referencia de tokens y guía de desarrollo. Para agentes de IA que
trabajen en el repo, ver [`CLAUDE.md`](CLAUDE.md).

## Proyectos hermanos

- [expenses](https://github.com/IgnacioPieve/expenses) — seguimiento de gastos.
- [watchlog](https://github.com/IgnacioPieve/watchlog) — registro de películas y series.
- [health](https://github.com/IgnacioPieve/health) — registros médicos.
- [groceries](https://github.com/IgnacioPieve/groceries) — tickets de supermercado.
- [finance](https://github.com/IgnacioPieve/finance) — tablero de solvencia proyectada.
