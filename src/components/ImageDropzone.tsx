import { cn } from "@/utils/cn";
import { ImageIcon, UploadIcon } from "lucide-react";
import React, { useCallback } from "react";

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageDropzone({
  onImageSelect,
  isLoading,
}: ImageDropzoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "border-2 border-dashed rounded-lg p-12",
        "transition-all duration-200 ease-in-out",
        "bg-white/50 backdrop-blur-sm",
        isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-blue-500 hover:bg-blue-50",
        "group"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-input"
        disabled={isLoading}
      />
      <label
        htmlFor="file-input"
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
          {isLoading ? (
            <ImageIcon className="size-8 text-blue-500 animate-pulse" />
          ) : (
            <UploadIcon className="size-8 text-blue-500" />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          or click to upload
        </p>
        <p className="text-xs text-gray-400 mt-4 text-center">
          Supports: JPG, PNG, WebP, AVIF
        </p>
      </label>
    </div>
  );
}
