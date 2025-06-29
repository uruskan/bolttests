'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { 
  SimpleStoryFormDialog, 
  SimpleAdvertisementFormDialog, 
  FeaturedProductSelectionDialog 
} from '@/components/ui/simple-form-dialog';
import { 
  Plus, 
  Camera, 
  Megaphone, 
  Eye, 
  EyeOff,
  Heart,
  Share,
  Edit,
  Trash2,
  Play,
  Clock,
  Star,
  Settings,
  Monitor,
  Smartphone,
  Layout,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  List,
  Grid3X3,
  Archive,
  ArchiveRestore,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('stories');
  const [viewMode, setViewMode] = useState({
    stories: 'grid',
    ads: 'list',
    featured: 'grid'
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog states
  const [storyDialog, setStoryDialog] = useState({ open: false, story: null });
  const [adDialog, setAdDialog] = useState({ open: false, advertisement: null });
  const [productSelectionDialog, setProductSelectionDialog] = useState({ open: false });
  
  // Display options state
  const [displayOptions, setDisplayOptions] = useState({
    advertisementType: 'popup', // 'popup' or 'hero'
    showKampanyalarButton: true,
    featuredProductLayout: 'grid' // 'grid', 'carousel', 'list'
  });

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    description: '',
    onConfirm: null,
    variant: 'default',
    icon: null
  });

  const [stories, setStories] = useState([
    {
      id: '1',
      title: 'Fresh Pasta Making',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 234,
      likes: 45,
      active: true,
      archived: false,
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
      expirationType: '24h'
    },
    {
      id: '2',
      title: "Today's Special",
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 156,
      likes: 28,
      active: true,
      archived: false,
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
      expirationType: '24h'
    },
    {
      id: '3',
      title: 'Weekend Wine Tasting',
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 89,
      likes: 12,
      active: false,
      archived: true,
      expiresAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // Expired 6 hours ago
      expirationType: '24h'
    },
    {
      id: '4',
      title: 'Chef Special',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 67,
      likes: 8,
      active: true,
      archived: false,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      expirationType: 'custom'
    },
    {
      id: '5',
      title: 'Dessert Time',
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 123,
      likes: 19,
      active: false,
      archived: true,
      expiresAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // Expired 12 hours ago
      expirationType: '24h'
    },
    {
      id: '6',
      title: 'Morning Coffee',
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 98,
      likes: 14,
      active: true,
      archived: false,
      expiresAt: null, // Never expires
      expirationType: 'never'
    }
  ]);

  const [advertisements, setAdvertisements] = useState([
    {
      id: '1',
      title: 'Happy Hour Special',
      description: 'Buy one get one free on all cocktails from 5-7 PM daily',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      clicks: 234,
      impressions: 1567,
      active: true,
      archived: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      expirationType: 'custom'
    },
    {
      id: '2',
      title: 'Weekend Brunch',
      description: 'Special weekend brunch menu available Saturday and Sunday',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      clicks: 156,
      impressions: 934,
      active: false,
      archived: true,
      expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Expired 2 days ago
      expirationType: 'custom'
    },
    {
      id: '3',
      title: 'Pizza Night',
      description: '50% off all pizzas every Tuesday night',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      clicks: 89,
      impressions: 567,
      active: true,
      archived: false,
      expiresAt: null, // Never expires
      expirationType: 'never'
    }
  ]);

  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 46,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Başlangıçlar',
      active: true,
      featured: true,
      views: 342,
      orders: 28
    },
    {
      id: '2',
      name: 'Pasta Carbonara',
      description: 'Geleneksel İtalyan usulü kremalı makarna',
      price: 78,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Makarnalar',
      active: true,
      featured: true,
      views: 289,
      orders: 35
    },
    {
      id: '3',
      name: 'Margherita Pizza',
      description: 'Klasik domates, mozzarella ve fesleğen',
      price: 65,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizzalar',
      active: false,
      featured: true,
      views: 456,
      orders: 42
    },
    {
      id: '4',
      name: 'Tiramisu',
      description: 'Ev yapımı geleneksel İtalyan tatlısı',
      price: 35,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Tatlılar',
      active: true,
      featured: true,
      views: 198,
      orders: 15
    }
  ]);

  // Helper functions
  const getTimeLeft = (expiresAt) => {
    if (!expiresAt) return 'Süresiz';
    
    const now = new Date();
    const diff = expiresAt - now;
    
    if (diff <= 0) return 'Süresi doldu';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}g ${hours}s`;
    if (hours > 0) return `${hours}s ${minutes}d`;
    return `${minutes}d`;
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date() > expiresAt;
  };

  const filterContent = (items) => {
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Story handlers
  const handleToggleStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    const action = story.active ? 'pasif' : 'aktif';
    
    setConfirmDialog({
      open: true,
      title: `Hikayeyi ${action} yap`,
      description: `"${story.title}" hikayesini ${action} yapmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setStories(prev => prev.map(s => 
          s.id === storyId ? { ...s, active: !s.active } : s
        ));
      },
      variant: 'default',
      icon: story.active ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />
    });
  };

  const handleArchiveStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    
    setConfirmDialog({
      open: true,
      title: 'Hikayeyi arşivle',
      description: `"${story.title}" hikayesini arşivlemek istediğinizden emin misiniz?`,
      onConfirm: () => {
        setStories(prev => prev.map(s => 
          s.id === storyId ? { ...s, archived: true, active: false } : s
        ));
      },
      variant: 'default',
      icon: <Archive className="w-5 h-5" />
    });
  };

  const handleUnarchiveStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    
    // When unarchiving, we need to ask for new expiration time
    setStoryDialog({ open: true, story: { ...story, isUnarchiving: true } });
  };

  const handleEditStory = (story) => {
    setStoryDialog({ open: true, story });
  };

  const handleDeleteStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    
    setConfirmDialog({
      open: true,
      title: 'Hikayeyi sil',
      description: `"${story.title}" hikayesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      onConfirm: () => {
        setStories(prev => prev.filter(s => s.id !== storyId));
      },
      variant: 'destructive',
      icon: <AlertTriangle className="w-5 h-5" />
    });
  };

  const handleSaveStory = (storyData) => {
    if (storyDialog.story) {
      // Edit existing story or unarchive
      setStories(prev => prev.map(s => 
        s.id === storyDialog.story.id ? { 
          ...s, 
          ...storyData,
          archived: false, // Unarchive if it was archived
          active: true // Activate when unarchiving
        } : s
      ));
    } else {
      // Add new story
      const newStory = {
        ...storyData,
        id: Date.now().toString(),
        views: 0,
        likes: 0,
        archived: false
      };
      setStories(prev => [...prev, newStory]);
    }
  };

  // Advertisement handlers
  const handleToggleAd = (adId) => {
    const ad = advertisements.find(a => a.id === adId);
    const action = ad.active ? 'pasif' : 'aktif';
    
    setConfirmDialog({
      open: true,
      title: `Reklamı ${action} yap`,
      description: `"${ad.title}" reklamını ${action} yapmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setAdvertisements(prev => prev.map(a => 
          a.id === adId ? { ...a, active: !a.active } : a
        ));
      },
      variant: 'default',
      icon: ad.active ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />
    });
  };

  const handleArchiveAd = (adId) => {
    const ad = advertisements.find(a => a.id === adId);
    
    setConfirmDialog({
      open: true,
      title: 'Reklamı arşivle',
      description: `"${ad.title}" reklamını arşivlemek istediğinizden emin misiniz?`,
      onConfirm: () => {
        setAdvertisements(prev => prev.map(a => 
          a.id === adId ? { ...a, archived: true, active: false } : a
        ));
      },
      variant: 'default',
      icon: <Archive className="w-5 h-5" />
    });
  };

  const handleUnarchiveAd = (adId) => {
    const ad = advertisements.find(a => a.id === adId);
    
    // When unarchiving, we need to ask for new expiration time
    setAdDialog({ open: true, advertisement: { ...ad, isUnarchiving: true } });
  };

  const handleEditAd = (advertisement) => {
    setAdDialog({ open: true, advertisement });
  };

  const handleDeleteAd = (adId) => {
    const ad = advertisements.find(a => a.id === adId);
    
    setConfirmDialog({
      open: true,
      title: 'Reklamı sil',
      description: `"${ad.title}" reklamını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      onConfirm: () => {
        setAdvertisements(prev => prev.filter(a => a.id !== adId));
      },
      variant: 'destructive',
      icon: <AlertTriangle className="w-5 h-5" />
    });
  };

  const handleSaveAd = (adData) => {
    if (adDialog.advertisement) {
      // Edit existing ad or unarchive
      setAdvertisements(prev => prev.map(a => 
        a.id === adDialog.advertisement.id ? { 
          ...a, 
          ...adData,
          archived: false, // Unarchive if it was archived
          active: true // Activate when unarchiving
        } : a
      ));
    } else {
      // Add new ad
      const newAd = {
        ...adData,
        id: Date.now().toString(),
        clicks: 0,
        impressions: 0,
        archived: false
      };
      setAdvertisements(prev => [...prev, newAd]);
    }
  };

  // Featured product handlers
  const handleToggleFeaturedProduct = (productId) => {
    const product = featuredProducts.find(p => p.id === productId);
    const action = product.active ? 'pasif' : 'aktif';
    
    setConfirmDialog({
      open: true,
      title: `Öne çıkan ürünü ${action} yap`,
      description: `"${product.name}" ürününü öne çıkanlar listesinde ${action} yapmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setFeaturedProducts(prev => prev.map(p => 
          p.id === productId ? { ...p, active: !p.active } : p
        ));
      },
      variant: 'default',
      icon: product.active ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />
    });
  };

  const handleRemoveFeaturedProduct = (productId) => {
    const product = featuredProducts.find(p => p.id === productId);
    
    setConfirmDialog({
      open: true,
      title: 'Öne çıkanlardan kaldır',
      description: `"${product.name}" ürününü öne çıkanlar listesinden kaldırmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setFeaturedProducts(prev => prev.filter(p => p.id !== productId));
      },
      variant: 'destructive',
      icon: <AlertTriangle className="w-5 h-5" />
    });
  };

  const handleAddFeaturedProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      views: 0,
      orders: 0,
      featured: true,
      active: true
    };
    setFeaturedProducts(prev => [...prev, newProduct]);
  };

  // View mode handlers
  const setCurrentViewMode = (mode) => {
    setViewMode(prev => ({ ...prev, [activeTab]: mode }));
  };

  // Get filtered and sorted content
  const getActiveStories = () => filterContent(stories.filter(s => !s.archived));
  const getArchivedStories = () => filterContent(stories.filter(s => s.archived));
  const getActiveAds = () => filterContent(advertisements.filter(a => !a.archived));
  const getArchivedAds = () => filterContent(advertisements.filter(a => a.archived));
  const getActiveFeaturedProducts = () => filterContent(featuredProducts);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">İçerik Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Hikayeler, reklamlar ve içeriklerinizi yönetin</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0"
          onClick={() => {
            if (activeTab === 'stories') {
              setStoryDialog({ open: true, story: null });
            } else if (activeTab === 'ads') {
              setAdDialog({ open: true, advertisement: null });
            } else if (activeTab === 'featured') {
              setProductSelectionDialog({ open: true });
            }
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          {activeTab === 'stories' ? 'Hikaye Oluştur' : 
           activeTab === 'ads' ? 'Reklam Oluştur' : 
           activeTab === 'featured' ? 'Ürün Ekle' : 'İçerik Oluştur'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-4 transition-colors duration-200",
          "bg-muted border border-border"
        )}>
          <TabsTrigger 
            value="stories" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler
          </TabsTrigger>
          <TabsTrigger 
            value="ads" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar
          </TabsTrigger>
          <TabsTrigger 
            value="featured" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkanlar
          </TabsTrigger>
          <TabsTrigger 
            value="display" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Settings className="w-4 h-4 mr-2" />
            Görünüm
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Hikaye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode.stories === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode.stories === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Active Stories */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  Aktif Hikayeler ({getActiveStories().filter(s => s.active).length})
                </span>
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                  Canlı
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode.stories === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {getActiveStories().map((story) => (
                    <div 
                      key={story.id} 
                      className={cn(
                        "relative group cursor-pointer transition-all duration-200 hover:scale-105",
                        "border-2 rounded-lg overflow-hidden",
                        story.active 
                          ? "border-green-500 shadow-green-200 dark:shadow-green-900/50" 
                          : "border-red-500 shadow-red-200 dark:shadow-red-900/50",
                        "shadow-lg hover:shadow-xl",
                        isExpired(story.expiresAt) && "opacity-50"
                      )}
                      onClick={() => handleToggleStory(story.id)}
                    >
                      <div className="aspect-[9/16] bg-muted relative">
                        <img 
                          src={story.thumbnail} 
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                        {story.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 text-primary ml-0.5" />
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-2 right-2">
                          <Badge className={cn(
                            "text-white border-none text-xs",
                            isExpired(story.expiresAt) ? "bg-red-600" : "bg-black/60"
                          )}>
                            <Clock className="w-2 h-2 mr-1" />
                            {getTimeLeft(story.expiresAt)}
                          </Badge>
                        </div>

                        {/* Status indicator */}
                        <div className={cn(
                          "absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-white",
                          story.active ? "bg-green-500" : "bg-red-500"
                        )} />

                        {/* Action buttons - visible on hover */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-white/20 border-white/30 hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStory(story);
                            }}
                          >
                            <Edit className="w-3 h-3 text-white" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-white/20 border-white/30 hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchiveStory(story.id);
                            }}
                          >
                            <Archive className="w-3 h-3 text-white" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-white/20 border-white/30 hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStory(story.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3 text-white" />
                          </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="font-medium text-white text-xs mb-1 line-clamp-2">{story.title}</h3>
                          <div className="flex items-center justify-between text-xs text-white/80">
                            <span className="flex items-center">
                              <Eye className="w-2 h-2 mr-1" />
                              {story.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-2 h-2 mr-1" />
                              {story.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {getActiveStories().map((story) => (
                    <div 
                      key={story.id} 
                      className={cn(
                        "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.01]",
                        story.active 
                          ? "bg-green-50/80 border-green-500 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-500 dark:hover:bg-green-900/40"
                          : "bg-red-50/80 border-red-500 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-500 dark:hover:bg-red-900/40",
                        isExpired(story.expiresAt) && "opacity-50"
                      )}
                      onClick={() => handleToggleStory(story.id)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                        <img 
                          src={story.thumbnail} 
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                        {story.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-primary ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Status indicator */}
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        story.active ? "bg-green-500" : "bg-red-500"
                      )} />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={cn(
                            "font-semibold",
                            story.active 
                              ? "text-green-800 dark:text-green-200" 
                              : "text-red-800 dark:text-red-200"
                          )}>
                            {story.title}
                          </h3>
                          <Badge className={cn(
                            "text-xs",
                            isExpired(story.expiresAt) 
                              ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                              : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                          )}>
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeLeft(story.expiresAt)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {story.views} görüntülenme
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {story.likes} beğeni
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStory(story);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveStory(story.id);
                          }}
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStory(story.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Archived Stories */}
          {getArchivedStories().length > 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Archive className="w-5 h-5 mr-2 text-muted-foreground" />
                    Arşivlenmiş Hikayeler ({getArchivedStories().length})
                  </span>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800">
                    Arşiv
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getArchivedStories().map((story) => (
                    <div 
                      key={story.id} 
                      className="flex items-center space-x-4 p-4 rounded-lg border bg-gray-50/80 border-gray-300 dark:bg-gray-950/30 dark:border-gray-700"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative opacity-60">
                        <img 
                          src={story.thumbnail} 
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                        {story.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-primary ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          {story.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {story.views} görüntülenme
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {story.likes} beğeni
                          </span>
                          <span className="text-red-600 dark:text-red-400">
                            Süresi doldu
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleUnarchiveStory(story.id)}
                          title="Arşivden çıkar"
                        >
                          <ArchiveRestore className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteStory(story.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Reklam ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode.ads === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode.ads === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Active Ads */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-primary" />
                Aktif Reklamlar ({getActiveAds().filter(a => a.active).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode.ads === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getActiveAds().map((ad) => (
                    <div 
                      key={ad.id} 
                      className={cn(
                        "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                        ad.active 
                          ? "bg-green-50/80 border-green-500 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-500 dark:hover:bg-green-900/40"
                          : "bg-red-50/80 border-red-500 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-500 dark:hover:bg-red-900/40",
                        isExpired(ad.expiresAt) && "opacity-50"
                      )}
                      onClick={() => handleToggleAd(ad.id)}
                    >
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-muted mb-3">
                        <img 
                          src={ad.image} 
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={cn(
                          "font-semibold",
                          ad.active 
                            ? "text-green-800 dark:text-green-200" 
                            : "text-red-800 dark:text-red-200"
                        )}>
                          {ad.title}
                        </h3>
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          ad.active ? "bg-green-500" : "bg-red-500"
                        )} />
                      </div>
                      
                      <p className={cn(
                        "text-sm mb-3 line-clamp-2",
                        ad.active 
                          ? "text-green-600 dark:text-green-300" 
                          : "text-red-600 dark:text-red-300"
                      )}>
                        {ad.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={cn(
                          "text-xs",
                          isExpired(ad.expiresAt) 
                            ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                            : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                        )}>
                          <Clock className="w-3 h-3 mr-1" />
                          {getTimeLeft(ad.expiresAt)}
                        </Badge>
                        <Badge className={cn(
                          ad.active 
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                            : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                        )}>
                          {ad.active ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {ad.impressions}
                        </span>
                        <span className="flex items-center">
                          <Share className="w-3 h-3 mr-1" />
                          {ad.clicks}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAd(ad);
                          }}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Düzenle
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveAd(ad.id);
                          }}
                        >
                          <Archive className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAd(ad.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {getActiveAds().map((ad) => (
                    <div 
                      key={ad.id} 
                      className={cn(
                        "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.01]",
                        ad.active 
                          ? "bg-green-50/80 border-green-500 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-500 dark:hover:bg-green-900/40"
                          : "bg-red-50/80 border-red-500 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-500 dark:hover:bg-red-900/40",
                        isExpired(ad.expiresAt) && "opacity-50"
                      )}
                      onClick={() => handleToggleAd(ad.id)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={ad.image} 
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Status indicator */}
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        ad.active ? "bg-green-500" : "bg-red-500"
                      )} />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={cn(
                            "font-semibold",
                            ad.active 
                              ? "text-green-800 dark:text-green-200" 
                              : "text-red-800 dark:text-red-200"
                          )}>
                            {ad.title}
                          </h3>
                          <Badge className={cn(
                            "text-xs",
                            isExpired(ad.expiresAt) 
                              ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                              : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                          )}>
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeLeft(ad.expiresAt)}
                          </Badge>
                        </div>
                        <p className={cn(
                          "text-sm mb-2",
                          ad.active 
                            ? "text-green-600 dark:text-green-300" 
                            : "text-red-600 dark:text-red-300"
                        )}>
                          {ad.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {ad.impressions} görüntülenme
                          </span>
                          <span className="flex items-center">
                            <Share className="w-3 h-3 mr-1" />
                            {ad.clicks} tıklama
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={cn(
                          ad.active 
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                            : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                        )}>
                          {ad.active ? 'Aktif' : 'Pasif'}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAd(ad);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveAd(ad.id);
                          }}
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAd(ad.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Archived Ads */}
          {getArchivedAds().length > 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Archive className="w-5 h-5 mr-2 text-muted-foreground" />
                    Arşivlenmiş Reklamlar ({getArchivedAds().length})
                  </span>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800">
                    Arşiv
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getArchivedAds().map((ad) => (
                    <div 
                      key={ad.id} 
                      className="flex items-center space-x-4 p-4 rounded-lg border bg-gray-50/80 border-gray-300 dark:bg-gray-950/30 dark:border-gray-700"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 opacity-60">
                        <img 
                          src={ad.image} 
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          {ad.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                          {ad.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {ad.impressions} görüntülenme
                          </span>
                          <span className="flex items-center">
                            <Share className="w-3 h-3 mr-1" />
                            {ad.clicks} tıklama
                          </span>
                          <span className="text-red-600 dark:text-red-400">
                            Süresi doldu
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleUnarchiveAd(ad.id)}
                          title="Arşivden çıkar"
                        >
                          <ArchiveRestore className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode.featured === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode.featured === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-primary" />
                  Öne Çıkan Ürünler ({getActiveFeaturedProducts().filter(p => p.active).length})
                </span>
                <Button 
                  variant="outline"
                  onClick={() => setProductSelectionDialog({ open: true })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ürün Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode.featured === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getActiveFeaturedProducts().map((product) => (
                    <div 
                      key={product.id} 
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02]",
                        product.active 
                          ? "bg-green-50/80 border-green-500 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-500 dark:hover:bg-green-900/40"
                          : "bg-red-50/80 border-red-500 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-500 dark:hover:bg-red-900/40"
                      )}
                      onClick={() => handleToggleFeaturedProduct(product.id)}
                    >
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-muted mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={cn(
                          "font-semibold",
                          product.active 
                            ? "text-green-800 dark:text-green-200" 
                            : "text-red-800 dark:text-red-200"
                        )}>
                          {product.name}
                        </h3>
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          product.active ? "bg-green-500" : "bg-red-500"
                        )} />
                      </div>
                      
                      <p className={cn(
                        "text-sm mb-3 line-clamp-2",
                        product.active 
                          ? "text-green-600 dark:text-green-300" 
                          : "text-red-600 dark:text-red-300"
                      )}>
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700">
                          <Star className="w-3 h-3 mr-1" />
                          Öne Çıkan
                        </Badge>
                        <div className={cn(
                          "font-bold text-lg",
                          product.active 
                            ? "text-green-700 dark:text-green-300" 
                            : "text-red-700 dark:text-red-300"
                        )}>
                          ₺{product.price}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {product.views}
                        </span>
                        <span className="flex items-center">
                          <Share className="w-3 h-3 mr-1" />
                          {product.orders} sipariş
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFeaturedProduct(product.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Kaldır
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getActiveFeaturedProducts().map((product) => (
                    <div 
                      key={product.id} 
                      className={cn(
                        "flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02]",
                        product.active 
                          ? "bg-green-50/80 border-green-500 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-500 dark:hover:bg-green-900/40"
                          : "bg-red-50/80 border-red-500 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-500 dark:hover:bg-red-900/40"
                      )}
                      onClick={() => handleToggleFeaturedProduct(product.id)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Status indicator */}
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        product.active ? "bg-green-500" : "bg-red-500"
                      )} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={cn(
                            "font-semibold truncate",
                            product.active 
                              ? "text-green-800 dark:text-green-200" 
                              : "text-red-800 dark:text-red-200"
                          )}>
                            {product.name}
                          </h3>
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700 flex-shrink-0">
                            <Star className="w-3 h-3 mr-1" />
                            Öne Çıkan
                          </Badge>
                        </div>
                        <p className={cn(
                          "text-sm line-clamp-1 mb-2",
                          product.active 
                            ? "text-green-600 dark:text-green-300" 
                            : "text-red-600 dark:text-red-300"
                        )}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {product.views}
                            </span>
                            <span className="flex items-center">
                              <Share className="w-3 h-3 mr-1" />
                              {product.orders} sipariş
                            </span>
                          </div>
                          <div className={cn(
                            "font-bold",
                            product.active 
                              ? "text-green-700 dark:text-green-300" 
                              : "text-red-700 dark:text-red-300"
                          )}>
                            ₺{product.price}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-accent"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFeaturedProduct(product.id);
                          }}
                          title="Öne çıkanlardan kaldır"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Advertisement Display Options */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Megaphone className="w-5 h-5 mr-2 text-primary" />
                  Reklam Görüntüleme Seçenekleri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-foreground font-medium">Reklam Türü</Label>
                  <Select 
                    value={displayOptions.advertisementType} 
                    onValueChange={(value) => setDisplayOptions(prev => ({ ...prev, advertisementType: value }))}
                  >
                    <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="popup">
                        <div className="flex items-center">
                          <Monitor className="w-4 h-4 mr-2" />
                          Pop-up Reklam
                        </div>
                      </SelectItem>
                      <SelectItem value="hero">
                        <div className="flex items-center">
                          <Layout className="w-4 h-4 mr-2" />
                          Hero Slider
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    {displayOptions.advertisementType === 'popup' 
                      ? 'Reklamlar açılır pencere olarak gösterilir'
                      : 'Reklamlar sayfa üstünde slider olarak gösterilir'
                    }
                  </p>
                </div>

                {displayOptions.advertisementType === 'popup' && (
                  <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Kampanyalar Butonu</div>
                      <div className="text-sm text-muted-foreground">Ana sayfada kampanyalar butonunu göster</div>
                    </div>
                    <Switch
                      checked={displayOptions.showKampanyalarButton}
                      onCheckedChange={(checked) => setDisplayOptions(prev => ({ ...prev, showKampanyalarButton: checked }))}
                    />
                  </div>
                )}

                {displayOptions.advertisementType === 'hero' && (
                  <div>
                    <Label className="text-foreground font-medium">Öne Çıkan Ürün Düzeni</Label>
                    <Select 
                      value={displayOptions.featuredProductLayout} 
                      onValueChange={(value) => setDisplayOptions(prev => ({ ...prev, featuredProductLayout: value }))}
                    >
                      <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="grid">
                          <div className="flex items-center">
                            <Layout className="w-4 h-4 mr-2" />
                            Grid Düzeni
                          </div>
                        </SelectItem>
                        <SelectItem value="carousel">
                          <div className="flex items-center">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Carousel Düzeni
                          </div>
                        </SelectItem>
                        <SelectItem value="list">
                          <div className="flex items-center">
                            <Monitor className="w-4 h-4 mr-2" />
                            Liste Düzeni
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hero slider kullanıldığında öne çıkan ürünlerin nasıl gösterileceğini belirler
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  Önizleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/20 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Seçili Ayarlar:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Reklam Türü:</span>
                        <Badge variant="outline" className="border-border text-foreground">
                          {displayOptions.advertisementType === 'popup' ? 'Pop-up' : 'Hero Slider'}
                        </Badge>
                      </div>
                      
                      {displayOptions.advertisementType === 'popup' && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Kampanyalar Butonu:</span>
                          <Badge variant="outline" className={cn(
                            "border-border",
                            displayOptions.showKampanyalarButton 
                              ? "text-green-700 border-green-200 bg-green-50 dark:text-green-300 dark:border-green-800 dark:bg-green-950/30"
                              : "text-red-700 border-red-200 bg-red-50 dark:text-red-300 dark:border-red-800 dark:bg-red-950/30"
                          )}>
                            {displayOptions.showKampanyalarButton ? 'Göster' : 'Gizle'}
                          </Badge>
                        </div>
                      )}
                      
                      {displayOptions.advertisementType === 'hero' && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Öne Çıkan Düzen:</span>
                          <Badge variant="outline" className="border-border text-foreground">
                            {displayOptions.featuredProductLayout === 'grid' ? 'Grid' : 
                             displayOptions.featuredProductLayout === 'carousel' ? 'Carousel' : 'Liste'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Settings className="w-4 h-4 mr-2" />
                      Ayarları Kaydet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Dialogs */}
      <SimpleStoryFormDialog
        story={storyDialog.story}
        open={storyDialog.open}
        onOpenChange={(open) => setStoryDialog({ open, story: null })}
        onSave={handleSaveStory}
      />

      <SimpleAdvertisementFormDialog
        advertisement={adDialog.advertisement}
        open={adDialog.open}
        onOpenChange={(open) => setAdDialog({ open, advertisement: null })}
        onSave={handleSaveAd}
      />

      <FeaturedProductSelectionDialog
        open={productSelectionDialog.open}
        onOpenChange={(open) => setProductSelectionDialog({ open })}
        onSave={handleAddFeaturedProduct}
        existingProducts={featuredProducts}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        variant={confirmDialog.variant}
        icon={confirmDialog.icon}
      />
    </div>
  );
}