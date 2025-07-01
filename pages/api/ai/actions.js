import { withApiAuth } from '@/lib/api/middleware/auth';
import { withCors, withRateLimit } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { RestaurantService } from '@/lib/api/services/restaurantService';
import { Logger } from '@/lib/logging/logger';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * AI Assistant API endpoint
 * Handles structured actions that can be performed by AI
 */
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { user, restaurantId } = req;
  const { action, resource, data, context } = req.body;

  try {
    // Log AI action for audit
    await logAIAction(restaurantId, user.id, action, resource, data, context);

    // Execute action based on resource type
    const result = await executeAction(action, resource, data, restaurantId, context);

    Logger.info('AI action executed successfully', {
      action,
      resource,
      restaurantId,
      userId: user.id
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    Logger.error('AI action failed', error, {
      action,
      resource,
      restaurantId,
      userId: user.id
    });
    
    return res.status(500).json({ 
      error: 'Action execution failed',
      message: error.message 
    });
  }
}

/**
 * Execute AI action based on resource and action type
 */
async function executeAction(action, resource, data, restaurantId, context) {
  const actionKey = `${resource}.${action}`;
  
  const actionMap = {
    // Menu Category Actions
    'category.create': () => MenuService.createCategory(restaurantId, data),
    'category.update': () => MenuService.updateCategory(data.id, data),
    'category.delete': () => MenuService.deleteCategory(data.id),
    'category.reorder': () => MenuService.reorderCategories(restaurantId, data.categoryIds),
    
    // Menu Product Actions
    'product.create': () => MenuService.createProduct(restaurantId, data),
    'product.update': () => MenuService.updateProduct(data.id, data),
    'product.delete': () => MenuService.deleteProduct(data.id),
    'product.updatePrice': () => MenuService.updateProductPrice(data.id, data.price),
    'product.toggleActive': () => MenuService.toggleProductActive(data.id),
    
    // Restaurant Actions
    'restaurant.update': () => RestaurantService.update(restaurantId, data),
    'restaurant.updateSettings': () => RestaurantService.updateSettings(restaurantId, data),
    'restaurant.updateTheme': () => RestaurantService.updateTheme(restaurantId, data),
    
    // Bulk Operations
    'bulk.createProducts': () => createProductsBulk(restaurantId, data.products),
    'bulk.updatePrices': () => updatePricesBulk(restaurantId, data.updates),
    'bulk.toggleActiveProducts': () => toggleActiveProductsBulk(restaurantId, data.productIds),
    
    // Analytics Actions
    'analytics.getReport': () => RestaurantService.getAnalytics(restaurantId, data.startDate, data.endDate),
  };

  const actionFunction = actionMap[actionKey];

  if (!actionFunction) {
    throw new Error(`Unknown action: ${actionKey}`);
  }

  return await actionFunction();
}

/**
 * Bulk create products
 */
async function createProductsBulk(restaurantId, products) {
  const results = [];
  
  for (const productData of products) {
    try {
      const product = await MenuService.createProduct(restaurantId, productData);
      results.push({ success: true, product });
    } catch (error) {
      results.push({ success: false, error: error.message, productData });
    }
  }
  
  return results;
}

/**
 * Bulk update prices
 */
async function updatePricesBulk(restaurantId, updates) {
  const results = [];
  
  for (const { productId, price } of updates) {
    try {
      const product = await MenuService.updateProductPrice(productId, price);
      results.push({ success: true, product });
    } catch (error) {
      results.push({ success: false, error: error.message, productId, price });
    }
  }
  
  return results;
}

/**
 * Bulk toggle active status
 */
async function toggleActiveProductsBulk(restaurantId, productIds) {
  const results = [];
  
  for (const productId of productIds) {
    try {
      const product = await MenuService.toggleProductActive(productId);
      results.push({ success: true, product });
    } catch (error) {
      results.push({ success: false, error: error.message, productId });
    }
  }
  
  return results;
}

/**
 * Log AI action to audit trail
 */
async function logAIAction(restaurantId, userId, action, resource, data, context) {
  try {
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        restaurant_id: restaurantId,
        user_id: userId,
        action: `ai.${action}`,
        resource_type: resource,
        resource_id: data?.id || null,
        new_data: data,
        metadata: {
          context,
          source: 'ai_assistant',
          timestamp: new Date().toISOString()
        }
      });
  } catch (error) {
    Logger.error('Failed to log AI action', error);
  }
}

export default withCors(withRateLimit({ maxRequests: 50 })(withApiAuth(handler)));