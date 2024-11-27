import { ImageFormat } from "@/components/ConversionOptions";

export interface ImageConversionResult {
  url: string;
  size: number;
}

export async function convertImage(
  file: File,
  format: ImageFormat,
  quality: number
): Promise<ImageConversionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0);

        try {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Could not convert image"));
                return;
              }
              const url = URL.createObjectURL(blob);
              resolve({
                url,
                size: blob.size,
              });
            },
            `image/${format}`,
            quality / 100
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error("Invalid image file"));

      // Safely handle potential null result
      const result = e.target?.result;
      if (typeof result === "string") {
        img.src = result;
      } else {
        reject(new Error("Could not read file"));
      }
    };

    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

// Optional utility function to format file size
export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
}
