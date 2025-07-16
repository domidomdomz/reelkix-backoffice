import { useDropzone } from 'react-dropzone';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import SortableImage from '@product-components/SortableImage';
import type { UploadItem } from "@product-types/product";

interface Props {
  productId: string;
  images: UploadItem[];
  onDrop: (files: File[]) => void;
  onReorder: (newOrder: UploadItem[]) => void;
  onFinalize: () => void;
  isUploading?: boolean;
  isFinalizing?: boolean;
  children?: React.ReactNode;
}

export default function ProductImageUploader({
  images,
  onDrop,
  onReorder,
  onFinalize,
  isUploading,
  isFinalizing,
  children
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop
  });

  // DnD setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );

  return (
    <div className="p-6 space-y-4">

      {children && (
        <div className="flex justify-between items-center">
          {children}
        </div>
      )}


      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? 'bg-blue-100 border-blue-400'
            : 'bg-white border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Release to upload 📤'
            : 'Drag & drop images here, or click to browse'}
        </p>
      </div>

      {isUploading && <p className="text-blue-500">Uploading images...</p>}

      {/* Sortable Preview Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) {
            const oldIndex = images.findIndex(i => i.previewUrl === active.id)
            const newIndex = images.findIndex(i => i.previewUrl === over.id)
            const reordered = arrayMove(images, oldIndex, newIndex)
            onReorder(
              reordered.map((img, idx) => ({ ...img, sortOrder: idx }))
            )
          }
        }}
      >
        <SortableContext
          items={images.map(i => i.previewUrl)}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="grid grid-cols-3 gap-4">
            {images.map((u) => (
              <SortableImage key={u.previewUrl} upload={u} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>


      <button onClick={onFinalize} disabled={isFinalizing} className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50">
        {isFinalizing ? 'Saving…' : 'Save Product'}
      </button>
    </div>
  );
}
