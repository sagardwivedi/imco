import { Download, Maximize2 } from "lucide-react";
import { Button } from "./Button";
import { formatFileSize } from "@/utils/imageConversion";

interface ImagePreviewProps {
  original: {
    url: string | null;
    size: number;
  };
  converted: {
    url: string | null;
    size: number;
  };
  onDownload: () => void;
  isConverting: boolean;
}

export function ImagePreview({
  original,
  converted,
  isConverting,
  onDownload,
}: ImagePreviewProps) {
  if (!original) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PreviewCard
        title="Original"
        image={original.url}
        imageSize={original.size}
        showDownload={false}
      />
      <PreviewCard
        title="Converted"
        image={converted.url}
        imageSize={original.size}
        isLoading={isConverting}
        showDownload={true}
        onDownload={onDownload}
      />
    </div>
  );
}

interface PreviewCardProps {
  title: string;
  image: string | null;
  isLoading?: boolean;
  showDownload: boolean;
  onDownload?: () => void;
  imageSize?: number;
}

function PreviewCard({
  title,
  image,
  isLoading,
  showDownload,
  onDownload,
  imageSize,
}: PreviewCardProps) {
  const imageS = formatFileSize(imageSize || 0);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          {title}-{imageS}
        </h3>
        {showDownload && image && !isLoading && (
          <Button
            onClick={onDownload}
            variant="secondary"
            icon={<Download className="w-4 h-4" />}
          >
            Download
          </Button>
        )}
      </div>
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        {image ? (
          <div className="group relative h-full">
            <img src={image} alt={title} className="size-full object-contain" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                icon={<Maximize2 className="size-4" />}
                onClick={() => window.open(image, "_blank")}
              >
                View Full Size
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {isLoading ? (
              <div className="animate-pulse">Converting image...</div>
            ) : (
              "Image will appear here"
            )}
          </div>
        )}
      </div>
    </div>
  );
}
