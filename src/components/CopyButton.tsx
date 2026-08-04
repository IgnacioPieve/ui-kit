import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { copyToClipboard } from "../lib/browser";
import { labels } from "../labels";

export interface CopyButtonProps {
  value: string;
  label?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export function CopyButton({
  value,
  label = labels.copy,
  successMessage = labels.copied,
  errorMessage = labels.copyError,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await copyToClipboard(value)) {
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 1500);
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className ?? "h-6 w-6"}
      onClick={handleCopy}
      aria-label={label}
      title={label}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
