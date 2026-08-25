import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";
import { Button } from "./ui/button";
import { Input, type InputProps } from "./ui/input";

export interface DateInputProps
  extends Omit<InputProps, "type" | "className"> {
  /** Texto visible mientras el campo está vacío. También es su `aria-label`. */
  placeholder?: string;
  /** Clases del contenedor. El campo ocupa todo su ancho. */
  className?: string;
  /** Clases del `<input>` en sí, para lo que no sea ancho. */
  inputClassName?: string;
  /**
   * Muestra una X para vaciar el campo cuando tiene fecha.
   *
   * Prendida por defecto, igual que en `SearchInput`: la fecha nullable es el
   * caso normal —"desde/hasta" sin límite, "la vi y no me acuerdo cuándo"— y un
   * campo vacío se ve idéntico a antes, porque la X aparece recién cuando hay
   * algo que borrar. Para una fecha obligatoria, `clearable={false}`.
   */
  clearable?: boolean;
  clearLabel?: string;
}

/**
 * Campo de fecha que se ve aunque esté vacío, y que se puede vaciar.
 *
 * `input[type=date]` vacío **no muestra nada en iOS**: ni el `dd/mm/aaaa` que
 * dibujan Chrome y Firefox ni el `placeholder`, que el HTML ignora en los
 * campos de fecha. Queda un rectángulo en blanco que recién se entiende cuando
 * ya tiene una fecha adentro — y si el campo no trae un `<Label>` al lado,
 * tampoco hay forma de saber cuál de los dos es "desde" y cuál "hasta". El
 * `title` no cubre eso: en un teléfono no hay hover.
 *
 * Acá el texto lo pone el kit, en un `<span>` encima del campo, y se va al
 * enfocarlo para no taparle al usuario lo que está escribiendo. En los
 * navegadores que sí dibujan el formato nativo, el campo vacío va en
 * `text-transparent` para que no se superpongan los dos.
 *
 * **La X para vaciarlo también la pone el kit.** La del navegador no alcanza:
 * en Android directamente no existe, y donde existe es un blanco de toque de
 * doce píxeles, así que desde el celular no había forma de volver a "sin
 * fecha". Estaba escrita a mano en tres apps antes de vivir acá.
 *
 * Para campos con `<Label>` propio y fecha obligatoria alcanza con
 * `<Input type="date" />`.
 */
export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
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
    },
    ref
  ) => {
    // Controlado o no: si la app no pasa `value`, el vacío se sigue desde acá.
    const [innerValue, setInnerValue] = React.useState(defaultValue ?? "");
    const current = value !== undefined ? value : innerValue;
    const empty = current === "" || current === null || current === undefined;
    const showPlaceholder = empty && !!placeholder;
    const showClear = clearable && !empty && !disabled;
    const small = inputSize === "sm";

    // La X necesita el nodo, y la app puede querer su propio ref: un solo
    // callback los alimenta a los dos.
    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref]
    );

    /**
     * Vacía el campo **como si lo hubiera hecho el usuario**.
     *
     * Escribe el `value` con el setter nativo del input y dispara un `input`
     * que burbujea: React lo levanta y llama al mismo `onChange` que la app ya
     * tiene puesto, así que anda igual controlado que no controlado y el call
     * site no cambia una línea. Un `onClear` aparte obligaría a escribir en
     * cada uso un segundo handler para hacer exactamente lo que hace el
     * primero.
     *
     * Sin `focus()` a propósito: en el teléfono, enfocar un campo de fecha
     * abre el picker del sistema, y acabás de decir que no querés fecha.
     */
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

    return (
      <div className={cn("relative w-full", className)}>
        <Input
          {...props}
          ref={setRefs}
          type="date"
          inputSize={inputSize}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          aria-label={ariaLabel ?? placeholder}
          onChange={(event) => {
            if (value === undefined) setInnerValue(event.target.value);
            onChange?.(event);
          }}
          className={cn(
            "peer",
            // Mientras se tipea una fecha a mano el `value` sigue vacío hasta
            // que está completa, así que el color vuelve con el foco: si no,
            // se escribiría a ciegas.
            showPlaceholder && "text-transparent focus:text-foreground",
            // Lugar para la X, solo cuando está.
            showClear && (small ? "pr-8" : "pr-9"),
            inputClassName
          )}
        />

        {showPlaceholder && (
          <span className="field-placeholder pointer-events-none absolute inset-y-0 left-3 flex items-center truncate text-sm text-muted-foreground peer-focus:opacity-0">
            {placeholder}
          </span>
        )}

        {showClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={clearLabel}
            title={clearLabel}
            onClick={clear}
            // En un campo `sm` (32px de alto) el `icon-sm` del kit mide lo
            // mismo que el campo y se come el borde: baja a 28px.
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
              small ? "right-0.5 h-7 w-7" : "right-1"
            )}
          >
            <X />
          </Button>
        )}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";
