import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors, withRateLimit } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method } = req;
  const { restaurantId } = req;

  try {
    switch (method) {
      case 'GET':
        const categories = await MenuService.getCategories(restaurantId);
        return res.status(200).json(categories);

      case 'POST':
        const newCategory = await MenuService.createCategory(restaurantId, req.body);
        
        // Log user action for audit
        Logger.userAction('create', 'category', {
          categoryId: newCategory.id,
          categoryName: newCategory.name,
          restaurantId
        });
        
        return res.status(201).json(newCategory);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Categories API error', error, { method, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRateLimit()(withRestaurantAccess(handler)));