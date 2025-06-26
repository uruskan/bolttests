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
import { Slider } from '@/components/ui/slider';
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
  Palette,
  Type,
  Layout,
  Save,
  RotateCcw,
  Download,
  Upload,
  Target,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  content: string;
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnail: string;
  createdAt: Date;
  expiresAt: Date;
  views: number;
  likes: number;
  active: boolean;
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  startTime: string;
  endTime: string;
  priority: number;
  active: boolean;
  clicks: number;
  impressions: number;
  targetAudience: string;
  createdAt: Date;
}

interface FeaturedProduct {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  displayOrder: number;
  isActive: boolean;
  addedAt: Date;
}

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('stories');
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [selectedStoryType, setSelectedStoryType] = useState<'image' | 'video'>('image');
  
  // Theme customization states
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#8B5CF6');
  const [accentColor, setAccentColor] = useState('#EC4899');
  const [fontSize, setFontSize] = useState([16]);
  const [borderRadius, setBorderRadius] = useState([8]);
  const [spacing, setSpacing] = useState([16]);

  const stories: Story[] = [
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
      active: true
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
      active: true
    }
  ];

  const advertisements: Advertisement[] = [
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
      clicks: 234,
      impressions: 1567,
      targetAudience: 'Tüm müşteriler',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
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
      clicks: 156,
      impressions: 934,
      targetAudience: 'Hafta sonu ziyaretçileri',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  ];

  const featuredProducts: FeaturedProduct[] = [
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

  const presetThemes = [
    {
      name: 'Modern Mavi',
      colors: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#EC4899' },
      description: 'Temiz mavi ve mor tonları'
    },
    {
      name: 'Klasik Elegans',
      colors: { primary: '#1F2937', secondary: '#6B7280', accent: '#D1D5DB' },
      description: 'Sofistike gri tonları'
    },
    {
      name: 'Akdeniz',
      colors: { primary: '#0EA5E9', secondary: '#22C55E', accent: '#FCD34D' },
      description: 'Okyanus mavisi ve zeytin yeşili'
    },
    {
      name: 'Sıcak İtalyan',
      colors: { primary: '#E11D48', secondary: '#F97316', accent: '#A3907C' },
      description: 'Gül altını ve sıcak turuncular'
    }
  ];

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}s ${minutesLeft}dk kaldı`;
    }
    return `${minutesLeft}dk kaldı`;
  };

  const getTimeSince = (createdAt: Date) => {
    const now = new Date();
    const timePassed = now.getTime() - createdAt.getTime();
    const hoursPassed = Math.floor(timePassed / (1000 * 60 * 60));
    
    if (hoursPassed > 0) {
      return `${hoursPassed}s önce`;
    }
    const minutesPassed = Math.floor(timePassed / (1000 * 60));
    return `${minutesPassed}dk önce`;
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 2: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 3: return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'Yüksek';
      case 2: return 'Orta';
      case 3: return 'Düşük';
      default: return 'Normal';
    }
  };

  const getClickThroughRate = (clicks: number, impressions: number) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(1) + '%';
  };

  const applyPresetTheme = (theme: typeof presetThemes[0]) => {
    setPrimaryColor(theme.colors.primary);
    setSecondaryColor(theme.colors.secondary);
    setAccentColor(theme.colors.accent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">İçerik Yönetimi</h1>
          <p className="text-slate-400 mt-1">Hikayeler, reklamlar, öne çıkan ürünler ve tema ayarları</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
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
          <TabsTrigger value="theme" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Palette className="w-4 h-4 mr-2" />
            Tema
          </TabsTrigger>
        </TabsList>

        {/* Stories Tab */}
        <TabsContent value="stories" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Instagram Tarzı Hikayeler</h2>
              <p className="text-slate-400">24 saat süreyle aktif kalır</p>
            </div>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="relative group">
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-slate-700 relative">
                  <img 
                    src={story.thumbnail} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  {story.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-blue-600 ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold mb-1">{story.title}</h3>
                      <p className="text-sm text-gray-200 mb-2 line-clamp-2">{story.content}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {story.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {story.likes}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-white/20 border-white/30 hover:bg-white/30">
                            <Edit className="w-4 h-4 text-white" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-white/20 border-white/30 hover:bg-white/30">
                            <Share className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/60 text-white border-none">
                      <Clock className="w-3 h-3 mr-1" />
                      {getTimeRemaining(story.expiresAt)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-medium text-white truncate">{story.title}</h3>
                  <div className="flex items-center justify-between text-sm text-slate-400 mt-1">
                    <span>{getTimeSince(story.createdAt)}</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {story.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {story.likes}
                      </span>
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
              <h2 className="text-xl font-semibold text-white">Reklam Kampanyaları</h2>
              <p className="text-slate-400">Zamanlı reklamlar ve promosyonlar</p>
            </div>
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

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="startTime" className="text-slate-300">Başlangıç Saati</Label>
                      <Input id="startTime" type="time" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-slate-300">Bitiş Saati</Label>
                      <Input id="endTime" type="time" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-slate-300">Öncelik</Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Öncelik seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="high">Yüksek Öncelik</SelectItem>
                          <SelectItem value="medium">Orta Öncelik</SelectItem>
                          <SelectItem value="low">Düşük Öncelik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="activeToggle" />
                    <Label htmlFor="activeToggle" className="text-slate-300">Hemen aktifleştir</Label>
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
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Aktif Reklamlar</p>
                    <p className="text-2xl font-bold text-white">{advertisements.filter(ad => ad.active).length}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Toplam Tıklama</p>
                    <p className="text-2xl font-bold text-white">
                      {advertisements.reduce((sum, ad) => sum + ad.clicks, 0)}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Gösterimler</p>
                    <p className="text-2xl font-bold text-white">
                      {advertisements.reduce((sum, ad) => sum + ad.impressions, 0)}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Ort. CTR</p>
                    <p className="text-2xl font-bold text-white">
                      {getClickThroughRate(
                        advertisements.reduce((sum, ad) => sum + ad.clicks, 0),
                        advertisements.reduce((sum, ad) => sum + ad.impressions, 0)
                      )}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {advertisements.map((ad) => (
              <div key={ad.id} className="border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors bg-slate-800/30">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{ad.title}</h3>
                        <p className="text-slate-300 mb-2">{ad.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {ad.startTime} - {ad.endTime}
                          </div>
                          {ad.linkUrl && (
                            <div className="flex items-center">
                              <LinkIcon className="w-4 h-4 mr-1" />
                              Link ekli
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("border", getPriorityColor(ad.priority))}>
                          {getPriorityLabel(ad.priority)}
                        </Badge>
                        <Badge className={ad.active ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-slate-500/20 text-slate-300 border-slate-500/30"}>
                          {ad.active ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-white">{ad.impressions.toLocaleString()}</div>
                          <div className="text-slate-400">Gösterim</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{ad.clicks.toLocaleString()}</div>
                          <div className="text-slate-400">Tıklama</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{getClickThroughRate(ad.clicks, ad.impressions)}</div>
                          <div className="text-slate-400">CTR</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
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
              <p className="text-slate-400">Ana sayfada gösterilecek özel ürünler</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Ürün Ekle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-slate-700">
                    <img 
                      src={product.productImage} 
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{product.productName}</h3>
                      <Badge className={product.isActive ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-slate-500/20 text-slate-300 border-slate-500/30"}>
                        {product.isActive ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">₺{product.productPrice}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-red-600 hover:bg-red-600/20 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      Eklenme: {product.addedAt.toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Tema Özelleştirme</h2>
              <p className="text-slate-400">Restoranınızın marka görünümünü özelleştirin</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-300">
                <Upload className="w-4 h-4 mr-2" />
                Tema İçe Aktar
              </Button>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-300">
                <Download className="w-4 h-4 mr-2" />
                Tema Dışa Aktar
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Save className="w-4 h-4 mr-2" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50">
                  <TabsTrigger value="colors" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                    <Palette className="w-4 h-4 mr-2" />
                    Renkler
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                    <Type className="w-4 h-4 mr-2" />
                    Tipografi
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                    <Layout className="w-4 h-4 mr-2" />
                    Düzen
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-6">
                  {/* Preset Themes */}
                  <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Hazır Temalar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {presetThemes.map((theme) => (
                          <div
                            key={theme.name}
                            className="border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors"
                            onClick={() => applyPresetTheme(theme)}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex space-x-1">
                                <div 
                                  className="w-4 h-4 rounded-full border border-slate-500"
                                  style={{ backgroundColor: theme.colors.primary }}
                                />
                                <div 
                                  className="w-4 h-4 rounded-full border border-slate-500"
                                  style={{ backgroundColor: theme.colors.secondary }}
                                />
                                <div 
                                  className="w-4 h-4 rounded-full border border-slate-500"
                                  style={{ backgroundColor: theme.colors.accent }}
                                />
                              </div>
                              <h3 className="font-medium text-white">{theme.name}</h3>
                            </div>
                            <p className="text-sm text-slate-400">{theme.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Custom Colors */}
                  <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Özel Renkler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="primaryColor" className="text-slate-300">Ana Renk</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <input
                              type="color"
                              id="primaryColor"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                            />
                            <div>
                              <div className="font-medium text-white">Ana Renk</div>
                              <div className="text-sm text-slate-400">{primaryColor}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="secondaryColor" className="text-slate-300">İkincil Renk</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <input
                              type="color"
                              id="secondaryColor"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                            />
                            <div>
                              <div className="font-medium text-white">İkincil</div>
                              <div className="text-sm text-slate-400">{secondaryColor}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="accentColor" className="text-slate-300">Vurgu Rengi</Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <input
                              type="color"
                              id="accentColor"
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                              className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                            />
                            <div>
                              <div className="font-medium text-white">Vurgu</div>
                              <div className="text-sm text-slate-400">{accentColor}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="typography" className="space-y-6">
                  <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Yazı Tipi Boyutu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-300">Temel Yazı Boyutu: {fontSize[0]}px</Label>
                          <Slider
                            value={fontSize}
                            onValueChange={setFontSize}
                            max={24}
                            min={12}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <p style={{ fontSize: `${fontSize[0]}px` }} className="text-white">
                            Bu metin seçilen yazı boyutuyla nasıl görüneceğini gösterir.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Kenar Yuvarlaklığı</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-300">Köşe Yuvarlaklığı: {borderRadius[0]}px</Label>
                          <Slider
                            value={borderRadius}
                            onValueChange={setBorderRadius}
                            max={24}
                            min={0}
                            step={2}
                            className="mt-2"
                          />
                        </div>
                        <div className="flex space-x-4">
                          <div 
                            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500"
                            style={{ borderRadius: `${borderRadius[0]}px` }}
                          />
                          <div 
                            className="w-16 h-16 border-2 border-slate-500"
                            style={{ borderRadius: `${borderRadius[0]}px` }}
                          />
                          <div 
                            className="w-16 h-16 bg-slate-600"
                            style={{ borderRadius: `${borderRadius[0]}px` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">Boşluk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-300">Temel Boşluk: {spacing[0]}px</Label>
                          <Slider
                            value={spacing}
                            onValueChange={setSpacing}
                            max={32}
                            min={8}
                            step={2}
                            className="mt-2"
                          />
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <div 
                            className="bg-slate-800 border border-slate-600 rounded-lg text-white"
                            style={{ padding: `${spacing[0]}px` }}
                          >
                            <p>Bu kart seçilen boşluk değerini kullanır.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Eye className="w-5 h-5 mr-2" />
                    Canlı Önizleme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Preview Header */}
                    <div 
                      className="p-4 text-white rounded-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        borderRadius: `${borderRadius[0]}px`
                      }}
                    >
                      <h3 className="font-bold text-lg" style={{ fontSize: `${fontSize[0] + 4}px` }}>
                        SayNDone
                      </h3>
                      <p className="text-sm opacity-90">Restaurant Dashboard</p>
                    </div>

                    {/* Preview Card */}
                    <div 
                      className="border border-slate-600 bg-slate-800"
                      style={{ 
                        borderRadius: `${borderRadius[0]}px`,
                        padding: `${spacing[0]}px`
                      }}
                    >
                      <h4 className="font-semibold mb-2 text-white" style={{ fontSize: `${fontSize[0] + 2}px` }}>
                        Menü Öğesi
                      </h4>
                      <p className="text-slate-300 mb-3" style={{ fontSize: `${fontSize[0]}px` }}>
                        Taze malzemelerle lezzetli makarna
                      </p>
                      <button
                        className="text-white px-4 py-2 rounded font-medium"
                        style={{ 
                          backgroundColor: primaryColor,
                          borderRadius: `${borderRadius[0] / 2}px`,
                          fontSize: `${fontSize[0] - 2}px`
                        }}
                      >
                        Sipariş Ver
                      </button>
                    </div>

                    {/* Preview Buttons */}
                    <div className="space-y-2">
                      <button
                        className="w-full text-white py-2 px-4 rounded font-medium"
                        style={{ 
                          backgroundColor: primaryColor,
                          borderRadius: `${borderRadius[0]}px`,
                          fontSize: `${fontSize[0]}px`
                        }}
                      >
                        Ana Buton
                      </button>
                      <button
                        className="w-full border-2 py-2 px-4 rounded font-medium"
                        style={{ 
                          borderColor: primaryColor,
                          color: primaryColor,
                          borderRadius: `${borderRadius[0]}px`,
                          fontSize: `${fontSize[0]}px`
                        }}
                      >
                        İkincil Buton
                      </button>
                    </div>

                    {/* Reset Button */}
                    <Button 
                      variant="outline" 
                      className="w-full mt-6 border-slate-600 text-slate-300"
                      onClick={() => {
                        setPrimaryColor('#3B82F6');
                        setSecondaryColor('#8B5CF6');
                        setAccentColor('#EC4899');
                        setFontSize([16]);
                        setBorderRadius([8]);
                        setSpacing([16]);
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Varsayılana Sıfırla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}