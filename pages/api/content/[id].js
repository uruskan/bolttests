import { withRestaurantAccess } from '@/lib/api/middleware/auth';
import { withCors } from '@/lib/api/middleware/validation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { Logger } from '@/lib/logging/logger';

async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;
  const { restaurantId } = req;

  try {
    switch (method) {
      case 'PUT':
        const { data: updatedContent, error: updateError } = await supabaseAdmin
          .from('content_items')
          .update({
            ...req.body,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .eq('restaurant_id', restaurantId)
          .select()
          .single();

        if (updateError) throw updateError;
        
        Logger.userAction('update', 'content', {
          contentId: id,
          fields: Object.keys(req.body),
          restaurantId
        });
        
        return res.status(200).json(updatedContent);

      case 'DELETE':
        const { data: deletedContent, error: deleteError } = await supabaseAdmin
          .from('content_items')
          .delete()
          .eq('id', id)
          .eq('restaurant_id', restaurantId)
          .select()
          .single();

        if (deleteError) throw deleteError;
        
        Logger.userAction('delete', 'content', {
          contentId: id,
          title: deletedContent.title,
          restaurantId
        });
        
        return res.status(200).json(deletedContent);

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    Logger.error('Content API error', error, { method, contentId: id, restaurantId });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withCors(withRestaurantAccess(handler));