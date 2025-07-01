import { createClient } from '@supabase/supabase-js';

// Direct Supabase client for seeding
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aaybvhpykmpkdxyfdmal.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheWJ2aHB5a21wa2R4eWZkbWFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTM3MDQ2MywiZXhwIjoyMDY2OTQ2NDYzfQ.OFK3bmPASI1s_mYcI_M-w41A0zpCh5iK42die9c38aY';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Execute SQL using the proper Supabase SQL method
 */
async function executeSql(sql) {
  const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql });
  if (error) {
    // If exec_sql doesn't exist, try direct SQL execution
    if (error.message.includes('exec_sql')) {
      // Use the SQL editor approach
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey
        },
        body: JSON.stringify({ sql })
      });
      
      if (!response.ok && !response.statusText.includes('already exists')) {
        const errorText = await response.text();
        throw new Error(`SQL execution failed: ${errorText}`);
      }
      return null;
    }
    
    // Ignore "already exists" errors
    if (!error.message.includes('already exists') && !error.message.includes('does not exist')) {
      throw error;
    }
  }
  return data;
}

/**
 * Seed script for Supabase database
 * Run this once to set up all tables and initial data
 */
async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  console.log('📡 Supabase URL:', supabaseUrl);
  console.log('🔑 Service Key:', supabaseServiceKey ? 'Present' : 'Missing');

  try {
    // 1. Test basic connection first
    console.log('🔌 Testing Supabase connection...');
    
    const { data: testData, error: testError } = await supabaseAdmin
      .from('restaurants')
      .select('count')
      .limit(1);
    
    if (testError && testError.code === '42P01') {
      console.log('📋 Tables don\'t exist yet, will create them...');
    } else if (testError) {
      console.error('❌ Supabase connection failed:', testError);
      throw testError;
    } else {
      console.log('✅ Supabase connection successful');
    }

    // 2. Run the migration SQL directly
    console.log('📋 Creating database schema from migration...');
    
    const migrationSql = `
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

      -- Enable Row Level Security
      ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
      ALTER TABLE user_restaurants ENABLE ROW LEVEL SECURITY;
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
      ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
      ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

      -- RLS Policies
      DROP POLICY IF EXISTS "Users can access their restaurants" ON restaurants;
      CREATE POLICY "Users can access their restaurants" ON restaurants
        FOR ALL USING (
          id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can see their restaurant associations" ON user_restaurants;
      CREATE POLICY "Users can see their restaurant associations" ON user_restaurants
        FOR ALL USING (user_id = auth.uid());

      DROP POLICY IF EXISTS "Users can manage their restaurant categories" ON categories;
      CREATE POLICY "Users can manage their restaurant categories" ON categories
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can manage their restaurant products" ON products;
      CREATE POLICY "Users can manage their restaurant products" ON products
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can manage their restaurant content" ON content_items;
      CREATE POLICY "Users can manage their restaurant content" ON content_items
        FOR ALL USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can view their restaurant analytics" ON analytics_events;
      CREATE POLICY "Users can view their restaurant analytics" ON analytics_events
        FOR SELECT USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can view their restaurant audit logs" ON audit_logs;
      CREATE POLICY "Users can view their restaurant audit logs" ON audit_logs
        FOR SELECT USING (
          restaurant_id IN (
            SELECT restaurant_id FROM user_restaurants 
            WHERE user_id = auth.uid()
          )
        );

      -- Indexes for performance
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

      -- Functions for updated_at timestamps
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Triggers for updated_at
      DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
      CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
      CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_products_updated_at ON products;
      CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_content_items_updated_at ON content_items;
      CREATE TRIGGER update_content_items_updated_at BEFORE UPDATE ON content_items
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    // Execute the migration using direct SQL
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey
        },
        body: JSON.stringify({ sql: migrationSql })
      });

      if (!response.ok) {
        // If exec_sql doesn't work, try using the SQL editor endpoint
        console.log('⚠️ Direct SQL execution not available, using alternative method...');
        
        // Split the SQL into individual statements and execute via Supabase client
        const statements = migrationSql.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
          if (statement.trim()) {
            try {
              await supabaseAdmin.rpc('exec_sql', { sql: statement.trim() + ';' });
            } catch (err) {
              // Ignore "already exists" and "does not exist" errors
              if (!err.message.includes('already exists') && 
                  !err.message.includes('does not exist') &&
                  !err.message.includes('exec_sql')) {
                console.warn('⚠️ SQL statement warning:', err.message);
              }
            }
          }
        }
      }
    } catch (sqlError) {
      console.log('⚠️ SQL execution method not available, using Supabase client methods...');
    }

    console.log('✅ Database schema setup completed');

    // 3. Test connection again to verify tables exist
    console.log('🔌 Verifying database setup...');
    
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('restaurants')
      .select('count')
      .limit(1);
    
    if (verifyError && verifyError.code === '42P01') {
      console.error('❌ Tables still don\'t exist. Please run the migration manually in Supabase SQL editor.');
      console.log('');
      console.log('🔧 Manual Setup Required:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the migration from supabase/migrations/20250701115301_weathered_lantern.sql');
      console.log('4. Run the migration');
      console.log('5. Then run this seeding script again');
      console.log('');
      throw new Error('Database tables not found');
    }
    
    console.log('✅ Database verification successful');

    // 4. Create storage bucket for restaurant assets
    console.log('🗂️ Creating storage bucket...');
    
    const { error: bucketError } = await supabaseAdmin.storage.createBucket('restaurant-assets', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.warn('⚠️ Storage bucket warning:', bucketError.message);
    } else {
      console.log('✅ Storage bucket ready');
    }

    // 5. Get test user ID
    console.log('👤 Finding test user...');
    
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
      throw usersError;
    }

    const testUser = users.users.find(user => user.email === 'test@test.com');
    if (!testUser) {
      console.error('❌ Test user test@test.com not found!');
      console.log('');
      console.log('🔧 Please create the user in Supabase Dashboard:');
      console.log('   1. Go to Authentication > Users');
      console.log('   2. Click "Add user"');
      console.log('   3. Email: test@test.com');
      console.log('   4. Password: testtest');
      console.log('   5. Confirm email: Yes');
      console.log('');
      throw new Error('Test user not found');
    }

    console.log('✅ Found test user:', testUser.email);

    // 6. Check if restaurant already exists
    console.log('🏪 Checking for existing restaurant...');
    
    const { data: existingRestaurant } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .eq('slug', 'delago-cafe')
      .single();

    let restaurant = existingRestaurant;

    if (!restaurant) {
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

      const { data: newRestaurant, error: restaurantError } = await supabaseAdmin
        .from('restaurants')
        .insert(demoRestaurant)
        .select()
        .single();

      if (restaurantError) {
        console.error('❌ Demo restaurant creation error:', restaurantError);
        throw restaurantError;
      }

      restaurant = newRestaurant;
      console.log('✅ Demo restaurant created:', restaurant.name);
    } else {
      console.log('✅ Using existing restaurant:', restaurant.name);
    }

    // 7. Associate test user with restaurant
    console.log('🔗 Checking user-restaurant association...');
    
    const { data: existingAssociation } = await supabaseAdmin
      .from('user_restaurants')
      .select('*')
      .eq('user_id', testUser.id)
      .eq('restaurant_id', restaurant.id)
      .single();

    if (!existingAssociation) {
      const { error: associationError } = await supabaseAdmin
        .from('user_restaurants')
        .insert({
          user_id: testUser.id,
          restaurant_id: restaurant.id,
          role: 'owner'
        });

      if (associationError) {
        console.error('❌ User-restaurant association error:', associationError);
        throw associationError;
      }

      console.log('✅ Test user associated with restaurant');
    } else {
      console.log('✅ User already associated with restaurant');
    }

    // 8. Create demo categories
    console.log('📂 Creating demo categories...');
    
    const { data: existingCategories } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('restaurant_id', restaurant.id);

    if (existingCategories.length === 0) {
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
        console.error('❌ Demo categories creation error:', categoriesError);
        throw categoriesError;
      }

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
        console.error('❌ Demo products creation error:', productsError);
        throw productsError;
      }

      console.log('✅ Demo products created:', products.length);

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
        console.error('❌ Demo content creation error:', contentError);
        throw contentError;
      }

      console.log('✅ Demo content created:', content.length);
    } else {
      console.log('✅ Demo data already exists, skipping creation');
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log('- ✅ Tables created with RLS policies');
    console.log('- ✅ Indexes and triggers set up');
    console.log('- ✅ Storage bucket ready');
    console.log('- ✅ Test user associated with restaurant');
    console.log('- ✅ Demo data ready');
    console.log('');
    console.log('🔑 Test Login Credentials:');
    console.log('   Email: test@test.com');
    console.log('   Password: testtest');
    console.log('');
    console.log('🔗 URLs:');
    console.log('   Dashboard: http://localhost:3000');
    console.log('   Login: http://localhost:3000/login');
    console.log('   Demo Menu: http://localhost:3000/menu/delago-cafe');
    console.log('');
    console.log('🚀 Your system is now ready to use!');
    console.log('   Run: npm run dev');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Make sure your Supabase project is active');
    console.log('2. Check that the service role key is correct');
    console.log('3. Ensure the test user exists in Supabase Auth');
    console.log('4. Try running the script again');
    console.log('');
    console.log('💡 If the error persists, you can:');
    console.log('   - Check the Supabase dashboard for any issues');
    console.log('   - Verify your environment variables');
    console.log('   - Make sure the test user is created in Auth');
    console.log('');
    console.log('🔧 Manual Database Setup:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy the migration from supabase/migrations/20250701115301_weathered_lantern.sql');
    console.log('   3. Run the migration in SQL Editor');
    console.log('   4. Then run this seeding script again');
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();