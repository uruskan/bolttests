'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Calendar,
  TrendingUp,
  Users,
  Heart,
  Share2,
  Play,
  Image as ImageIcon,
  Megaphone,
  Star,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Empty State Component
function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground mb-4">
        <Icon className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      {onAction && (
        <Button onClick={onAction}>
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Content Item Component
function ContentItem({ item, type, onEdit, onDelete, onToggleActive }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'stories': return <Camera className="w-4 h-4" />;
      case 'ads': return <Megaphone className="w-4 h-4" />;
      case 'featured': return <Star className="w-4 h-4" />;
      default: return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all duration-200 hover:shadow-md",
      "bg-card border-border"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              getTypeIcon()
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          </div>
        </div>
        <Badge className={getStatusColor(item.status)}>
          {item.status === 'active' ? 'Aktif' : 
           item.status === 'draft' ? 'Taslak' : 
           item.status === 'inactive' ? 'Pasif' : item.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{item.views || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{item.likes || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{item.createdAt || 'Henüz oluşturulmadı'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onToggleActive(item.id)}
          >
            {item.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(item)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:text-red-700"
            onClick={() => onDelete(item)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('stories');

  // Empty state - no mock data
  const [stories, setStories] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);

  const handleAddContent = (type) => {
    console.log(`Adding new ${type} content`);
    // This would open a form dialog in a real implementation
  };

  const handleEditContent = (item) => {
    console.log('Editing content:', item);
    // This would open an edit form dialog
  };

  const handleDeleteContent = (item) => {
    console.log('Deleting content:', item);
    // This would show a confirmation dialog and then delete
  };

  const handleToggleActive = (itemId) => {
    console.log('Toggling active status for:', itemId);
    // This would toggle the active status
  };

  const getFilteredContent = (content) => {
    return content.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTabStats = (content) => {
    const active = content.filter(item => item.status === 'active').length;
    const total = content.length;
    return { active, total };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">İçerik Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Hikayeler, reklamlar ve öne çıkan içerikleri yönetin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="İçerik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 bg-background border-border"
            />
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted border border-border">
          <TabsTrigger 
            value="stories" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler ({getTabStats(stories).active}/{getTabStats(stories).total})
          </TabsTrigger>
          <TabsTrigger 
            value="ads" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar ({getTabStats(advertisements).active}/{getTabStats(advertisements).total})
          </TabsTrigger>
          <TabsTrigger 
            value="featured" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkanlar ({getTabStats(featuredItems).active}/{getTabStats(featuredItems).total})
          </TabsTrigger>
        </TabsList>

        {/* Stories Tab */}
        <TabsContent value="stories" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Hikayeler</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddContent('story')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Hikaye Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stories.length === 0 ? (
                <EmptyState
                  icon={Camera}
                  title="Henüz hikaye eklenmemiş"
                  description="Müşterilerinizle etkileşim kurmak için ilk hikayanizi ekleyin"
                  actionLabel="İlk Hikayeyi Ekle"
                  onAction={() => handleAddContent('story')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent(stories).map((story) => (
                    <ContentItem
                      key={story.id}
                      item={story}
                      type="stories"
                      onEdit={handleEditContent}
                      onDelete={handleDeleteContent}
                      onToggleActive={handleToggleActive}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advertisements Tab */}
        <TabsContent value="ads" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Reklamlar</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddContent('ad')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Reklam Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {advertisements.length === 0 ? (
                <EmptyState
                  icon={Megaphone}
                  title="Henüz reklam eklenmemiş"
                  description="Kampanyalarınızı duyurmak için ilk reklamınızı oluşturun"
                  actionLabel="İlk Reklamı Ekle"
                  onAction={() => handleAddContent('ad')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent(advertisements).map((ad) => (
                    <ContentItem
                      key={ad.id}
                      item={ad}
                      type="ads"
                      onEdit={handleEditContent}
                      onDelete={handleDeleteContent}
                      onToggleActive={handleToggleActive}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Items Tab */}
        <TabsContent value="featured" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Öne Çıkan İçerikler</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddContent('featured')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Öne Çıkan Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {featuredItems.length === 0 ? (
                <EmptyState
                  icon={Star}
                  title="Henüz öne çıkan içerik yok"
                  description="Özel ürünlerinizi ve kampanyalarınızı öne çıkarın"
                  actionLabel="İlk Öne Çıkanı Ekle"
                  onAction={() => handleAddContent('featured')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent(featuredItems).map((item) => (
                    <ContentItem
                      key={item.id}
                      item={item}
                      type="featured"
                      onEdit={handleEditContent}
                      onDelete={handleDeleteContent}
                      onToggleActive={handleToggleActive}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Görüntülenme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Henüz veri yok
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Etkileşim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Heart className="w-3 h-3 mr-1" />
              Henüz etkileşim yok
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif İçerik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stories.filter(s => s.status === 'active').length + 
               advertisements.filter(a => a.status === 'active').length + 
               featuredItems.filter(f => f.status === 'active').length}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Users className="w-3 h-3 mr-1" />
              Toplam içerik sayısı
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}