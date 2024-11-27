import { useState } from "react";
import { ImageDropzone } from "./components/ImageDropzone";
import {
  ConversionOptions,
  type ImageFormat,
} from "./components/ConversionOptions";
import { ImagePreview } from "./components/ImagePreview";
import { Toast } from "./components/Toast";
import { useToast } from "@/hooks/use-toast";
import { useImageProcessing } from "./hooks/useImageProcessing";
import { convertImage, ImageConversionResult } from "./utils/imageConversion";
import { ImageIcon } from "lucide-react";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] =
    useState<ImageConversionResult | null>(null);
  const [convertedImage, setConvertedImage] =
    useState<ImageConversionResult | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(80);
  const { toast, showToast, hideToast } = useToast();
  const {
    processingState,
    startProcessing,
    startConverting,
    completeProcessing,
    setError,
  } = useImageProcessing();

  const handleImageSelect = async (file: File) => {
    try {
      setSelectedFile(file);
      setOriginalImage({ size: file.size, url: URL.createObjectURL(file) });

      startProcessing(file.size);
      showToast("Processing large image...", "loading");

      await handleConversion(file, selectedFormat, quality);
      completeProcessing();
      showToast("Image processed successfully", "success");
    } catch {
      setError();
      showToast("Failed to process image", "error");
    }
  };

  const handleConversion = async (
    file: File,
    format: ImageFormat,
    imageQuality: number
  ) => {
    try {
      startConverting();
      const converted = await convertImage(file, format, imageQuality);
      setConvertedImage(converted);
    } catch (error) {
      console.error("Conversion failed:", error);
      throw error;
    }
  };

  const handleFormatChange = async (format: ImageFormat) => {
    setSelectedFormat(format);
    if (selectedFile) {
      try {
        startConverting();
        showToast("Converting image...", "loading");
        await handleConversion(selectedFile, format, quality);
        completeProcessing();
        showToast("Image converted successfully", "success");
      } catch {
        setError();
        showToast("Failed to convert image", "error");
      }
    }
  };

  const handleQualityChange = async (newQuality: number) => {
    setQuality(newQuality);
    if (selectedFile) {
      try {
        startConverting();
        showToast("Updating image quality...", "loading");
        await handleConversion(selectedFile, selectedFormat, newQuality);
        completeProcessing();
        showToast("Image quality updated", "success");
      } catch {
        setError();
        showToast("Failed to update image quality", "error");
      }
    }
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement("a");
      link.href = convertedImage.url;
      link.download = `converted-image.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Image downloaded successfully", "success");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <ImageIcon className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Image Conversion Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert your images to different formats with custom quality
            settings
          </p>
        </div>

        <ImageDropzone
          onImageSelect={handleImageSelect}
          isLoading={
            processingState.status === "uploading" ||
            processingState.status === "converting"
          }
        />

        {originalImage && convertedImage && (
          <div className="space-y-8">
            <ConversionOptions
              selectedFormat={selectedFormat}
              onFormatChange={handleFormatChange}
              quality={quality}
              onQualityChange={handleQualityChange}
              processingState={processingState.status === "converting"}
            />

            <ImagePreview
              original={originalImage}
              converted={convertedImage}
              onDownload={handleDownload}
              isConverting={processingState.status === "converting"}
            />
          </div>
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
            progress={
              processingState.status !== "idle"
                ? processingState.progress
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;
