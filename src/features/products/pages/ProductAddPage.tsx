import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import type { ProductFormValues} from "@product-schemas/productFormSchema";
import ProductImageUploader from "@product-components/ProductImageUploader";
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
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

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
    for (let i = 0; i < files.length; i++) {
      const img = await uploadImage({ file: files[i], sortOrder: uploadedImages.length + i });
      setUploadedImages((prev) => [...prev, img]);
    }
  };

  // Phase 2: finalize product
  const handleFinalize = async () => {
    if (!formValues || !productId) return;

    await finalize({
      productId,
      ...formValues,
      costPrice: formValues.costPrice,
      sellingPrice: formValues.sellingPrice,
      images: uploadedImages.map((img) => ({
        id: img.imageId,
        sortOrder: img.sortOrder,
        altText: img.altText
      }))
    });

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
