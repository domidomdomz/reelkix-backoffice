import type { CSSProperties } from 'react';
import { useDropzone } from 'react-dropzone';
import type { ProductImage } from "@product-types/product";

interface Props {
  productId: string;
  images: ProductImage[];
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

      <ul>
        {images.map((img) => (
          <li key={img.imageId}>
            <img src={img.url} width={100} />
            <span>Order: {img.sortOrder}</span>
          </li>
        ))}
      </ul>

      <button onClick={onFinalize} disabled={isFinalizing} className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50">
        {isFinalizing ? 'Saving…' : 'Save Product'}
      </button>
    </div>
  );
}
