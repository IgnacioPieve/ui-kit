# Desarrollo

Cómo compilar el kit, publicar una versión y adoptarlo en un proyecto nuevo.

## Requisitos

- Docker.

No hace falta tener Node instalado en el host: **todo se construye dentro de
contenedores**, igual que en las apps.

Para no repetir el comando largo, conviene definirlo una vez por sesión:

```bash
D="docker run --rm -v $PWD:/app -w /app -e HOME=/tmp --user $(id -u):$(id -g) node:22-alpine"
```

## Puesta en marcha

```bash
$D npm install
```

## Comandos útiles

```bash
$D npm run typecheck    # tsc --noEmit — el gate del repo
$D npm run build        # tsup -> dist/ (ESM + CJS + .d.ts + styles.css)
$D npm run dev          # tsup --watch
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/styles.css` | Tokens y estilos base. CSS plano, sin `@apply`. |
| `src/preset.ts` | Preset de Tailwind + `defineAppConfig`. |
| `src/components/ui/` | Primitivas estilo shadcn, una por archivo. |
| `src/components/*.tsx` | Compuestos. |
| `src/hooks/`, `src/lib/` | Hooks y helpers. |
| `src/labels.ts` | Textos por defecto del kit (en español). |
| `dist/` | Build commiteado. **No se edita a mano.** |

## Verificación

`npm run typecheck` y `npm run build` en verde alcanzan como gate del repo. No
hay suite de tests automatizados.

Pero el build verde **no** garantiza que los estilos lleguen: si agregás un
componente que usa una clase que ninguna app escribe por su cuenta, verificá que
aparezca en el CSS compilado de la app. Con el kit empaquetado como tarball:

```bash
# 1. En el repo del kit
$D npm pack --pack-destination /tmp/pkg

# 2. En la app, contra ese tarball en vez del tag de git
npm pkg set dependencies.@pieve/ui=file:/tmp/pkg/pieve-ui-0.1.0.tgz
npm install && npm run build
grep -c "bg-popover" dist/assets/*.css
```

Ojo con el escapado al buscar variantes: Tailwind escribe
`data-[state=checked]:` como `data-\[state\=checked\]\:` en el CSS. Conviene
usar `grep -F` con la forma literal.

## Publicar una versión

1. Cambiar el código en `src/`.
2. `$D npm run typecheck` y `$D npm run build`.
3. Commitear **incluyendo `dist/`** — el build tiene que viajar en el mismo
   commit que el fuente, si no las apps instalan código desactualizado.
4. Tag y push:

   ```bash
   npm version patch --no-git-tag-version   # o editar package.json a mano
   git commit -am "v0.1.1"
   git tag v0.1.1 && git push --follow-tags
   ```

5. En **las seis** apps, apuntar la dependencia al tag nuevo, regenerar el
   lock y reconstruir:

   ```bash
   # frontend/package.json
   "@pieve/ui": "github:IgnacioPieve/ui-kit#v0.1.1"

   cd <app>/frontend
   docker run --rm -v "$PWD:/app" -w /app -e HOME=/tmp --user "$(id -u):$(id -g)" \
     node:22-alpine npm install --package-lock-only
   cd .. && docker compose build frontend
   ```

   El lock no es opcional: el build corre `npm ci`, que instala exactamente lo
   que dice `package-lock.json` y falla si el pin y el lock no coinciden.

Las apps apuntan a un **tag**, nunca a `main`, para que un `npm install` no
cambie la UI sin querer.

**El mismo día, las seis.** Un release que llega a dos de seis es como no
haberlo hecho: la próxima vez que algo falle en una app sin el arreglo, la
salida barata va a ser parchearlo ahí — y así fue como cuatro arreglos que
correspondían al kit terminaron viviendo en los `index.css` de dos apps
mientras las otras tres seguían con los bugs.

## Adoptar el kit en un proyecto nuevo

1. Dependencia en `frontend/package.json`:

   ```jsonc
   "@pieve/ui": "github:IgnacioPieve/ui-kit#v0.1.0"
   ```

2. `src/main.tsx`, con el import del kit **antes** del CSS propio:

   ```ts
   import "@pieve/ui/styles.css";
   import "./index.css";
   ```

3. `tailwind.config.ts`:

   ```ts
   import { defineAppConfig } from "@pieve/ui/preset";

   export default defineAppConfig({
     content: ["./index.html", "./src/**/*.{ts,tsx}"],
   });
   ```

4. `src/index.css` solo con las directivas:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

watchlog sirve como plantilla completa (backend, Docker, nginx, tests, docs).

## Troubleshooting

### Los componentes del kit salen sin estilos

Casi seguro el `tailwind.config.ts` de la app no usa `defineAppConfig`. Tailwind
v3 no mergea el `content` de los presets, así que armarlo a mano deja el `dist/`
del kit sin escanear y las clases nunca se generan — **con el build en verde**.
Ver [architecture.md](architecture.md#la-trampa-del-content).

### Los tokens no aplican / los colores salen raros

El orden de imports en `main.tsx` importa: `@pieve/ui/styles.css` va **antes**
que `./index.css`. Al revés, el preflight de Tailwind queda antes de los tokens.

### Una app instala una versión vieja

npm cachea los tarballs de git por ref. Si moviste un tag en vez de crear uno
nuevo, la app puede seguir con el build anterior. Siempre crear un tag nuevo;
si hay que forzar, `npm install --prefer-online` o borrar `node_modules`.

### `npm install` falla al resolver `@pieve/ui`

El repo del kit tiene que ser **público**: el build de Docker lo baja de forma
anónima y no tiene credenciales. Es seguro que lo sea — acá no hay nada
sensible, son componentes de UI.
