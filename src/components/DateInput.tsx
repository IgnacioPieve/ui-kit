import * as React from "react";
import { cn } from "../lib/cn";
import { Input, type InputProps } from "./ui/input";

export interface DateInputProps
  extends Omit<InputProps, "type" | "className"> {
  /** Texto visible mientras el campo está vacío. También es su `aria-label`. */
  placeholder?: string;
  /** Clases del contenedor. El campo ocupa todo su ancho. */
  className?: string;
  /** Clases del `<input>` en sí, para lo que no sea ancho. */
  inputClassName?: string;
}

/**
 * Campo de fecha que se ve aunque esté vacío.
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
 * Para campos con `<Label>` propio alcanza con `<Input type="date" />`.
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

    return (
      <div className={cn("relative w-full", className)}>
        <Input
          {...props}
          ref={ref}
          type="date"
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
            inputClassName
          )}
        />
        {showPlaceholder && (
          <span className="field-placeholder pointer-events-none absolute inset-y-0 left-3 flex items-center truncate text-sm text-muted-foreground peer-focus:opacity-0">
            {placeholder}
          </span>
        )}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";
