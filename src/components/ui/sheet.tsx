import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { labels } from "../../labels";
import { DialogOverlay } from "./dialog";

/**
 * Una hoja que sube desde abajo en el teléfono y es un diálogo centrado desde
 * `sm` para arriba.
 *
 * Es el mismo `Dialog` de Radix —foco atrapado, Escape, tocar afuera cierra—
 * con otra forma. En el teléfono un diálogo centrado es el peor lugar para una
 * lista: el teclado sube, tapa la mitad de abajo, y lo que queda para elegir es
 * una franja de 150px en el medio. Pegada abajo, la hoja queda a mano del
 * pulgar; con `size="full"` ocupa la pantalla entera, que es lo que necesita
 * un selector con buscador.
 *
 * Las partes arman una columna: `SheetHeader` y `SheetFooter` quedan fijos y
 * `SheetBody` es lo único que scrollea, así un botón de "Crear" o "Guardar" no
 * se va de la pantalla con una lista larga.
 */
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** `auto`: la altura de su contenido. `full`: toda la pantalla en el teléfono. */
  size?: "auto" | "full";
  hideClose?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(
  (
    { className, children, size = "auto", hideClose, onOpenAutoFocus, ...props },
    ref,
  ) => (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        // Igual que `DialogContent`: sin foco automático en el primer campo,
        // que en el teléfono abría la hoja con el teclado encima. Un campo que
        // lo quiera lo pide con `autoFocus`.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          const content = event.currentTarget as HTMLElement | null;
          if (content && !content.contains(document.activeElement))
            content.focus();
          onOpenAutoFocus?.(event);
        }}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg duration-200 focus:outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          // Teléfono: pegada abajo, sube desde abajo. El padding inferior
          // respeta la barra de inicio del iPhone.
          "inset-x-0 bottom-0 border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          size === "full"
            ? "top-0 pt-[max(0.75rem,env(safe-area-inset-top))]"
            : "max-h-[92dvh] rounded-t-2xl pt-3",
          // Desde `sm`: el diálogo de siempre. El desplazamiento de centrado va
          // también en la animación: `animate-in` escribe el `transform` entero,
          // y sin esto la hoja entra media caja corrida (ver Traps).
          "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100vw-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:p-6",
          size === "full" ? "sm:h-[min(40rem,85dvh)]" : "sm:max-h-[85dvh]",
          "sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95",
          "sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-1/2",
          "sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-1/2",
          className,
        )}
        {...props}
      >
        {size === "auto" && (
          <div
            aria-hidden
            className="mx-auto -mb-1 h-1.5 w-10 shrink-0 rounded-full bg-muted sm:hidden"
          />
        )}
        {children}
        {!hideClose && (
          <DialogPrimitive.Close className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">{labels.close}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex shrink-0 flex-col gap-1 pr-10 text-left", className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

/** Lo único que scrollea. Llega hasta los bordes de la hoja. */
const SheetBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "-mx-4 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 sm:-mx-6 sm:px-6",
      className,
    )}
    {...props}
  />
);
SheetBody.displayName = "SheetBody";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-tight", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
