import * as React8 from 'react';
import { useState, useEffect, useCallback, useRef, useLayoutEffect, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ChevronDown, Minus, Check, X, Loader2, Sun, Moon, Search, Copy, Upload, Camera, FileText, File as File$1, Link2, CircleAlert, ExternalLink, Download } from 'lucide-react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Toaster as Toaster$1, toast } from 'sonner';
export { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDropzone } from 'react-dropzone';

// src/components/ui/button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React8.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
var inputVariants = cva(
  // Las flechitas de `type="number"` se esconden siempre: en un formulario real
  // nadie suma un precio de a uno, y en una tabla de veinte filas son veinte
  // pares de flechas tapando el valor. Se sigue escribiendo y validando como
  // número; lo único que se va es el spinner.
  "flex w-full rounded-md bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
  {
    variants: {
      variant: {
        default: "border border-input bg-background",
        /**
         * Sin borde hasta que se lo apunta o se lo edita.
         *
         * Para tablas donde cada celda es editable: con el borde permanente,
         * veinte filas son doscientos rectángulos compitiendo por atención y no
         * se lee ninguna. El contenido queda al frente y el campo aparece
         * cuando hace falta.
         */
        ghost: "border border-transparent hover:border-input focus-visible:border-input"
      },
      inputSize: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs"
      }
    },
    defaultVariants: { variant: "default", inputSize: "default" }
  }
);
var Input = React8.forwardRef(
  ({ className, variant, inputSize, type, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      type,
      ref,
      className: cn(inputVariants({ variant, inputSize }), className),
      ...props
    }
  )
);
Input.displayName = "Input";
var Textarea = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "textarea",
  {
    ref,
    className: cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }
));
Textarea.displayName = "Textarea";
var Label = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "label",
  {
    ref,
    className: cn(
      "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    ),
    ...props
  }
));
Label.displayName = "Label";
var Select = React8.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
  /* @__PURE__ */ jsx(
    "select",
    {
      ref,
      className: cn(
        "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children
    }
  ),
  /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })
] }));
Select.displayName = "Select";
var Switch = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitive.Root,
  {
    ref,
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitive.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = "Switch";
var Checkbox = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-[4px] border border-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: props.checked === "indeterminate" ? /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3", strokeWidth: 3 }) : /* @__PURE__ */ jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) })
  }
));
Checkbox.displayName = "Checkbox";
var Card = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardContent = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary/10 text-primary",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/10 text-warning",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        outline: "text-muted-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
var Progress = React8.forwardRef(
  ({ value, max = 100, completeVariant = true, className, ...props }, ref) => {
    const percent = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0;
    const complete = completeVariant && max > 0 && value >= max;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-valuenow": value,
        "aria-valuemin": 0,
        "aria-valuemax": max,
        className: cn(
          "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full transition-all",
              complete ? "bg-success" : "bg-primary"
            ),
            style: { width: `${percent}%` }
          }
        )
      }
    );
  }
);
Progress.displayName = "Progress";
function ToggleGroup({
  value,
  onChange,
  options,
  size = "default",
  block = false,
  className,
  label
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "aria-label": label,
      className: cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        block && "flex w-full",
        className
      ),
      children: options.map((option) => {
        const selected = option.value === value;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            title: option.title,
            "aria-label": option.title,
            "aria-pressed": selected,
            disabled: option.disabled,
            onClick: () => onChange(option.value),
            className: cn(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
              size === "sm" ? "h-7 px-2 text-xs" : "h-8 px-3 text-sm",
              block && "flex-1",
              selected ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            ),
            children: option.label
          },
          option.value
        );
      })
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-muted", className), ...props });
}
function Spinner({ className }) {
  return /* @__PURE__ */ jsx(Loader2, { className: cn("h-5 w-5 animate-spin text-primary", className) });
}

// src/labels.ts
var labels = {
  cancel: "Cancelar",
  clear: "Limpiar",
  close: "Cerrar",
  confirm: "Confirmar",
  copied: "Copiado",
  copy: "Copiar",
  copyError: "No se pudo copiar",
  download: "Descargar",
  dropzone: "Arrastr\xE1 archivos ac\xE1, hac\xE9 clic o peg\xE1 con Ctrl+V",
  dropzoneActive: "Solt\xE1 los archivos\u2026",
  openLink: "Abrir enlace",
  saveError: "No se pudo guardar",
  saved: "Guardado",
  saving: "Guardando\u2026",
  search: "Buscar\u2026",
  showLess: "Mostrar menos",
  showMore: "Mostrar m\xE1s",
  takePhoto: "Sacar foto",
  toggleTheme: "Cambiar tema"
};
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = React8.forwardRef(({ className, children, hideClose, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 grid max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        !hideClose && /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: labels.close })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = "DialogContent";
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuContent = React8.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuLabel = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className),
    ...props
  }
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
var DropdownMenuSeparator = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
function Toaster() {
  return /* @__PURE__ */ jsx(Toaster$1, { position: "top-center", theme: "system", richColors: true });
}
function AppBrand({ icon: Icon, title, className }) {
  return /* @__PURE__ */ jsxs("span", { className: cn("flex min-w-0 items-center gap-2 font-semibold", className), children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 shrink-0 text-primary" }),
    /* @__PURE__ */ jsx("span", { className: "truncate text-lg tracking-tight", children: title })
  ] });
}
function AppShell({ brand, nav, actions, children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex min-h-16 flex-wrap items-center gap-x-4 gap-y-2 py-2", children: [
      /* @__PURE__ */ jsx("div", { className: "order-1 mr-auto flex min-w-0 items-center", children: brand }),
      actions && /* @__PURE__ */ jsx("div", { className: "order-2 flex flex-wrap items-center justify-end gap-1 sm:order-3", children: actions }),
      nav && // El `-mx-4 px-4` es el padding del container: en el teléfono deja
      // que los links scrolleen de borde a borde en vez de cortarse
      // contra un margen.
      /* @__PURE__ */ jsx("nav", { className: "no-scrollbar order-3 -mx-4 flex w-full items-center gap-1 overflow-x-auto overscroll-x-contain px-4 sm:order-2 sm:mx-0 sm:w-auto sm:px-0 [&>*]:shrink-0", children: nav })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: cn("container py-6 md:py-10", className), children })
  ] });
}
var STORAGE_KEY = "pieve-theme";
function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);
  const toggle = useCallback(() => {
    setTheme((t) => t === "dark" ? "light" : "dark");
  }, []);
  return { theme, setTheme, toggle };
}
function ThemeToggle({ label = labels.toggleTheme }) {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggle,
      "aria-label": label,
      title: label,
      children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" })
    }
  );
}
function AutosaveIndicator({
  status,
  savingLabel = labels.saving,
  savedLabel = labels.saved,
  errorLabel = labels.saveError,
  className
}) {
  if (status === "idle") return null;
  const content = {
    saving: { icon: /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }), text: savingLabel },
    saved: { icon: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }), text: savedLabel },
    error: { icon: /* @__PURE__ */ jsx(CircleAlert, { className: "h-3.5 w-3.5" }), text: errorLabel }
  }[status];
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      className: cn(
        "flex items-center gap-1.5 text-xs",
        status === "error" ? "text-destructive" : "text-muted-foreground",
        className
      ),
      children: [
        content.icon,
        content.text
      ]
    }
  );
}
function SearchInput({
  value,
  onChange,
  placeholder = labels.search,
  className,
  clearable = true,
  clearLabel = labels.clear,
  autoFocus
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "search",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        autoFocus,
        className: cn("pl-9", clearable && value && "pr-9")
      }
    ),
    clearable && value && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        "aria-label": clearLabel,
        title: clearLabel,
        className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
      }
    )
  ] });
}
var DateInput = React8.forwardRef(
  ({
    placeholder,
    className,
    inputClassName,
    value,
    defaultValue,
    onChange,
    clearable = true,
    clearLabel = labels.clear,
    inputSize,
    disabled,
    "aria-label": ariaLabel,
    ...props
  }, ref) => {
    const [innerValue, setInnerValue] = React8.useState(defaultValue ?? "");
    const current = value !== void 0 ? value : innerValue;
    const empty = current === "" || current === null || current === void 0;
    const showPlaceholder = empty && !!placeholder;
    const showClear = clearable && !empty && !disabled;
    const small = inputSize === "sm";
    const innerRef = React8.useRef(null);
    const setRefs = React8.useCallback(
      (node) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          ref.current = node;
      },
      [ref]
    );
    function clear() {
      const node = innerRef.current;
      if (!node) return;
      const setValue = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set;
      setValue?.call(node, "");
      node.dispatchEvent(new Event("input", { bubbles: true }));
    }
    return /* @__PURE__ */ jsxs("div", { className: cn("relative w-full", className), children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          ...props,
          ref: setRefs,
          type: "date",
          inputSize,
          disabled,
          value,
          defaultValue,
          "aria-label": ariaLabel ?? placeholder,
          onChange: (event) => {
            if (value === void 0) setInnerValue(event.target.value);
            onChange?.(event);
          },
          className: cn(
            "peer",
            // Mientras se tipea una fecha a mano el `value` sigue vacío hasta
            // que está completa, así que el color vuelve con el foco: si no,
            // se escribiría a ciegas.
            showPlaceholder && "text-transparent focus:text-foreground",
            // Lugar para la X, solo cuando está.
            showClear && (small ? "pr-8" : "pr-9"),
            inputClassName
          )
        }
      ),
      showPlaceholder && /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "field-placeholder pointer-events-none absolute inset-y-0 flex items-center truncate text-muted-foreground peer-focus:opacity-0",
            // Tiene que caer **exactamente** donde caería la fecha: un campo
            // `sm` es `text-xs px-2` y el default `text-sm px-3`. Con el
            // tamaño y el margen cableados, un campo `sm` mostraba el
            // placeholder dos píxeles más grande y cuatro más a la derecha
            // que el valor que reemplaza, así que al escribir la fecha el
            // texto saltaba y encogía.
            small ? "left-2 text-xs" : "left-3 text-sm"
          ),
          children: placeholder
        }
      ),
      showClear && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon-sm",
          "aria-label": clearLabel,
          title: clearLabel,
          onClick: clear,
          className: cn(
            "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
            small ? "right-0.5 h-7 w-7" : "right-1"
          ),
          children: /* @__PURE__ */ jsx(X, {})
        }
      )
    ] });
  }
);
DateInput.displayName = "DateInput";
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center rounded-lg border border-dashed px-6 py-16 text-center",
        className
      ),
      children: [
        Icon && /* @__PURE__ */ jsx(Icon, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description }),
        action && /* @__PURE__ */ jsx("div", { className: "mt-4", children: action })
      ]
    }
  );
}
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = labels.confirm,
  cancelLabel = labels.cancel,
  variant = "destructive",
  loading = false,
  onConfirm
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: title }),
      description && /* @__PURE__ */ jsx(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: cancelLabel }),
      /* @__PURE__ */ jsx(Button, { variant, onClick: onConfirm, disabled: loading, children: confirmLabel })
    ] })
  ] }) });
}
function Collapsible({
  children,
  collapsedHeight = 80,
  showMoreLabel = labels.showMore,
  showLessLabel = labels.showLess
}) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflowing(el.scrollHeight > collapsedHeight + 4);
    measure();
    const observer = new ResizeObserver(measure);
    for (const child of el.children) observer.observe(child);
    return () => observer.disconnect();
  }, [collapsedHeight]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: "relative overflow-hidden",
        style: { maxHeight: expanded ? void 0 : collapsedHeight },
        children: [
          children,
          overflowing && !expanded && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" })
        ]
      }
    ),
    overflowing && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((v) => !v),
        className: "mt-1 text-xs font-medium text-primary hover:underline",
        children: expanded ? showLessLabel : showMoreLabel
      }
    )
  ] });
}

// src/lib/browser.ts
function genId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
    }
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  downloadBlob(blob, filename);
}
function filenameFromDisposition(disposition, fallback) {
  if (!disposition) return fallback;
  const match = disposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : fallback;
}
function CopyButton({
  value,
  label = labels.copy,
  successMessage = labels.copied,
  errorMessage = labels.copyError,
  className
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (await copyToClipboard(value)) {
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 1500);
    } else {
      toast.error(errorMessage);
    }
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      className: className ?? "h-6 w-6",
      onClick: handleCopy,
      "aria-label": label,
      title: label,
      children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" })
    }
  );
}
function Markdown({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("markdown", className), children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children }) });
}
function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    function onMouseDown(event) {
      if (!ref.current?.contains(event.target)) handler();
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler, enabled]);
}
function Autocomplete({
  value,
  onChange,
  options,
  getKey = (o) => String(o),
  getLabel = (o) => String(o),
  renderOption,
  onSelect,
  serverFiltered = false,
  maxOptions = 8,
  placeholder,
  id,
  className,
  onEnter,
  onBlur
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false));
  const filtered = useMemo(() => {
    if (serverFiltered) return options.slice(0, maxOptions);
    const term = value.trim().toLowerCase();
    return options.filter((option) => {
      const lower = getLabel(option).toLowerCase();
      return lower !== term && (term === "" || lower.includes(term));
    }).slice(0, maxOptions);
  }, [options, value, serverFiltered, maxOptions, getLabel]);
  const choose = (option) => {
    if (onSelect) onSelect(option);
    else onChange(getLabel(option));
    setOpen(false);
    setHighlight(-1);
  };
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        id,
        value,
        placeholder,
        autoComplete: "off",
        onChange: (e) => {
          onChange(e.target.value);
          setOpen(true);
          setHighlight(-1);
        },
        onFocus: () => setOpen(true),
        onBlur,
        onKeyDown: (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            if (open && highlight >= 0 && filtered[highlight]) {
              e.preventDefault();
              choose(filtered[highlight]);
            } else if (onEnter) {
              e.preventDefault();
              onEnter();
            }
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }
      }
    ),
    open && filtered.length > 0 && /* @__PURE__ */ jsx("ul", { className: "absolute z-40 mt-1 max-h-72 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md", children: filtered.map((option, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: cn(
          "w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
          i === highlight && "bg-accent"
        ),
        onMouseEnter: () => setHighlight(i),
        onMouseDown: (e) => {
          e.preventDefault();
          choose(option);
        },
        children: renderOption ? renderOption(option) : getLabel(option)
      }
    ) }, getKey(option))) })
  ] });
}
function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  size = "lg",
  active = false,
  label = labels.dropzone,
  activeLabel = labels.dropzoneActive,
  hint,
  className
}) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted.length) onFiles(accepted);
    },
    [onFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    disabled
  });
  const small = size === "sm";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...getRootProps(),
      className: cn(
        "cursor-pointer rounded-md border border-dashed text-muted-foreground transition-colors hover:bg-accent",
        // `h-10` y no padding: es la altura de un Button, y `sm` existe
        // justamente para ir en una fila junto a botones. Con `py-4` quedaba
        // ocho píxeles más alto y la fila se veía desalineada.
        small ? "flex h-10 flex-1 items-center justify-center gap-2 px-3 text-xs" : "px-6 py-6 text-center text-sm",
        isDragActive && "border-primary bg-accent",
        active && "ring-1 ring-ring",
        disabled && "cursor-not-allowed opacity-50",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsx(Upload, { className: cn("h-4 w-4", !small && "mx-auto mb-2 h-7 w-7") }),
        isDragActive ? /* @__PURE__ */ jsx("p", { className: cn(!small && "font-medium text-primary"), children: activeLabel }) : small ? label : /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: label }),
          hint && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs", children: hint })
        ] })
      ]
    }
  );
}
function CameraButton({
  onCapture,
  facing = "environment",
  multiple = false,
  label = labels.takePhoto,
  ...buttonProps
}) {
  const inputRef = useRef(null);
  function handleChange(event) {
    const files = Array.from(event.target.files ?? []);
    if (files.length) onCapture(files);
    event.target.value = "";
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        onClick: () => inputRef.current?.click(),
        ...buttonProps,
        children: [
          /* @__PURE__ */ jsx(Camera, {}),
          label
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        capture: facing,
        multiple,
        onChange: handleChange,
        className: "hidden"
      }
    )
  ] });
}

// src/lib/files.ts
function fileKind(contentType) {
  if (!contentType) return "other";
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("audio/")) return "audio";
  if (contentType.startsWith("video/")) return "video";
  if (contentType === "application/pdf") return "pdf";
  return "other";
}

// src/lib/dates.ts
var LOCALE = "es-AR";
function parseLocalDate(iso) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatDate(iso) {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatShortDate(iso) {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatDayMonth(iso) {
  return parseLocalDate(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long"
  });
}
function formatMonthYear(value) {
  const date = typeof value === "string" ? parseLocalDate(value) : value;
  const label = date.toLocaleDateString(LOCALE, {
    month: "long",
    year: "numeric"
  });
  return capitalize(label);
}
function todayISO() {
  const now = /* @__PURE__ */ new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}
function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function groupByMonth(items, getDate) {
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const iso = getDate(item);
    const date = iso ? parseLocalDate(iso) : /* @__PURE__ */ new Date();
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const key = `${first.getFullYear()}-${String(first.getMonth() + 1).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, { date: first, items: [] });
    groups.get(key).items.push(item);
  }
  return [...groups.entries()].sort((a, b) => b[1].date.getTime() - a[1].date.getTime()).map(([key, group2]) => ({ key, label: formatMonthYear(group2.date), items: group2.items }));
}

// src/lib/format.ts
function formatCurrency(cents, currency) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  }).format(cents / 100);
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
function DownloadCard({
  url,
  filename,
  size,
  downloadLabel
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-md border bg-muted/40 p-3", children: [
    /* @__PURE__ */ jsx(File$1, { className: "h-8 w-8 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: filename }),
      size !== void 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(size) })
    ] }),
    /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxs("a", { href: url, download: filename, children: [
      /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
      downloadLabel
    ] }) })
  ] });
}
function FilePreview({
  url,
  filename,
  contentType,
  size,
  compact,
  downloadLabel = labels.download
}) {
  const [lightbox, setLightbox] = useState(false);
  const kind = fileKind(contentType);
  if (compact) {
    if (kind === "image") {
      return /* @__PURE__ */ jsx(
        "img",
        {
          src: url,
          alt: filename,
          className: "h-20 w-20 rounded-md border object-cover"
        }
      );
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm", children: [
      kind === "pdf" ? /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsx(File$1, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsx("span", { className: "truncate", children: filename })
    ] });
  }
  switch (kind) {
    case "image":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setLightbox(true),
            className: "block overflow-hidden rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: url,
                alt: filename,
                className: "max-h-80 w-auto object-contain"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(Dialog, { open: lightbox, onOpenChange: setLightbox, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl border-0 bg-transparent p-0 shadow-none", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: url,
            alt: filename,
            className: "max-h-[85vh] w-full rounded-md object-contain"
          }
        ) }) })
      ] });
    case "pdf":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "iframe",
          {
            src: url,
            title: filename,
            className: "h-[28rem] w-full rounded-md border"
          }
        ),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxs("a", { href: url, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
          filename
        ] }) })
      ] });
    case "audio":
      return /* @__PURE__ */ jsx("audio", { controls: true, src: url, className: "w-full" });
    case "video":
      return /* @__PURE__ */ jsx("video", { controls: true, src: url, className: "max-h-80 w-full rounded-md border" });
    default:
      return /* @__PURE__ */ jsx(
        DownloadCard,
        {
          url,
          filename,
          size,
          downloadLabel
        }
      );
  }
}

// src/lib/links.ts
var YOUTUBE_HOSTS = /* @__PURE__ */ new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com"
]);
var YOUTUBE_PATHS = /* @__PURE__ */ new Set(["embed", "shorts", "live", "v"]);
function safeUrl(url) {
  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  return parsed.href;
}
function linkHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
function parseTimestamp(value) {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match || !match.slice(1).some(Boolean)) return null;
  const [h, m, s] = match.slice(1).map((part) => Number(part ?? 0) || 0);
  return h * 3600 + m * 60 + s;
}
function youtubeEmbedUrl(url) {
  const safe = safeUrl(url);
  if (!safe) return null;
  const parsed = new URL(safe);
  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);
  let id = null;
  if (host === "youtu.be") {
    id = segments[0] ?? null;
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (segments[0] === "watch") id = parsed.searchParams.get("v");
    else if (YOUTUBE_PATHS.has(segments[0] ?? "")) id = segments[1] ?? null;
  }
  if (!id || !/^[\w-]+$/.test(id)) return null;
  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  const start = parseTimestamp(
    parsed.searchParams.get("t") ?? parsed.searchParams.get("start")
  );
  if (start) embed.searchParams.set("start", String(start));
  return embed.toString();
}
function linkKind(url) {
  return youtubeEmbedUrl(url) ? "youtube" : "other";
}
function LinkPreview({
  url,
  title,
  compact,
  openLabel = labels.openLink,
  className
}) {
  const href = safeUrl(url);
  const label = title || (href ? linkHost(href) : url);
  if (!href) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: url })
        ]
      }
    );
  }
  const openButton = /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxs("a", { href, target: "_blank", rel: "noreferrer noopener", children: [
    /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
    compact || title ? label : openLabel
  ] }) });
  if (compact) {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href,
        target: "_blank",
        rel: "noreferrer noopener",
        className: cn(
          "flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm hover:bg-accent",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
        ]
      }
    );
  }
  const embed = youtubeEmbedUrl(href);
  if (embed) {
    return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
      /* @__PURE__ */ jsx(
        "iframe",
        {
          src: embed,
          title: label,
          className: "aspect-video w-full rounded-md border",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        }
      ),
      openButton
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: cn(className), children: openButton });
}
function SectionHeading({
  icon,
  children,
  actions,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center justify-between gap-2", className), children: [
    /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 text-sm font-semibold text-muted-foreground", children: [
      icon && /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: icon }),
      children
    ] }),
    actions
  ] });
}
function MonthHeading({ children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-muted-foreground", children }),
    /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-border" })
  ] });
}
function InfiniteScrollTrigger({
  onLoadMore,
  enabled = true,
  loading = false
}) {
  const ref = useRef(null);
  const loadMoreRef = useRef(onLoadMore);
  loadMoreRef.current = onLoadMore;
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreRef.current();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, loading]);
  if (!enabled) return null;
  return /* @__PURE__ */ jsx("div", { ref, className: "flex items-center justify-center py-8", children: loading && /* @__PURE__ */ jsx(Spinner, {}) });
}
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
function useAutosave(save) {
  const [status, setStatus] = useState("idle");
  const saveRef = useRef(save);
  saveRef.current = save;
  const running = useRef(null);
  const queued = useRef(false);
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );
  const run = useCallback(async () => {
    if (running.current) {
      queued.current = true;
      return running.current;
    }
    const exec = (async () => {
      do {
        queued.current = false;
        if (mounted.current) setStatus("saving");
        try {
          await saveRef.current();
          if (mounted.current) setStatus("saved");
        } catch {
          if (mounted.current) setStatus("error");
          queued.current = false;
          return;
        }
      } while (queued.current);
    })();
    running.current = exec;
    try {
      await exec;
    } finally {
      running.current = null;
    }
  }, []);
  const trigger = useCallback(() => {
    void run();
  }, [run]);
  const flush = useCallback(async () => {
    await (running.current ?? Promise.resolve());
  }, []);
  return { status, save: trigger, flush };
}

// src/lib/logger.ts
var STYLES = {
  request: "color:#0284c7;font-weight:600",
  response: "color:#16a34a;font-weight:600",
  failure: "color:#dc2626;font-weight:600",
  event: "color:#9333ea;font-weight:600"
};
function group(kind, label, body) {
  console.groupCollapsed(`%c${label}`, STYLES[kind]);
  body();
  console.groupEnd();
}
var ms = (started) => `${(performance.now() - started).toFixed(0)}ms`;
var log = {
  request(method, path, payload) {
    group("request", `\u2192 ${method} ${path}`, () => {
      if (payload !== void 0) console.log("payload:", payload);
    });
  },
  response(method, path, started, data) {
    group("response", `\u2190 ${method} ${path} \xB7 ${ms(started)}`, () => {
      console.log("data:", data);
    });
  },
  failure(method, path, started, error) {
    group("failure", `\u2715 ${method} ${path} \xB7 ${ms(started)}`, () => {
      console.error(error);
    });
  },
  /** Un hecho de dominio digno de seguir, que no es una request. */
  event(scope, message, data) {
    group("event", `\u25CF ${scope} \xB7 ${message}`, () => {
      if (data !== void 0) console.log(data);
    });
  }
};

// src/lib/http.ts
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
  status;
};
function buildQuery(params = {}) {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === void 0 || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const item of value) qs.append(key, String(item));
    } else {
      qs.set(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}
function tracedPayload(init) {
  const body = init?.body;
  if (body === void 0 || body === null) return void 0;
  if (body instanceof FormData) {
    return Object.fromEntries(
      [...body.entries()].map(([key, value]) => [
        key,
        value instanceof File ? `File(${value.name}, ${value.size}b)` : value
      ])
    );
  }
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
function createHttpClient(baseUrl = "", { trace = false } = {}) {
  async function send(path, init) {
    const res = await fetch(`${baseUrl}${path}`, init);
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        if (body?.detail) detail = body.detail;
      } catch {
      }
      throw new HttpError(res.status, detail);
    }
    if (res.status === 204) return void 0;
    return await res.json();
  }
  async function request(path, init) {
    if (!trace) return send(path, init);
    const method = init?.method ?? "GET";
    const started = performance.now();
    log.request(method, path, tracedPayload(init));
    try {
      const data = await send(path, init);
      log.response(method, path, started, data);
      return data;
    } catch (error) {
      log.failure(method, path, started, error);
      throw error;
    }
  }
  const json = (method, body) => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: body === void 0 ? void 0 : JSON.stringify(body)
  });
  return {
    url: (path) => `${baseUrl}${path}`,
    request,
    get: (path, params) => request(`${path}${buildQuery(params)}`),
    post: (path, body) => request(path, json("POST", body)),
    patch: (path, body) => request(path, json("PATCH", body)),
    del: (path) => request(path, { method: "DELETE" }),
    postForm: (path, form) => request(path, { method: "POST", body: form }),
    patchForm: (path, form) => request(path, { method: "PATCH", body: form }),
    async download(path, fallbackName) {
      const started = performance.now();
      if (trace) log.request("GET", path);
      try {
        const res = await fetch(`${baseUrl}${path}`);
        if (!res.ok) throw new HttpError(res.status, res.statusText);
        const filename = filenameFromDisposition(
          res.headers.get("content-disposition"),
          fallbackName
        );
        const blob = await res.blob();
        if (trace) log.response("GET", path, started, `${filename} (${blob.size}b)`);
        downloadBlob(blob, filename);
      } catch (error) {
        if (trace) log.failure("GET", path, started, error);
        throw error;
      }
    }
  };
}

export { AppBrand, AppShell, Autocomplete, AutosaveIndicator, Badge, Button, CameraButton, Card, CardContent, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible, ConfirmDialog, CopyButton, DateInput, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, FileDropzone, FilePreview, HttpError, InfiniteScrollTrigger, Input, LOCALE, Label, LinkPreview, Markdown, MonthHeading, Progress, SearchInput, SectionHeading, Select, Skeleton, Spinner, Switch, Textarea, ThemeToggle, Toaster, ToggleGroup, badgeVariants, buildQuery, buttonVariants, capitalize, cn, copyToClipboard, createHttpClient, downloadBlob, downloadJson, fileKind, filenameFromDisposition, formatCurrency, formatDate, formatDayMonth, formatFileSize, formatMonthYear, formatShortDate, genId, groupByMonth, inputVariants, labels, linkHost, linkKind, log, parseLocalDate, safeUrl, todayISO, useAutosave, useClickOutside, useDebounce, useTheme, youtubeEmbedUrl };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map