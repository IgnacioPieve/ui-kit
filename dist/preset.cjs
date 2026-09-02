'use strict';

var plugin = require('tailwindcss/plugin');
var animate = require('tailwindcss-animate');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var plugin__default = /*#__PURE__*/_interopDefault(plugin);
var animate__default = /*#__PURE__*/_interopDefault(animate);

// src/preset.ts
var uiContent = ["./node_modules/@pieve/ui/dist/**/*.{js,cjs}"];
var containerPadding = plugin__default.default(({ addComponents, theme }) => {
  addComponents({
    [`@media (min-width: ${theme("screens.sm")})`]: {
      ".container": { paddingLeft: "1.5rem", paddingRight: "1.5rem" }
    }
  });
});
var preset = {
  darkMode: "class",
  theme: {
    container: {
      center: true,
      // 1rem y no 1.5: en un teléfono de 375px, 1.5rem son 48px de margen para
      // 327px de contenido, y se nota en todo —grillas de tarjetas, columnas de
      // montos, filas de tabla—. De `sm` para arriba vuelve a 1.5rem, pero eso
      // NO se puede escribir acá: ver `containerPadding` abajo.
      padding: "1rem",
      // Ancho completo hasta 1100px, sin los máximos de cada breakpoint.
      screens: { "2xl": "1100px" }
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))"
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        // Las ocho ranuras de serie de los gráficos, en orden fijo. Se emiten
        // como colores para que `fill-chart-3` o `bg-chart-3/20` existan sin
        // que ninguna app escriba un hex. Ver `src/styles.css` para el porqué
        // de los valores y para la obligación de etiquetar en modo claro.
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
          6: "hsl(var(--chart-6))",
          7: "hsl(var(--chart-7))",
          8: "hsl(var(--chart-8))"
        }
      },
      // El preflight de Tailwind emite `*, ::before, ::after { border-color:
      // theme(borderColor.DEFAULT) }`, así que con esto todo borde arranca en
      // el token correcto y no hace falta un `* { @apply border-border }`.
      borderColor: {
        DEFAULT: "hsl(var(--border))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      }
    }
  },
  plugins: [animate__default.default, containerPadding]
};
function defineAppConfig(config) {
  return {
    ...config,
    presets: [preset, ...config.presets ?? []],
    content: Array.isArray(config.content) ? [...uiContent, ...config.content] : { ...config.content, files: [...uiContent, ...config.content.files] }
  };
}

exports.defineAppConfig = defineAppConfig;
exports.preset = preset;
exports.uiContent = uiContent;
//# sourceMappingURL=preset.cjs.map
//# sourceMappingURL=preset.cjs.map