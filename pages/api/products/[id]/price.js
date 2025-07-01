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
    const { price } = req.body;
    
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const updatedProduct = await MenuService.updateProductPrice(id, price);
    
    Logger.userAction('update_price', 'product', {
      productId: id,
      newPrice: price,
      restaurantId
    });
    
    return res.status(200).json(updatedProduct);
  } catch (error) {
    Logger.error('Product price update API error', error, { productId: id, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));