import { useSortable } from '@dnd-kit/sortable'
import { CSS }          from '@dnd-kit/utilities'
import type { UploadItem } from '@product-types/product'

interface Props {
  upload: UploadItem,
  onDelete: (imageId: string) => void;
  isDeleting?: boolean;
}

export default function SortableImage({ upload, onDelete, isDeleting }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: upload.previewUrl })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative border p-2 rounded bg-gray-50"
    >
      <img
        src={upload.previewUrl}
        alt={upload.file.name}
        className="w-full h-32 object-cover rounded"
      />

      {/* Delete Icon */}
      <button
        onClick={() => onDelete(upload.imageId!)}
        className={`absolute top-2 right-2 z-20 bg-white bg-opacity-75 rounded-full p-1 hover:bg-red-100 
                  ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 6l8 8m0-8L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
      </button>

      {/* your existing overlays: progress, error, ✓ */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-30">
          <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {upload.progress >= 0 && upload.progress < 100 && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <span className="text-white font-bold">{upload.progress}%</span>
        </div>
      )}
      {upload.progress === -1 && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
          <span className="text-white">Upload Failed</span>
        </div>
      )}
      {upload.progress === 100 && (
        <div className="absolute bottom-2 right-2 z-10 bg-white bg-opacity-75 rounded-full p-1">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </li>
  )
}
