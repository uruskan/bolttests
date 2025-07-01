/**
 * Live Preview Manager for QR Menu
 */
export class PreviewManager {
  constructor(previewUrl) {
    this.previewUrl = previewUrl;
    this.iframe = null;
    this.messageHandlers = new Map();
    this.isConnected = false;
    
    this.setupMessageListener();
  }

  /**
   * Create preview iframe
   */
  createPreview(container) {
    if (this.iframe) {
      this.destroyPreview();
    }

    this.iframe = document.createElement('iframe');
    this.iframe.src = this.previewUrl;
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';
    this.iframe.style.border = 'none';
    this.iframe.style.borderRadius = '8px';
    
    // Add loading state
    this.iframe.onload = () => {
      this.isConnected = true;
      this.sendMessage('PREVIEW_READY', { timestamp: Date.now() });
    };
    
    container.appendChild(this.iframe);
    return this.iframe;
  }

  /**
   * Send update to preview
   */
  sendUpdate(type, data) {
    this.sendMessage('PREVIEW_UPDATE', { type, data });
  }

  /**
   * Send message to preview iframe
   */
  sendMessage(type, payload) {
    if (this.iframe?.contentWindow && this.isConnected) {
      this.iframe.contentWindow.postMessage({
        source: 'DASHBOARD',
        type,
        payload
      }, '*');
    }
  }

  /**
   * Register message handler
   */
  onMessage(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  /**
   * Setup message listener
   */
  setupMessageListener() {
    window.addEventListener('message', (event) => {
      if (event.data?.source === 'PREVIEW') {
        const { type, payload } = event.data;
        const handler = this.messageHandlers.get(type);
        
        if (handler) {
          handler(payload);
        }
      }
    });
  }

  /**
   * Update theme in preview
   */
  updateTheme(themeConfig) {
    this.sendUpdate('THEME_UPDATE', themeConfig);
  }

  /**
   * Update menu data in preview
   */
  updateMenu(menuData) {
    this.sendUpdate('MENU_UPDATE', menuData);
  }

  /**
   * Update restaurant info in preview
   */
  updateRestaurant(restaurantData) {
    this.sendUpdate('RESTAURANT_UPDATE', restaurantData);
  }

  /**
   * Simulate device type
   */
  setDeviceType(deviceType) {
    this.sendMessage('DEVICE_TYPE_CHANGE', { deviceType });
  }

  /**
   * Destroy preview
   */
  destroyPreview() {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
      this.isConnected = false;
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.destroyPreview();
    this.messageHandlers.clear();
  }
}

/**
 * Preview message types
 */
export const PREVIEW_MESSAGES = {
  // Dashboard to Preview
  PREVIEW_READY: 'PREVIEW_READY',
  PREVIEW_UPDATE: 'PREVIEW_UPDATE',
  THEME_UPDATE: 'THEME_UPDATE',
  MENU_UPDATE: 'MENU_UPDATE',
  RESTAURANT_UPDATE: 'RESTAURANT_UPDATE',
  DEVICE_TYPE_CHANGE: 'DEVICE_TYPE_CHANGE',
  
  // Preview to Dashboard
  PREVIEW_LOADED: 'PREVIEW_LOADED',
  PREVIEW_ERROR: 'PREVIEW_ERROR',
  USER_INTERACTION: 'USER_INTERACTION',
  ANALYTICS_EVENT: 'ANALYTICS_EVENT',
};

/**
 * React hook for preview management
 */
import { useEffect, useRef, useState } from 'react';

export function usePreview(previewUrl) {
  const containerRef = useRef(null);
  const previewManagerRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (containerRef.current && !previewManagerRef.current) {
      previewManagerRef.current = new PreviewManager(previewUrl);
      
      // Setup connection status handler
      previewManagerRef.current.onMessage('PREVIEW_LOADED', () => {
        setIsConnected(true);
        setError(null);
      });
      
      previewManagerRef.current.onMessage('PREVIEW_ERROR', (payload) => {
        setError(payload.error);
        setIsConnected(false);
      });
      
      // Create the preview
      previewManagerRef.current.createPreview(containerRef.current);
    }

    return () => {
      if (previewManagerRef.current) {
        previewManagerRef.current.destroy();
        previewManagerRef.current = null;
      }
    };
  }, [previewUrl]);

  const sendUpdate = (type, data) => {
    previewManagerRef.current?.sendUpdate(type, data);
  };

  const onMessage = (type, handler) => {
    previewManagerRef.current?.onMessage(type, handler);
  };

  const updateTheme = (themeConfig) => {
    previewManagerRef.current?.updateTheme(themeConfig);
  };

  const updateMenu = (menuData) => {
    previewManagerRef.current?.updateMenu(menuData);
  };

  const updateRestaurant = (restaurantData) => {
    previewManagerRef.current?.updateRestaurant(restaurantData);
  };

  const setDeviceType = (deviceType) => {
    previewManagerRef.current?.setDeviceType(deviceType);
  };

  return {
    containerRef,
    isConnected,
    error,
    sendUpdate,
    onMessage,
    updateTheme,
    updateMenu,
    updateRestaurant,
    setDeviceType,
  };
}