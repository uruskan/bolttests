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
  Heart,
  Share2,
  ExternalLink,
  Globe,
  Mail,
  Award,
  Sparkles,
  Timer,
  Users,
  Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Loading Component
function MenuLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-6"></div>
          <ChefHat className="w-8 h-8 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Menü Hazırlanıyor</h2>
        <p className="text-amber-700">Lezzetli deneyiminiz için hazırlık yapıyoruz...</p>
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Error Component
function MenuError({ error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ChefHat className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-red-900 mb-4">Menü Bulunamadı</h1>
        <p className="text-red-700 mb-6">{error || 'Bu restoran menüsü şu anda mevcut değil.'}</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">
            Lütfen QR kodu tekrar tarayın veya restoran ile iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}

// Floating Action Button
function FloatingActions({ onShare, onCall, restaurant }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={cn(
        "flex flex-col-reverse space-y-reverse space-y-3 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {restaurant?.phone && (
          <Button
            onClick={onCall}
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            <Phone className="w-5 h-5" />
          </Button>
        )}
        <Button
          onClick={onShare}
          className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-xl transition-transform duration-300",
          isOpen && "rotate-45"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </Button>
    </div>
  );
}

// Product Detail Modal
function ProductDetailModal({ product, isOpen, onClose, theme }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold" style={{ color: theme.colors.productName }}>
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {product.image_url && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-gray-600">15-20 dk</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-gray-600">1-2 kişilik</span>
            </div>
            <div className="flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-gray-600">Ana yemek</span>
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Fiyat</span>
              <span 
                className="text-2xl font-bold"
                style={{ color: theme.colors.productPrice }}
              >
                ₺{Math.round(product.price)}
              </span>
            </div>
          </div>
          
          {product.is_featured && (
            <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-3">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">Şef Önerisi</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);

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
            window.parent.postMessage({
              source: 'PREVIEW',
              type: 'PREVIEW_LOADED',
              payload: { timestamp: Date.now() }
            }, '*');
            break;
          case 'THEME_UPDATE':
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: `${restaurant.name} - ${restaurant.description}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const handleCall = () => {
    if (restaurant?.phone) {
      window.location.href = `tel:${restaurant.phone}`;
    }
  };

  const featuredProducts = products.filter(product => product.is_featured);
  const stories = contentItems.filter(item => item.type === 'story');
  const advertisements = contentItems.filter(item => item.type === 'advertisement');

  if (loading) {
    return <MenuLoader />;
  }

  if (error || !restaurant) {
    return <MenuError error={error} />;
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
            
            <div className="relative z-10 px-6 py-12">
              {/* Social Icons */}
              {theme.components.header.socialIcons.enabled && (
                <div className="flex justify-end space-x-3 mb-8">
                  {restaurant.phone && (
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {restaurant.address && (
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  {restaurant.website && (
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Restaurant Info */}
              <div className="text-center">
                {/* Logo */}
                <div className="mb-8">
                  <div className={cn(
                    "mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20",
                    theme.components.header.logoSize === 'small' ? 'w-24 h-24' :
                    theme.components.header.logoSize === 'large' ? 'w-40 h-40' : 'w-32 h-32'
                  )}>
                    {restaurant.logo_url ? (
                      <img 
                        src={restaurant.logo_url} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <ChefHat className={cn(
                        "text-amber-600",
                        theme.components.header.logoSize === 'small' ? 'w-10 h-10' :
                        theme.components.header.logoSize === 'large' ? 'w-20 h-20' : 'w-16 h-16'
                      )} />
                    )}
                  </div>
                </div>

                {/* Restaurant Name */}
                <h1 
                  className="font-bold mb-3 drop-shadow-lg"
                  style={{
                    color: theme.colors.restaurantName,
                    fontSize: theme.typography.restaurantName?.fontSize || '3rem',
                    fontFamily: theme.typography.restaurantName?.fontFamily || 'serif',
                    fontWeight: theme.typography.restaurantName?.fontWeight || '700',
                    textAlign: theme.typography.restaurantName?.alignment || 'center'
                  }}
                >
                  {restaurant.name}
                </h1>

                {/* Restaurant Slogan */}
                <p 
                  className="mb-8 drop-shadow-md"
                  style={{
                    color: theme.colors.restaurantName,
                    fontSize: theme.typography.restaurantSlogan?.fontSize || '1.2rem',
                    fontFamily: theme.typography.restaurantSlogan?.fontFamily || 'inherit',
                    fontWeight: theme.typography.restaurantSlogan?.fontWeight || '400',
                    textAlign: theme.typography.restaurantSlogan?.alignment || 'center'
                  }}
                >
                  {restaurant.description || 'Lezzetli yemeklerin adresi'}
                </p>

                {/* Restaurant Story */}
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-amber-300 mr-2" />
                      <span className="text-white font-semibold">Hikayemiz</span>
                    </div>
                    <p className="text-white/90 leading-relaxed mb-6">
                      Aslında başta dünya barışını sağlamak için yola çıkmıştık... ama 
                      sonra dedik ki: "Bir kahve içelim, sonra düşünürüz." İşte {restaurant.name} 
                      tam da böyle doğdu.
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Kuruluş yılımız? Bilmiyoruz. Efsanelere göre bir sabah latte köpüğü 
                      fazla güzel olunca "Tamam, burası bir mekân olmalı" demiş. O 
                      günden beri kahve dökülür, sohbet koyulaşır.
                    </p>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Clock className="w-6 h-6 text-amber-300 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Açık</p>
                    <p className="text-white/80 text-xs">11:00 - 23:00</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Users className="w-6 h-6 text-amber-300 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Kapasite</p>
                    <p className="text-white/80 text-xs">80 kişi</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Star className="w-6 h-6 text-amber-300 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Değerlendirme</p>
                    <p className="text-white/80 text-xs">4.8/5.0</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Utensils className="w-6 h-6 text-amber-300 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Mutfak</p>
                    <p className="text-white/80 text-xs">{restaurant.cuisine_type || 'İtalyan'}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );

      case 'advertisementHero':
        if (advertisements.length === 0) return null;
        return (
          <div key="advertisementHero" className="px-6 py-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={20}
              slidesPerView={1}
              effect="fade"
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-white/50',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              {advertisements.map((ad) => (
                <SwiperSlide key={ad.id}>
                  <div className="relative h-80 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
                    {ad.image_url && (
                      <img 
                        src={ad.image_url} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                      <div className="p-8 text-white w-full">
                        <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">{ad.title}</h3>
                        <p className="text-xl opacity-90 drop-shadow-md">{ad.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation */}
              <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <ChevronLeft className="w-6 h-6 text-white" />
              </div>
              <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </Swiper>
          </div>
        );

      case 'featuredItems':
        if (!theme.components.featuredSection.enabled || featuredProducts.length === 0) return null;
        return (
          <div key="featuredItems" className="px-6 py-12 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-amber-600 mr-3" />
                <h2 className="text-4xl font-bold" style={{ color: theme.colors.productName }}>
                  Şef Önerileri
                </h2>
                <Star className="w-8 h-8 text-amber-600 ml-3" />
              </div>
              <p className="text-gray-600 text-lg">En sevilen ve özel lezzetlerimiz</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {featuredProducts.slice(0, 4).map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 shadow-lg" 
                  style={{ backgroundColor: theme.colors.cards }}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                          <ChefHat className="w-16 h-16 text-amber-600" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                          <Award className="w-3 h-3 mr-1" />
                          Şef Önerisi
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 
                          className="font-bold text-xl leading-tight"
                          style={{ 
                            color: theme.colors.productName,
                            fontSize: theme.typography.productName?.fontSize || '1.25rem',
                            fontFamily: theme.typography.productName?.fontFamily || 'inherit'
                          }}
                        >
                          {product.name}
                        </h3>
                        <Heart className="w-5 h-5 text-red-500 flex-shrink-0 ml-2" />
                      </div>
                      
                      <p 
                        className="text-sm leading-relaxed mb-4 line-clamp-2"
                        style={{ 
                          color: theme.colors.productDescription,
                          fontSize: theme.typography.productDescription?.fontSize || '0.875rem'
                        }}
                      >
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div 
                          className="text-2xl font-bold"
                          style={{ 
                            color: theme.colors.productPrice,
                            fontSize: theme.typography.productPrice?.fontSize || '1.5rem'
                          }}
                        >
                          ₺{Math.round(product.price)}
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-md"
                        >
                          Detay Gör
                        </Button>
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
          <div key="advertisementButton" className="px-6 py-8 text-center bg-gradient-to-r from-amber-600 to-orange-600">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Özel Kampanyalarımız</h3>
              <p className="text-amber-100 mb-6">Sınırlı süre için geçerli fırsatları kaçırmayın!</p>
              <Button
                onClick={() => setCampaignDialog(true)}
                className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-4 rounded-full shadow-xl text-lg transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Kampanyaları Keşfet
              </Button>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div key="categories" className="px-6 py-12">
            <div className="text-center mb-12">
              <h2 
                className="text-5xl font-bold mb-4"
                style={{ 
                  color: theme.colors.productName,
                  fontFamily: 'serif'
                }}
              >
                MENÜMÜZ
              </h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Özenle hazırlanmış lezzetlerimizi keşfedin</p>
            </div>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              {categories.map((category) => {
                const categoryProducts = getCategoryProducts(category.id);
                const isExpanded = expandedCategories.has(category.id);
                
                return (
                  <div key={category.id}>
                    {/* Category Header */}
                    <Card 
                      className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 shadow-lg"
                      onClick={() => toggleCategory(category.id)}
                      style={{ backgroundColor: theme.colors.cards }}
                    >
                      <div className="relative h-40">
                        {category.image_url ? (
                          <img 
                            src={category.image_url} 
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-600 to-red-600" />
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                          <div className="p-8 w-full flex items-center justify-between">
                            <div className="flex-1">
                              <h3 
                                className="text-3xl font-bold mb-2 drop-shadow-lg"
                                style={{ 
                                  color: theme.colors.categoryName,
                                  fontSize: theme.typography.categoryName?.fontSize || '1.875rem',
                                  fontFamily: theme.typography.categoryName?.fontFamily || 'inherit'
                                }}
                              >
                                {category.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-white/90">
                                <span className="flex items-center">
                                  <Utensils className="w-4 h-4 mr-1" />
                                  {categoryProducts.length} ürün
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1" />
                                  {category.description}
                                </span>
                              </div>
                            </div>
                            
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <ChevronDown 
                                className={cn(
                                  "w-8 h-8 text-white transition-transform duration-500",
                                  isExpanded && "rotate-180"
                                )} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Category Products */}
                    {isExpanded && (
                      <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
                        {categoryProducts.map((product) => (
                          <Card 
                            key={product.id} 
                            className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md"
                            style={{ backgroundColor: theme.colors.cards }}
                            onClick={() => handleProductClick(product)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-6">
                                <div className="w-28 h-28 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                                  {product.image_url ? (
                                    <img 
                                      src={product.image_url} 
                                      alt={product.name}
                                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                                      <ChefHat className="w-8 h-8 text-amber-600" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <h4 
                                          className="font-bold text-xl"
                                          style={{ 
                                            color: theme.colors.productName,
                                            fontSize: theme.typography.productName?.fontSize || '1.25rem'
                                          }}
                                        >
                                          {product.name}
                                        </h4>
                                        {product.is_featured && (
                                          <Badge className="bg-amber-500 text-white border-0">
                                            <Star className="w-3 h-3 mr-1" />
                                            Önerilen
                                          </Badge>
                                        )}
                                      </div>
                                      
                                      <p 
                                        className="leading-relaxed mb-3"
                                        style={{ 
                                          color: theme.colors.productDescription,
                                          fontSize: theme.typography.productDescription?.fontSize || '0.875rem'
                                        }}
                                      >
                                        {product.description}
                                      </p>
                                      
                                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span className="flex items-center">
                                          <Timer className="w-4 h-4 mr-1" />
                                          15-20 dk
                                        </span>
                                        <span className="flex items-center">
                                          <Users className="w-4 h-4 mr-1" />
                                          1-2 kişi
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="ml-6 text-right">
                                      <div 
                                        className="text-3xl font-bold mb-2"
                                        style={{ 
                                          color: theme.colors.productPrice,
                                          fontSize: theme.typography.productPrice?.fontSize || '1.875rem'
                                        }}
                                      >
                                        ₺{Math.round(product.price)}
                                      </div>
                                      <Button
                                        size="sm"
                                        className="bg-amber-600 hover:bg-amber-700 text-white border-0"
                                      >
                                        Detay
                                      </Button>
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
          <footer key="footer" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">{restaurant.name}</h3>
                  <p className="text-gray-300 mb-4">{restaurant.description}</p>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <Globe className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                  <div className="space-y-2 text-gray-300">
                    {restaurant.address && (
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                        {restaurant.address}
                      </p>
                    )}
                    {restaurant.phone && (
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {restaurant.phone}
                      </p>
                    )}
                    {restaurant.email && (
                      <p className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {restaurant.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
                  <div className="space-y-1 text-gray-300">
                    <p>Pazartesi - Perşembe: 11:00 - 22:00</p>
                    <p>Cuma - Cumartesi: 11:00 - 23:00</p>
                    <p>Pazar: 10:00 - 21:00</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-8 text-center">
                <p className="text-gray-400 mb-2">
                  Made with ❤️ by <span className="font-semibold text-blue-400">SayNDone</span>
                </p>
                <p className="text-xs text-gray-500">
                  Dijital menü çözümleri için gelecek burada
                </p>
              </div>
            </div>
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

      {/* Floating Actions */}
      <FloatingActions 
        onShare={handleShare}
        onCall={handleCall}
        restaurant={restaurant}
      />

      {/* Campaign Dialog */}
      <Dialog open={campaignDialog} onOpenChange={setCampaignDialog}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-800">🎉 Özel Kampanyalar</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {advertisements.map((ad) => (
              <Card key={ad.id} className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  {ad.image_url && (
                    <img 
                      src={ad.image_url} 
                      alt={ad.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-amber-800">{ad.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{ad.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={productDetailOpen}
        onClose={() => setProductDetailOpen(false)}
        theme={theme}
      />
    </div>
  );
}