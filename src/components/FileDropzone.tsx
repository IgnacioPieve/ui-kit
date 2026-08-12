import { useCallback } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "../lib/cn";
import { labels } from "../labels";

export interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  /**
   * Tipos admitidos, en el formato de react-dropzone: `{ "image/*": [] }`.
   * Omitirlo acepta cualquier archivo.
   */
  accept?: Accept;
  multiple?: boolean;
  disabled?: boolean;
  /** `sm`: fila compacta en línea. `lg`: caja grande con icono centrado. */
  size?: "sm" | "lg";
  /** Resalta la zona (ej. cuando es el destino del pegado con Ctrl+V). */
  active?: boolean;
  label?: string;
  activeLabel?: string;
  hint?: string;
  className?: string;
}

/** Zona de drag & drop + clic para adjuntar archivos. */
export function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  size = "lg",
  active = false,
  label = labels.dropzone,
  activeLabel = labels.dropzoneActive,
  hint,
  className,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length) onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    disabled,
  });

  const small = size === "sm";

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer rounded-md border border-dashed text-muted-foreground transition-colors hover:bg-accent",
        // `h-10` y no padding: es la altura de un Button, y `sm` existe
        // justamente para ir en una fila junto a botones. Con `py-4` quedaba
        // ocho píxeles más alto y la fila se veía desalineada.
        small
          ? "flex h-10 flex-1 items-center justify-center gap-2 px-3 text-xs"
          : "px-6 py-6 text-center text-sm",
        isDragActive && "border-primary bg-accent",
        active && "ring-1 ring-ring",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className={cn("h-4 w-4", !small && "mx-auto mb-2 h-7 w-7")} />
      {isDragActive ? (
        <p className={cn(!small && "font-medium text-primary")}>{activeLabel}</p>
      ) : small ? (
        label
      ) : (
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {hint && <p className="mt-0.5 text-xs">{hint}</p>}
        </div>
      )}
    </div>
  );
}
