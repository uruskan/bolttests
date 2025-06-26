'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Camera, 
  Clock, 
  Eye, 
  Heart,
  Share,
  Edit,
  Trash2,
  Play,
  Image as ImageIcon,
  Megaphone,
  Star,
  Move,
  Archive,
  ArchiveRestore,
  Target,
  TrendingUp,
  Link as LinkIcon,
  GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('stories');
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [selectedStoryType, setSelectedStoryType] = useState('image');
  const [storyDuration, setStoryDuration] = useState('24h');
  const [adDuration, setAdDuration] = useState('never');
  const [showArchived, setShowArchived] = useState(false);
  const [draggedStory, setDraggedStory] = useState(null);
  const [draggedAd, setDraggedAd] = useState(null);

  // Sample menu items for featured products selection
  const menuItems = [
    { id: '1', name: 'Pasta Carbonara', image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400', price: 89.99 },
    { id: '2', name: 'Margherita Pizza', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400', price: 75.99 },
    { id: '3', name: 'Risotto ai Funghi', image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400', price: 95.99 },
    { id: '4', name: 'Tiramisu', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400', price: 45.99 },
  ];

  const [stories, setStories] = useState([
    {
      id: '1',
      title: 'Taze Makarna Yapımı',
      content: 'Şefimizin geleneksel İtalyan teknikleriyle taze makarna hazırlamasını izleyin.',
      type: 'video',
      mediaUrl: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
      views: 234,
      likes: 45,
      active: true,
      archived: false,
      priority: 1
    },
    {
      id: '2',
      title: "Günün Özel Menüsü",
      content: 'Trüf ve parmesan ile özel risotto - sınırlı sayıda!',
      type: 'image',
      mediaUrl: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
      views: 156,
      likes: 28,
      active: true,
      archived: false,
      priority: 2
    },
    {
      id: '3',
      title: 'Geçen Haftanın Özel Menüsü',
      content: 'Deniz ürünleri ile özel risotto',
      type: 'image',
      mediaUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      views: 89,
      likes: 12,
      active: false,
      archived: true,
      priority: 3
    }
  ]);

  const [advertisements, setAdvertisements] = useState([
    {
      id: '1',
      title: 'Happy Hour Özel',
      description: '17:00-19:00 arası tüm kokteyllerde bire bir bedava',
      imageUrl: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkUrl: 'https://bellavista.com/happy-hour',
      startTime: '17:00',
      endTime: '19:00',
      priority: 1,
      active: true,
      archived: false,
      clicks: 234,
      impressions: 1567,
      targetAudience: 'Tüm müşteriler',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      displayType: 'banner'
    },
    {
      id: '2',
      title: 'Hafta Sonu Brunch',
      description: 'Cumartesi ve Pazar özel brunch menümüz',
      imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkUrl: 'https://bellavista.com/brunch-menu',
      startTime: '09:00',
      endTime: '14:00',
      priority: 2,
      active: true,
      archived: false,
      clicks: 156,
      impressions: 934,
      targetAudience: 'Hafta sonu ziyaretçileri',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      displayType: 'popup'
    }
  ]);

  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: '1',
      productId: 'pasta-1',
      productName: 'Pasta Carbonara',
      productImage: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      productPrice: 89.99,
      displayOrder: 1,
      addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      productId: 'pizza-1',
      productName: 'Margherita Pizza',
      productImage: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      productPrice: 75.99,
      displayOrder: 2,
      addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}s ${minutesLeft}dk kaldı`;
    }
    return `${minutesLeft}dk kaldı`;
  };

  const getTimeSince = (createdAt) => {
    const now = new Date();
    const timePassed = now.getTime() - createdAt.getTime();
    const hoursPassed = Math.floor(timePassed / (1000 * 60 * 60));
    
    if (hoursPassed > 0) {
      return `${hoursPassed}s önce`;
    }
    const minutesPassed = Math.floor(timePassed / (1000 * 60));
    return `${minutesPassed}dk önce`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30';
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30';
      case 3: return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30';
    }
  };

  const getClickThroughRate = (clicks, impressions) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(1) + '%';
  };

  const toggleArchive = (id, type) => {
    if (type === 'story') {
      setStories(prev => prev.map(story => 
        story.id === id ? { ...story, archived: !story.archived, active: story.archived } : story
      ));
    } else if (type === 'ad') {
      setAdvertisements(prev => prev.map(ad => 
        ad.id === id ? { ...ad, archived: !ad.archived, active: ad.archived } : ad
      ));
    }
  };

  const addProductToFeatured = (product) => {
    const newFeaturedProduct = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      displayOrder: featuredProducts.length + 1,
      addedAt: new Date()
    };
    setFeaturedProducts(prev => [...prev, newFeaturedProduct]);
  };

  const removeFromFeatured = (id) => {
    setFeaturedProducts(prev => prev.filter(product => product.id !== id));
  };

  // Drag and drop handlers for stories
  const handleStoryDragStart = (e, storyId) => {
    setDraggedStory(storyId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleStoryDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleStoryDrop = (e, targetStoryId) => {
    e.preventDefault();
    
    if (draggedStory && draggedStory !== targetStoryId) {
      const draggedIndex = stories.findIndex(story => story.id === draggedStory);
      const targetIndex = stories.findIndex(story => story.id === targetStoryId);
      
      const newStories = [...stories];
      const [draggedItem] = newStories.splice(draggedIndex, 1);
      newStories.splice(targetIndex, 0, draggedItem);
      
      // Update priority values
      const updatedStories = newStories.map((story, index) => ({
        ...story,
        priority: index + 1
      }));
      
      setStories(updatedStories);
    }
    
    setDraggedStory(null);
  };

  // Drag and drop handlers for ads
  const handleAdDragStart = (e, adId) => {
    setDraggedAd(adId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleAdDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleAdDrop = (e, targetAdId) => {
    e.preventDefault();
    
    if (draggedAd && draggedAd !== targetAdId) {
      const draggedIndex = advertisements.findIndex(ad => ad.id === draggedAd);
      const targetIndex = advertisements.findIndex(ad => ad.id === targetAdId);
      
      const newAds = [...advertisements];
      const [draggedItem] = newAds.splice(draggedIndex, 1);
      newAds.splice(targetIndex, 0, draggedItem);
      
      // Update priority values
      const updatedAds = newAds.map((ad, index) => ({
        ...ad,
        priority: index + 1
      }));
      
      setAdvertisements(updatedAds);
    }
    
    setDraggedAd(null);
  };

  const currentStories = showArchived ? stories.filter(s => s.archived) : stories.filter(s => !s.archived);
  const currentAds = showArchived ? advertisements.filter(a => a.archived) : advertisements.filter(a => !a.archived);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-bold transition-colors duration-200",
            "text-gray-900 dark:text-white"
          )}>
            İçerik Yönetimi
          </h1>
          <p className={cn(
            "mt-1 transition-colors duration-200",
            "text-gray-600 dark:text-slate-400"
          )}>
            Hikayeler, reklamlar ve öne çıkan ürünler
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowArchived(!showArchived)}
            className={cn(
              "transition-all duration-200",
              "border-gray-300 hover:bg-gray-100 text-gray-700",
              "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
            )}
          >
            {showArchived ? <ArchiveRestore className="w-4 h-4 mr-2" /> : <Archive className="w-4 h-4 mr-2" />}
            {showArchived ? 'Aktif İçerikleri Göster' : 'Arşivi Göster'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-3 transition-colors duration-200",
          "bg-gray-100 border border-gray-200",
          "dark:bg-slate-800/50 dark:border dark:border-slate-700/50"
        )}>
          <TabsTrigger 
            value="stories" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-blue-600",
              "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
            )}
          >
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler
          </TabsTrigger>
          <TabsTrigger 
            value="ads" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-blue-600",
              "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
            )}
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar
          </TabsTrigger>
          <TabsTrigger 
            value="featured" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-blue-600",
              "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
            )}
          >
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkanlar
          </TabsTrigger>
        </TabsList>

        {/* Stories Tab */}
        <TabsContent value="stories" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className={cn(
                "text-xl font-semibold transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
                {showArchived ? 'Arşivlenmiş Hikayeler' : 'Aktif Hikayeler'}
              </h2>
              <p className={cn(
                "transition-colors duration-200",
                "text-gray-600 dark:text-slate-400"
              )}>
                {showArchived ? 'Süresi dolmuş hikayeler' : '24 saat süreyle aktif kalır'}
              </p>
            </div>
            {!showArchived && (
              <Dialog open={isAddingStory} onOpenChange={setIsAddingStory}>
                <DialogTrigger asChild>
                  <Button className={cn(
                    "transition-all duration-200",
                    "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  )}>
                    <Plus className="w-4 h-4 mr-2" />
                    Hikaye Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent className={cn(
                  "max-w-2xl transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800 dark:border-slate-700"
                )}>
                  <DialogHeader>
                    <DialogTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Yeni Hikaye Oluştur
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Hikaye Türü
                      </Label>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          variant={selectedStoryType === 'image' ? 'default' : 'outline'}
                          onClick={() => setSelectedStoryType('image')}
                          className={cn(
                            "transition-all duration-200",
                            selectedStoryType === 'image' 
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                              : 'border-gray-300 text-gray-700 dark:border-slate-600 dark:text-slate-300'
                          )}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Resim
                        </Button>
                        <Button
                          variant={selectedStoryType === 'video' ? 'default' : 'outline'}
                          onClick={() => setSelectedStoryType('video')}
                          className={cn(
                            "transition-all duration-200",
                            selectedStoryType === 'video' 
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                              : 'border-gray-300 text-gray-700 dark:border-slate-600 dark:text-slate-300'
                          )}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Süre
                      </Label>
                      <Select value={storyDuration} onValueChange={setStoryDuration}>
                        <SelectTrigger className={cn(
                          "mt-2 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={cn(
                          "transition-colors duration-200",
                          "bg-white border-gray-200",
                          "dark:bg-slate-700 dark:border-slate-600"
                        )}>
                          <SelectItem value="24h">24 Saat</SelectItem>
                          <SelectItem value="never">Süresiz</SelectItem>
                          <SelectItem value="custom">Özel Gün Sayısı</SelectItem>
                        </SelectContent>
                      </Select>
                      {storyDuration === 'custom' && (
                        <Input 
                          type="number" 
                          placeholder="Gün sayısı" 
                          className={cn(
                            "mt-2 transition-all duration-200",
                            "bg-white border-gray-300 text-gray-900",
                            "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          )} 
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="storyTitle" className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Hikaye Başlığı
                          </Label>
                          <Input 
                            id="storyTitle" 
                            placeholder="ör. Taze Makarna Yapımı" 
                            className={cn(
                              "mt-1 transition-all duration-200",
                              "bg-white border-gray-300 text-gray-900",
                              "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            )} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="storyDescription" className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Açıklama
                          </Label>
                          <Textarea 
                            id="storyDescription" 
                            placeholder="Bu hikayede neler oluyor..." 
                            className={cn(
                              "mt-1 h-24 transition-all duration-200",
                              "bg-white border-gray-300 text-gray-900",
                              "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            )} 
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            {selectedStoryType === 'image' ? 'Resim' : 'Video'} Yükle
                          </Label>
                          <div className={cn(
                            "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                            "border-gray-300 bg-gray-50",
                            "dark:border-slate-600 dark:bg-slate-700/30"
                          )}>
                            <Camera className={cn(
                              "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                              "text-gray-400 dark:text-slate-400"
                            )} />
                            <p className={cn(
                              "text-sm transition-colors duration-200",
                              "text-gray-600 dark:text-slate-300"
                            )}>
                              Tıklayın veya sürükleyip bırakın
                            </p>
                            <p className={cn(
                              "text-xs mt-1 transition-colors duration-200",
                              "text-gray-500 dark:text-slate-500"
                            )}>
                              {selectedStoryType === 'image' ? 'PNG, JPG 10MB\'a kadar' : 'MP4, MOV 50MB\'a kadar'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingStory(false)} 
                      className={cn(
                        "transition-all duration-200",
                        "border-gray-300 text-gray-700",
                        "dark:border-slate-600 dark:text-slate-300"
                      )}
                    >
                      İptal
                    </Button>
                    <Button className={cn(
                      "transition-all duration-200",
                      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    )}>
                      Hikaye Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-4">
            {currentStories.sort((a, b) => a.priority - b.priority).map((story, index) => (
              <div 
                key={story.id} 
                className={cn(
                  "rounded-lg p-4 border transition-all duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/30 dark:border-slate-700",
                  draggedStory === story.id && "opacity-50"
                )}
                draggable
                onDragStart={(e) => handleStoryDragStart(e, story.id)}
                onDragOver={handleStoryDragOver}
                onDrop={(e) => handleStoryDrop(e, story.id)}
                onDragEnd={() => setDraggedStory(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className={cn(
                      "w-4 h-4 cursor-move transition-colors duration-200",
                      "text-gray-400 dark:text-slate-500"
                    )} />
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={story.thumbnail} 
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={cn(
                          "font-semibold mb-1 transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {story.title}
                        </h3>
                        <p className={cn(
                          "text-sm mb-2 transition-colors duration-200",
                          "text-gray-600 dark:text-slate-300"
                        )}>
                          {story.content}
                        </p>
                        <div className={cn(
                          "flex items-center space-x-4 text-xs transition-colors duration-200",
                          "text-gray-500 dark:text-slate-400"
                        )}>
                          <span>{getTimeSince(story.createdAt)}</span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {story.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {story.likes}
                          </span>
                          {!story.archived && (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {getTimeRemaining(story.expiresAt)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("text-xs", getPriorityColor(story.priority))}>
                          Öncelik {story.priority}
                        </Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-gray-300 hover:bg-gray-100 text-gray-600",
                            "dark:border-slate-600 dark:hover:bg-slate-600 dark:text-slate-300"
                          )}
                          onClick={() => toggleArchive(story.id, 'story')}
                        >
                          {story.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-gray-300 hover:bg-gray-100 text-gray-600",
                            "dark:border-slate-600 dark:hover:bg-slate-600 dark:text-slate-300"
                          )}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-red-300 hover:bg-red-50 text-red-600",
                            "dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                          )}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Advertisements Tab */}
        <TabsContent value="ads" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className={cn(
                "text-xl font-semibold transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
                {showArchived ? 'Arşivlenmiş Reklamlar' : 'Aktif Reklamlar'}
              </h2>
              <p className={cn(
                "transition-colors duration-200",
                "text-gray-600 dark:text-slate-400"
              )}>
                Zamanlı reklamlar ve promosyonlar
              </p>
            </div>
            {!showArchived && (
              <Dialog open={isAddingAd} onOpenChange={setIsAddingAd}>
                <DialogTrigger asChild>
                  <Button className={cn(
                    "transition-all duration-200",
                    "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  )}>
                    <Plus className="w-4 h-4 mr-2" />
                    Reklam Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent className={cn(
                  "max-w-2xl transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800 dark:border-slate-700"
                )}>
                  <DialogHeader>
                    <DialogTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Yeni Reklam Oluştur
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Görüntüleme Türü
                      </Label>
                      <Select defaultValue="banner">
                        <SelectTrigger className={cn(
                          "mt-2 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={cn(
                          "transition-colors duration-200",
                          "bg-white border-gray-200",
                          "dark:bg-slate-700 dark:border-slate-600"
                        )}>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="popup">Pop-up</SelectItem>
                          <SelectItem value="hero-slider">Hero Slider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Süre
                      </Label>
                      <Select value={adDuration} onValueChange={setAdDuration}>
                        <SelectTrigger className={cn(
                          "mt-2 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={cn(
                          "transition-colors duration-200",
                          "bg-white border-gray-200",
                          "dark:bg-slate-700 dark:border-slate-600"
                        )}>
                          <SelectItem value="24h">24 Saat</SelectItem>
                          <SelectItem value="never">Süresiz</SelectItem>
                          <SelectItem value="custom">Özel Gün Sayısı</SelectItem>
                        </SelectContent>
                      </Select>
                      {adDuration === 'custom' && (
                        <Input 
                          type="number" 
                          placeholder="Gün sayısı" 
                          className={cn(
                            "mt-2 transition-all duration-200",
                            "bg-white border-gray-300 text-gray-900",
                            "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          )} 
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="adTitle" className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Reklam Başlığı
                          </Label>
                          <Input 
                            id="adTitle" 
                            placeholder="ör. Happy Hour Özel" 
                            className={cn(
                              "mt-1 transition-all duration-200",
                              "bg-white border-gray-300 text-gray-900",
                              "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            )} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="adDescription" className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Açıklama
                          </Label>
                          <Textarea 
                            id="adDescription" 
                            placeholder="Promosyonunuzu tanımlayın..." 
                            className={cn(
                              "mt-1 h-20 transition-all duration-200",
                              "bg-white border-gray-300 text-gray-900",
                              "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            )} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkUrl" className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Link URL (Opsiyonel)
                          </Label>
                          <Input 
                            id="linkUrl" 
                            placeholder="https://website.com/promosyon" 
                            className={cn(
                              "mt-1 transition-all duration-200",
                              "bg-white border-gray-300 text-gray-900",
                              "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            )} 
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className={cn(
                            "transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            Resim Yükle
                          </Label>
                          <div className={cn(
                            "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                            "border-gray-300 bg-gray-50",
                            "dark:border-slate-600 dark:bg-slate-700/30"
                          )}>
                            <Megaphone className={cn(
                              "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                              "text-gray-400 dark:text-slate-400"
                            )} />
                            <p className={cn(
                              "text-sm transition-colors duration-200",
                              "text-gray-600 dark:text-slate-300"
                            )}>
                              Resim yüklemek için tıklayın
                            </p>
                            <p className={cn(
                              "text-xs mt-1 transition-colors duration-200",
                              "text-gray-500 dark:text-slate-500"
                            )}>
                              PNG, JPG 5MB'a kadar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingAd(false)} 
                      className={cn(
                        "transition-all duration-200",
                        "border-gray-300 text-gray-700",
                        "dark:border-slate-600 dark:text-slate-300"
                      )}
                    >
                      İptal
                    </Button>
                    <Button className={cn(
                      "transition-all duration-200",
                      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    )}>
                      Reklam Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-4">
            {currentAds.sort((a, b) => a.priority - b.priority).map((ad) => (
              <div 
                key={ad.id} 
                className={cn(
                  "rounded-lg p-4 border transition-all duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/30 dark:border-slate-700",
                  draggedAd === ad.id && "opacity-50"
                )}
                draggable
                onDragStart={(e) => handleAdDragStart(e, ad.id)}
                onDragOver={handleAdDragOver}
                onDrop={(e) => handleAdDrop(e, ad.id)}
                onDragEnd={() => setDraggedAd(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className={cn(
                      "w-4 h-4 cursor-move transition-colors duration-200",
                      "text-gray-400 dark:text-slate-500"
                    )} />
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={cn(
                          "font-semibold mb-1 transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {ad.title}
                        </h3>
                        <p className={cn(
                          "text-sm mb-2 transition-colors duration-200",
                          "text-gray-600 dark:text-slate-300"
                        )}>
                          {ad.description}
                        </p>
                        <div className={cn(
                          "flex items-center space-x-4 text-xs transition-colors duration-200",
                          "text-gray-500 dark:text-slate-400"
                        )}>
                          <span>{getTimeSince(ad.createdAt)}</span>
                          <span className="flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            {ad.clicks} tıklama
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {ad.impressions} gösterim
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {getClickThroughRate(ad.clicks, ad.impressions)} CTR
                          </span>
                          <Badge variant="outline" className={cn(
                            "text-xs transition-colors duration-200",
                            "border-gray-300 text-gray-600",
                            "dark:border-slate-600 dark:text-slate-300"
                          )}>
                            {ad.displayType}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("text-xs", getPriorityColor(ad.priority))}>
                          Öncelik {ad.priority}
                        </Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-gray-300 hover:bg-gray-100 text-gray-600",
                            "dark:border-slate-600 dark:hover:bg-slate-600 dark:text-slate-300"
                          )}
                          onClick={() => toggleArchive(ad.id, 'ad')}
                        >
                          {ad.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-gray-300 hover:bg-gray-100 text-gray-600",
                            "dark:border-slate-600 dark:hover:bg-slate-600 dark:text-slate-300"
                          )}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-red-300 hover:bg-red-50 text-red-600",
                            "dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                          )}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Featured Products Tab */}
        <TabsContent value="featured" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className={cn(
                "text-xl font-semibold transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
                Öne Çıkan Ürünler
              </h2>
              <p className={cn(
                "transition-colors duration-200",
                "text-gray-600 dark:text-slate-400"
              )}>
                Menüden ürün seçerek öne çıkarın
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className={cn(
                  "transition-all duration-200",
                  "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                )}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ürün Seç
                </Button>
              </DialogTrigger>
              <DialogContent className={cn(
                "max-w-2xl transition-colors duration-200",
                "bg-white border-gray-200",
                "dark:bg-slate-800 dark:border-slate-700"
              )}>
                <DialogHeader>
                  <DialogTitle className={cn(
                    "transition-colors duration-200",
                    "text-gray-900 dark:text-white"
                  )}>
                    Öne Çıkaracak Ürün Seçin
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors",
                        "border-gray-300 bg-white",
                        "dark:border-slate-600 dark:bg-slate-700/30"
                      )}
                      onClick={() => addProductToFeatured(item)}
                    >
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className={cn(
                        "font-medium mb-1 transition-colors duration-200",
                        "text-gray-900 dark:text-white"
                      )}>
                        {item.name}
                      </h3>
                      <p className={cn(
                        "text-lg font-bold transition-colors duration-200",
                        "text-blue-600 dark:text-blue-400"
                      )}>
                        ₺{item.price}
                      </p>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "transition-all duration-200",
                      "border-gray-300 text-gray-700",
                      "dark:border-slate-600 dark:text-slate-300"
                    )}
                  >
                    İptal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {featuredProducts.sort((a, b) => a.displayOrder - b.displayOrder).map((product) => (
              <div key={product.id} className={cn(
                "rounded-lg p-4 border transition-colors duration-200",
                "bg-white border-gray-200",
                "dark:bg-slate-800/30 dark:border-slate-700"
              )}>
                <div className="flex items-center space-x-4">
                  <GripVertical className={cn(
                    "w-4 h-4 cursor-move transition-colors duration-200",
                    "text-gray-400 dark:text-slate-500"
                  )} />
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={product.productImage} 
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={cn(
                          "font-semibold transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {product.productName}
                        </h3>
                        <p className={cn(
                          "font-bold transition-colors duration-200",
                          "text-blue-600 dark:text-blue-400"
                        )}>
                          ₺{product.productPrice}
                        </p>
                        <p className={cn(
                          "text-xs transition-colors duration-200",
                          "text-gray-500 dark:text-slate-400"
                        )}>
                          Eklenme: {product.addedAt.toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-8 w-8 transition-all duration-200",
                            "border-red-300 hover:bg-red-50 text-red-600",
                            "dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                          )}
                          onClick={() => removeFromFeatured(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}