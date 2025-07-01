import { supabaseAdmin } from '@/lib/supabase/admin';
import { Logger } from '@/lib/logging/logger';

/**
 * Higher-order function for API route authentication
 */
export function withApiAuth(handler, options = {}) {
  return async (req, res) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
      }

      const token = authHeader.substring(7);

      // Verify token with Supabase
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      
      if (error || !user) {
        Logger.warn('Invalid token in API request', { error: error?.message });
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Get user's restaurant association
      const { data: userRestaurant, error: restaurantError } = await supabaseAdmin
        .from('user_restaurants')
        .select('restaurant_id, role')
        .eq('user_id', user.id)
        .single();

      if (restaurantError && restaurantError.code !== 'PGRST116') {
        Logger.error('Failed to get user restaurant association', restaurantError);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Check role requirements
      if (options.requiredRole) {
        const roleHierarchy = { owner: 3, admin: 2, editor: 1 };
        const userRoleLevel = roleHierarchy[userRestaurant?.role] || 0;
        const requiredRoleLevel = roleHierarchy[options.requiredRole] || 0;

        if (userRoleLevel < requiredRoleLevel) {
          return res.status(403).json({ error: 'Insufficient permissions' });
        }
      }

      // Attach user info to request
      req.user = user;
      req.restaurantId = userRestaurant?.restaurant_id;
      req.userRole = userRestaurant?.role;

      // Call the actual handler
      return handler(req, res);
    } catch (error) {
      Logger.error('Auth middleware error', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

/**
 * Middleware to validate restaurant ownership
 */
export function withRestaurantAccess(handler) {
  return withApiAuth(async (req, res) => {
    if (!req.restaurantId) {
      return res.status(403).json({ error: 'No restaurant access' });
    }

    // Validate that the restaurant ID in the request matches user's restaurant
    const requestRestaurantId = req.query.restaurantId || req.body?.restaurantId;
    if (requestRestaurantId && requestRestaurantId !== req.restaurantId) {
      return res.status(403).json({ error: 'Restaurant access denied' });
    }

    return handler(req, res);
  });
}