import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { labels } from "../labels";

export interface LoadErrorProps {
  onRetry: () => unknown;
  retrying?: boolean;
}

export function LoadError({ onRetry, retrying = false }: LoadErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
    >
      <AlertCircle aria-hidden className="h-5 w-5 shrink-0 text-destructive" />
      <p className="min-w-0 flex-1 text-sm">{labels.loadError}</p>
      <Button
        variant="outline"
        size="sm"
        disabled={retrying}
        onClick={() => void onRetry()}
      >
        <RotateCcw />
        {labels.retry}
      </Button>
    </div>
  );
}
