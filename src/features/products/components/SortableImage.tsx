import { useSortable } from '@dnd-kit/sortable'
import { CSS }          from '@dnd-kit/utilities'
import type { UploadItem } from '@product-types/product'

interface Props {
  upload: UploadItem
}

export default function SortableImage({ upload }: Props) {
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

      {/* your existing overlays: progress, error, ✓ */}
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
        <div className="absolute top-1 right-1 text-green-400 font-bold">✔</div>
      )}
    </li>
  )
}
