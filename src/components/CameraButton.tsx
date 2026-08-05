import { useRef, type ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import { labels } from "../labels";

export interface CameraButtonProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  onCapture: (files: File[]) => void;
  /** `environment` (default) abre la cámara trasera; `user`, la frontal. */
  facing?: "environment" | "user";
  multiple?: boolean;
  label?: string;
}

/**
 * Botón que abre la cámara del dispositivo para sacar una foto.
 *
 * Va aparte del `FileDropzone` y no como una prop suya a propósito: el atributo
 * `capture` fuerza la cámara y deja sin acceso a la galería, así que un mismo
 * control no puede ofrecer las dos cosas. En desktop los navegadores ignoran
 * `capture` y abren el selector de archivos común, así que el botón no molesta
 * — pero normalmente se lo muestra solo en mobile.
 */
export function CameraButton({
  onCapture,
  facing = "environment",
  multiple = false,
  label = labels.takePhoto,
  ...buttonProps
}: CameraButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length) onCapture(files);
    // Se limpia el input: sin esto, sacar dos veces la misma foto no dispara
    // un segundo `change` porque el valor no cambió.
    event.target.value = "";
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        {...buttonProps}
      >
        <Camera />
        {label}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={facing}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
