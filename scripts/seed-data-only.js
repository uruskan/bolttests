import { createClient } from '@supabase/supabase-js';

// Direct Supabase client for seeding
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aaybvhpykmpkdxyfdmal.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheWJ2aHB5a21wa2R4eWZkbWFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTM3MDQ2MywiZXhwIjoyMDY2OTQ2NDYzfQ.OFK3bmPASI1s_mYcI_M-w41A0zpCh5iK42die9c38aY';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Simplified seeding script that only adds demo data
 * Assumes tables already exist
 */
async function seedDataOnly() {
  console.log('🌱 Starting data seeding...');
  console.log('📡 Supabase URL:', supabaseUrl);

  try {
    // 1. Test connection
    console.log('🔌 Testing database connection...');
    
    const { data: testData, error: testError } = await supabaseAdmin
      .from('restaurants')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError);
      console.log('');
      console.log('🔧 Please run the manual table creation first:');
      console.log('1. Go to your Supabase Dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the SQL from scripts/create-tables-manually.sql');
      console.log('4. Run the SQL script');
      console.log('5. Then run this seeding script again');
      throw testError;
    }

    console.log('✅ Database connection successful');

    // 2. Get test user
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
      throw new Error('Test user not found');
    }

    console.log('✅ Found test user:', testUser.email);

    // 3. Create or get restaurant
    console.log('🏪 Setting up demo restaurant...');
    
    const { data: existingRestaurant } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .eq('slug', 'delago-cafe')
      .single();

    let restaurant = existingRestaurant;

    if (!restaurant) {
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
        console.error('❌ Restaurant creation error:', restaurantError);
        throw restaurantError;
      }

      restaurant = newRestaurant;
      console.log('✅ Demo restaurant created:', restaurant.name);
    } else {
      console.log('✅ Using existing restaurant:', restaurant.name);
    }

    // 4. Associate user with restaurant
    console.log('🔗 Setting up user association...');
    
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
        console.error('❌ User association error:', associationError);
        throw associationError;
      }

      console.log('✅ User associated with restaurant');
    } else {
      console.log('✅ User already associated');
    }

    // 5. Create demo categories
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
        console.error('❌ Categories creation error:', categoriesError);
        throw categoriesError;
      }

      console.log('✅ Demo categories created:', categories.length);

      // 6. Create demo products
      console.log('🍽️ Creating demo products...');
      
      const demoProducts = [
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
        console.error('❌ Products creation error:', productsError);
        throw productsError;
      }

      console.log('✅ Demo products created:', products.length);

      // 7. Create demo content
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
        console.error('❌ Content creation error:', contentError);
        throw contentError;
      }

      console.log('✅ Demo content created:', content.length);
    } else {
      console.log('✅ Demo data already exists');
    }

    // 8. Create storage bucket
    console.log('🗂️ Setting up storage...');
    
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

    console.log('');
    console.log('🎉 Data seeding completed successfully!');
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
    console.log('🚀 Your system is now ready!');
    console.log('   Run: npm run dev');

  } catch (error) {
    console.error('❌ Data seeding failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Make sure you ran the table creation SQL first');
    console.log('2. Check that the test user exists in Supabase Auth');
    console.log('3. Verify your environment variables');
    process.exit(1);
  }
}

// Run the seeding
seedDataOnly();