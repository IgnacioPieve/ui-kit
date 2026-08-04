import { Toaster as SonnerToaster, toast } from "sonner";

/**
 * Toasts de la app. Se monta una vez en el root.
 *
 * `theme="system"` alcanza porque sonner lee la clase `dark` del `<html>`,
 * que es la misma que maneja `useTheme`.
 */
export function Toaster() {
  return <SonnerToaster position="top-center" theme="system" richColors />;
}

export { toast };
