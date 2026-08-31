# CLAUDE.md

Guidance for AI agents working in this repo. Keep it short; update it when the
truth changes. Code is in **English**, UI strings in **Spanish**.

This is the design system consumed by the five sibling apps, which follow a
shared layout and conventions:
[expenses](https://github.com/IgnacioPieve/expenses),
[watchlog](https://github.com/IgnacioPieve/watchlog),
[health](https://github.com/IgnacioPieve/health),
[groceries](https://github.com/IgnacioPieve/groceries) and
[finance](https://github.com/IgnacioPieve/finance). The family-level rules live
in `~/CLAUDE.md`.

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

Changing an export name or a prop is a breaking change for **five** repos at
once — bump the tag and update all of them the same day, or don't do it. A pin
that drifts is how the kit stops mattering: a fix that reaches two apps out of
five is not a shared design system.

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

## Commits

Gitmoji, a short subject in **English**, and a body whenever the change needs
explaining:

```
✨ Add dark mode toggle

Persists the choice in localStorage and falls back to the system preference,
so the app opens in the right theme on first load instead of flashing light.
```

Subject in the imperative, ~50 chars, no trailing period. The body is where the
*why* goes — the diff already shows the *what*. Body in English too.

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
- **Nothing here fails on a narrow screen, it just leaves the box.** A header
  row that neither wraps nor scrolls does not error: the page grows sideways
  (581px inside a 390px iPhone, measured on groceries) and the sticky header
  gets cut. Anything that lines up an unknown number of children — `AppShell`,
  a toolbar — wraps or scrolls, and a component that cannot know its own width
  keeps `min-w-0`. Check it at 390px before releasing.
- **An empty `input[type=date]` draws nothing on iOS**: no `dd/mm/aaaa`, and
  `placeholder` does not apply to date fields. Without a `<Label>` next to it,
  the field is a mute rectangle. That is what `DateInput` exists for — and
  since v0.13.0 it draws `dd/mm/aaaa` itself when the app passes no
  `placeholder`, because "remember to pass a text" is not a fix: four of the
  six date fields in the family had forgotten. The native text is no
  consolation either — Chrome picks its format from the **browser's** language,
  not the document's `lang`, so an app written entirely in Spanish shows
  `mm/dd/yyyy` to anyone whose browser is in English.
- **Text drawn *over* an input has to track that input's size variant.**
  `DateInput` paints its own placeholder in a `<span>`, and the span was
  hardwired to `text-sm left-3` — which silently matches only the default size.
  In an `inputSize="sm"` field (`text-xs px-2`) the placeholder sat two pixels
  larger and four further right than the value it replaces, so typing made the
  text jump. Nothing errored and no app noticed until one asked for a
  placeholder on a small field. Any overlay of this kind reads `inputSize`.
- **A bare element selector in `styles.css` cannot beat a Tailwind utility.**
  Utilities are class selectors (0-1-0) injected *after* this file, so
  `input { font-size: 16px }` (0-0-1) loses twice over. It looks like it works
  because it does beat preflight. The iOS 16px rule was written, documented and
  **completely inert from v0.8.0 to v0.10.2** — every app still zoomed on focus
  on an iPhone — and nothing surfaced it until the computed `font-size` was
  measured at 390px and came back 14. If a base style has to beat a utility the
  components already carry, give the selector the specificity to do it
  (`html :is(input, …)`, 0-1-1) and say in a comment that the prefix is there
  for specificity and nothing else. Putting it in each component's cva instead
  looks tidier and is worse: an app passing `className="text-sm"` silently wins
  on mobile, and every call site has to remember the responsive pair.
- **A grid cell is `min-width: auto`.** It sizes to its content, so a child that
  knows how to scroll inside itself — `FilterChipGroup` — widened the cell
  instead of scrolling, and the whole page went sideways on a phone. Anything
  laid out in a grid that can hold something wider than its share carries
  `min-w-0`; `Field` does.
- **A `<label>` is inline**, so it lands *beside* an inline child and *above* a
  block one. `Field` looked correct next to a `Select` and wrong next to a
  chip capsule, from the same code. Any wrapper that stacks a title over
  arbitrary content has to say `block`.
- **`asChild` takes exactly one element child.** `Card asChild` / `Button
  asChild` merge their classes onto the child through Radix's `Slot`, which
  throws at runtime on a fragment or on two siblings. It is what makes a
  clickable card *be* the `<a>` instead of a `<div onClick>` — and a
  `<div onClick>` is not a bug the type checker will ever mention: it is simply
  not focusable, not middle-clickable, and does not show where it goes.
- **Measure, do not read, when a style is supposed to apply.** Two of the bugs
  above (the dead 16px rule, the placeholder that ignored `inputSize`) were
  invisible in the source and obvious in `getComputedStyle`. Headless Chrome
  over CDP at a 390px viewport is a two-minute check.

## Docs

Full documentation in [`docs/`](docs/README.md): architecture, component
reference, token reference, development guide. Update them when the truth
changes.
