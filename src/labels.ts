/**
 * Textos por defecto de los componentes del kit (UI en español).
 *
 * Cada componente que muestra texto acepta una prop para pisarlo; esto es solo
 * el default para no obligar a cablear strings en cada uso. Los textos propios
 * de cada app viven en su `lib/strings.ts`, no acá.
 */
export const labels = {
  cancel: "Cancelar",
  clear: "Limpiar",
  close: "Cerrar",
  confirm: "Confirmar",
  copied: "Copiado",
  copy: "Copiar",
  copyError: "No se pudo copiar",
  download: "Descargar",
  dropzone: "Arrastrá archivos acá, hacé clic o pegá con Ctrl+V",
  dropzoneActive: "Soltá los archivos…",
  saveError: "No se pudo guardar",
  saved: "Guardado",
  saving: "Guardando…",
  search: "Buscar…",
  showLess: "Mostrar menos",
  showMore: "Mostrar más",
  takePhoto: "Sacar foto",
  toggleTheme: "Cambiar tema",
} as const;

export type Labels = typeof labels;
