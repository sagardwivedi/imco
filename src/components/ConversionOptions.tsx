import { ImageIcon } from "lucide-react";
import { Button } from "./Button";

export type ImageFormat = "jpeg" | "png" | "webp" | "avif";

interface ConversionOptionsProps {
  selectedFormat: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  processingState: boolean;
}

export function ConversionOptions({
  selectedFormat,
  onFormatChange,
  quality,
  onQualityChange,
  processingState,
}: ConversionOptionsProps) {
  const formats: ImageFormat[] = ["jpeg", "png", "webp", "avif"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Format</h3>
        <div className="flex flex-wrap gap-2">
          {formats.map((format) => (
            <Button
              key={format}
              variant={selectedFormat === format ? "primary" : "secondary"}
              onClick={() => onFormatChange(format)}
              icon={<ImageIcon className="w-4 h-4" />}
              disabled={processingState}
            >
              <span className="uppercase">{format}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium text-gray-900">Quality</label>
          <span className="text-sm font-medium text-gray-600">{quality}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => onQualityChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-auto cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Lower size</span>
          <span>Better quality</span>
        </div>
      </div>
    </div>
  );
}
