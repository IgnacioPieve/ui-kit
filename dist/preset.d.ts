import * as tailwindcss_types_config from 'tailwindcss/types/config';
import { Config } from 'tailwindcss';

/**
 * Glob del código compilado del kit.
 *
 * Tailwind tiene que escanearlo para generar las clases que usan los
 * componentes del kit y que la app quizá nunca escriba (`bg-popover`,
 * `ring-ring`, `data-[state=checked]:…`). Ojo: Tailwind v3 **no** mergea el
 * `content` de los presets — el de la app lo pisa entero —, así que esto se
 * concatena a mano en `defineAppConfig`.
 */
declare const uiContent: string[];
/** Preset de Tailwind del design system. Ver `defineAppConfig`. */
declare const preset: {
    darkMode: "class";
    theme: {
        container: {
            center: true;
            padding: string;
            screens: {
                "2xl": string;
            };
        };
        extend: {
            fontFamily: {
                sans: [string, string, string];
            };
            colors: {
                border: string;
                input: string;
                ring: string;
                background: string;
                foreground: string;
                primary: {
                    DEFAULT: string;
                    foreground: string;
                };
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                success: {
                    DEFAULT: string;
                    foreground: string;
                };
                warning: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
            };
            borderColor: {
                DEFAULT: string;
            };
            borderRadius: {
                lg: string;
                md: string;
                sm: string;
            };
            keyframes: {
                "accordion-down": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                "accordion-up": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
            };
        };
    };
    plugins: ({
        handler: () => void;
    } | {
        handler: tailwindcss_types_config.PluginCreator;
        config?: Partial<tailwindcss_types_config.Config>;
    })[];
};
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
declare function defineAppConfig(config: Config): Config;

export { defineAppConfig, preset, uiContent };
