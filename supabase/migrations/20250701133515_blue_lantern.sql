/*
  # Manual Database Setup for SayNDone
  
  Copy and paste this entire SQL script into your Supabase SQL Editor
  and run it to create all the necessary tables.
*/

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