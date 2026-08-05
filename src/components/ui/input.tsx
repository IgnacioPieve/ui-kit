import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputVariants = cva(
  "flex w-full rounded-md bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
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
