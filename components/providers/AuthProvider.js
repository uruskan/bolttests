'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Logger } from '@/lib/logging/logger';

export function AuthProvider({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize auth state on app start
    initialize().catch((error) => {
      Logger.error('Failed to initialize auth provider', error);
    });
  }, [initialize]);

  return children;
}