import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/stores/authStore';
import { Logger } from '@/lib/logging/logger';

/**
 * Hook to fetch content items
 */
export function useContent(type = null) {
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useQuery({
    queryKey: ['content', restaurantId, type],
    queryFn: async () => {
      if (!restaurantId) throw new Error('No restaurant ID');
      const params = new URLSearchParams({ restaurantId });
      if (type) params.append('type', type);
      return apiClient.get(`/content?${params}`);
    },
    enabled: !!restaurantId,
  });
}

/**
 * Hook to create content with optimistic updates
 */
export function useCreateContent() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (data) => {
      return apiClient.post('/content', { ...data, restaurantId });
    },
    onMutate: async (newContent) => {
      await queryClient.cancelQueries({ queryKey: ['content', restaurantId] });
      
      const previousContent = queryClient.getQueryData(['content', restaurantId]);
      
      const optimisticContent = {
        ...newContent,
        id: `temp-${Date.now()}`,
        isOptimistic: true,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData(['content', restaurantId], (old = []) => [
        ...old,
        optimisticContent
      ]);
      
      // Also update type-specific queries
      if (newContent.type) {
        queryClient.setQueryData(['content', restaurantId, newContent.type], (old = []) => [
          ...old,
          optimisticContent
        ]);
      }
      
      Logger.info('Optimistic content creation', { contentType: newContent.type, title: newContent.title });
      
      return { previousContent, optimisticContent };
    },
    onError: (err, newContent, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData(['content', restaurantId], context.previousContent);
      }
      Logger.error('Content creation failed, rolling back', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content', restaurantId] });
    },
    onSuccess: (data, variables, context) => {
      Logger.info('Content created successfully', { contentId: data.id, type: data.type });
    },
  });
}

/**
 * Hook to update content with optimistic updates
 */
export function useUpdateContent() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async ({ id, ...data }) => {
      return apiClient.put(`/content/${id}`, data);
    },
    onMutate: async (updatedContent) => {
      await queryClient.cancelQueries({ queryKey: ['content', restaurantId] });
      
      const previousContent = queryClient.getQueryData(['content', restaurantId]);
      
      queryClient.setQueryData(['content', restaurantId], (old = []) =>
        old.map(content =>
          content.id === updatedContent.id
            ? { ...content, ...updatedContent, updated_at: new Date().toISOString() }
            : content
        )
      );
      
      return { previousContent };
    },
    onError: (err, updatedContent, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData(['content', restaurantId], context.previousContent);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content', restaurantId] });
    },
  });
}

/**
 * Hook to delete content with optimistic updates
 */
export function useDeleteContent() {
  const queryClient = useQueryClient();
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  return useMutation({
    mutationFn: async (contentId) => {
      return apiClient.delete(`/content/${contentId}`);
    },
    onMutate: async (contentId) => {
      await queryClient.cancelQueries({ queryKey: ['content', restaurantId] });
      
      const previousContent = queryClient.getQueryData(['content', restaurantId]);
      
      queryClient.setQueryData(['content', restaurantId], (old = []) =>
        old.filter(content => content.id !== contentId)
      );
      
      return { previousContent };
    },
    onError: (err, contentId, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData(['content', restaurantId], context.previousContent);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content', restaurantId] });
    },
  });
}