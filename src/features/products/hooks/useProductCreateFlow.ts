import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createDraftProduct,
  uploadProductImage,
  updateProduct,
  deleteDraftProduct,
  getDraftProduct,
  updateDraftProduct,
  deleteProductImage
} from '@product-services/productApi';
import type { CreateDraftProductPayload, UpdateProductPayload, UploadedImageResponse, UploadArgs } from '@product-types/product';
import type { ProductFormValues } from '@product-schemas/productFormSchema';

export function useProductCreateFlow() {
    const [productId, setProductId] = useState<string | null>(null);
    //const [uploadedDraftImages, setUploadedDraftImages] = useState<UploadItem[]>([]); // TODO: for server-hydrated draft product images

    const draftMutation = useMutation<string, Error, CreateDraftProductPayload>({
        mutationFn: createDraftProduct,
        onSuccess: (id) => setProductId(id)
    });

    const uploadMutation = useMutation<UploadedImageResponse, Error, UploadArgs>({
        mutationFn: ({ file, sortOrder, onProgress }) => {
            if (!productId) throw new Error('No productId set');
            return uploadProductImage(productId, file, sortOrder, onProgress);
        }
    });

    const updateDraftMutation = useMutation<void, Error, {
        productId: string;
        payload: ProductFormValues;
    }>({
        mutationFn: ({ productId, payload }) => updateDraftProduct(productId, payload)
    });

    const finalizeMutation = useMutation<void, Error, UpdateProductPayload>({
        mutationFn: updateProduct
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteDraftProduct,
        onSuccess: () => {
                setProductId(null); // Reset productId after deletion
        }
    });

    const draftQuery = useQuery({
        queryKey: ['draft', productId],
        queryFn: () => getDraftProduct(productId!),
        enabled: false // Disable auto-fetch
    });

    const fetchDraft = async (id: string) => {
        await draftQuery.refetch(); // ← manual trigger
    };

    const deleteImageMutation = useMutation<void, Error, { productId: string; imageId: string }>({
        mutationFn: ({ productId, imageId }) => deleteProductImage(productId, imageId),
        // onSuccess: (_, { imageId }) => {
        //     // Remove the image from the uploadedImages state
        //     setUploadedDraftImages((prev) => prev.filter(img => img.imageId !== imageId));
        // }
    });

    return {
        productId,
        //uploadedDraftImages,
        createDraft: draftMutation.mutateAsync,
        uploadImage: uploadMutation.mutateAsync,
        finalize: finalizeMutation.mutateAsync,
        deleteDraft: deleteMutation.mutateAsync,
        updateDraft: updateDraftMutation.mutateAsync,
        deleteImage: deleteImageMutation.mutateAsync,
        fetchDraft,
        //setUploadedDraftImages,
        draftData: draftQuery.data,
        isDrafting: draftMutation.isPending,
        isUploading: uploadMutation.isPending,
        isFinalizing: finalizeMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isDraftUpdating: updateDraftMutation.isPending,
        isDraftLoading: draftQuery.isLoading,
        isDeletingImage: deleteImageMutation.isPending
    };
}
