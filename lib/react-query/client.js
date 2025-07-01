import { QueryClient } from '@tanstack/react-query';
import { Logger } from '@/lib/logging/logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        // Don't retry on client errors (4xx)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      onError: (error) => {
        Logger.error('Query failed', error);
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        Logger.error('Mutation failed', error);
      },
    },
  },
});

// Global error handler
queryClient.setMutationDefaults(['optimistic'], {
  mutationFn: async ({ optimisticUpdate, actualUpdate }) => {
    // This will be overridden by individual mutations
    return actualUpdate();
  },
});