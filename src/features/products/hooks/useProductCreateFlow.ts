import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  createDraftProduct,
  uploadProductImage,
  updateProduct,
} from '@product-services/productApi';
import type { CreateDraftProductPayload, UpdateProductPayload, UploadedImageResponse } from '@product-types/product';

export function useProductCreateFlow() {
    const [productId, setProductId] = useState<string | null>(null);

    const draftMutation = useMutation<string, Error, CreateDraftProductPayload>({
        mutationFn: createDraftProduct,
        onSuccess: (id) => setProductId(id)
    });

    const uploadMutation = useMutation<UploadedImageResponse, Error, { file: File; sortOrder: number }>({
    mutationFn: ({ file, sortOrder }) => {
        if (!productId) throw new Error('No productId set');
        return uploadProductImage(productId, file, sortOrder);
    }
    });

    const finalizeMutation = useMutation<void, Error, UpdateProductPayload>({
        mutationFn: updateProduct
    });



    return {
        productId,
        createDraft: draftMutation.mutateAsync,
        uploadImage: uploadMutation.mutateAsync,
        finalize: finalizeMutation.mutateAsync,
        isDrafting: draftMutation.isPending,
        isUploading: uploadMutation.isPending,
        isFinalizing: finalizeMutation.isPending
    };
}
