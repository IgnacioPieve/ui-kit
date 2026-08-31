import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";
import { Button } from "./ui/button";
import { Input, type InputProps } from "./ui/input";

export interface DateInputProps
  extends Omit<InputProps, "type" | "className"> {
  /**
   * Texto visible mientras el campo está vacío. También es su `aria-label`.
   *
   * Sin él el campo igual dibuja algo —`dd/mm/aaaa`, el default del kit—, pero
   * eso es solo el formato: no dice cuál de los dos campos es "desde". Pasalo
   * siempre que el campo no traiga un `<Label>` pegado.
   */
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
 * `text-transparent` para que no se superpongan los dos — y de paso el formato
 * queda en español en todos lados, porque el nativo lo elige el idioma del
 * navegador y no el `lang` del documento: un Chrome en inglés escribe
 * `mm/dd/yyyy` sobre una app que está entera en castellano.
 *
 * **El texto no es opcional; el que lo explica, sí.** Sin `placeholder` el
 * campo vacío dibuja igual `dd/mm/aaaa`, para que la trampa de iOS no dependa
 * de que cada call site se acuerde. Con `placeholder` dice además qué campo es
 * —"Desde", "Sin fecha"— que es lo único que un rectángulo no puede contar
 * solo, y ahí sí conviene pasarlo.
 *
 * **La X para vaciarlo también la pone el kit.** La del navegador no alcanza:
 * en Android directamente no existe, y donde existe es un blanco de toque de
 * doce píxeles, así que desde el celular no había forma de volver a "sin
 * fecha". Estaba escrita a mano en tres apps antes de vivir acá.
 *
 * Para una fecha **obligatoria** va `clearable={false}`. `<Input type="date" />`
 * pelado ya no es la alternativa recomendada para nada: no dibuja el vacío ni
 * respeta el formato del idioma de la app.
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
    // Un campo vacío SIEMPRE dibuja algo, lo diga la app o no: la razón de ser
    // de este componente es que en iOS un `input[type=date]` sin valor es un
    // rectángulo en blanco, y eso no depende de que el call site se acuerde de
    // pasar un texto. Sin `placeholder` va el formato y nada más; con él, lo
    // que el campo significa. El `aria-label` sigue saliendo solo del explícito
    // —"dd/mm/aaaa" como nombre accesible sería peor que no tener ninguno, y
    // taparía el `<Label htmlFor>` que el campo ya pueda tener—.
    const placeholderText = placeholder ?? labels.datePlaceholder;
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
            empty && "text-transparent focus:text-foreground",
            // Lugar para la X, solo cuando está.
            showClear && (small ? "pr-8" : "pr-9"),
            inputClassName
          )}
        />

        {empty && (
          <span
            className={cn(
              "field-placeholder pointer-events-none absolute inset-y-0 flex items-center truncate text-muted-foreground peer-focus:opacity-0",
              // Tiene que caer **exactamente** donde caería la fecha: un campo
              // `sm` es `text-xs px-2` y el default `text-sm px-3`. Con el
              // tamaño y el margen cableados, un campo `sm` mostraba el
              // placeholder dos píxeles más grande y cuatro más a la derecha
              // que el valor que reemplaza, así que al escribir la fecha el
              // texto saltaba y encogía.
              small ? "left-2 text-xs" : "left-3 text-sm"
            )}
          >
            {placeholderText}
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
