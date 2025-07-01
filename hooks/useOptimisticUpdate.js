import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Logger } from '@/lib/logging/logger';

/**
 * Hook for managing optimistic updates with rollback capability
 */
export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  const performOptimisticUpdate = useCallback(async ({
    queryKey,
    updateFn,
    mutationFn,
    onSuccess,
    onError,
    rollbackOnError = true
  }) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey });
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(queryKey);
    
    try {
      // Optimistically update
      queryClient.setQueryData(queryKey, updateFn);
      
      // Perform actual mutation
      const result = await mutationFn();
      
      // Call success callback
      if (onSuccess) {
        onSuccess(result, previousData);
      }
      
      Logger.info('Optimistic update succeeded', { queryKey });
      return result;
    } catch (error) {
      // Rollback on error if requested
      if (rollbackOnError && previousData !== undefined) {
        queryClient.setQueryData(queryKey, previousData);
        Logger.warn('Optimistic update rolled back', { queryKey, error: error.message });
      }
      
      // Call error callback
      if (onError) {
        onError(error, previousData);
      }
      
      Logger.error('Optimistic update failed', error, { queryKey });
      throw error;
    } finally {
      // Always invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey });
    }
  }, [queryClient]);

  return { performOptimisticUpdate };
}

/**
 * Hook for batch optimistic updates
 */
export function useBatchOptimisticUpdate() {
  const queryClient = useQueryClient();

  const performBatchUpdate = useCallback(async (updates) => {
    const snapshots = new Map();
    
    try {
      // Cancel all queries and take snapshots
      for (const update of updates) {
        await queryClient.cancelQueries({ queryKey: update.queryKey });
        snapshots.set(update.queryKey, queryClient.getQueryData(update.queryKey));
      }
      
      // Apply all optimistic updates
      for (const update of updates) {
        queryClient.setQueryData(update.queryKey, update.updateFn);
      }
      
      // Perform all mutations
      const results = await Promise.allSettled(
        updates.map(update => update.mutationFn())
      );
      
      // Check for failures
      const failures = results.filter(result => result.status === 'rejected');
      
      if (failures.length > 0) {
        // Rollback all changes on any failure
        for (const [queryKey, previousData] of snapshots) {
          if (previousData !== undefined) {
            queryClient.setQueryData(queryKey, previousData);
          }
        }
        
        throw new Error(`Batch update failed: ${failures.length} operations failed`);
      }
      
      Logger.info('Batch optimistic update succeeded', { 
        updateCount: updates.length 
      });
      
      return results.map(result => result.value);
    } catch (error) {
      Logger.error('Batch optimistic update failed', error, { 
        updateCount: updates.length 
      });
      throw error;
    } finally {
      // Invalidate all affected queries
      for (const update of updates) {
        queryClient.invalidateQueries({ queryKey: update.queryKey });
      }
    }
  }, [queryClient]);

  return { performBatchUpdate };
}