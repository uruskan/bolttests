import { supabase } from '@/lib/supabase/client';
import { Logger } from '@/lib/logging/logger';

/**
 * API Client with interceptors and error handling
 */
class ApiClient {
  constructor() {
    this.baseURL = '/api';
  }

  /**
   * Make authenticated request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      Logger.warn('Failed to get session for API request', error);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(response.status, errorText, endpoint);
      }
      
      const data = await response.json();
      Logger.debug('API Request successful', { endpoint, status: response.status });
      return data;
    } catch (error) {
      Logger.error('API Request failed', error, { endpoint, options });
      throw error;
    }
  }

  // CRUD methods
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(status, message, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

export const apiClient = new ApiClient();