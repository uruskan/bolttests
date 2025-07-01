import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;
  const { restaurantId } = req;

  if (method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).json({ error: `Method ${method} not allowed` });
  }

  try {
    const updatedProduct = await MenuService.toggleProductActive(id);
    
    Logger.userAction('toggle_active', 'product', {
      productId: id,
      newStatus: updatedProduct.is_active,
      restaurantId
    });
    
    return res.status(200).json(updatedProduct);
  } catch (error) {
    Logger.error('Product toggle active API error', error, { productId: id, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));