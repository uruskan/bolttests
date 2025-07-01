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
        const updatedProduct = await MenuService.updateProduct(id, req.body);
        
        Logger.userAction('update', 'product', {
          productId: id,
          fields: Object.keys(req.body),
          restaurantId
        });
        
        return res.status(200).json(updatedProduct);

      case 'DELETE':
        const deletedProduct = await MenuService.deleteProduct(id);
        
        Logger.userAction('delete', 'product', {
          productId: id,
          productName: deletedProduct.name,
          restaurantId
        });
        
        return res.status(200).json(deletedProduct);

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Product API error', error, { method, productId: id, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));