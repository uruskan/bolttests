'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Camera,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent, useCreateContent, useUpdateContent, useDeleteContent } from '@/lib/react-query/hooks/useContent';
import { apiClient } from '@/lib/api/client';

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

// Content Form Dialog
function ContentFormDialog({ open, onOpenChange, content, type, onSave }) {
  const [formData, setFormData] = useState({
    title: content?.title || '',
    description: content?.description || '',
    image_url: content?.image_url || '',
    type: type || content?.type || 'story',
    status: content?.status || 'draft'
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, image_url: url }));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {content ? 'İçerik Düzenle' : 'Yeni İçerik Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image">Görsel</Label>
            <div className="mt-2">
              {formData.image_url ? (
                <div className="relative">
                  <img 
                    src={formData.image_url} 
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? 'Yükleniyor...' : 'Görsel yüklemek için tıklayın'}
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">
              {content ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
      case 'story': return <Camera className="w-4 h-4" />;
      case 'advertisement': return <Megaphone className="w-4 h-4" />;
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
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
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
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onToggleActive(item)}
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
  const [activeTab, setActiveTab] = useState('story');
  const [formDialog, setFormDialog] = useState({ open: false, content: null, type: null });

  // React Query hooks
  const { data: allContent = [], isLoading } = useContent();
  const createContent = useCreateContent();
  const updateContent = useUpdateContent();
  const deleteContent = useDeleteContent();

  const handleAddContent = (type) => {
    setFormDialog({ open: true, content: null, type });
  };

  const handleEditContent = (item) => {
    setFormDialog({ open: true, content: item, type: item.type });
  };

  const handleDeleteContent = (item) => {
    if (confirm(`"${item.title}" içeriğini silmek istediğinizden emin misiniz?`)) {
      deleteContent.mutate(item.id);
    }
  };

  const handleToggleActive = (item) => {
    const newStatus = item.status === 'active' ? 'inactive' : 'active';
    updateContent.mutate({ id: item.id, status: newStatus });
  };

  const handleSaveContent = (formData) => {
    if (formDialog.content) {
      updateContent.mutate({ id: formDialog.content.id, ...formData });
    } else {
      createContent.mutate(formData);
    }
  };

  const getFilteredContent = (type) => {
    return allContent
      .filter(item => item.type === type)
      .filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const getTabStats = (type) => {
    const content = allContent.filter(item => item.type === type);
    const active = content.filter(item => item.status === 'active').length;
    const total = content.length;
    return { active, total };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">İçerik Yönetimi</h1>
            <p className="text-muted-foreground mt-1">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

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
            value="story" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler ({getTabStats('story').active}/{getTabStats('story').total})
          </TabsTrigger>
          <TabsTrigger 
            value="advertisement" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar ({getTabStats('advertisement').active}/{getTabStats('advertisement').total})
          </TabsTrigger>
          <TabsTrigger 
            value="featured" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkanlar ({getTabStats('featured').active}/{getTabStats('featured').total})
          </TabsTrigger>
        </TabsList>

        {/* Stories Tab */}
        <TabsContent value="story" className="space-y-6">
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
              {getFilteredContent('story').length === 0 ? (
                <EmptyState
                  icon={Camera}
                  title="Henüz hikaye eklenmemiş"
                  description="Müşterilerinizle etkileşim kurmak için ilk hikayanizi ekleyin"
                  actionLabel="İlk Hikayeyi Ekle"
                  onAction={() => handleAddContent('story')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent('story').map((story) => (
                    <ContentItem
                      key={story.id}
                      item={story}
                      type="story"
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
        <TabsContent value="advertisement" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Reklamlar</CardTitle>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddContent('advertisement')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Reklam Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {getFilteredContent('advertisement').length === 0 ? (
                <EmptyState
                  icon={Megaphone}
                  title="Henüz reklam eklenmemiş"
                  description="Kampanyalarınızı duyurmak için ilk reklamınızı oluşturun"
                  actionLabel="İlk Reklamı Ekle"
                  onAction={() => handleAddContent('advertisement')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent('advertisement').map((ad) => (
                    <ContentItem
                      key={ad.id}
                      item={ad}
                      type="advertisement"
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
              {getFilteredContent('featured').length === 0 ? (
                <EmptyState
                  icon={Star}
                  title="Henüz öne çıkan içerik yok"
                  description="Özel ürünlerinizi ve kampanyalarınızı öne çıkarın"
                  actionLabel="İlk Öne Çıkanı Ekle"
                  onAction={() => handleAddContent('featured')}
                />
              ) : (
                <div className="space-y-4">
                  {getFilteredContent('featured').map((item) => (
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
            <div className="text-2xl font-bold text-foreground">
              {allContent.reduce((sum, item) => sum + (item.metadata?.views || 0), 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Tüm içerikler
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Etkileşim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {allContent.reduce((sum, item) => sum + (item.metadata?.interactions || 0), 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Heart className="w-3 h-3 mr-1" />
              Beğeni ve paylaşım
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif İçerik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {allContent.filter(item => item.status === 'active').length}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Users className="w-3 h-3 mr-1" />
              Toplam {allContent.length} içerik
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Form Dialog */}
      <ContentFormDialog
        open={formDialog.open}
        onOpenChange={(open) => setFormDialog(prev => ({ ...prev, open }))}
        content={formDialog.content}
        type={formDialog.type}
        onSave={handleSaveContent}
      />
    </div>
  );
}