import type { ComponentType, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface AppBrandProps {
  /** Icono de lucide-react (o cualquier componente que acepte `className`). */
  icon: ComponentType<{ className?: string }>;
  title: string;
  className?: string;
}

/**
 * Marca de la app (icono + nombre) con el tipografiado del sistema.
 *
 * Se separa de `AppShell` para que cada app la envuelva con lo que necesite:
 * un `<Link>` de react-router si tiene ruteo, o nada si es de una sola página.
 */
export function AppBrand({ icon: Icon, title, className }: AppBrandProps) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold", className)}>
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-lg tracking-tight">{title}</span>
    </span>
  );
}

export interface AppShellProps {
  /** Normalmente un `<AppBrand />`, opcionalmente envuelto en un link. */
  brand: ReactNode;
  /** Botones de la derecha del header (tema, backup, etc.). */
  actions?: ReactNode;
  children: ReactNode;
  /** Clases extra para el `<main>`. */
  className?: string;
}

/** Header sticky + contenedor principal. Layout base de todas las apps. */
export function AppShell({ brand, actions, children, className }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {brand}
          {actions && <div className="flex items-center gap-1">{actions}</div>}
        </div>
      </header>
      <main className={cn("container py-6 md:py-10", className)}>{children}</main>
    </div>
  );
}
