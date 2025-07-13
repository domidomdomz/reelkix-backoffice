import type { CSSProperties } from 'react';
import { useDropzone } from 'react-dropzone';
import type { UploadItem } from "@product-types/product";

interface Props {
  productId: string;
  images: UploadItem[];
  onDrop: (files: File[]) => void;
  onFinalize: () => void;
  isUploading?: boolean;
  isFinalizing?: boolean;
}

export default function ProductImageUploader({
  images,
  onDrop,
  onFinalize,
  isUploading,
  isFinalizing
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ border: '2px dashed #aaa', padding: 20 } as CSSProperties}
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to browse</p>
      </div>

      {isUploading && <p className="text-blue-500">Uploading images...</p>}

      {/* Image Previews */}
      <ul className="grid grid-cols-3 gap-4">
        {images.map((u) => (
          <li key={u.previewUrl} className="relative">
            <img
              src={u.previewUrl}
              className="w-full h-32 object-cover rounded"
              alt={u.file.name}
            />

            {/* Progress Overlay */}
            {u.progress >= 0 && u.progress < 100 && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="text-white font-bold">{u.progress}%</span>
              </div>
            )}

            {/* Error state */}
            {u.progress === -1 && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                <span className="text-white">Upload Failed</span>
              </div>
            )}

            {/* Finalized */}
            {u.progress === 100 && (
              <div className="absolute top-1 right-1 text-green-400 font-bold">✔</div>
            )}
          </li>
        ))}
      </ul>


      <button onClick={onFinalize} disabled={isFinalizing} className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50">
        {isFinalizing ? 'Saving…' : 'Save Product'}
      </button>
    </div>
  );
}
