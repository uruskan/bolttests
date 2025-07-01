import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors, withRateLimit } from '@/lib/api/middleware/validation';
import { MenuService } from '@/lib/api/services/menuService';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method, query } = req;
  const { restaurantId } = req;

  try {
    switch (method) {
      case 'GET':
        const { categoryId } = query;
        const products = await MenuService.getProducts(restaurantId, categoryId);
        return res.status(200).json(products);

      case 'POST':
        const newProduct = await MenuService.createProduct(restaurantId, req.body);
        
        Logger.userAction('create', 'product', {
          productId: newProduct.id,
          productName: newProduct.name,
          categoryId: newProduct.category_id,
          restaurantId
        });
        
        return res.status(201).json(newProduct);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Products API error', error, { method, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRateLimit()(withRestaurantAccess(handler)));