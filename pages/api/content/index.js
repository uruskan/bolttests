import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors, withRateLimit } from '@/lib/api/middleware/validation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method, query } = req;
  const { restaurantId } = req;

  try {
    switch (method) {
      case 'GET':
        const { type } = query; // 'story', 'advertisement', 'featured'
        
        let dbQuery = supabaseAdmin
          .from('content_items')
          .select('*')
          .eq('restaurant_id', restaurantId)
          .order('sort_order', { ascending: true });

        if (type) {
          dbQuery = dbQuery.eq('type', type);
        }

        const { data, error } = await dbQuery;
        if (error) throw error;

        return res.status(200).json(data);

      case 'POST':
        const { data: newContent, error: createError } = await supabaseAdmin
          .from('content_items')
          .insert({
            ...req.body,
            restaurant_id: restaurantId,
          })
          .select()
          .single();

        if (createError) throw createError;
        
        Logger.userAction('create', 'content', {
          contentId: newContent.id,
          type: newContent.type,
          title: newContent.title,
          restaurantId
        });
        
        return res.status(201).json(newContent);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Content API error', error, { method, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRateLimit()(withRestaurantAccess(handler)));