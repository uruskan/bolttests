import { supabaseAdmin } from '@/lib/supabase/admin';
import { Logger } from '@/lib/logging/logger';

/**
 * Restaurant service for database operations
 */
export class RestaurantService {
  /**
   * Get restaurant by ID
   */
  static async getById(restaurantId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      Logger.error('Failed to get restaurant', error, { restaurantId });
      throw error;
    }
  }

  /**
   * Update restaurant
   */
  static async update(restaurantId, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Restaurant updated', { restaurantId, fields: Object.keys(updateData) });
      return data;
    } catch (error) {
      Logger.error('Failed to update restaurant', error, { restaurantId, updateData });
      throw error;
    }
  }

  /**
   * Update restaurant settings
   */
  static async updateSettings(restaurantId, settings) {
    try {
      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .update({
          settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Restaurant settings updated', { restaurantId });
      return data;
    } catch (error) {
      Logger.error('Failed to update restaurant settings', error, { restaurantId });
      throw error;
    }
  }

  /**
   * Update restaurant theme
   */
  static async updateTheme(restaurantId, themeConfig) {
    try {
      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .update({
          theme_config: themeConfig,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Restaurant theme updated', { restaurantId });
      return data;
    } catch (error) {
      Logger.error('Failed to update restaurant theme', error, { restaurantId });
      throw error;
    }
  }

  /**
   * Get restaurant analytics
   */
  static async getAnalytics(restaurantId, startDate, endDate) {
    try {
      const { data, error } = await supabaseAdmin
        .from('analytics_events')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      Logger.error('Failed to get restaurant analytics', error, { restaurantId });
      throw error;
    }
  }
}