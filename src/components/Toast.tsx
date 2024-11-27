import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../utils/cn";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "loading";
  onClose: () => void;
  progress?: number;
}

export function Toast({
  message,
  type = "success",
  onClose,
  progress,
}: ToastProps) {
  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose, type]);

  const icons = {
    success: <CheckCircle2 className="size-5" />,
    error: <AlertCircle className="size-5" />,
    loading: <Loader2 className="size-5 animate-spin" />,
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 max-w-sm w-full animate-slide-up">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg shadow-lg",
          "bg-white dark:bg-gray-800",
          "border-l-4",
          type === "success" && "border-green-500",
          type === "error" && "border-red-500",
          type === "loading" && "border-blue-500"
        )}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex-shrink-0 p-2 rounded-full",
                type === "success" && "bg-green-100 text-green-500",
                type === "error" && "bg-red-100 text-red-500",
                type === "loading" && "bg-blue-100 text-blue-500"
              )}
            >
              {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      type === "success" &&
                        "text-green-900 dark:text-green-100",
                      type === "error" && "text-red-900 dark:text-red-100",
                      type === "loading" && "text-blue-900 dark:text-blue-100"
                    )}
                  >
                    {message}
                  </p>
                  {progress !== undefined && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(progress)}% complete
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {progress !== undefined && (
          <div className="h-1 w-full bg-gray-100 dark:bg-gray-700">
            <div
              className={cn(
                "h-full transition-all duration-300 ease-in-out",
                type === "success" && "bg-green-500",
                type === "error" && "bg-red-500",
                type === "loading" && "bg-blue-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
