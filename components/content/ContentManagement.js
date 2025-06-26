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
  const [adDuration, setAdDuration] = useState('süresiz');
  const [showArchived, setShowArchived] = useState(false);

  // Sample menu items for featured products selection
  const menuItems = [
    { id: '1', name: 'Pasta Carbonara', image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400', price: 89.99 },
    { id: '2', name: 'Margherita Pizza', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400', price: 75.99 },
    { id: '3', name: 'Risotto ai Funghi', image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400', price: 95.99 },
    { id: '4', name: 'Tiramisu', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400', price: 45.99 },
  ];

  const stories = [
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
  ];

  const advertisements = [
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
      displayType: 'banner' // banner, popup, hero-slider
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
  ];

  const featuredProducts = [
    {
      id: '1',
      productId: 'pasta-1',
      productName: 'Pasta Carbonara',
      productImage: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      productPrice: 89.99,
      displayOrder: 1,
      isActive: true,
      addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      productId: 'pizza-1',
      productName: 'Margherita Pizza',
      productImage: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      productPrice: 75.99,
      displayOrder: 2,
      isActive: true,
      addedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

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
      case 1: return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 2: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 3: return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getClickThroughRate = (clicks, impressions) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(1) + '%';
  };

  const toggleArchive = (id, type) => {
    console.log(`Toggling archive for ${type} ${id}`);
  };

  const currentStories = showArchived ? stories.filter(s => s.archived) : stories.filter(s => !s.archived);
  const currentAds = showArchived ? advertisements.filter(a => a.archived) : advertisements.filter(a => !a.archived);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">İçerik Yönetimi</h1>
          <p className="text-slate-400 mt-1">Hikayeler, reklamlar ve öne çıkan ürünler</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowArchived(!showArchived)}
            className="border-slate-600 hover:bg-slate-700 text-slate-300"
          >
            {showArchived ? <ArchiveRestore className="w-4 h-4 mr-2" /> : <Archive className="w-4 h-4 mr-2" />}
            {showArchived ? 'Aktif İçerikleri Göster' : 'Arşivi Göster'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="stories" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler
          </TabsTrigger>
          <TabsTrigger value="ads" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkanlar
          </TabsTrigger>
        </TabsList>

        {/* Stories Tab */}
        <TabsContent value="stories" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {showArchived ? 'Arşivlenmiş Hikayeler' : 'Aktif Hikayeler'}
              </h2>
              <p className="text-slate-400">
                {showArchived ? 'Süresi dolmuş hikayeler' : '24 saat süreyle aktif kalır'}
              </p>
            </div>
            {!showArchived && (
              <Dialog open={isAddingStory} onOpenChange={setIsAddingStory}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Hikaye Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Yeni Hikaye Oluştur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-slate-300">Hikaye Türü</Label>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          variant={selectedStoryType === 'image' ? 'default' : 'outline'}
                          onClick={() => setSelectedStoryType('image')}
                          className={selectedStoryType === 'image' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'border-slate-600 text-slate-300'}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Resim
                        </Button>
                        <Button
                          variant={selectedStoryType === 'video' ? 'default' : 'outline'}
                          onClick={() => setSelectedStoryType('video')}
                          className={selectedStoryType === 'video' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'border-slate-600 text-slate-300'}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-300">Süre</Label>
                      <Select value={storyDuration} onValueChange={setStoryDuration}>
                        <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="süresiz">Süresiz</SelectItem>
                          <SelectItem value="24h">24 Saat</SelectItem>
                          <SelectItem value="custom">Özel Gün Sayısı</SelectItem>
                        </SelectContent>
                      </Select>
                      {storyDuration === 'custom' && (
                        <Input 
                          type="number" 
                          placeholder="Gün sayısı" 
                          className="mt-2 bg-slate-700 border-slate-600 text-white" 
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="storyTitle" className="text-slate-300">Hikaye Başlığı</Label>
                          <Input id="storyTitle" placeholder="ör. Taze Makarna Yapımı" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                        </div>
                        <div>
                          <Label htmlFor="storyDescription" className="text-slate-300">Açıklama</Label>
                          <Textarea 
                            id="storyDescription" 
                            placeholder="Bu hikayede neler oluyor..." 
                            className="mt-1 h-24 bg-slate-700 border-slate-600 text-white" 
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-300">{selectedStoryType === 'image' ? 'Resim' : 'Video'} Yükle</Label>
                          <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                            <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-300">
                              Tıklayın veya sürükleyip bırakın
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {selectedStoryType === 'image' ? 'PNG, JPG 10MB\'a kadar' : 'MP4, MOV 50MB\'a kadar'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingStory(false)} className="border-slate-600 text-slate-300">
                      İptal
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Hikaye Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-4">
            {currentStories.sort((a, b) => a.priority - b.priority).map((story, index) => (
              <div key={story.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-slate-500 cursor-move" />
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
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
                        <h3 className="font-semibold text-white mb-1">{story.title}</h3>
                        <p className="text-slate-300 text-sm mb-2">{story.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
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
                          className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300"
                          onClick={() => toggleArchive(story.id, 'story')}
                        >
                          {story.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-red-600 hover:bg-red-600/20 text-red-400">
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
              <h2 className="text-xl font-semibold text-white">
                {showArchived ? 'Arşivlenmiş Reklamlar' : 'Aktif Reklamlar'}
              </h2>
              <p className="text-slate-400">Zamanlı reklamlar ve promosyonlar</p>
            </div>
            {!showArchived && (
              <Dialog open={isAddingAd} onOpenChange={setIsAddingAd}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Reklam Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Yeni Reklam Oluştur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-slate-300">Görüntüleme Türü</Label>
                      <Select defaultValue="banner">
                        <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="popup">Pop-up</SelectItem>
                          <SelectItem value="hero-slider">Hero Slider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Süre</Label>
                      <Select value={adDuration} onValueChange={setAdDuration}>
                        <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="süresiz">Süresiz</SelectItem>
                          <SelectItem value="24h">24 Saat</SelectItem>
                          <SelectItem value="custom">Özel Gün Sayısı</SelectItem>
                        </SelectContent>
                      </Select>
                      {adDuration === 'custom' && (
                        <Input 
                          type="number" 
                          placeholder="Gün sayısı" 
                          className="mt-2 bg-slate-700 border-slate-600 text-white" 
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="adTitle" className="text-slate-300">Reklam Başlığı</Label>
                          <Input id="adTitle" placeholder="ör. Happy Hour Özel" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                        </div>
                        <div>
                          <Label htmlFor="adDescription" className="text-slate-300">Açıklama</Label>
                          <Textarea 
                            id="adDescription" 
                            placeholder="Promosyonunuzu tanımlayın..." 
                            className="mt-1 h-20 bg-slate-700 border-slate-600 text-white" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkUrl" className="text-slate-300">Link URL (Opsiyonel)</Label>
                          <Input id="linkUrl" placeholder="https://website.com/promosyon" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-300">Resim Yükle</Label>
                          <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                            <Megaphone className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-300">Resim yüklemek için tıklayın</p>
                            <p className="text-xs text-slate-500 mt-1">PNG, JPG 5MB'a kadar</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingAd(false)} className="border-slate-600 text-slate-300">
                      İptal
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Reklam Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-4">
            {currentAds.sort((a, b) => a.priority - b.priority).map((ad) => (
              <div key={ad.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-slate-500 cursor-move" />
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
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
                        <h3 className="font-semibold text-white mb-1">{ad.title}</h3>
                        <p className="text-slate-300 text-sm mb-2">{ad.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
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
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
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
                          className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300"
                          onClick={() => toggleArchive(ad.id, 'ad')}
                        >
                          {ad.archived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-red-600 hover:bg-red-600/20 text-red-400">
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
              <h2 className="text-xl font-semibold text-white">Öne Çıkan Ürünler</h2>
              <p className="text-slate-400">Menüden ürün seçerek öne çıkarın</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Ürün Seç
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Öne Çıkaracak Ürün Seçin</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-white mb-1">{item.name}</h3>
                      <p className="text-lg font-bold text-blue-400">₺{item.price}</p>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    İptal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {featuredProducts.sort((a, b) => a.displayOrder - b.displayOrder).map((product) => (
              <div key={product.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center space-x-4">
                  <GripVertical className="w-4 h-4 text-slate-500 cursor-move" />
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img 
                      src={product.productImage} 
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{product.productName}</h3>
                        <p className="text-blue-400 font-bold">₺{product.productPrice}</p>
                        <p className="text-xs text-slate-400">
                          Eklenme: {product.addedAt.toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch checked={product.isActive} />
                        <Button variant="outline" size="icon" className="h-8 w-8 border-red-600 hover:bg-red-600/20 text-red-400">
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