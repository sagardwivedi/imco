import { ProcessingState } from "@/hooks/useImageProcessing";
import { cn } from "@/utils/cn";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";

interface ProcessingIndicatorProps {
  state: ProcessingState;
}

export function ProcessingIndicator({ state }: ProcessingIndicatorProps) {
  const { progress, status } = state;

  if (status === "idle") return null;

  const statusConfig = {
    uploading: {
      message: "Uploading image...",
      icon: <Loader2Icon className="w-4 h-4 animate-spin" />,
      color: "text-blue-500",
    },
    converting: {
      message: "Converting image...",
      icon: <Loader2Icon className="w-4 h-4 animate-spin" />,
      color: "text-blue-500",
    },
    complete: {
      message: "Processing complete",
      icon: <CheckCircle2Icon className="w-4 h-4" />,
      color: "text-green-500",
    },
    error: {
      message: "Processing failed",
      icon: <AlertCircleIcon className="w-4 h-4" />,
      color: "text-red-500",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center space-x-2">
      <span className={cn("animate-fade-in", config.color)}>{config.icon}</span>
      <span className="text-sm font-medium text-gray-700">
        {config.message}
      </span>
      {(status === "uploading" || status === "converting") && progress > 0 && (
        <span className="text-sm text-gray-500">({Math.round(progress)}%)</span>
      )}
    </div>
  );
}
