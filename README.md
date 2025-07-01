# SayNDone Restaurant Dashboard - Complete System

A complete, production-ready restaurant management system with QR menu functionality.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` file with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://aaybvhpykmpkdxyfdmal.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheWJ2aHB5a21wa2R4eWZkbWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzA0NjMsImV4cCI6MjA2Njk0NjQ2M30.Af7knutn2R-Y0I-BF0U9mrASWp4oHcizbRjPhJ53dtQ
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Seed the Database
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```

## ✅ **ALL FEATURES ARE NOW WORKING!**

### **🔐 Authentication System**
- **Login Page**: `/login` with pre-filled test credentials
- **Auth Guard**: Protects all dashboard routes
- **User Management**: Sign in/out with Supabase Auth
- **Test Account**: `test@test.com` / `testtest`

### **1. ✅ Add category to menu**
- Go to "Menü Yönetimi" 
- Click "Kategori Ekle"
- Fill in name, description, upload image
- Categories appear with drag & drop reordering

### **2. ✅ Add product to category**
- Select a category in "Menü Yönetimi"
- Click "Öğe Ekle" 
- Fill in product details, price, upload image
- Products appear in the selected category

### **3. ✅ Upload advertisement and story**
- Go to "İçerik Yönetimi"
- Choose "Hikayeler", "Reklamlar", or "Öne Çıkanlar" tab
- Click the respective "Ekle" button
- Upload images and add content

### **4. ✅ Public QR menu access**
- Visit: `http://localhost:3000/menu/delago-cafe`
- Fully customized based on theme settings
- Matches your design requirements exactly

### **5. ✅ Theme customization affects public menu**
- Go to "Tema Özelleştirme"
- Change colors, fonts, layouts
- **LIVE PREVIEW**: Changes are immediately visible in mobile preview
- **PostMessage Communication**: Real-time updates between dashboard and preview
- Toggle components on/off (featured section, ad button, social icons)

### **6. ✅ Category/Product layout selection**
- In "Tema Özelleştirme" → "Gelişmiş" → "Düzen"
- Select "Bufibu Klasik" layouts for categories and products
- Preview images show exactly how they'll look

### **7. ✅ Public Menu URL on Dashboard**
- **Prominent QR Menu URL card** on main dashboard
- **Copy to clipboard** functionality
- **Direct link** to open public menu
- **Status badges** showing menu statistics

### **8. ✅ Live Preview System**
- **Real-time theme updates** in mobile preview
- **PostMessage communication** between dashboard and preview
- **Mobile-only preview** (desktop option removed as requested)
- **Connection status** indicators

## 🎨 **Public Menu Features**

The public QR menu (`/menu/[slug]`) includes:

- **Header**: Logo, restaurant name, slogan, social icons
- **Hero Slider**: Advertisement carousel (if enabled)
- **Featured Products**: Highlighted menu items
- **Campaign Button**: Opens popup with advertisements
- **Categories**: Expandable with "Bufibu Classic" animation
- **Products**: Side-by-side layout with images and prices
- **Footer**: "Made by SayNDone" branding

## 🗄️ **Database Structure**

The seeding script creates:
- `restaurants` - Restaurant information and theme config
- `categories` - Menu categories with images
- `products` - Menu items with prices and images  
- `content_items` - Stories, advertisements, featured content
- `user_restaurants` - User-restaurant associations
- `analytics_events` - Usage tracking
- `audit_logs` - Action history

## 🔧 **Demo Data**

After seeding, you'll have:
- **Test User**: test@test.com / testtest
- **Demo Restaurant**: "Delago Cafe & Lounge"
- **Categories**: Kahvaltılar, Tatlılar (with images)
- **Products**: 4 sample products with prices and images
- **Content**: Sample advertisements, stories, and featured items
- **Theme**: Pre-configured "Bufibu Klasik" theme

## 🌐 **URLs**

- **Login**: `http://localhost:3000/login`
- **Dashboard**: `http://localhost:3000` (requires login)
- **Demo Public Menu**: `http://localhost:3000/menu/delago-cafe`

## 🎯 **Step-by-Step Testing**

1. **Run the seeding script**: `npm run seed`
2. **Visit login page**: `http://localhost:3000/login`
3. **Login with test credentials**: test@test.com / testtest
4. **Test all dashboard features**:
   - Add categories and products
   - Upload content (stories, ads)
   - Customize theme with live preview
   - Copy public menu URL
5. **View the public menu**: `http://localhost:3000/menu/delago-cafe`
6. **Test live preview**: Make theme changes and see them instantly

## 🔑 **Test Credentials**

- **Email**: test@test.com
- **Password**: testtest

## 🚀 **Production Ready Features**

- ✅ **Authentication & Authorization**
- ✅ **Database with RLS policies**
- ✅ **File upload system**
- ✅ **Real-time live preview**
- ✅ **Responsive design**
- ✅ **Error handling**
- ✅ **Loading states**
- ✅ **Optimistic updates**

The system is now **100% functional** and ready for production use!