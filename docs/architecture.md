# Arquitectura

Explicación de cómo está organizado el kit y por qué.

## Principio rector

**Un cambio de estética se hace en un solo lugar.** Todo lo que más de un
proyecto pueda necesitar vive acá; las apps solo tienen lo que es genuinamente
suyo. El corolario es incómodo pero necesario: si una app necesita un
componente reutilizable, no se escribe en la app, se escribe acá y se consume.

## Vista general

```
┌──────────────────────────────┐
│          @pieve/ui           │
│  ┌────────┐  ┌────────────┐  │
│  │ tokens │  │  preset de │  │   styles.css  →  variables CSS
│  │  HSL   │──│  Tailwind  │  │   preset.ts   →  colores, radios, container
│  └────────┘  └────────────┘  │
│  ┌────────────────────────┐  │
│  │ primitivas  compuestos │  │   Button, Dialog… / AppShell, SearchInput…
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  hooks   lib   http    │  │   useTheme… / formatDate… / createHttpClient
│  └────────────────────────┘  │
└──────────────┬───────────────┘
               │ github:IgnacioPieve/ui-kit#vX.Y.Z  (tag fijo)
   ┌───────┬───────┼───────┬────────┬─────────┐
   ▼       ▼       ▼       ▼        ▼         ▼
invoices watchlog health groceries finance expenses
```

## Capas

- `src/styles.css` — tokens y estilos base. **CSS plano**, ver abajo.
- `src/preset.ts` — el preset de Tailwind y `defineAppConfig`, el helper que
  arma el config de cada app.
- `src/components/ui/` — primitivas estilo shadcn, un archivo por primitiva.
  No tienen lógica de negocio ni conocen ninguna app.
- `src/components/*.tsx` — compuestos, construidos sobre las primitivas.
- `src/hooks/`, `src/lib/` — piezas sin dependencia de React DOM salvo lo justo.
- `src/labels.ts` — textos por defecto de los componentes del kit. Los textos
  propios de cada app van en su `lib/strings.ts`, nunca acá.

## Decisiones notables

### `styles.css` es CSS plano, sin `@apply`

Las apps lo importan desde `main.tsx` **antes** de su propio `index.css`. Al no
tener directivas de Tailwind, no necesita pasar por PostCSS y el orden queda
garantizado por el grafo de módulos del bundler, que es determinístico.

La contra es que el preflight de Tailwind se inyecta **después**. Por eso todas
las reglas del kit usan selector de clase (`.markdown a`, especificidad 0-1-1) y
le ganan igual a las del preflight (`a`, 0-0-1). La única excepción es `body`,
donde no hay conflicto porque el preflight no toca color ni fondo.

### Los tokens son tripletas HSL sin `hsl()`

```css
:root { --primary: 199 89% 48%; }
```

Así Tailwind puede componer opacidad: `bg-primary/10` se expande a
`hsl(var(--primary) / 0.1)`. Con un color ya cerrado (`#0ea5e9` o
`hsl(199 89% 48%)`) esa composición no es posible.

### `borderColor.DEFAULT` en el preset

El preflight de Tailwind emite `*, ::before, ::after { border-color:
theme(borderColor.DEFAULT) }`. Definiendo ese valor en el preset, todo borde
arranca en el token correcto y las apps no necesitan un `* { @apply
border-border }` en su CSS.

### Build dual (ESM + CJS)

Los bundlers de las apps consumen el ESM, pero Tailwind carga
`tailwind.config.ts` a través de jiti, que resuelve la condición `require`. Sin
el CJS, importar el preset desde el config falla.

### `dist/` va commiteado

Las apps instalan desde git (`github:IgnacioPieve/ui-kit#vX.Y.Z`), sin registry.
Al estar el build ya commiteado, `npm install` no tiene que compilar nada: no
hace falta un script `prepare` ni instalar devDependencies durante el build de
Docker. El costo es acordarse de rebuildear en el mismo commit que toca `src/`.

### El repo tiene que ser público

`npm install` lo baja de forma anónima durante el build de Docker. Para un repo
público npm usa el tarball de codeload y ni siquiera necesita `git`. Si fuera
privado, el build no tendría credenciales para clonarlo. Acá no hay nada
sensible: son componentes de UI.

### Sin dependencia de routing

`AppShell` recibe `brand` como `ReactNode` en vez de un `href`. Así las apps con
varias pantallas lo envuelven con el `<Link>` de react-router, y una de una sola
pantalla no arrastraría un router que no usa.

## La trampa del `content`

Tailwind v3 **no mergea el `content` de los presets**: el array de la app lo pisa
entero. Si una app arma su config con `presets: [preset]` y su propio `content`,
Tailwind no escanea el `dist/` del kit y las clases que solo aparecen dentro de
sus componentes (`bg-popover`, `ring-ring`, `data-[state=checked]:…`) nunca se
generan.

El síntoma es feo: los componentes salen sin estilos y **el build pasa en
verde**. Por eso el kit expone `defineAppConfig`, que concatena el `content` del
kit con el de la app. Las apps siempre lo usan; armar el config a mano es un bug
esperando a pasar.

Al agregar un componente que use una clase que ninguna app escribe por su
cuenta, conviene verificar que aparezca en el CSS compilado de la app.
