'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { logErrorBoundary } from '@/lib/logging/logger';

/**
 * Error Boundary Component with Sentry integration
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log to our logging system
    logErrorBoundary(error, errorInfo);
    
    // Generate a unique error ID for user reference
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.setState({ errorId });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorId: null 
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-foreground">Bir hata oluştu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-xs font-mono text-red-800 dark:text-red-200 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              {this.state.errorId && (
                <p className="text-xs text-muted-foreground text-center">
                  Hata ID: {this.state.errorId}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={this.handleRetry}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tekrar Dene
                </Button>
                <Button
                  className="flex-1"
                  onClick={this.handleGoHome}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary for functional components
 */
export function useErrorHandler() {
  return (error, errorInfo) => {
    logErrorBoundary(error, errorInfo);
  };
}