import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;
  const { restaurantId } = req;

  try {
    switch (method) {
      case 'PUT':
        const updatedCategory = await MenuService.updateCategory(id, req.body);
        
        Logger.userAction('update', 'category', {
          categoryId: id,
          fields: Object.keys(req.body),
          restaurantId
        });
        
        return res.status(200).json(updatedCategory);

      case 'DELETE':
        const deletedCategory = await MenuService.deleteCategory(id);
        
        Logger.userAction('delete', 'category', {
          categoryId: id,
          categoryName: deletedCategory.name,
          restaurantId
        });
        
        return res.status(200).json(deletedCategory);

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Category API error', error, { method, categoryId: id, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));