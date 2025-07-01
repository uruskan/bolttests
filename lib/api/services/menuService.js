import { supabaseAdmin } from '@/lib/supabase/admin';
import { Logger } from '@/lib/logging/logger';

/**
 * Menu service for categories and products
 */
export class MenuService {
  /**
   * Get all categories for a restaurant
   */
  static async getCategories(restaurantId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .select(`
          *,
          products:products(count)
        `)
        .eq('restaurant_id', restaurantId)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      // Add item count to each category
      const categoriesWithCount = data.map(category => ({
        ...category,
        itemCount: category.products?.[0]?.count || 0
      }));

      return categoriesWithCount;
    } catch (error) {
      Logger.error('Failed to get categories', error, { restaurantId });
      throw error;
    }
  }

  /**
   * Create a new category
   */
  static async createCategory(restaurantId, categoryData) {
    try {
      // Get the next sort order
      const { data: lastCategory } = await supabaseAdmin
        .from('categories')
        .select('sort_order')
        .eq('restaurant_id', restaurantId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();

      const nextSortOrder = (lastCategory?.sort_order || 0) + 1;

      const { data, error } = await supabaseAdmin
        .from('categories')
        .insert({
          ...categoryData,
          restaurant_id: restaurantId,
          sort_order: nextSortOrder,
        })
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Category created', { restaurantId, categoryId: data.id, name: data.name });
      return { ...data, itemCount: 0 };
    } catch (error) {
      Logger.error('Failed to create category', error, { restaurantId, categoryData });
      throw error;
    }
  }

  /**
   * Update a category
   */
  static async updateCategory(categoryId, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', categoryId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Category updated', { categoryId, fields: Object.keys(updateData) });
      return data;
    } catch (error) {
      Logger.error('Failed to update category', error, { categoryId, updateData });
      throw error;
    }
  }

  /**
   * Delete a category and its products
   */
  static async deleteCategory(categoryId) {
    try {
      // First delete all products in the category
      const { error: productsError } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('category_id', categoryId);

      if (productsError) throw productsError;

      // Then delete the category
      const { data, error } = await supabaseAdmin
        .from('categories')
        .delete()
        .eq('id', categoryId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Category deleted', { categoryId });
      return data;
    } catch (error) {
      Logger.error('Failed to delete category', error, { categoryId });
      throw error;
    }
  }

  /**
   * Reorder categories
   */
  static async reorderCategories(restaurantId, categoryIds) {
    try {
      const updates = categoryIds.map((id, index) => ({
        id,
        sort_order: index,
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await supabaseAdmin
        .from('categories')
        .upsert(updates)
        .eq('restaurant_id', restaurantId)
        .select();

      if (error) throw error;
      
      Logger.info('Categories reordered', { restaurantId, count: categoryIds.length });
      return data;
    } catch (error) {
      Logger.error('Failed to reorder categories', error, { restaurantId, categoryIds });
      throw error;
    }
  }

  /**
   * Get all products for a restaurant or category
   */
  static async getProducts(restaurantId, categoryId = null) {
    try {
      let query = supabaseAdmin
        .from('products')
        .select(`
          *,
          category:categories(name)
        `)
        .eq('restaurant_id', restaurantId);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('sort_order', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      Logger.error('Failed to get products', error, { restaurantId, categoryId });
      throw error;
    }
  }

  /**
   * Create a new product
   */
  static async createProduct(restaurantId, productData) {
    try {
      // Get the next sort order for the category
      const { data: lastProduct } = await supabaseAdmin
        .from('products')
        .select('sort_order')
        .eq('category_id', productData.categoryId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();

      const nextSortOrder = (lastProduct?.sort_order || 0) + 1;

      const { data, error } = await supabaseAdmin
        .from('products')
        .insert({
          ...productData,
          restaurant_id: restaurantId,
          category_id: productData.categoryId,
          sort_order: nextSortOrder,
        })
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Product created', { restaurantId, productId: data.id, name: data.name });
      return data;
    } catch (error) {
      Logger.error('Failed to create product', error, { restaurantId, productData });
      throw error;
    }
  }

  /**
   * Update a product
   */
  static async updateProduct(productId, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Product updated', { productId, fields: Object.keys(updateData) });
      return data;
    } catch (error) {
      Logger.error('Failed to update product', error, { productId, updateData });
      throw error;
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(productId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Product deleted', { productId });
      return data;
    } catch (error) {
      Logger.error('Failed to delete product', error, { productId });
      throw error;
    }
  }

  /**
   * Update product price
   */
  static async updateProductPrice(productId, price) {
    try {
      const { data, error } = await supabaseAdmin
        .from('products')
        .update({
          price,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Product price updated', { productId, price });
      return data;
    } catch (error) {
      Logger.error('Failed to update product price', error, { productId, price });
      throw error;
    }
  }

  /**
   * Toggle product active status
   */
  static async toggleProductActive(productId) {
    try {
      // First get current status
      const { data: currentProduct, error: getError } = await supabaseAdmin
        .from('products')
        .select('is_active')
        .eq('id', productId)
        .single();

      if (getError) throw getError;

      // Toggle the status
      const { data, error } = await supabaseAdmin
        .from('products')
        .update({
          is_active: !currentProduct.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      
      Logger.info('Product active status toggled', { productId, newStatus: data.is_active });
      return data;
    } catch (error) {
      Logger.error('Failed to toggle product active status', error, { productId });
      throw error;
    }
  }
}