import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import type { ProductFormValues} from "@product-schemas/productFormSchema";
import ProductImageUploader from "@product-components/ProductImageUploader";
import type { UploadItem } from '@product-types/product';
import { useProductCreateFlow } from '../hooks/useProductCreateFlow';

export default function ProductAddPage() {
  const {
    productId,
    createDraft,
    uploadImage,
    finalize,
    isDrafting,
    isUploading,
    isFinalizing
  } = useProductCreateFlow();

  const [formValues, setFormValues] = useState<ProductFormValues | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadItem[]>([]);

  // Phase 1 submit
  const handleFormSubmit = async (values: ProductFormValues) => {
    await createDraft({
      name: values.name,
      description: values.description,
      manufacturerId: values.manufacturerId
    });
    setFormValues(values);
  };

  // Phase 2: on each file drop
  const handleDrop = async (files: File[]) => {
    const baseIndex = uploadedImages.length;
    const newItems: UploadItem[] = files.map((file, index) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      sortOrder: baseIndex + index,
      progress: 0
    }));

    // Update state with new uploadedImages (Previews should be shown immediately)
    setUploadedImages((prev) => [...prev, ...newItems]);

    // Start uploads with progress callbacks
    newItems.forEach((item) => {
      uploadImage({
        file: item.file,
        sortOrder: item.sortOrder,
        onProgress: (progress) => {
          setUploadedImages((prev) =>
            prev.map((upload) =>
              upload.file === item.file ? { ...upload, progress } : upload
            )
          );
        }
      })
      .then((response) => {
        setUploadedImages((prev) => 
          prev.map((upload) =>
            upload.file === item.file ? { ...upload, imageId: response.imageId } : upload
          )
        );
      })
      .catch(() => {
        // Optionally mark failure
        setUploadedImages((prev) =>
          prev.map((upload) =>
            upload.file === item.file ? { ...upload, progress: -1 } : upload
          )
        );
      });
    });
  };

  // Phase 2: finalize product
  const handleFinalize = async () => {
    if (!formValues || !productId) return;

    const payload = {
      productId,
      ...formValues,
      costPrice: formValues.costPrice,
      sellingPrice: formValues.sellingPrice,
      images: uploadedImages
              .filter((img) => typeof img.imageId === 'string') // only include successful uploads
              .map((img) => ({
                id: img.imageId!, // safe after filter
                sortOrder: img.sortOrder,
                altText: img.altText
              }))
    };

    await finalize(payload);

    // Redirect or toast…
  };

  // Render Phase 1 or Phase 2
  if (!productId || !formValues) {
    return (
      <ProductForm
        isLoading={isDrafting}
        onSubmit={handleFormSubmit}
      />
    );
  }

  return (
    <ProductImageUploader
      productId={productId}
      images={uploadedImages}
      onDrop={handleDrop}
      onFinalize={handleFinalize}
      isUploading={isUploading}
      isFinalizing={isFinalizing}
    />
  );
}
