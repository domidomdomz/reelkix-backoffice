import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    deleteDraft,
    updateDraft,
    fetchDraft,
    draftData,
    isDrafting,
    isUploading,
    isFinalizing,
    isDeleting,
    isDraftLoading
  } = useProductCreateFlow();

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ProductFormValues | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadItem[]>([]);

  // Warn on refresh/close if there's a draft in progress
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (productId) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [productId]);

  // Phase 1 submit
  const handleFormSubmit = async (values: ProductFormValues) => {
    if (productId) {
      // Update existing draft
      await updateDraft({
        productId,
        payload: {
          productId: productId,
          name: values.name,
          description: values.description,
          manufacturerId: values.manufacturerId,
          costPrice: values.costPrice,
          sellingPrice: values.sellingPrice
        }
      });

    } else {
      // Create new draft
      await createDraft({
        name: values.name,
        description: values.description,
        manufacturerId: values.manufacturerId,
        costPrice: values.costPrice,
        sellingPrice: values.sellingPrice
      });
    }

    setFormValues(values);
  };

  // Phase 2: on each file drop
  const handleDrop = async (files: File[]) => {
    const baseIndex = uploadedImages.length;
    const newItems: UploadItem[] = files.map((file, index) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      sortOrder: baseIndex + index,
      altText: file.name,
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

  // Phase 2: reorder images
  const handleReorder = (newOrder: UploadItem[]) => {
    console.log('Reordering images:', newOrder);
    // Update the sortOrder based on new order
    setUploadedImages(newOrder);
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
              .map((img, idx) => ({
                imageId: img.imageId!, // safe after filter
                sortOrder: idx,
                altText: img.altText
              }))
    };

    console.log('Finalizing product with payload:', payload);
    await finalize(payload);
    // Redirect or toast…
    navigate(`/products/${productId}`); // Redirect to product details
  };

  // Phase 2 → go back to details
  const handleBackToDetails = async () => {
    if (
      !window.confirm(
        'Continue to Details?'
      )
    ) return;

    await fetchDraft(productId!); // manually fetch draft data
    //setUploadedImages([]);
    setFormValues(null);
  };

  // Phase 1 → discard draft entirely
  const handleDiscardDraft = async () => {
    if (!productId) return;
    if (!window.confirm('Discard this draft and lose all changes?')) return;

    await deleteDraft(productId);
    navigate('/products'); // or your desired route
  };

  // Render Phase 1 or Phase 2
  if (!formValues) {
    return (
      <div className="p-6 max-w-xl space-y-4">
        <ProductForm
          isLoading={isDrafting || isDraftLoading}
          defaultValues={draftData || undefined}
          onSubmit={handleFormSubmit}
        />
        {productId && (
          <button
            onClick={handleDiscardDraft}
            disabled={isDeleting}
            className="text-red-600 hover:underline"
          >
            {isDeleting ? 'Discarding…' : 'Discard Draft'}
          </button>
        )}
      </div>
      
    );
  }

  return (
    <ProductImageUploader
      productId={productId!}
      images={uploadedImages}
      onDrop={handleDrop}
      onReorder={handleReorder}
      onFinalize={handleFinalize}
      isUploading={isUploading}
      isFinalizing={isFinalizing}>
        <button
          onClick={handleBackToDetails}
          className="mr-4 text-gray-700 hover:underline"
        >
          ← Back to Details
        </button>
    </ProductImageUploader>
  );
}
