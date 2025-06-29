'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Simple Product Form Dialog
export function SimpleProductFormDialog({ product, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
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
        featured: false,
        active: true
      });
    }
  }, [product, open]);

  const handleSave = () => {
    const saveData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null
    };
    onSave(saveData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {product ? 'Ürünü Düzenle' : 'Yeni Ürün'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Image */}
          <div>
            <Label className="text-foreground font-medium">Ürün Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Görsel Seç</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB</p>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <Label htmlFor="productName" className="text-foreground font-medium">
              Ürün Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productName"
              placeholder="Örn: Margherita Pizza"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-foreground font-medium">Açıklama</Label>
            <Textarea
              id="description"
              placeholder="Ürün içeriği ve özellikleri..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground h-20 resize-none"
            />
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-foreground font-medium">
                Fiyat (TL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="originalPrice" className="text-foreground font-medium">
                Orijinal Fiyat (İndirim için)
              </Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="0.00"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">İndirimli ürünler için eski fiyatı girin</p>
            </div>
          </div>

          {/* Switches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground font-medium">Öne çıkan ürün olarak göster</Label>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-foreground font-medium">Bu ürün menüde görünsün</Label>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-border text-muted-foreground hover:bg-accent"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!formData.name || !formData.price}
          >
            {product ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simple Story Form Dialog
export function SimpleStoryFormDialog({ story, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    image: '',
    duration: 24,
    active: true
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || '',
        type: story.type || 'image',
        image: story.thumbnail || story.image || '',
        duration: parseInt(story.timeLeft) || 24,
        active: story.active !== undefined ? story.active : true
      });
    } else {
      setFormData({
        title: '',
        type: 'image',
        image: '',
        duration: 24,
        active: true
      });
    }
  }, [story, open]);

  const handleSave = () => {
    const saveData = {
      ...formData,
      thumbnail: formData.image
    };
    onSave(saveData);
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

        <div className="space-y-4">
          {/* Story Title */}
          <div>
            <Label htmlFor="storyTitle" className="text-foreground font-medium">
              Başlık (Opsiyonel)
            </Label>
            <Input
              id="storyTitle"
              placeholder="Örn: Günün Özel Menüsü"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">Hikaye üzerinde gösterilecek kısa başlık</p>
          </div>

          {/* Story Image */}
          <div>
            <Label className="text-foreground font-medium">
              Hikaye Görseli <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 aspect-[9/16] max-h-80 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">9:16 Dikey Format</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB - 9:16 önerilen</p>
            </div>
          </div>

          {/* Story Duration */}
          <div>
            <Label className="text-foreground font-medium">Hikaye Süresi</Label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="duration-auto"
                  name="duration"
                  checked={formData.duration === 0}
                  onChange={() => setFormData(prev => ({ ...prev, duration: 0 }))}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="duration-auto" className="text-foreground">
                  Süresiz
                  <span className="block text-xs text-muted-foreground">Hikaye siz silene kadar aktif kalır</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="duration-24"
                  name="duration"
                  checked={formData.duration === 24}
                  onChange={() => setFormData(prev => ({ ...prev, duration: 24 }))}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="duration-24" className="text-foreground">
                  24 Saat
                  <span className="block text-xs text-muted-foreground">Instagram tarzı, 24 saat sonra otomatik arşivlenir</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="duration-custom"
                  name="duration"
                  checked={formData.duration !== 0 && formData.duration !== 24}
                  onChange={() => setFormData(prev => ({ ...prev, duration: 7 }))}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="duration-custom" className="text-foreground">Özel Süre</Label>
                {formData.duration !== 0 && formData.duration !== 24 && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                      className="w-16 h-8 text-center bg-background border-border"
                      min="1"
                      max="168"
                    />
                    <span className="text-sm text-muted-foreground">gün</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-border text-muted-foreground hover:bg-accent"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!formData.image}
          >
            {story ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simple Advertisement Form Dialog
export function SimpleAdvertisementFormDialog({ advertisement, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    buttonText: 'Detayları Gör',
    link: '',
    active: true
  });

  useEffect(() => {
    if (advertisement) {
      setFormData({
        title: advertisement.title || '',
        description: advertisement.description || '',
        image: advertisement.image || '',
        buttonText: advertisement.buttonText || 'Detayları Gör',
        link: advertisement.link || '',
        active: advertisement.active !== undefined ? advertisement.active : true
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        buttonText: 'Detayları Gör',
        link: '',
        active: true
      });
    }
  }, [advertisement, open]);

  const handleSave = () => {
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

        <div className="space-y-4">
          {/* Advertisement Image */}
          <div>
            <Label className="text-foreground font-medium">
              Reklam Görseli <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">16:9 Format Önerilen</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="adTitle" className="text-foreground font-medium">
              Reklam Başlığı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="adTitle"
              placeholder="Örn: Happy Hour İndirimi"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="adDescription" className="text-foreground font-medium">Açıklama</Label>
            <Textarea
              id="adDescription"
              placeholder="Reklam detayları ve açıklaması..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground h-20 resize-none"
            />
          </div>

          {/* Button Text and Link */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buttonText" className="text-foreground font-medium">Buton Metni</Label>
              <Input
                id="buttonText"
                placeholder="Detayları Gör"
                value={formData.buttonText}
                onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="link" className="text-foreground font-medium">Link (Opsiyonel)</Label>
              <Input
                id="link"
                placeholder="https://..."
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <Label className="text-foreground font-medium">Reklamı aktif olarak yayınla</Label>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-border text-muted-foreground hover:bg-accent"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!formData.title || !formData.image}
          >
            {advertisement ? 'Güncelle' : 'Oluştur'}
          </Button>
        </div>
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

  const handleSave = () => {
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

        <div className="space-y-4">
          {/* Category Image */}
          <div>
            <Label className="text-foreground font-medium">Kategori Görseli</Label>
            <div className="mt-2 aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Kategori Banner Görseli</p>
              <p className="text-xs text-muted-foreground">JPG, PNG - Maks 5MB</p>
            </div>
          </div>

          {/* Category Name */}
          <div>
            <Label htmlFor="categoryName" className="text-foreground font-medium">
              Kategori Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="categoryName"
              placeholder="Örn: Ana Yemekler"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="categoryDescription" className="text-foreground font-medium">Açıklama</Label>
            <Textarea
              id="categoryDescription"
              placeholder="Kategori açıklaması..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground h-20 resize-none"
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between">
            <Label className="text-foreground font-medium">Bu kategori menüde görünsün</Label>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-border text-muted-foreground hover:bg-accent"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!formData.name}
          >
            {category ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Featured Product Selection Dialog
export function FeaturedProductSelectionDialog({ open, onOpenChange, onSave, existingProducts = [] }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Mock available products - in real app, this would come from props or API
  const availableProducts = [
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 46,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Başlangıçlar'
    },
    {
      id: '2',
      name: 'Pasta Carbonara',
      description: 'Geleneksel İtalyan usulü kremalı makarna',
      price: 78,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Makarnalar'
    },
    {
      id: '3',
      name: 'Margherita Pizza',
      description: 'Klasik domates, mozzarella ve fesleğen',
      price: 65,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizzalar'
    },
    {
      id: '4',
      name: 'Tiramisu',
      description: 'Ev yapımı geleneksel İtalyan tatlısı',
      price: 35,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Tatlılar'
    },
    {
      id: '5',
      name: 'Caesar Salad',
      description: 'Taze marul, parmesan ve kruton ile',
      price: 42,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Salatalar'
    }
  ];

  // Filter out already featured products
  const existingProductIds = existingProducts.map(p => p.id);
  const selectableProducts = availableProducts.filter(p => !existingProductIds.includes(p.id));

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, { ...product, featured: true, active: true }];
      }
    });
  };

  const handleSave = () => {
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
          <p className="text-muted-foreground text-sm">
            Mevcut ürünlerinizden öne çıkarmak istediğinizi seçin
          </p>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 gap-3">
            {selectableProducts.map((product) => {
              const isSelected = selectedProducts.find(p => p.id === product.id);
              return (
                <div
                  key={product.id}
                  className={cn(
                    "flex items-center space-x-4 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  )}
                  onClick={() => handleProductToggle(product)}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-muted-foreground">{product.category}</span>
                      <span className="font-semibold text-foreground">₺{product.price}</span>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    isSelected 
                      ? "border-primary bg-primary" 
                      : "border-border"
                  )}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectableProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tüm ürünler zaten öne çıkarılmış</p>
            </div>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Seçilen ürünler ({selectedProducts.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map(product => (
                <div key={product.id} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  <span>{product.name}</span>
                  <button
                    onClick={() => handleProductToggle(product)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedProducts([]);
              onOpenChange(false);
            }}
            className="flex-1 border-border text-muted-foreground hover:bg-accent"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={selectedProducts.length === 0}
          >
            {selectedProducts.length} Ürünü Öne Çıkar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}