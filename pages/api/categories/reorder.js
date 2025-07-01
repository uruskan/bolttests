import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method } = req;
  const { restaurantId } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${method} not allowed` });
  }

  try {
    const { categoryIds } = req.body;
    
    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({ error: 'categoryIds must be an array' });
    }

    const reorderedCategories = await MenuService.reorderCategories(restaurantId, categoryIds);
    
    Logger.userAction('reorder', 'categories', {
      categoryCount: categoryIds.length,
      restaurantId
    });
    
    return res.status(200).json(reorderedCategories);
  } catch (error) {
    Logger.error('Category reorder API error', error, { restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));