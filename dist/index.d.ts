import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { ComponentType, ReactNode, RefObject } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Accept } from 'react-dropzone';
import { ClassValue } from 'clsx';
export { toast } from 'sonner';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const inputVariants: (props?: ({
    variant?: "default" | "ghost" | null | undefined;
    inputSize?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const Textarea: React.ForwardRefExoticComponent<React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.RefAttributes<HTMLTextAreaElement>>;

declare const Label: React.ForwardRefExoticComponent<React.LabelHTMLAttributes<HTMLLabelElement> & React.RefAttributes<HTMLLabelElement>>;

/**
 * `<select>` nativo con la estética del kit.
 *
 * Nativo a propósito: en mobile abre el picker del sistema, que para listas
 * cortas (categorías, monedas) es mejor que cualquier dropdown custom.
 */
declare const Select: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & React.RefAttributes<HTMLSelectElement>>;

declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "primary" | "success" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element;

declare function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;

interface SpinnerProps {
    className?: string;
}
declare function Spinner({ className }: SpinnerProps): React.JSX.Element;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    hideClose?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

/**
 * Toasts de la app. Se monta una vez en el root.
 *
 * `theme="system"` alcanza porque sonner lee la clase `dark` del `<html>`,
 * que es la misma que maneja `useTheme`.
 */
declare function Toaster(): React.JSX.Element;

interface AppBrandProps {
    /** Icono de lucide-react (o cualquier componente que acepte `className`). */
    icon: ComponentType<{
        className?: string;
    }>;
    title: string;
    className?: string;
}
/**
 * Marca de la app (icono + nombre) con el tipografiado del sistema.
 *
 * Se separa de `AppShell` para que cada app la envuelva con lo que necesite:
 * un `<Link>` de react-router si tiene ruteo, o nada si es de una sola página.
 */
declare function AppBrand({ icon: Icon, title, className }: AppBrandProps): React.JSX.Element;
interface AppShellProps {
    /** Normalmente un `<AppBrand />`, opcionalmente envuelto en un link. */
    brand: ReactNode;
    /** Botones de la derecha del header (tema, backup, etc.). */
    actions?: ReactNode;
    children: ReactNode;
    /** Clases extra para el `<main>`. */
    className?: string;
}
/** Header sticky + contenedor principal. Layout base de todas las apps. */
declare function AppShell({ brand, actions, children, className }: AppShellProps): React.JSX.Element;

interface ThemeToggleProps {
    label?: string;
}
declare function ThemeToggle({ label }: ThemeToggleProps): React.JSX.Element;

type AutosaveStatus = "idle" | "saving" | "saved" | "error";
interface Autosave {
    status: AutosaveStatus;
    /** Dispara un guardado. Si ya hay uno en curso, encola exactamente uno más. */
    save: () => void;
    /** Espera a que no quede nada pendiente. Para navegar sin perder cambios. */
    flush: () => Promise<void>;
}
/**
 * Autoguardado serializado.
 *
 * `save()` se llama al terminar de editar un campo (blur, o change en los
 * controles donde el cambio ya es el final: selects, switches, archivos). El
 * hook garantiza que **nunca haya dos guardados en vuelo a la vez**: si llega
 * uno mientras otro corre, se encola uno solo al final. Sin eso, dos PATCH
 * concurrentes pueden llegar al backend en orden invertido y dejar guardado el
 * valor viejo.
 *
 * No muestra toasts: el feedback va en `<AutosaveIndicator />`, que es
 * silencioso y no interrumpe.
 */
declare function useAutosave(save: () => Promise<unknown>): Autosave;

interface AutosaveIndicatorProps {
    status: AutosaveStatus;
    savingLabel?: string;
    savedLabel?: string;
    errorLabel?: string;
    className?: string;
}
/**
 * Feedback silencioso del autoguardado.
 *
 * A propósito no usa toasts: guardar es constante y un toast por campo sería
 * ruido. Esto vive al lado del título y solo se nota si lo mirás — salvo el
 * error, que sí se pinta en rojo porque ahí hay algo que hacer.
 */
declare function AutosaveIndicator({ status, savingLabel, savedLabel, errorLabel, className, }: AutosaveIndicatorProps): React.JSX.Element | null;

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    /** Muestra una X para vaciar el campo cuando tiene contenido. */
    clearable?: boolean;
    clearLabel?: string;
}
declare function SearchInput({ value, onChange, placeholder, className, clearable, clearLabel, }: SearchInputProps): React.JSX.Element;

interface EmptyStateProps {
    icon?: ComponentType<{
        className?: string;
    }>;
    title: string;
    description?: string;
    /** Acción sugerida (normalmente un `<Button />`). */
    action?: ReactNode;
    className?: string;
}
/** Caja punteada para listas vacías o búsquedas sin resultados. */
declare function EmptyState({ icon: Icon, title, description, action, className, }: EmptyStateProps): React.JSX.Element;

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    /** `destructive` (default) para borrados; `default` para el resto. */
    variant?: "destructive" | "default";
    loading?: boolean;
    onConfirm: () => void;
}
/**
 * Confirmación modal accesible. Reemplaza al `confirm()` del browser: se puede
 * estilar, se cierra con Escape y atrapa el foco.
 */
declare function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, variant, loading, onConfirm, }: ConfirmDialogProps): React.JSX.Element;

interface CollapsibleProps {
    children: ReactNode;
    /** Alto colapsado en px (~3 líneas por defecto). */
    collapsedHeight?: number;
    showMoreLabel?: string;
    showLessLabel?: string;
}
/** Recorta contenido largo con un degradé y un toggle "mostrar más / menos". */
declare function Collapsible({ children, collapsedHeight, showMoreLabel, showLessLabel, }: CollapsibleProps): React.JSX.Element;

interface CopyButtonProps {
    value: string;
    label?: string;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}
declare function CopyButton({ value, label, successMessage, errorMessage, className, }: CopyButtonProps): React.JSX.Element;

interface MarkdownProps {
    children: string;
    className?: string;
}
/**
 * Markdown liviano (GFM) para resúmenes y notas.
 * Los estilos viven en la clase `.markdown` de `styles.css`.
 */
declare function Markdown({ children, className }: MarkdownProps): React.JSX.Element;

interface AutocompleteProps<T> {
    value: string;
    onChange: (value: string) => void;
    options: T[];
    /** Clave única de la opción. Default: la opción convertida a string. */
    getKey?: (option: T) => string;
    /** Texto que se escribe en el input al elegir. Default: la opción como string. */
    getLabel?: (option: T) => string;
    /** Render de la fila del dropdown. Default: `getLabel`. */
    renderOption?: (option: T) => ReactNode;
    /** Qué hacer al elegir. Default: escribir `getLabel` en el input. */
    onSelect?: (option: T) => void;
    /** El servidor ya filtró: no aplicar filtro local por substring. */
    serverFiltered?: boolean;
    maxOptions?: number;
    placeholder?: string;
    id?: string;
    className?: string;
    /** Enter cuando no hay ninguna opción resaltada. */
    onEnter?: () => void;
    /** Se fue el foco del campo. Elegir una opción del dropdown no lo dispara
     * (el mousedown hace preventDefault y el input conserva el foco). */
    onBlur?: () => void;
}
/**
 * Input con sugerencias, navegable por teclado (↑ ↓ Enter Esc).
 *
 * Sirve tanto para listas de strings (médicos, instituciones, tipos) como para
 * objetos con render propio, pasando `renderOption` + `onSelect`.
 */
declare function Autocomplete<T = string>({ value, onChange, options, getKey, getLabel, renderOption, onSelect, serverFiltered, maxOptions, placeholder, id, className, onEnter, onBlur, }: AutocompleteProps<T>): React.JSX.Element;

interface FileDropzoneProps {
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
declare function FileDropzone({ onFiles, accept, multiple, disabled, size, active, label, activeLabel, hint, className, }: FileDropzoneProps): React.JSX.Element;

interface CameraButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
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
declare function CameraButton({ onCapture, facing, multiple, label, ...buttonProps }: CameraButtonProps): React.JSX.Element;

interface FilePreviewProps {
    /** URL desde donde se sirve el archivo. */
    url: string;
    filename: string;
    contentType?: string | null;
    size?: number;
    /** Miniatura / chip en vez de la previsualización completa. */
    compact?: boolean;
    downloadLabel?: string;
}
/**
 * Previsualiza un archivo según su tipo: imagen (con lightbox), PDF embebido,
 * audio, video, o una tarjeta de descarga como fallback.
 */
declare function FilePreview({ url, filename, contentType, size, compact, downloadLabel, }: FilePreviewProps): React.JSX.Element;

interface SectionHeadingProps {
    /** Emoji o icono a la izquierda. */
    icon?: ReactNode;
    children: ReactNode;
    /** Contenido alineado a la derecha (botones). */
    actions?: ReactNode;
    className?: string;
}
/** Título de sección dentro de una página. */
declare function SectionHeading({ icon, children, actions, className, }: SectionHeadingProps): React.JSX.Element;
interface MonthHeadingProps {
    children: ReactNode;
    className?: string;
}
/** Encabezado de un grupo por mes, con línea divisoria a la derecha. */
declare function MonthHeading({ children, className }: MonthHeadingProps): React.JSX.Element;

interface InfiniteScrollTriggerProps {
    /** Se dispara cuando el centinela entra en viewport. */
    onLoadMore: () => void;
    /** `false` cuando ya no quedan páginas: no observa nada. */
    enabled?: boolean;
    /** Muestra el spinner y evita disparar de nuevo mientras carga. */
    loading?: boolean;
}
/**
 * Centinela para scroll infinito. Hay que renderizarlo al final de la lista;
 * cuando se vuelve visible pide la página siguiente.
 */
declare function InfiniteScrollTrigger({ onLoadMore, enabled, loading, }: InfiniteScrollTriggerProps): React.JSX.Element | null;

type Theme = "light" | "dark";
/**
 * Tema claro/oscuro persistido en localStorage, con el sistema como default.
 *
 * Aplica la clase `dark` en `<html>`, que es lo que lee `darkMode: "class"`
 * del preset.
 */
declare function useTheme(): {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggle: () => void;
};

/** Devuelve `value` recién después de `delay` ms sin cambios. */
declare function useDebounce<T>(value: T, delay?: number): T;

/**
 * Llama a `handler` cuando se hace mousedown fuera del elemento referenciado.
 * Se usa para cerrar dropdowns y autocompletes hechos a mano.
 */
declare function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void, enabled?: boolean): void;

/** Une clases de Tailwind resolviendo conflictos (la última gana). */
declare function cn(...inputs: ClassValue[]): string;

/** Locale único para todas las apps. */
declare const LOCALE = "es-AR";
/**
 * Parsea `"YYYY-MM-DD"` (o un ISO completo) como fecha local.
 *
 * `new Date("2025-03-10")` la interpreta como UTC y en zonas horarias negativas
 * cae un día antes; esto evita ese corrimiento.
 */
declare function parseLocalDate(iso: string): Date;
/** `10 de marzo de 2025` */
declare function formatDate(iso: string): string;
/** `10 mar 2025` */
declare function formatShortDate(iso: string): string;
/** `10 de marzo` (sin año, para agrupados donde el año ya está en el header) */
declare function formatDayMonth(iso: string): string;
/** `Marzo de 2025` — acepta un ISO o un `Date`. */
declare function formatMonthYear(value: string | Date): string;
/** Fecha de hoy en `YYYY-MM-DD` (local, no UTC). */
declare function todayISO(): string;
declare function capitalize(value: string): string;
interface MonthGroup<T> {
    /** `YYYY-MM`. Estable, sirve como key de React. */
    key: string;
    /** `Marzo de 2026`, ya capitalizado. */
    label: string;
    items: T[];
}
/**
 * Agrupa por mes y devuelve los grupos del más reciente al más viejo.
 *
 * Los items **sin fecha caen en el mes actual**: son los que se están
 * completando, y es donde el usuario los va a buscar.
 */
declare function groupByMonth<T>(items: T[], getDate: (item: T) => string | null | undefined): MonthGroup<T>[];

/**
 * Formatea un monto guardado en centavos.
 *
 * Los montos viajan como enteros para no arrastrar errores de punto flotante;
 * la división por 100 pasa solo al mostrarlos.
 */
declare function formatCurrency(cents: number, currency: string): string;
/** `1,4 MB` */
declare function formatFileSize(bytes: number): string;

type FileKind = "image" | "pdf" | "audio" | "video" | "other";
/** Clasifica un archivo por su content-type para elegir cómo previsualizarlo. */
declare function fileKind(contentType: string | null | undefined): FileKind;

/**
 * Helpers de browser con fallback para contexto no seguro.
 *
 * Estas apps se sirven por HTTP plano en la LAN (ej. `http://192.168.1.20:15011`),
 * donde `crypto.randomUUID` y `navigator.clipboard` no existen: son
 * secure-context only. De ahí los caminos alternativos.
 */
/** Id local (no persistente). */
declare function genId(): string;
/** Copia al portapapeles. Devuelve `false` si no se pudo. */
declare function copyToClipboard(text: string): Promise<boolean>;
/** Dispara la descarga de un Blob con el nombre indicado. */
declare function downloadBlob(blob: Blob, filename: string): void;
/** Serializa a JSON indentado y lo descarga. */
declare function downloadJson(data: unknown, filename: string): void;
/** Lee el `filename="..."` de un header `Content-Disposition`. */
declare function filenameFromDisposition(disposition: string | null, fallback: string): string;

declare class HttpError extends Error {
    readonly status: number;
    constructor(status: number, message: string);
}
interface HttpClient {
    /** URL absoluta de un path (para `<img src>`, `<a href>`, iframes…). */
    url(path: string): string;
    request<T>(path: string, init?: RequestInit): Promise<T>;
    get<T>(path: string, params?: QueryParams): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    patch<T>(path: string, body?: unknown): Promise<T>;
    del<T>(path: string): Promise<T>;
    /** POST multipart (subida de archivos). */
    postForm<T>(path: string, form: FormData): Promise<T>;
    /** PATCH multipart. */
    patchForm<T>(path: string, form: FormData): Promise<T>;
    /** Descarga el path como archivo, respetando `Content-Disposition`. */
    download(path: string, fallbackName: string): Promise<void>;
}
type QueryParams = Record<string, string | number | boolean | undefined | null | (string | number)[]>;
/** Serializa params salteando `undefined`/`null` y expandiendo arrays. */
declare function buildQuery(params?: QueryParams): string;
/**
 * Cliente HTTP tipado sobre `fetch`.
 *
 * `baseUrl` vacío (el default) significa mismo origen: nginx hace de
 * reverse-proxy de `/api/` al backend, así que la app funciona desde cualquier
 * host o IP sin URLs hardcodeadas en el build.
 */
declare function createHttpClient(baseUrl?: string): HttpClient;

/**
 * Textos por defecto de los componentes del kit (UI en español).
 *
 * Cada componente que muestra texto acepta una prop para pisarlo; esto es solo
 * el default para no obligar a cablear strings en cada uso. Los textos propios
 * de cada app viven en su `lib/strings.ts`, no acá.
 */
declare const labels: {
    readonly cancel: "Cancelar";
    readonly clear: "Limpiar";
    readonly close: "Cerrar";
    readonly confirm: "Confirmar";
    readonly copied: "Copiado";
    readonly copy: "Copiar";
    readonly copyError: "No se pudo copiar";
    readonly download: "Descargar";
    readonly dropzone: "Arrastrá archivos acá, hacé clic o pegá con Ctrl+V";
    readonly dropzoneActive: "Soltá los archivos…";
    readonly saveError: "No se pudo guardar";
    readonly saved: "Guardado";
    readonly saving: "Guardando…";
    readonly search: "Buscar…";
    readonly showLess: "Mostrar menos";
    readonly showMore: "Mostrar más";
    readonly takePhoto: "Sacar foto";
    readonly toggleTheme: "Cambiar tema";
};
type Labels = typeof labels;

export { AppBrand, type AppBrandProps, AppShell, type AppShellProps, Autocomplete, type AutocompleteProps, type Autosave, AutosaveIndicator, type AutosaveIndicatorProps, type AutosaveStatus, Badge, type BadgeProps, Button, type ButtonProps, CameraButton, type CameraButtonProps, Card, CardContent, CardFooter, CardHeader, CardTitle, Collapsible, type CollapsibleProps, ConfirmDialog, type ConfirmDialogProps, CopyButton, type CopyButtonProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, type EmptyStateProps, FileDropzone, type FileDropzoneProps, type FileKind, FilePreview, type FilePreviewProps, type HttpClient, HttpError, InfiniteScrollTrigger, type InfiniteScrollTriggerProps, Input, type InputProps, LOCALE, Label, type Labels, Markdown, type MarkdownProps, type MonthGroup, MonthHeading, type MonthHeadingProps, type QueryParams, SearchInput, type SearchInputProps, SectionHeading, type SectionHeadingProps, Select, Skeleton, Spinner, type SpinnerProps, Switch, Textarea, type Theme, ThemeToggle, type ThemeToggleProps, Toaster, badgeVariants, buildQuery, buttonVariants, capitalize, cn, copyToClipboard, createHttpClient, downloadBlob, downloadJson, fileKind, filenameFromDisposition, formatCurrency, formatDate, formatDayMonth, formatFileSize, formatMonthYear, formatShortDate, genId, groupByMonth, inputVariants, labels, parseLocalDate, todayISO, useAutosave, useClickOutside, useDebounce, useTheme };
