'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  X, 
  Camera, 
  Image as ImageIcon,
  Clock,
  Calendar,
  Star,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Story Form Dialog
export function SimpleStoryFormDialog({ story, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    thumbnail: '',
    active: true,
    expirationType: '24h',
    customDays: 1
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || '',
        type: story.type || 'image',
        thumbnail: story.thumbnail || '',
        active: story.active !== undefined ? story.active : true,
        expirationType: story.expirationType || '24h',
        customDays: story.customDays || 1
      });
    } else {
      setFormData({
        title: '',
        type: 'image',
        thumbnail: '',
        active: true,
        expirationType: '24h',
        customDays: 1
      });
    }
  }, [story, open]);

  const handleSave = () => {
    let expiresAt = null;
    
    if (formData.expirationType === '24h') {
      expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (formData.expirationType === 'custom') {
      expiresAt = new Date(Date.now() + formData.customDays * 24 * 60 * 60 * 1000);
    }
    // If 'never', expiresAt remains null

    const storyData = {
      ...formData,
      expiresAt,
      archived: false
    };

    onSave(storyData);
    onOpenChange(false);
  };

  const isUnarchiving = story?.isUnarchiving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isUnarchiving ? 'Hikayeyi Arşivden Çıkar' : story ? 'Hikayeyi Düzenle' : 'Yeni Hikaye Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isUnarchiving && (
            <>
              {/* Title */}
              <div>
                <Label className="text-foreground">Başlık (Opsiyonel)</Label>
                <Input
                  placeholder="Örn: Günün Özel Menüsü"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 bg-background border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Hikaye üzerinde gösterilecek kısa başlık
                </p>
              </div>

              {/* Type Selection */}
              <div>
                <Label className="text-foreground">Hikaye Türü</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image" className="flex items-center text-foreground">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Resim
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="flex items-center text-foreground">
                      <Camera className="w-4 h-4 mr-2" />
                      Video
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-foreground">Hikaye Görseli *</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.type === 'video' ? 'MP4, MOV 10MB\'a kadar' : 'JPG, PNG 5MB\'a kadar'}
                  </p>
                  <p className="text-xs text-muted-foreground">9:16 Dikey Format Önerilen</p>
                </div>
              </div>
            </>
          )}

          {/* Expiration Settings */}
          <div>
            <Label className="text-foreground">Hikaye Süresi</Label>
            <RadioGroup 
              value={formData.expirationType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, expirationType: value }))}
              className="mt-2 space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <RadioGroupItem value="never" id="never" />
                <Label htmlFor="never" className="flex-1 text-foreground">
                  <div className="font-medium">Süresiz</div>
                  <div className="text-sm text-muted-foreground">Hikaye siz silene kadar aktif kalır</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <RadioGroupItem value="24h" id="24h" />
                <Label htmlFor="24h" className="flex-1 text-foreground">
                  <div className="font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    24 Saat
                  </div>
                  <div className="text-sm text-muted-foreground">Instagram tarzı, 24 saat sonra otomatik arşivlenir</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="flex-1 text-foreground">
                  <div className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Özel Süre
                  </div>
                  <div className="text-sm text-muted-foreground">Belirttiğiniz gün sayısı kadar aktif kalır</div>
                </Label>
              </div>
            </RadioGroup>
            
            {formData.expirationType === 'custom' && (
              <div className="mt-3 flex items-center space-x-2">
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={formData.customDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, customDays: parseInt(e.target.value) || 1 }))}
                  className="w-20 bg-background border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground">gün</span>
              </div>
            )}
          </div>

          {!isUnarchiving && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active" className="text-foreground">Bu hikayeyi menüde göster</Label>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {isUnarchiving ? 'Arşivden Çıkar' : story ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Advertisement Form Dialog
export function SimpleAdvertisementFormDialog({ advertisement, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    active: true,
    expirationType: 'never',
    customDays: 7
  });

  useEffect(() => {
    if (advertisement) {
      setFormData({
        title: advertisement.title || '',
        description: advertisement.description || '',
        image: advertisement.image || '',
        active: advertisement.active !== undefined ? advertisement.active : true,
        expirationType: advertisement.expirationType || 'never',
        customDays: advertisement.customDays || 7
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        active: true,
        expirationType: 'never',
        customDays: 7
      });
    }
  }, [advertisement, open]);

  const handleSave = () => {
    let expiresAt = null;
    
    if (formData.expirationType === 'custom') {
      expiresAt = new Date(Date.now() + formData.customDays * 24 * 60 * 60 * 1000);
    }
    // If 'never', expiresAt remains null

    const adData = {
      ...formData,
      expiresAt,
      archived: false
    };

    onSave(adData);
    onOpenChange(false);
  };

  const isUnarchiving = advertisement?.isUnarchiving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isUnarchiving ? 'Reklamı Arşivden Çıkar' : advertisement ? 'Reklamı Düzenle' : 'Yeni Reklam Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isUnarchiving && (
            <>
              {/* Title */}
              <div>
                <Label className="text-foreground">Reklam Başlığı *</Label>
                <Input
                  placeholder="Örn: Happy Hour İndirimi"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-foreground">Açıklama</Label>
                <Textarea
                  placeholder="Reklam içeriği ve özellikleri..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 h-20 bg-background border-border text-foreground"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-foreground">Reklam Görseli *</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG 5MB'a kadar</p>
                  <p className="text-xs text-muted-foreground">16:9 Yatay Format Önerilen</p>
                </div>
              </div>
            </>
          )}

          {/* Expiration Settings */}
          <div>
            <Label className="text-foreground">Reklam Süresi</Label>
            <RadioGroup 
              value={formData.expirationType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, expirationType: value }))}
              className="mt-2 space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <RadioGroupItem value="never" id="never-ad" />
                <Label htmlFor="never-ad" className="flex-1 text-foreground">
                  <div className="font-medium">Süresiz</div>
                  <div className="text-sm text-muted-foreground">Reklam siz silene kadar aktif kalır</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <RadioGroupItem value="custom" id="custom-ad" />
                <Label htmlFor="custom-ad" className="flex-1 text-foreground">
                  <div className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Belirli Süre
                  </div>
                  <div className="text-sm text-muted-foreground">Belirttiğiniz gün sayısı kadar aktif kalır</div>
                </Label>
              </div>
            </RadioGroup>
            
            {formData.expirationType === 'custom' && (
              <div className="mt-3 flex items-center space-x-2">
                <Input
                  type="number"
                  min="1"
                  max="365"
                  value={formData.customDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, customDays: parseInt(e.target.value) || 7 }))}
                  className="w-20 bg-background border-border text-foreground"
                />
                <span className="text-sm text-muted-foreground">gün</span>
              </div>
            )}
          </div>

          {!isUnarchiving && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active-ad"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active-ad" className="text-foreground">Bu reklamı menüde göster</Label>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {isUnarchiving ? 'Arşivden Çıkar' : advertisement ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Featured Product Selection Dialog
export function FeaturedProductSelectionDialog({ open, onOpenChange, onSave, existingProducts = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock product data - in real app this would come from your menu items
  const allProducts = [
    {
      id: 'p1',
      name: 'Spaghetti Bolognese',
      description: 'Geleneksel İtalyan usulü et soslu makarna',
      price: 85,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Makarnalar'
    },
    {
      id: 'p2',
      name: 'Caesar Salad',
      description: 'Taze marul, parmesan peyniri ve kruton ile',
      price: 55,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Salatalar'
    },
    {
      id: 'p3',
      name: 'Grilled Salmon',
      description: 'Izgara somon balığı, sebze garnitürü ile',
      price: 120,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ana Yemekler'
    },
    {
      id: 'p4',
      name: 'Chocolate Lava Cake',
      description: 'Sıcak çikolatalı sufle, vanilyalı dondurma ile',
      price: 45,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Tatlılar'
    },
    {
      id: 'p5',
      name: 'Quattro Stagioni Pizza',
      description: 'Dört mevsim pizzası, karışık malzemeler',
      price: 75,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizzalar'
    }
  ];

  // Filter out already featured products
  const existingProductIds = existingProducts.map(p => p.id);
  const availableProducts = allProducts.filter(p => !existingProductIds.includes(p.id));

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (selectedProduct) {
      onSave(selectedProduct);
      setSelectedProduct(null);
      setSearchTerm('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setSearchTerm('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Öne Çıkan Ürün Seç</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>

          {/* Product List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {availableProducts.length === 0 ? 
                  'Tüm ürünler zaten öne çıkanlar listesinde' : 
                  'Aradığınız ürün bulunamadı'
                }
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "flex items-center space-x-4 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    selectedProduct?.id === product.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  )}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <div className="font-bold text-primary">₺{product.price}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{product.description}</p>
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      {product.category}
                    </Badge>
                  </div>
                  
                  {selectedProduct?.id === product.id && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleClose}>
            İptal
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!selectedProduct}
            className="bg-primary hover:bg-primary/90"
          >
            <Star className="w-4 h-4 mr-2" />
            Öne Çıkan Yap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Category Form Dialog
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
            {category ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label className="text-foreground">Kategori Adı *</Label>
            <Input
              placeholder="Örn: Ana Yemekler"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-foreground">Açıklama</Label>
            <Input
              placeholder="Kategori açıklaması..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-foreground">Kategori Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG 2MB'a kadar</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active-category"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active-category" className="text-foreground">Bu kategoriyi menüde göster</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {category ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Product Form Dialog
export function SimpleProductFormDialog({ product, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    active: true,
    featured: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        active: product.active !== undefined ? product.active : true,
        featured: product.featured || false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        active: true,
        featured: false
      });
    }
  }, [product, open]);

  const handleSave = () => {
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0
    };
    onSave(productData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <Label className="text-foreground">Ürün Görseli</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG 2MB'a kadar</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label className="text-foreground">Ürün Adı *</Label>
            <Input
              placeholder="Örn: Margherita Pizza"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-foreground">Açıklama</Label>
            <Textarea
              placeholder="Ürün içeriği ve özellikleri..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 h-20 bg-background border-border text-foreground"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">Fiyat (TL) *</Label>
              <Input
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
              <Label className="text-foreground">İndirimli Fiyat (İndirim için)</Label>
              <Input
                type="number"
                placeholder="0.00"
                className="mt-1 bg-background border-border text-foreground"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">İndirimli ürünler için eski fiyatı girin</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured-product"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured-product" className="text-foreground">Öne çıkan ürün olarak göster</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active-product"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active-product" className="text-foreground">Bu ürünü menüde göster</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {product ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}