'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
        active: category.active ?? true
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
          </DialogTitle>
          <DialogDescription>
            Kategori bilgilerini girin. Kaydet butonuna tıklayarak değişiklikleri uygulayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              İsim
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Açıklama
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Resim URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Aktif
            </Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SimpleProductFormDialog({ product, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    active: true,
    featured: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        image: product.image || '',
        category: product.category || '',
        active: product.active ?? true,
        featured: product.featured ?? false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        active: true,
        featured: false
      });
    }
  }, [product, open]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </DialogTitle>
          <DialogDescription>
            Ürün bilgilerini girin. Kaydet butonuna tıklayarak değişiklikleri uygulayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              İsim
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Açıklama
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Fiyat
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Resim URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Aktif
            </Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featured" className="text-right">
              Öne Çıkan
            </Label>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SimpleStoryFormDialog({ story, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    thumbnail: '',
    active: true,
    expiresAt: null,
    expirationType: '24h'
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || '',
        type: story.type || 'image',
        thumbnail: story.thumbnail || '',
        active: story.active ?? true,
        expiresAt: story.expiresAt || null,
        expirationType: story.expirationType || '24h'
      });
    } else {
      setFormData({
        title: '',
        type: 'image',
        thumbnail: '',
        active: true,
        expiresAt: null,
        expirationType: '24h'
      });
    }
  }, [story, open]);

  const handleSave = () => {
    let expiresAt = null;
    
    if (formData.expirationType === '24h') {
      expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (formData.expirationType === 'custom' && formData.customExpiry) {
      expiresAt = new Date(formData.customExpiry);
    }
    
    onSave({
      ...formData,
      expiresAt
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {story ? 'Hikayeyi Düzenle' : 'Yeni Hikaye Oluştur'}
          </DialogTitle>
          <DialogDescription>
            Hikaye bilgilerini girin. Kaydet butonuna tıklayarak değişiklikleri uygulayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Başlık
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tür
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Resim</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Resim URL
            </Label>
            <Input
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expirationType" className="text-right">
              Süre
            </Label>
            <Select value={formData.expirationType} onValueChange={(value) => setFormData(prev => ({ ...prev, expirationType: value }))}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Saat</SelectItem>
                <SelectItem value="custom">Özel Tarih</SelectItem>
                <SelectItem value="never">Süresiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.expirationType === 'custom' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customExpiry" className="text-right">
                Bitiş Tarihi
              </Label>
              <Input
                id="customExpiry"
                type="datetime-local"
                value={formData.customExpiry || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, customExpiry: e.target.value }))}
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Aktif
            </Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SimpleAdvertisementFormDialog({ advertisement, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    active: true,
    expiresAt: null,
    expirationType: 'custom'
  });

  useEffect(() => {
    if (advertisement) {
      setFormData({
        title: advertisement.title || '',
        description: advertisement.description || '',
        image: advertisement.image || '',
        active: advertisement.active ?? true,
        expiresAt: advertisement.expiresAt || null,
        expirationType: advertisement.expirationType || 'custom'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        active: true,
        expiresAt: null,
        expirationType: 'custom'
      });
    }
  }, [advertisement, open]);

  const handleSave = () => {
    let expiresAt = null;
    
    if (formData.expirationType === 'custom' && formData.customExpiry) {
      expiresAt = new Date(formData.customExpiry);
    }
    
    onSave({
      ...formData,
      expiresAt
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {advertisement ? 'Reklamı Düzenle' : 'Yeni Reklam Oluştur'}
          </DialogTitle>
          <DialogDescription>
            Reklam bilgilerini girin. Kaydet butonuna tıklayarak değişiklikleri uygulayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Başlık
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Açıklama
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Resim URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expirationType" className="text-right">
              Süre
            </Label>
            <Select value={formData.expirationType} onValueChange={(value) => setFormData(prev => ({ ...prev, expirationType: value }))}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Özel Tarih</SelectItem>
                <SelectItem value="never">Süresiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.expirationType === 'custom' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customExpiry" className="text-right">
                Bitiş Tarihi
              </Label>
              <Input
                id="customExpiry"
                type="datetime-local"
                value={formData.customExpiry || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, customExpiry: e.target.value }))}
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Aktif
            </Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturedProductSelectionDialog({ open, onOpenChange, onSave, existingProducts }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: ''
  });

  // Mock product data for selection
  const availableProducts = [
    {
      id: 'new-1',
      name: 'Spaghetti Bolognese',
      description: 'Geleneksel İtalyan usulü et soslu makarna',
      price: 85,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Makarnalar'
    },
    {
      id: 'new-2',
      name: 'Caesar Salad',
      description: 'Taze marul, parmesan peyniri ve kruton',
      price: 55,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Salatalar'
    },
    {
      id: 'new-3',
      name: 'Grilled Salmon',
      description: 'Izgara somon balığı, sebze garnitürü ile',
      price: 120,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ana Yemekler'
    }
  ];

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: ''
    });
  };

  const handleSelectProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Öne Çıkan Ürün Ekle</DialogTitle>
          <DialogDescription>
            Mevcut ürünlerden birini seçin veya yeni ürün bilgilerini girin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-sm font-medium">Mevcut Ürünlerden Seç</Label>
            <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
              {availableProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => handleSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">₺{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <Label className="text-sm font-medium">Veya Yeni Ürün Bilgileri</Label>
            <div className="grid gap-4 mt-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  İsim
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Fiyat
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Resim URL
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Kategori
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={!formData.name}>
            Öne Çıkanlara Ekle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}