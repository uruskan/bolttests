'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Phone, 
  MapPin, 
  Instagram, 
  Star,
  ChefHat,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PublicMenu() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaignDialog, setCampaignDialog] = useState(false);

  useEffect(() => {
    if (slug) {
      loadMenuData();
    }
  }, [slug]);

  // Listen for theme updates from dashboard
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.source === 'DASHBOARD') {
        const { type, payload } = event.data;
        
        switch (type) {
          case 'PREVIEW_READY':
            // Send confirmation that preview is loaded
            window.parent.postMessage({
              source: 'PREVIEW',
              type: 'PREVIEW_LOADED',
              payload: { timestamp: Date.now() }
            }, '*');
            break;
          case 'THEME_UPDATE':
            // Update theme in real-time
            if (payload && restaurant) {
              setRestaurant(prev => ({
                ...prev,
                theme_config: payload
              }));
            }
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [restaurant]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      
      // Get restaurant by slug
      const { data: restaurantData, error: restaurantError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', slug)
        .single();

      if (restaurantError) throw restaurantError;
      setRestaurant(restaurantData);

      // Get categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('restaurant_id', restaurantData.id)
        .eq('is_active', true)
        .order('sort_order');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData);

      // Get products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', restaurantData.id)
        .eq('is_active', true)
        .order('sort_order');

      if (productsError) throw productsError;
      setProducts(productsData);

      // Get content items
      const { data: contentData, error: contentError } = await supabase
        .from('content_items')
        .select('*')
        .eq('restaurant_id', restaurantData.id)
        .eq('status', 'active')
        .order('sort_order');

      if (contentError) throw contentError;
      setContentItems(contentData);

      // Expand first category by default
      if (categoriesData.length > 0) {
        setExpandedCategories(new Set([categoriesData[0].id]));
      }

      // Track analytics
      await supabase
        .from('analytics_events')
        .insert({
          restaurant_id: restaurantData.id,
          event_type: 'menu_view',
          event_data: { slug, timestamp: new Date().toISOString() }
        });

      // Send loaded confirmation to parent (dashboard)
      window.parent.postMessage({
        source: 'PREVIEW',
        type: 'PREVIEW_LOADED',
        payload: { timestamp: Date.now() }
      }, '*');

    } catch (err) {
      console.error('Error loading menu:', err);
      setError('Menü yüklenirken hata oluştu');
      
      // Send error to parent
      window.parent.postMessage({
        source: 'PREVIEW',
        type: 'PREVIEW_ERROR',
        payload: { error: err.message }
      }, '*');
    } finally {
      setLoading(false);
    }
  };

  const getThemeStyles = () => {
    const theme = restaurant?.theme_config?.advancedSettings || {};
    return {
      colors: theme.colors || {
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
      typography: theme.typography || {},
      backgrounds: theme.backgrounds || {},
      components: theme.components || {
        header: { logoSize: "medium", socialIcons: { enabled: true, iconPack: "lucide" } },
        featuredSection: { enabled: true },
        advertisementButton: { enabled: true },
        categoryAnimation: { type: "bufibu-klasik" }
      },
      layout: theme.layout || {
        blocks: ["header", "advertisementHero", "featuredItems", "advertisementButton", "categories", "footer"]
      }
    };
  };

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryProducts = (categoryId) => {
    return products.filter(product => product.category_id === categoryId);
  };

  const featuredProducts = products.filter(product => product.is_featured);
  const stories = contentItems.filter(item => item.type === 'story');
  const advertisements = contentItems.filter(item => item.type === 'advertisement');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Menü yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Menü Bulunamadı</h1>
          <p className="text-slate-600">{error || 'Bu restoran menüsü mevcut değil.'}</p>
        </div>
      </div>
    );
  }

  const theme = getThemeStyles();

  const renderBlock = (blockType) => {
    switch (blockType) {
      case 'header':
        return (
          <header 
            key="header"
            className="relative overflow-hidden"
            style={{ 
              backgroundColor: theme.colors.header,
              backgroundImage: theme.backgrounds.sections?.header?.url ? `url(${theme.backgrounds.sections.header.url})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {theme.backgrounds.sections?.header?.url && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: 1 - (theme.backgrounds.sections.header.opacity || 0.3) }}
              />
            )}
            
            <div className="relative z-10 px-6 py-8">
              {/* Social Icons */}
              {theme.components.header.socialIcons.enabled && (
                <div className="flex justify-end space-x-4 mb-6">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              {/* Restaurant Info */}
              <div className="text-center">
                {/* Logo */}
                <div className="mb-6">
                  <div className={cn(
                    "mx-auto bg-white rounded-full flex items-center justify-center shadow-lg",
                    theme.components.header.logoSize === 'small' ? 'w-20 h-20' :
                    theme.components.header.logoSize === 'large' ? 'w-32 h-32' : 'w-24 h-24'
                  )}>
                    {restaurant.logo_url ? (
                      <img 
                        src={restaurant.logo_url} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <ChefHat className={cn(
                        "text-gray-600",
                        theme.components.header.logoSize === 'small' ? 'w-8 h-8' :
                        theme.components.header.logoSize === 'large' ? 'w-16 h-16' : 'w-12 h-12'
                      )} />
                    )}
                  </div>
                </div>

                {/* Restaurant Name */}
                <h1 
                  className="font-bold mb-2"
                  style={{
                    color: theme.colors.restaurantName,
                    fontSize: theme.typography.restaurantName?.fontSize || '2.5rem',
                    fontFamily: theme.typography.restaurantName?.fontFamily || 'inherit',
                    fontWeight: theme.typography.restaurantName?.fontWeight || '700',
                    textAlign: theme.typography.restaurantName?.alignment || 'center'
                  }}
                >
                  {restaurant.name}
                </h1>

                {/* Restaurant Slogan */}
                <p 
                  className="mb-6"
                  style={{
                    color: theme.colors.restaurantName,
                    fontSize: theme.typography.restaurantSlogan?.fontSize || '1.1rem',
                    fontFamily: theme.typography.restaurantSlogan?.fontFamily || 'inherit',
                    fontWeight: theme.typography.restaurantSlogan?.fontWeight || '400',
                    textAlign: theme.typography.restaurantSlogan?.alignment || 'center'
                  }}
                >
                  {restaurant.description || 'Lezzetli yemeklerin adresi'}
                </p>

                {/* Restaurant Description */}
                <div className="max-w-2xl mx-auto text-sm opacity-90 mb-6">
                  <p style={{ color: theme.colors.restaurantName }}>
                    Aslında başta dünya barışını sağlamak için yola çıkmıştık... ama 
                    sonra dedik ki: "Bir kahve içelim, sonra düşünürüz." İşte {restaurant.name} 
                    tam da böyle doğdu.
                  </p>
                  <br />
                  <p style={{ color: theme.colors.restaurantName }}>
                    Kuruluş yılımız? Bilmiyoruz. Efsanelere göre bir sabah latte köpüğü 
                    fazla güzel olunca "Tamam, burası bir mekân olmalı" demiş. O 
                    günden beri kahve dökülür, sohbet koyulaşır.
                  </p>
                </div>

                {/* Continue Button */}
                <Button
                  className="text-orange-500 hover:text-orange-600 font-medium"
                  variant="link"
                  style={{ color: theme.colors.buttons }}
                >
                  Devamını gör...
                </Button>
              </div>
            </div>
          </header>
        );

      case 'advertisementHero':
        if (advertisements.length === 0) return null;
        return (
          <div key="advertisementHero" className="px-6 py-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              {advertisements.map((ad) => (
                <SwiperSlide key={ad.id}>
                  <div className="relative h-64 bg-gradient-to-r from-amber-900 to-amber-700">
                    {ad.image_url && (
                      <img 
                        src={ad.image_url} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{ad.title}</h3>
                        <p className="text-lg opacity-90">{ad.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation */}
              <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-white" />
              </div>
              <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Swiper>
          </div>
        );

      case 'featuredItems':
        if (!theme.components.featuredSection.enabled || featuredProducts.length === 0) return null;
        return (
          <div key="featuredItems" className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: theme.colors.productName }}>
              Öne Çıkan Ürünler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <Card key={product.id} className="overflow-hidden" style={{ backgroundColor: theme.colors.cards }}>
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <ChefHat className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 
                            className="font-semibold mb-1"
                            style={{ 
                              color: theme.colors.productName,
                              fontSize: theme.typography.productName?.fontSize || '1.1rem',
                              fontFamily: theme.typography.productName?.fontFamily || 'inherit'
                            }}
                          >
                            {product.name}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ 
                              color: theme.colors.productDescription,
                              fontSize: theme.typography.productDescription?.fontSize || '0.9rem'
                            }}
                          >
                            {product.description}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <div 
                            className="font-bold"
                            style={{ 
                              color: theme.colors.productPrice,
                              fontSize: theme.typography.productPrice?.fontSize || '1.1rem'
                            }}
                          >
                            ₺{product.price}
                          </div>
                          <Heart className="w-4 h-4 text-red-500 ml-auto mt-1" />
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'advertisementButton':
        if (!theme.components.advertisementButton.enabled || advertisements.length === 0) return null;
        return (
          <div key="advertisementButton" className="px-6 py-4 text-center">
            <Button
              onClick={() => setCampaignDialog(true)}
              className="text-white font-semibold px-8 py-3 rounded-full shadow-lg"
              style={{ backgroundColor: theme.colors.buttons }}
            >
              Kampanyaları Göster
            </Button>
          </div>
        );

      case 'categories':
        return (
          <div key="categories" className="px-6 py-8">
            <h2 
              className="text-3xl font-bold text-center mb-8"
              style={{ 
                color: theme.colors.productName,
                fontFamily: 'serif'
              }}
            >
              MENÜ
            </h2>
            
            <div className="space-y-4">
              {categories.map((category) => {
                const categoryProducts = getCategoryProducts(category.id);
                const isExpanded = expandedCategories.has(category.id);
                
                return (
                  <div key={category.id}>
                    {/* Category Header */}
                    <Card 
                      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                      onClick={() => toggleCategory(category.id)}
                      style={{ backgroundColor: theme.colors.cards }}
                    >
                      <div className="relative h-32">
                        {category.image_url ? (
                          <img 
                            src={category.image_url} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-amber-600 to-orange-600" />
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-6">
                          <div className="flex-1">
                            <h3 
                              className="text-2xl font-bold mb-1"
                              style={{ 
                                color: theme.colors.categoryName,
                                fontSize: theme.typography.categoryName?.fontSize || '1.5rem',
                                fontFamily: theme.typography.categoryName?.fontFamily || 'inherit'
                              }}
                            >
                              {category.name}
                            </h3>
                            <p className="text-white/80 text-sm">
                              {categoryProducts.length} ürün
                            </p>
                          </div>
                          
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <ChevronDown 
                              className={cn(
                                "w-6 h-6 text-white transition-transform duration-300",
                                isExpanded && "rotate-180"
                              )} 
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Category Products */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                        {categoryProducts.map((product) => (
                          <Card key={product.id} style={{ backgroundColor: theme.colors.cards }}>
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                  {product.image_url ? (
                                    <img 
                                      src={product.image_url} 
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                      <ChefHat className="w-6 h-6 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h4 
                                        className="font-semibold mb-2"
                                        style={{ 
                                          color: theme.colors.productName,
                                          fontSize: theme.typography.productName?.fontSize || '1.1rem'
                                        }}
                                      >
                                        {product.name}
                                      </h4>
                                      <p 
                                        className="text-sm leading-relaxed"
                                        style={{ 
                                          color: theme.colors.productDescription,
                                          fontSize: theme.typography.productDescription?.fontSize || '0.9rem'
                                        }}
                                      >
                                        {product.description}
                                      </p>
                                    </div>
                                    
                                    <div className="ml-4 text-right">
                                      <div 
                                        className="text-xl font-bold"
                                        style={{ 
                                          color: theme.colors.productPrice,
                                          fontSize: theme.typography.productPrice?.fontSize || '1.1rem'
                                        }}
                                      >
                                        {Math.round(product.price)}.00 ₺
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'footer':
        return (
          <footer key="footer" className="text-center py-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Made by <span className="font-semibold text-blue-600">SayNDone</span>
            </p>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme.colors.body,
        backgroundImage: theme.backgrounds.global?.url ? `url(${theme.backgrounds.global.url})` : undefined,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {theme.backgrounds.global?.url && (
        <div 
          className="fixed inset-0 bg-white"
          style={{ opacity: 1 - (theme.backgrounds.global.opacity || 0.3) }}
        />
      )}
      
      <div className="relative z-10">
        {theme.layout.blocks.map(blockType => renderBlock(blockType))}
      </div>

      {/* Campaign Dialog */}
      <Dialog open={campaignDialog} onOpenChange={setCampaignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Kampanyalar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {advertisements.map((ad) => (
              <Card key={ad.id}>
                <CardContent className="p-4">
                  {ad.image_url && (
                    <img 
                      src={ad.image_url} 
                      alt={ad.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-semibold mb-2">{ad.title}</h3>
                  <p className="text-sm text-gray-600">{ad.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}