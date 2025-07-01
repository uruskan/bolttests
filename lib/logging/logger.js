import * as Sentry from '@sentry/nextjs';

/**
 * Centralized logging system with Sentry integration
 */
export class Logger {
  static info(message, extra = {}) {
    console.info(`[INFO] ${message}`, extra);
    
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        message,
        level: 'info',
        data: extra,
        timestamp: Date.now() / 1000,
      });
    }
  }

  static warn(message, extra = {}) {
    console.warn(`[WARN] ${message}`, extra);
    
    if (typeof window !== 'undefined') {
      Sentry.captureMessage(message, 'warning');
      Sentry.setContext('warning_context', extra);
    }
  }

  static error(message, error = null, extra = {}) {
    console.error(`[ERROR] ${message}`, error, extra);
    
    if (typeof window !== 'undefined') {
      if (error instanceof Error) {
        Sentry.captureException(error, {
          tags: {
            section: 'application_error'
          },
          extra: {
            message,
            ...extra
          }
        });
      } else {
        Sentry.captureMessage(message, 'error');
      }
    }
  }

  static debug(message, extra = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, extra);
    }
  }

  static performance(name, duration, extra = {}) {
    console.log(`[PERF] ${name}: ${duration}ms`, extra);
    
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        message: `Performance: ${name}`,
        level: 'info',
        data: {
          duration,
          ...extra
        },
        category: 'performance',
      });
    }
  }

  /**
   * Log user action for audit trail
   */
  static userAction(action, resource, data = {}) {
    const logData = {
      action,
      resource,
      timestamp: new Date().toISOString(),
      ...data
    };

    console.log(`[USER_ACTION] ${action} on ${resource}`, logData);
    
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        message: `User action: ${action}`,
        level: 'info',
        data: logData,
        category: 'user_action',
      });
    }
  }

  /**
   * Log API calls for debugging
   */
  static apiCall(method, endpoint, status, duration, data = {}) {
    const logData = {
      method,
      endpoint,
      status,
      duration,
      timestamp: new Date().toISOString(),
      ...data
    };

    if (status >= 400) {
      console.error(`[API_ERROR] ${method} ${endpoint} - ${status}`, logData);
    } else {
      console.log(`[API_CALL] ${method} ${endpoint} - ${status} (${duration}ms)`, logData);
    }
    
    if (typeof window !== 'undefined') {
      Sentry.addBreadcrumb({
        message: `API ${method} ${endpoint}`,
        level: status >= 400 ? 'error' : 'info',
        data: logData,
        category: 'api',
      });
    }
  }
}

/**
 * Performance measurement utility
 */
export class PerformanceLogger {
  constructor(name) {
    this.name = name;
    this.startTime = performance.now();
  }

  end(extra = {}) {
    const duration = performance.now() - this.startTime;
    Logger.performance(this.name, Math.round(duration), extra);
    return duration;
  }
}

/**
 * Error boundary logger
 */
export function logErrorBoundary(error, errorInfo) {
  Logger.error('Error Boundary caught an error', error, {
    componentStack: errorInfo.componentStack,
    errorBoundary: true
  });
}