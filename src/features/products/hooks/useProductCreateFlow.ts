import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  createDraftProduct,
  uploadProductImage,
  updateProduct,
  deleteDraftProduct
} from '@product-services/productApi';
import type { CreateDraftProductPayload, UpdateProductPayload, UploadedImageResponse, UploadArgs } from '@product-types/product';

export function useProductCreateFlow() {
    const [productId, setProductId] = useState<string | null>(null);

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

    const finalizeMutation = useMutation<void, Error, UpdateProductPayload>({
        mutationFn: updateProduct
    });

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: deleteDraftProduct,
        onSuccess: () => {
                setProductId(null); // Reset productId after deletion
        }
    });  

    return {
        productId,
        createDraft: draftMutation.mutateAsync,
        uploadImage: uploadMutation.mutateAsync,
        finalize: finalizeMutation.mutateAsync,
        deleteDraft: deleteMutation.mutateAsync,
        isDrafting: draftMutation.isPending,
        isUploading: uploadMutation.isPending,
        isFinalizing: finalizeMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
}
