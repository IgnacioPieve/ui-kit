import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Glob del código compilado del kit.
 *
 * Tailwind tiene que escanearlo para generar las clases que usan los
 * componentes del kit y que la app quizá nunca escriba (`bg-popover`,
 * `ring-ring`, `data-[state=checked]:…`). Ojo: Tailwind v3 **no** mergea el
 * `content` de los presets — el de la app lo pisa entero —, así que esto se
 * concatena a mano en `defineAppConfig`.
 */
export const uiContent = ["./node_modules/@pieve/ui/dist/**/*.{js,cjs}"];

/** Preset de Tailwind del design system. Ver `defineAppConfig`. */
export const preset = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1100px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      // El preflight de Tailwind emite `*, ::before, ::after { border-color:
      // theme(borderColor.DEFAULT) }`, así que con esto todo borde arranca en
      // el token correcto y no hace falta un `* { @apply border-border }`.
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Partial<Config>;

/**
 * Arma el `tailwind.config.ts` de una app: aplica el preset y agrega el
 * `content` del kit al de la app.
 *
 * ```ts
 * import { defineAppConfig } from "@pieve/ui/preset";
 * export default defineAppConfig({
 *   content: ["./index.html", "./src/**\/*.{ts,tsx}"],
 * });
 * ```
 *
 * Usar esto en vez de `presets: [preset]` a mano: si la app declara su propio
 * `content` sin incluir el del kit, los componentes salen sin estilos.
 */
export function defineAppConfig(config: Config): Config {
  return {
    ...config,
    presets: [preset, ...(config.presets ?? [])],
    content: Array.isArray(config.content)
      ? [...uiContent, ...config.content]
      : { ...config.content, files: [...uiContent, ...config.content.files] },
  };
}
