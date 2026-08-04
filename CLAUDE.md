# CLAUDE.md

Guidance for AI agents working in this repo. Keep it short; update it when the
truth changes. Code is in **English**, UI strings in **Spanish**.

This is the design system consumed by the sibling repos, which follow a shared
layout and conventions: [MedLog](https://github.com/IgnacioPieve/MedLog) and
[expenses](https://github.com/IgnacioPieve/expenses).

## What this is

`@pieve/ui` — tokens, a Tailwind preset, React components, hooks and helpers
shared by every personal project. The whole point is that a change here lands in
every app: **never fix a styling or shared-component bug inside an app, fix it
here**.

The repo is **public on purpose**: the apps install it from git during their
Docker build, with no credentials. Nothing sensitive lives here.

## Commands

Everything runs in Docker; there is no local node toolchain.

```bash
D="docker run --rm -v $PWD:/app -w /app -e HOME=/tmp --user $(id -u):$(id -g) node:22-alpine"

$D npm install
$D npm run typecheck    # tsc --noEmit — the gate
$D npm run build        # tsup -> dist/ (ESM + CJS + .d.ts + styles.css)
$D npm run dev          # tsup --watch
```

There is no lint or test suite. A green `typecheck` plus a green `build` is the
gate — but see **Traps**: green does not prove the styles reach the apps.

## Architecture

| Path | Responsibility |
|---|---|
| `src/styles.css` | Design tokens + base styles. **Plain CSS on purpose** — no `@apply`, no Tailwind directives — so apps can import it without PostCSS. |
| `src/preset.ts` | Tailwind preset + `defineAppConfig`, the helper every app's `tailwind.config.ts` must use. |
| `src/components/ui/` | shadcn-style primitives, one file per primitive. No business logic. |
| `src/components/*.tsx` | Composed components built on those primitives. |
| `src/hooks/`, `src/lib/` | Hooks and framework-agnostic helpers. |
| `src/labels.ts` | Default Spanish strings for kit-internal text. |
| `dist/` | Committed build output. **Never edited by hand.** |

Apps import it *before* their own `index.css`; every rule in `styles.css` is
class-scoped so it still beats Tailwind's preflight, which is injected
afterwards. `borderColor.DEFAULT` is set in the preset so preflight itself
paints every border with the token.

## The contract with the apps

What consumers depend on, and therefore what cannot break casually:

- Apps pin a **tag** (`github:IgnacioPieve/ui-kit#vX.Y.Z`), never `main`.
- Apps call `defineAppConfig` in their `tailwind.config.ts`.
- Apps import `@pieve/ui/styles.css` before their own CSS.
- `@pieve/ui` exports components, hooks, helpers and `createHttpClient` from the
  root; the preset from `@pieve/ui/preset`; the stylesheet from
  `@pieve/ui/styles.css`.

Changing an export name or a prop is a breaking change for two repos at once —
bump the tag and update both, or don't do it.

## Conventions & constraints

- **Dual build (ESM + CJS) is required.** App bundlers take ESM, but Tailwind
  loads `tailwind.config.ts` through jiti, which resolves the `require`
  condition. Dropping CJS breaks every app's Tailwind config.
- **`dist/` is committed**, so apps install straight from git with no build step
  at install time and no registry. Any change to `src/` must be rebuilt in the
  **same commit**.
- Colors are always **semantic tokens** (`bg-primary`, `text-muted-foreground`),
  never literal palettes (`bg-sky-600`, `dark:bg-gray-800`). If a component needs
  a shade that does not exist, add a token — do not hardcode.
- Tokens are HSL triplets without `hsl()` so Tailwind can compose opacity
  (`bg-primary/10`).
- Components take a `className` and merge it with `cn()` so apps can adjust
  spacing without forking the component.
- No routing dependency: `AppShell` takes `brand` as a `ReactNode` so each app
  wraps it with its own `<Link>` (or nothing).
- App-specific copy belongs in the app's `lib/strings.ts`, never in `labels.ts`.
- Releases are tags: bump `package.json`, rebuild, commit, tag `vX.Y.Z`, push.

## Traps

Things that fail **silently** or in a confusing way:

- **Tailwind v3 does not merge `content` across presets** — the app's array wins
  outright. That is why apps must go through `defineAppConfig`; otherwise classes
  that only appear inside this package's compiled components are never generated
  and the components render unstyled **with a green build in both repos**. When
  adding a component that uses a class no app writes itself, verify it lands in
  the app's built CSS (see `docs/development.md#verificación`).
- Grepping the built CSS for variants needs the escaped form: Tailwind writes
  `data-[state=checked]:` as `data-\[state\=checked\]\:`. Use `grep -F`.
- Committing `src/` without rebuilding `dist/` ships stale code to the apps with
  no error anywhere.
- Moving an existing tag instead of creating a new one leaves apps on a cached
  tarball. Always create a new tag.

## Docs

Full documentation in [`docs/`](docs/README.md): architecture, component
reference, token reference, development guide. Update them when the truth
changes.
