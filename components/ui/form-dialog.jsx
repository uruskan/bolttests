'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  X, 
  Save, 
  Camera, 
  Video, 
  Image as ImageIcon,
  Star,
  Clock,
  Eye,
  Heart,
  MapPin,
  Phone,
  Instagram,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Story Form Dialog
export function StoryFormDialog({ story, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    type: story?.type || 'image',
    thumbnail: story?.thumbnail || '',
    duration: story?.duration || 24,
    active: story?.active ?? true,
    ...story
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!story;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            {isEditing ? 'Hikaye Düzenle' : 'Yeni Hikaye Oluştur'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Hikaye Başlığı</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Hikaye başlığını girin"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="type">İçerik Türü</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">
                    <div className="flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Resim
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <Label>Medya Dosyası</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              {formData.thumbnail ? (
                <div className="relative">
                  <img 
                    src={formData.thumbnail} 
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {formData.type === 'video' ? 'Video yüklemek için tıklayın' : 'Resim yüklemek için tıklayın'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.type === 'video' ? 'MP4, MOV 50MB\'a kadar' : 'PNG, JPG 10MB\'a kadar'}
                  </p>
                </>
              )}
            </div>
            <Input
              placeholder="Veya URL girin"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="mt-2"
            />
          </div>

          {/* Duration and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Süre (saat)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="24"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Hikaye {formData.duration} saat boyunca görünür olacak
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
              <div>
                <div className="font-medium">Aktif Durum</div>
                <div className="text-sm text-muted-foreground">Hikayeyi hemen yayınla</div>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Advertisement Form Dialog
export function AdvertisementFormDialog({ advertisement, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: advertisement?.title || '',
    description: advertisement?.description || '',
    image: advertisement?.image || '',
    buttonText: advertisement?.buttonText || 'Detayları Gör',
    buttonLink: advertisement?.buttonLink || '',
    startDate: advertisement?.startDate || '',
    endDate: advertisement?.endDate || '',
    active: advertisement?.active ?? true,
    ...advertisement
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!advertisement;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            {isEditing ? 'Reklam Düzenle' : 'Yeni Reklam Oluştur'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="action">Aksiyon</TabsTrigger>
            <TabsTrigger value="schedule">Zamanlama</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Reklam Başlığı</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Reklam başlığını girin"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Reklam açıklamasını girin"
                  className="mt-1 h-24"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Reklam Görseli</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                {formData.image ? (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Reklam görseli yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG 5MB'a kadar</p>
                  </>
                )}
              </div>
              <Input
                placeholder="Veya görsel URL'si girin"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="mt-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="action" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buttonText">Buton Metni</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                  placeholder="Buton metni"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="buttonLink">Buton Linki</Label>
                <Input
                  id="buttonLink"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-accent/30 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Önizleme</h4>
              <div className="bg-background rounded-lg p-4 border">
                <h3 className="font-semibold text-lg mb-2">{formData.title || 'Reklam Başlığı'}</h3>
                <p className="text-muted-foreground mb-4">{formData.description || 'Reklam açıklaması burada görünecek'}</p>
                <Button className="bg-primary hover:bg-primary/90">
                  {formData.buttonText || 'Detayları Gör'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Bitiş Tarihi</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
              <div>
                <div className="font-medium">Hemen Yayınla</div>
                <div className="text-sm text-muted-foreground">Reklamı oluşturulduktan sonra aktif yap</div>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Güncelle' : 'Oluştur'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Product Form Dialog
export function ProductFormDialog({ product, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    image: product?.image || '',
    featured: product?.featured || false,
    active: product?.active ?? true,
    allergens: product?.allergens || [],
    ingredients: product?.ingredients || '',
    preparationTime: product?.preparationTime || '',
    ...product
  });

  const categories = [
    'Başlangıçlar',
    'Makarnalar', 
    'Pizzalar',
    'Ana Yemekler',
    'Tatlılar',
    'İçecekler'
  ];

  const allergenOptions = [
    'Gluten', 'Süt', 'Yumurta', 'Balık', 'Kabuklu Deniz Ürünleri', 
    'Fındık', 'Soya', 'Susam', 'Kükürt Dioksit'
  ];

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            {isEditing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
            <TabsTrigger value="details">Detaylar</TabsTrigger>
            <TabsTrigger value="media">Medya</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Ürün Adı</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ürün adını girin"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Fiyat (₺)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ürün açıklamasını girin"
                className="mt-1 h-24"
              />
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div>
              <Label htmlFor="ingredients">İçerikler</Label>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                placeholder="Ürünün içeriklerini listeleyin"
                className="mt-1 h-20"
              />
            </div>

            <div>
              <Label htmlFor="preparationTime">Hazırlık Süresi (dakika)</Label>
              <Input
                id="preparationTime"
                type="number"
                min="0"
                value={formData.preparationTime}
                onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                placeholder="15"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Alerjenler</Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                {allergenOptions.map((allergen) => (
                  <div key={allergen} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={allergen}
                      checked={formData.allergens.includes(allergen)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            allergens: [...prev.allergens, allergen] 
                          }));
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            allergens: prev.allergens.filter(a => a !== allergen) 
                          }));
                        }
                      }}
                      className="rounded border-border"
                    />
                    <Label htmlFor={allergen} className="text-sm">{allergen}</Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div>
              <Label>Ürün Görseli</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                {formData.image ? (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Ürün görseli yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG 5MB'a kadar</p>
                  </>
                )}
              </div>
              <Input
                placeholder="Veya görsel URL'si girin"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="mt-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div>
                  <div className="font-medium">Öne Çıkan Ürün</div>
                  <div className="text-sm text-muted-foreground">Bu ürünü öne çıkanlar bölümünde göster</div>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div>
                  <div className="font-medium">Aktif Durum</div>
                  <div className="text-sm text-muted-foreground">Ürünü menüde göster</div>
                </div>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-accent/30 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Ürün Önizlemesi</h4>
              <div className="bg-background rounded-lg p-4 border">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0">
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{formData.name || 'Ürün Adı'}</h3>
                      {formData.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Star className="w-3 h-3 mr-1" />
                          Öne Çıkan
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formData.description || 'Ürün açıklaması'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">₺{formData.price || '0.00'}</span>
                      <Badge variant="outline">{formData.category || 'Kategori'}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Güncelle' : 'Oluştur'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Category Form Dialog
export function CategoryFormDialog({ category, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    image: category?.image || '',
    active: category?.active ?? true,
    sortOrder: category?.sortOrder || 0,
    ...category
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            {isEditing ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Kategori Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Kategori adını girin"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sortOrder">Sıralama</Label>
              <Input
                id="sortOrder"
                type="number"
                min="0"
                value={formData.sortOrder}
                onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Kategori açıklamasını girin"
              className="mt-1 h-20"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label>Kategori Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              {formData.image ? (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Kategori görseli yüklemek için tıklayın</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG 5MB'a kadar</p>
                </>
              )}
            </div>
            <Input
              placeholder="Veya görsel URL'si girin"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
            <div>
              <div className="font-medium">Aktif Durum</div>
              <div className="text-sm text-muted-foreground">Kategoriyi menüde göster</div>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}