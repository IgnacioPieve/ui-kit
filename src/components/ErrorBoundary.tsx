import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";
import { labels } from "../labels";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div
        role="alert"
        className="mx-auto max-w-md space-y-4 rounded-lg border p-6 text-center"
      >
        <p className="font-medium">{labels.pageError}</p>
        <Button onClick={() => window.location.reload()}>
          {labels.reload}
        </Button>
      </div>
    );
  }
}
