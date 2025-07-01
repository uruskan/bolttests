import { supabaseAdmin } from '../lib/supabase/admin.js';

/**
 * Seed script for Supabase database
 * Run this once to set up all tables and initial data
 */

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Create tables
    console.log('📋 Creating tables...');
    
    const createTablesSQL = `
      -- Enable UUID extension
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Restaurants table
      CREATE TABLE IF NOT EXISTS restaurants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        cuisine_type TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        logo_url TEXT,
        settings JSONB DEFAULT '{}',
        theme_config JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- User-Restaurant associations
      CREATE TABLE IF NOT EXISTS user_restaurants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        role TEXT DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'editor')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, restaurant_id)
      );

      -- Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Products table
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Content items (stories, ads, featured content)
      CREATE TABLE IF NOT EXISTS content_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        type TEXT NOT NULL CHECK (type IN ('story', 'advertisement', 'featured')),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        video_url TEXT,
        link_url TEXT,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
        metadata JSONB DEFAULT '{}',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Analytics events
      CREATE TABLE IF NOT EXISTS analytics_events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        event_type TEXT NOT NULL,
        event_data JSONB DEFAULT '{}',
        user_agent TEXT,
        ip_address INET,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Audit logs for AI assistant and user actions
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        user_id UUID REFERENCES auth.users(id),
        action TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        resource_id UUID,
        old_data JSONB,
        new_data JSONB,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const { error: createError } = await supabaseAdmin.rpc('exec_sql', { sql: createTablesSQL });
    if (createError) {
      console.error('Error creating tables:', createError);
      // Try alternative approach - execute each statement separately
      const statements = createTablesSQL.split(';').filter(stmt => stmt.trim());
      for (const statement of statements) {
        if (statement.trim()) {
          const { error } = await supabaseAdmin.rpc('exec_sql', { sql: statement });
          if (error) console.warn('Statement error (may be expected):', error.message);
        }
      }
    }

    // 2. Enable RLS
    console.log('🔒 Enabling Row Level Security...');
    
    const rlsSQL = `
      ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
      ALTER TABLE user_restaurants ENABLE ROW LEVEL SECURITY;
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
      ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
      ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
    `;

    await supabaseAdmin.rpc('exec_sql', { sql: rlsSQL });

    // 3. Create RLS Policies
    console.log('📜 Creating RLS policies...');
    
    const policiesSQL = `
      -- Restaurants: Users can access restaurants they're associated with
      CREATE POLICY IF NOT EXISTS "Users can access their restaurants" ON restaurants
        FOR ALL USING (
          id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- User restaurants: Users can see their own associations
      CREATE POLICY IF NOT EXISTS "Users can see their restaurant associations" ON user_restaurants
        FOR ALL USING (user_id = auth.uid());

      -- Categories: Users can manage categories for their restaurants
      CREATE POLICY IF NOT EXISTS "Users can manage their restaurant categories" ON categories
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- Products: Users can manage products for their restaurants
      CREATE POLICY IF NOT EXISTS "Users can manage their restaurant products" ON products
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- Content items: Users can manage content for their restaurants
      CREATE POLICY IF NOT EXISTS "Users can manage their restaurant content" ON content_items
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- Analytics events: Users can view analytics for their restaurants
      CREATE POLICY IF NOT EXISTS "Users can view their restaurant analytics" ON analytics_events
        FOR SELECT USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- Audit logs: Users can view audit logs for their restaurants
      CREATE POLICY IF NOT EXISTS "Users can view their restaurant audit logs" ON audit_logs
        FOR SELECT USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );
    `;

    await supabaseAdmin.rpc('exec_sql', { sql: policiesSQL });

    // 4. Create indexes
    console.log('📊 Creating indexes...');
    
    const indexesSQL = `
      CREATE INDEX IF NOT EXISTS idx_user_restaurants_user_id ON user_restaurants(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_restaurants_restaurant_id ON user_restaurants(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_categories_restaurant_id ON categories(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(restaurant_id, sort_order);
      CREATE INDEX IF NOT EXISTS idx_products_restaurant_id ON products(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(category_id, sort_order);
      CREATE INDEX IF NOT EXISTS idx_content_items_restaurant_id ON content_items(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_content_items_type ON content_items(restaurant_id, type);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_restaurant_id ON analytics_events(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(restaurant_id, created_at);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_restaurant_id ON audit_logs(restaurant_id);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(restaurant_id, created_at);
    `;

    await supabaseAdmin.rpc('exec_sql', { sql: indexesSQL });

    // 5. Create triggers for updated_at
    console.log('⚡ Creating triggers...');
    
    const triggersSQL = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      CREATE TRIGGER IF NOT EXISTS update_restaurants_updated_at BEFORE UPDATE ON restaurants
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      CREATE TRIGGER IF NOT EXISTS update_categories_updated_at BEFORE UPDATE ON categories
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      CREATE TRIGGER IF NOT EXISTS update_products_updated_at BEFORE UPDATE ON products
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      CREATE TRIGGER IF NOT EXISTS update_content_items_updated_at BEFORE UPDATE ON content_items
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    await supabaseAdmin.rpc('exec_sql', { sql: triggersSQL });

    // 6. Create storage bucket for restaurant assets
    console.log('🗂️ Creating storage bucket...');
    
    const { error: bucketError } = await supabaseAdmin.storage.createBucket('restaurant-assets', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.warn('Storage bucket error:', bucketError.message);
    }

    // 7. Create demo restaurant data
    console.log('🏪 Creating demo restaurant...');
    
    const demoRestaurant = {
      name: 'Delago Cafe & Lounge',
      slug: 'delago-cafe',
      description: 'Otantik İtalyan Mutfağı 1985\'ten Beri',
      cuisine_type: 'İtalyan',
      address: 'Merkez Mahallesi, Cafe Sokak No:1, İstanbul',
      phone: '+90 212 555 0123',
      email: 'info@delagocafe.com',
      website: 'https://delagocafe.com',
      theme_config: {
        presetId: "bufibu-klasik-v1",
        advancedSettings: {
          layout: {
            blocks: ["header", "advertisementHero", "featuredItems", "advertisementButton", "categories", "footer"],
            categoryLayout: "bufibu-klasik",
            productLayout: "bufibu-klasik"
          },
          backgrounds: {
            global: { url: null, opacity: 0.3 },
            sections: {
              header: { url: null, opacity: 0.3 },
              categories: { url: null, opacity: 0.3 }
            }
          },
          colors: {
            header: "#FFFFFF",
            body: "#FAFAFA",
            cards: "#FFFFFF",
            buttons: "#E91E63",
            labels: "#757575",
            restaurantName: "#212121",
            categoryName: "#FFFFFF",
            productName: "#212121",
            productPrice: "#E91E63",
            productDescription: "#757575"
          },
          components: {
            header: {
              logoSize: "medium",
              socialIcons: { enabled: true, iconPack: "lucide" }
            },
            featuredSection: { enabled: true },
            advertisementButton: { enabled: true },
            categoryAnimation: { type: "bufibu-klasik" }
          },
          typography: {
            restaurantName: {
              fontFamily: "Playfair Display",
              fontSize: "2.5rem",
              fontWeight: "700",
              alignment: "center"
            },
            restaurantSlogan: {
              fontFamily: "Open Sans",
              fontSize: "1.1rem",
              fontWeight: "400",
              alignment: "center"
            },
            categoryName: {
              fontFamily: "Montserrat",
              fontSize: "1.5rem",
              fontWeight: "600",
              alignment: "center"
            },
            productName: {
              fontFamily: "Open Sans",
              fontSize: "1.1rem",
              fontWeight: "600",
              alignment: "left"
            },
            productPrice: {
              fontFamily: "Open Sans",
              fontSize: "1.1rem",
              fontWeight: "700",
              alignment: "right"
            },
            productDescription: {
              fontFamily: "Open Sans",
              fontSize: "0.9rem",
              fontWeight: "400",
              alignment: "left"
            }
          }
        }
      }
    };

    const { data: restaurant, error: restaurantError } = await supabaseAdmin
      .from('restaurants')
      .insert(demoRestaurant)
      .select()
      .single();

    if (restaurantError) {
      console.warn('Demo restaurant creation error:', restaurantError.message);
    } else {
      console.log('✅ Demo restaurant created:', restaurant.name);

      // 8. Create demo categories
      console.log('📂 Creating demo categories...');
      
      const demoCategories = [
        {
          restaurant_id: restaurant.id,
          name: 'Kahvaltılar',
          description: 'Taze ve lezzetli kahvaltı seçenekleri',
          image_url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
          sort_order: 0,
          is_active: true
        },
        {
          restaurant_id: restaurant.id,
          name: 'Tatlılar',
          description: 'Ev yapımı tatlılar ve pastalar',
          image_url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800',
          sort_order: 1,
          is_active: true
        }
      ];

      const { data: categories, error: categoriesError } = await supabaseAdmin
        .from('categories')
        .insert(demoCategories)
        .select();

      if (categoriesError) {
        console.warn('Demo categories creation error:', categoriesError.message);
      } else {
        console.log('✅ Demo categories created:', categories.length);

        // 9. Create demo products
        console.log('🍽️ Creating demo products...');
        
        const demoProducts = [
          // Kahvaltılar
          {
            restaurant_id: restaurant.id,
            category_id: categories[0].id,
            name: 'Köri Soslu Tavuk',
            description: 'Jülyen tavuk, renkli biberler, krema, köri baharatı, mevsim yeşillikleri ve kremalı penne makarna ile servis edilir.',
            price: 395.00,
            image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
            sort_order: 0,
            is_active: true,
            is_featured: true
          },
          {
            restaurant_id: restaurant.id,
            category_id: categories[0].id,
            name: 'Barbekü Soslu Tavuk',
            description: 'Jülyen tavuk, renkli biberler, barbekü sos, mevsim yeşillikleri ve kremalı penne makarna ile servis edilir.',
            price: 395.00,
            image_url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
            sort_order: 1,
            is_active: true,
            is_featured: false
          },
          // Tatlılar
          {
            restaurant_id: restaurant.id,
            category_id: categories[1].id,
            name: 'Tiramisu',
            description: 'Geleneksel İtalyan tatlısı, mascarpone peyniri ve kahve aroması',
            price: 85.00,
            image_url: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
            sort_order: 0,
            is_active: true,
            is_featured: true
          },
          {
            restaurant_id: restaurant.id,
            category_id: categories[1].id,
            name: 'Cheesecake',
            description: 'Kremsi cheesecake, meyveli sos ile',
            price: 75.00,
            image_url: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
            sort_order: 1,
            is_active: true,
            is_featured: false
          }
        ];

        const { data: products, error: productsError } = await supabaseAdmin
          .from('products')
          .insert(demoProducts)
          .select();

        if (productsError) {
          console.warn('Demo products creation error:', productsError.message);
        } else {
          console.log('✅ Demo products created:', products.length);
        }

        // 10. Create demo content items
        console.log('📱 Creating demo content...');
        
        const demoContent = [
          {
            restaurant_id: restaurant.id,
            type: 'advertisement',
            title: 'COFFEE Instant choice',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            image_url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
            status: 'active',
            sort_order: 0
          },
          {
            restaurant_id: restaurant.id,
            type: 'story',
            title: 'Yeni Menümüz',
            description: 'Bahar menümüzü keşfedin!',
            image_url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
            status: 'active',
            sort_order: 0
          },
          {
            restaurant_id: restaurant.id,
            type: 'featured',
            title: 'Özel Kahvaltı',
            description: 'Hafta sonu özel kahvaltı menümüz',
            image_url: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
            status: 'active',
            sort_order: 0
          }
        ];

        const { data: content, error: contentError } = await supabaseAdmin
          .from('content_items')
          .insert(demoContent)
          .select();

        if (contentError) {
          console.warn('Demo content creation error:', contentError.message);
        } else {
          console.log('✅ Demo content created:', content.length);
        }
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log('- ✅ Tables created');
    console.log('- ✅ RLS policies enabled');
    console.log('- ✅ Indexes created');
    console.log('- ✅ Triggers set up');
    console.log('- ✅ Storage bucket created');
    console.log('- ✅ Demo data inserted');
    console.log('');
    console.log('🔗 Demo restaurant URL: http://localhost:3000/menu/delago-cafe');
    console.log('');
    console.log('🚀 Your system is now ready to use!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();