'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  X, 
  ImageIcon, 
  Clock, 
  Star,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Simple Product Form Dialog
export function SimpleProductFormDialog({ product, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    category: 'Başlangıçlar',
    featured: false,
    active: true
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        originalPrice: product.originalPrice?.toString() || '',
        image: product.image || '',
        category: product.category || 'Başlangıçlar',
        featured: product.featured || false,
        active: product.active !== undefined ? product.active : true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        image: '',
        category: 'Başlangıçlar',
        featured: false,
        active: true
      });
    }
  }, [product, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null
    };

    onSave(productData);
    onOpenChange(false);
  };

  const categories = ['Başlangıçlar', 'Makarnalar', 'Pizzalar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {product ? 'Ürünü Düzenle' : 'Yeni Ürün'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div>
            <Label className="text-foreground">Ürün Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-accent/20">
              {formData.image ? (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Product preview"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Değiştir
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Görsel URL'si (isteğe bağlı)</p>
                </>
              )}
            </div>
            <Input
              placeholder="Görsel URL'si (isteğe bağlı)"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-2 bg-background border-border text-foreground"
            />
            <Button type="button" variant="outline" size="sm" className="mt-2">
              <Upload className="w-4 h-4 mr-2" />
              Görsel Yükle
            </Button>
          </div>

          {/* Product Name */}
          <div>
            <Label htmlFor="productName" className="text-foreground">
              Ürün Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productName"
              placeholder="Örn: Margherita Pizza"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-foreground">Açıklama</Label>
            <Textarea
              id="description"
              placeholder="Ürün içeriği ve özellikleri..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 h-20 bg-background border-border text-foreground"
            />
          </div>

          {/* Price Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-foreground">
                Fiyat (TL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="originalPrice" className="text-foreground">
                Orijinal Fiyat (İndirim için)
              </Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">
                İndirimli ürünler için eski fiyatı girin
              </p>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label className="text-foreground">Kategori</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Switches */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Öne çıkan ürün olarak göster</Label>
                <p className="text-sm text-muted-foreground">Ana sayfada öne çıkan bölümünde görüntülenir</p>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Bu ürün menüde görünsün</Label>
                <p className="text-sm text-muted-foreground">Ürünün aktif/pasif durumu</p>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={!formData.name.trim() || !formData.price}
            >
              <Upload className="w-4 h-4 mr-2" />
              {product ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Simple Category Form Dialog
export function SimpleCategoryFormDialog({ category, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    active: true
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: category.image || '',
        active: category.active !== undefined ? category.active : true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        image: '',
        active: true
      });
    }
  }, [category, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {category ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Image */}
          <div>
            <Label className="text-foreground">Kategori Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-accent/20">
              {formData.image ? (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Category preview"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Değiştir
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Görsel URL'si (isteğe bağlı)</p>
                </>
              )}
            </div>
            <Input
              placeholder="Görsel URL'si (isteğe bağlı)"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-2 bg-background border-border text-foreground"
            />
            <Button type="button" variant="outline" size="sm" className="mt-2">
              <Upload className="w-4 h-4 mr-2" />
              Görsel Yükle
            </Button>
          </div>

          {/* Category Name */}
          <div>
            <Label htmlFor="categoryName" className="text-foreground">
              Kategori Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="categoryName"
              placeholder="Örn: Ana Yemekler"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="categoryDescription" className="text-foreground">Açıklama</Label>
            <Textarea
              id="categoryDescription"
              placeholder="Kategori açıklaması..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 h-20 bg-background border-border text-foreground"
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground font-medium">Bu kategori menüde görünsün</Label>
              <p className="text-sm text-muted-foreground">Kategorinin aktif/pasif durumu</p>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={!formData.name.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {category ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Simple Story Form Dialog
export function SimpleStoryFormDialog({ story, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    duration: 'unlimited',
    customDuration: '7',
    active: true
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || '',
        image: story.thumbnail || story.image || '',
        duration: story.duration || 'unlimited',
        customDuration: story.customDuration?.toString() || '7',
        active: story.active !== undefined ? story.active : true
      });
    } else {
      setFormData({
        title: '',
        image: '',
        duration: 'unlimited',
        customDuration: '7',
        active: true
      });
    }
  }, [story, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image.trim()) return;

    const storyData = {
      ...formData,
      type: 'image', // Default to image, can be enhanced later
      thumbnail: formData.image
    };

    onSave(storyData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {story ? 'Hikayeyi Düzenle' : 'Yeni Hikaye Ekle'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Story Title */}
          <div>
            <Label htmlFor="storyTitle" className="text-foreground">
              Başlık (Opsiyonel)
            </Label>
            <Input
              id="storyTitle"
              placeholder="Örn: Günün Özel Menüsü"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Hikaye üzerinde gösterilecek kısa başlık
            </p>
          </div>

          {/* Story Image */}
          <div>
            <Label className="text-foreground">
              Hikaye Görseli <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-accent/20">
              {formData.image ? (
                <div className="relative">
                  <div className="aspect-[9/16] w-32 mx-auto rounded-lg overflow-hidden mb-3">
                    <img 
                      src={formData.image} 
                      alt="Story preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">9:16 Dikey Format</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Değiştir
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">9:16 Dikey Format</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB - 9:16 önerilen</p>
                </>
              )}
            </div>
            <Input
              placeholder="Görsel URL'si"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-2 bg-background border-border text-foreground"
              required
            />
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Görsel Seç</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB - 9:16 önerilen</p>
            </div>
          </div>

          {/* Story Duration */}
          <div>
            <Label className="text-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Hikaye Süresi
            </Label>
            <RadioGroup 
              value={formData.duration} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
              className="mt-2 space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                <RadioGroupItem value="unlimited" id="unlimited" />
                <div className="flex-1">
                  <Label htmlFor="unlimited" className="font-medium text-foreground">Süresiz</Label>
                  <p className="text-sm text-muted-foreground">Hikaye siz silene kadar aktif kalır</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                <RadioGroupItem value="24hours" id="24hours" />
                <div className="flex-1">
                  <Label htmlFor="24hours" className="font-medium text-foreground">24 Saat</Label>
                  <p className="text-sm text-muted-foreground">Instagram tarzı, 24 saat sonra otomatik arşivlenir</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                <RadioGroupItem value="custom" id="custom" />
                <div className="flex-1">
                  <Label htmlFor="custom" className="font-medium text-foreground">Özel Süre</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.customDuration}
                      onChange={(e) => setFormData(prev => ({ ...prev, customDuration: e.target.value }))}
                      className="w-16 bg-background border-border text-foreground"
                      disabled={formData.duration !== 'custom'}
                    />
                    <span className="text-sm text-muted-foreground">gün</span>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={!formData.image.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {story ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Simple Advertisement Form Dialog (FIXED - No button section)
export function SimpleAdvertisementFormDialog({ advertisement, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    active: true
  });

  useEffect(() => {
    if (advertisement) {
      setFormData({
        title: advertisement.title || '',
        description: advertisement.description || '',
        image: advertisement.image || '',
        active: advertisement.active !== undefined ? advertisement.active : true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        active: true
      });
    }
  }, [advertisement, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {advertisement ? 'Reklamı Düzenle' : 'Yeni Reklam Oluştur'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Advertisement Title */}
          <div>
            <Label htmlFor="adTitle" className="text-foreground">
              Reklam Başlığı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="adTitle"
              placeholder="Örn: Happy Hour İndirimi"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
              required
            />
          </div>

          {/* Advertisement Description */}
          <div>
            <Label htmlFor="adDescription" className="text-foreground">
              Açıklama <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="adDescription"
              placeholder="Reklam detayları ve açıklaması..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 h-24 bg-background border-border text-foreground"
              required
            />
          </div>

          {/* Advertisement Image */}
          <div>
            <Label className="text-foreground">Reklam Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-accent/20">
              {formData.image ? (
                <div className="relative">
                  <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-3">
                    <img 
                      src={formData.image} 
                      alt="Advertisement preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">16:9 Format</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Değiştir
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">16:9 Yatay Format</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB - 16:9 önerilen</p>
                </>
              )}
            </div>
            <Input
              placeholder="Görsel URL'si (isteğe bağlı)"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-2 bg-background border-border text-foreground"
            />
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Görsel Seç</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB - 16:9 önerilen</p>
            </div>
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground font-medium">Bu reklam aktif olsun</Label>
              <p className="text-sm text-muted-foreground">Reklamın görünürlük durumu</p>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={!formData.title.trim() || !formData.description.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {advertisement ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Featured Product Selection Dialog
export function FeaturedProductSelectionDialog({ open, onOpenChange, onSave, existingProducts = [] }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Mock available products (in real app, this would come from props or API)
  const availableProducts = [
    {
      id: 'p1',
      name: 'Caesar Salad',
      description: 'Taze marul, parmesan peyniri ve özel sos',
      price: 42,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Başlangıçlar'
    },
    {
      id: 'p2',
      name: 'Grilled Salmon',
      description: 'Izgara somon, sebze garnitürü ile',
      price: 95,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ana Yemekler'
    },
    {
      id: 'p3',
      name: 'Chocolate Cake',
      description: 'Ev yapımı çikolatalı pasta',
      price: 28,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Tatlılar'
    },
    {
      id: 'p4',
      name: 'Mushroom Risotto',
      description: 'Kremalı mantar risottosu',
      price: 68,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ana Yemekler'
    }
  ];

  // Filter out already featured products
  const existingProductIds = existingProducts.map(p => p.id);
  const filteredProducts = availableProducts.filter(p => !existingProductIds.includes(p.id));

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleSubmit = () => {
    selectedProducts.forEach(product => {
      onSave(product);
    });
    setSelectedProducts([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Öne Çıkan Ürün Seç</DialogTitle>
          <p className="text-muted-foreground">
            Mevcut ürünlerinizden öne çıkarmak istediğinizi seçin
          </p>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Öne çıkarılabilecek ürün bulunamadı.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tüm ürünler zaten öne çıkan listesinde.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredProducts.map((product) => {
                const isSelected = selectedProducts.find(p => p.id === product.id);
                return (
                  <div
                    key={product.id}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => handleProductToggle(product)}
                  >
                    <Checkbox
                      checked={!!isSelected}
                      onChange={() => handleProductToggle(product)}
                      className="flex-shrink-0"
                    />
                    
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <span className="font-bold text-primary">₺{product.price}</span>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Seçili ürünler: {selectedProducts.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((product) => (
                <Badge key={product.id} variant="outline" className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{product.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
            disabled={selectedProducts.length === 0}
          >
            <Star className="w-4 h-4 mr-2" />
            {selectedProducts.length} Ürünü Öne Çıkar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}