import { useCallback, useState } from "react";

export interface ProcessingState {
  status: "idle" | "uploading" | "converting" | "complete" | "error";
  progress: number;
}

export function useImageProcessing() {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: "idle",
    progress: 0,
  });

  const startProcessing = useCallback((fileSize: number) => {
    if (fileSize > 2 * 1024 * 1024) {
      setProcessingState({ status: "uploading", progress: 0 });

      const duration = Math.min(
        Math.floor(fileSize / (1024 * 1024)) * 500,
        3000
      );
      const steps = 10;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setProcessingState((prev) => ({
            ...prev,
            progress: (currentStep / steps) * 100,
          }));
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    setProcessingState({ status: "uploading", progress: 0 });
  }, []);

  const startConverting = useCallback(() => {
    setProcessingState((prev) => ({
      ...prev,
      status: "converting",
      progress: 0,
    }));
  }, []);

  const completeProcessing = useCallback(() => {
    setProcessingState({ status: "complete", progress: 100 });
  }, []);

  const setError = useCallback(() => {
    setProcessingState({ status: "error", progress: 0 });
  }, []);

  return {
    processingState,
    startProcessing,
    startConverting,
    completeProcessing,
    setError,
  };
}
