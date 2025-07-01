import { Logger } from '@/lib/logging/logger';

/**
 * Validation middleware for API routes
 */
export function withValidation(schema) {
  return (handler) => {
    return async (req, res) => {
      try {
        // Validate request body against schema
        const validatedData = schema.parse(req.body);
        req.validatedData = validatedData;
        
        return handler(req, res);
      } catch (error) {
        Logger.warn('Request validation failed', { error: error.message, body: req.body });
        
        if (error.name === 'ZodError') {
          return res.status(400).json({
            error: 'Validation failed',
            details: error.errors
          });
        }
        
        return res.status(400).json({ error: 'Invalid request data' });
      }
    };
  };
}

/**
 * Rate limiting middleware (simple in-memory implementation)
 */
const rateLimitStore = new Map();

export function withRateLimit(options = {}) {
  const { maxRequests = 100, windowMs = 15 * 60 * 1000 } = options; // 100 requests per 15 minutes
  
  return (handler) => {
    return async (req, res) => {
      const key = req.ip || req.connection.remoteAddress || 'unknown';
      const now = Date.now();
      
      // Clean up old entries
      for (const [k, v] of rateLimitStore.entries()) {
        if (now - v.resetTime > windowMs) {
          rateLimitStore.delete(k);
        }
      }
      
      // Get or create rate limit entry
      let rateLimitEntry = rateLimitStore.get(key);
      if (!rateLimitEntry || now - rateLimitEntry.resetTime > windowMs) {
        rateLimitEntry = {
          count: 0,
          resetTime: now
        };
        rateLimitStore.set(key, rateLimitEntry);
      }
      
      // Check rate limit
      if (rateLimitEntry.count >= maxRequests) {
        Logger.warn('Rate limit exceeded', { ip: key, count: rateLimitEntry.count });
        return res.status(429).json({ 
          error: 'Too many requests',
          retryAfter: Math.ceil((rateLimitEntry.resetTime + windowMs - now) / 1000)
        });
      }
      
      // Increment counter
      rateLimitEntry.count++;
      
      return handler(req, res);
    };
  };
}

/**
 * CORS middleware
 */
export function withCors(options = {}) {
  const {
    origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization']
  } = options;

  return (handler) => {
    return async (req, res) => {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
      res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }

      return handler(req, res);
    };
  };
}