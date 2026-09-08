import type { ComponentType, ReactNode } from "react";
import { cn } from "../lib/cn";
import { labels } from "../labels";

export interface AppBrandProps {
  /** Icono de lucide-react (o cualquier componente que acepte `className`). */
  icon: ComponentType<{ className?: string }>;
  title: string;
  className?: string;
}

export function AppBrand({ icon: Icon, title, className }: AppBrandProps) {
  return (
    <span
      className={cn("flex min-w-0 items-center gap-2 font-semibold", className)}
    >
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <span className="truncate text-lg tracking-tight">{title}</span>
    </span>
  );
}

export interface AppShellProps {
  /** Normalmente un `<AppBrand />`, opcionalmente envuelto en un link. */
  brand: ReactNode;
  /**
   * Navegación principal: los links entre secciones. En el teléfono baja a su
   * propia fila; en escritorio va en la misma línea, antes de `actions`.
   */
  nav?: ReactNode;
  /** Botones de la derecha del header (tema, backup, etc.). */
  actions?: ReactNode;
  children: ReactNode;
  /** Clases extra para el `<main>`. */
  className?: string;
}

export function AppShell({
  brand,
  nav,
  actions,
  children,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {labels.skipToContent}
      </a>
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex min-h-16 flex-wrap items-center gap-x-4 gap-y-2 py-2">
          <div className="order-1 mr-auto flex min-w-0 items-center">
            {brand}
          </div>
          {actions && (
            <div className="order-2 flex flex-wrap items-center justify-end gap-1 sm:order-3">
              {actions}
            </div>
          )}
          {nav && (
            // El `-mx-4 px-4` es el padding del container: en el teléfono deja
            // que los links scrolleen de borde a borde en vez de cortarse
            // contra un margen.
            <nav
              aria-label={labels.mainNavigation}
              className="no-scrollbar order-3 -mx-4 flex w-full items-center gap-1 overflow-x-auto overscroll-x-contain px-4 sm:order-2 sm:mx-0 sm:w-auto sm:px-0 [&>*]:shrink-0"
            >
              {nav}
            </nav>
          )}
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "container min-w-0 py-6 outline-none md:py-10",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
