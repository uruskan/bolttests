import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/stores/authStore';
import { Logger } from '@/lib/logging/logger';

/**
 * Hook to fetch products
 */
export function useProducts(categoryId = null) {
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useQuery({
    queryKey: ['products', restaurantId, categoryId],
    queryFn: async () => {
      if (!restaurantId) throw new Error('No restaurant ID');
      const params = new URLSearchParams({ restaurantId });
      if (categoryId) params.append('categoryId', categoryId);
      return apiClient.get(`/products?${params}`);
    },
    enabled: !!restaurantId,
  });
}

/**
 * Hook to create a product with optimistic updates
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/products', { ...data, restaurantId });
    },
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products', restaurantId] });
      
      const previousProducts = queryClient.getQueryData(['products', restaurantId]);
      
      const optimisticProduct = {
        ...newProduct,
        id: `temp-${Date.now()}`,
        isOptimistic: true,
        active: true,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData(['products', restaurantId], (old = []) => [
        ...old,
        optimisticProduct
      ]);
      
      // Update category item count
      queryClient.setQueryData(['categories', restaurantId], (old = []) =>
        old?.map(category =>
          category.id === newProduct.categoryId
            ? { ...category, itemCount: (category.itemCount || 0) + 1 }
            : category
        ) || []
      );
      
      return { previousProducts, optimisticProduct };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products', restaurantId], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
    },
  });
}

/**
 * Hook to update a product with optimistic updates
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async ({ id, ...data }) => {
      return apiClient.put(`/products/${id}`, data);
    },
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products', restaurantId] });
      
      const previousProducts = queryClient.getQueryData(['products', restaurantId]);
      
      queryClient.setQueryData(['products', restaurantId], (old = []) =>
        old.map(product =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct, updated_at: new Date().toISOString() }
            : product
        )
      );
      
      return { previousProducts };
    },
    onError: (err, updatedProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products', restaurantId], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
    },
  });
}

/**
 * Hook to delete a product with optimistic updates
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (productId) => {
      return apiClient.delete(`/products/${productId}`);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['products', restaurantId] });
      
      const previousProducts = queryClient.getQueryData(['products', restaurantId]);
      const productToDelete = previousProducts?.find(p => p.id === productId);
      
      queryClient.setQueryData(['products', restaurantId], (old = []) =>
        old.filter(product => product.id !== productId)
      );
      
      // Update category item count
      if (productToDelete) {
        queryClient.setQueryData(['categories', restaurantId], (old = []) =>
          old?.map(category =>
            category.id === productToDelete.categoryId
              ? { ...category, itemCount: Math.max(0, (category.itemCount || 0) - 1) }
              : category
          ) || []
        );
      }
      
      return { previousProducts };
    },
    onError: (err, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products', restaurantId], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
    },
  });
}

/**
 * Hook to update product price with optimistic updates
 */
export function useUpdateProductPrice() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async ({ productId, price }) => {
      return apiClient.patch(`/products/${productId}/price`, { price });
    },
    onMutate: async ({ productId, price }) => {
      await queryClient.cancelQueries({ queryKey: ['products', restaurantId] });
      
      const previousProducts = queryClient.getQueryData(['products', restaurantId]);
      
      queryClient.setQueryData(['products', restaurantId], (old = []) =>
        old.map(product =>
          product.id === productId
            ? { ...product, price, updated_at: new Date().toISOString() }
            : product
        )
      );
      
      return { previousProducts };
    },
    onError: (err, { productId, price }, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products', restaurantId], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
    },
  });
}

/**
 * Hook to toggle product active status
 */
export function useToggleProductActive() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (productId) => {
      return apiClient.patch(`/products/${productId}/toggle-active`);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['products', restaurantId] });
      
      const previousProducts = queryClient.getQueryData(['products', restaurantId]);
      
      queryClient.setQueryData(['products', restaurantId], (old = []) =>
        old.map(product =>
          product.id === productId
            ? { ...product, active: !product.active, updated_at: new Date().toISOString() }
            : product
        )
      );
      
      return { previousProducts };
    },
    onError: (err, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products', restaurantId], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
    },
  });
}