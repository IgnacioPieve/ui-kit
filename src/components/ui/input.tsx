import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputVariants = cva(
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
        ghost:
          "border border-transparent hover:border-input focus-visible:border-input",
        /**
         * Sin caja: ni borde, ni fondo, ni anillo de foco.
         *
         * Para un campo que **es** el contenido —el monto gigante de una
         * pantalla de alta, el nombre de una fila que se edita en el lugar—,
         * donde el rectángulo del campo compite con el dato en vez de ayudarlo.
         *
         * **Existe porque apagar el anillo a mano no funciona.** Escribir
         * `focus-visible:ring-0` parece obvio y deja un anillo igual: Tailwind
         * dibuja el anillo con `calc(ancho + offset)`, así que con el offset de
         * 2px de la base queda uno de 2px del color primario, y abajo el del
         * offset, del color del fondo. Dos sombras del mismo tamaño pisándose,
         * que en Safari se ve como un borde raro con las esquinas sucias. Hay
         * que apagar **las dos** (`ring-0` y `ring-offset-0`), y eso es lo que
         * hace esta variante.
         *
         * **No trae indicación de foco propia**: ese es el trato. Quien la usa
         * tiene que darla desde afuera —`focus-within:ring-2` en el contenedor,
         * o un `focus-visible:bg-*` en el campo—, o el teclado se queda sin
         * saber dónde está.
         */
        bare: "border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
      },
      inputSize: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "default", inputSize: "default" },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input, inputVariants };
