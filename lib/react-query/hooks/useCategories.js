import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/stores/authStore';
import { Logger } from '@/lib/logging/logger';

/**
 * Hook to fetch categories
 */
export function useCategories() {
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useQuery({
    queryKey: ['categories', restaurantId],
    queryFn: async () => {
      if (!restaurantId) throw new Error('No restaurant ID');
      return apiClient.get(`/categories?restaurantId=${restaurantId}`);
    },
    enabled: !!restaurantId,
  });
}

/**
 * Hook to create a category with optimistic updates
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/categories', { ...data, restaurantId });
    },
    onMutate: async (newCategory) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['categories', restaurantId] });
      
      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(['categories', restaurantId]);
      
      // Optimistically update
      const optimisticCategory = {
        ...newCategory,
        id: `temp-${Date.now()}`,
        isOptimistic: true,
        itemCount: 0,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData(['categories', restaurantId], (old = []) => [
        ...old,
        optimisticCategory
      ]);
      
      Logger.info('Optimistic category creation', { categoryName: newCategory.name });
      
      return { previousCategories, optimisticCategory };
    },
    onError: (err, newCategory, context) => {
      // Rollback on error
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories', restaurantId], context.previousCategories);
      }
      Logger.error('Category creation failed, rolling back', err);
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
    },
    onSuccess: (data, variables, context) => {
      Logger.info('Category created successfully', { categoryId: data.id });
    },
  });
}

/**
 * Hook to update a category with optimistic updates
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async ({ id, ...data }) => {
      return apiClient.put(`/categories/${id}`, data);
    },
    onMutate: async (updatedCategory) => {
      await queryClient.cancelQueries({ queryKey: ['categories', restaurantId] });
      
      const previousCategories = queryClient.getQueryData(['categories', restaurantId]);
      
      queryClient.setQueryData(['categories', restaurantId], (old = []) =>
        old.map(category =>
          category.id === updatedCategory.id
            ? { ...category, ...updatedCategory, updated_at: new Date().toISOString() }
            : category
        )
      );
      
      return { previousCategories };
    },
    onError: (err, updatedCategory, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories', restaurantId], context.previousCategories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
    },
  });
}

/**
 * Hook to delete a category with optimistic updates
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (categoryId) => {
      return apiClient.delete(`/categories/${categoryId}`);
    },
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({ queryKey: ['categories', restaurantId] });
      
      const previousCategories = queryClient.getQueryData(['categories', restaurantId]);
      
      queryClient.setQueryData(['categories', restaurantId], (old = []) =>
        old.filter(category => category.id !== categoryId)
      );
      
      // Also remove related products
      queryClient.setQueryData(['products', restaurantId], (old = []) =>
        old?.filter(product => product.categoryId !== categoryId) || []
      );
      
      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories', restaurantId], context.previousCategories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
      queryClient.invalidateQueries({ queryKey: ['products', restaurantId] });
    },
  });
}

/**
 * Hook to reorder categories
 */
export function useReorderCategories() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (categoryIds) => {
      return apiClient.post('/categories/reorder', { categoryIds, restaurantId });
    },
    onMutate: async (categoryIds) => {
      await queryClient.cancelQueries({ queryKey: ['categories', restaurantId] });
      
      const previousCategories = queryClient.getQueryData(['categories', restaurantId]);
      
      // Reorder categories optimistically
      const reorderedCategories = categoryIds.map((id, index) => {
        const category = previousCategories?.find(cat => cat.id === id);
        return category ? { ...category, sort_order: index } : null;
      }).filter(Boolean);
      
      queryClient.setQueryData(['categories', restaurantId], reorderedCategories);
      
      return { previousCategories };
    },
    onError: (err, categoryIds, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories', restaurantId], context.previousCategories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', restaurantId] });
    },
  });
}