'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChefHat, 
  DollarSign,
  Clock,
  Star,
  Move,
  Grid,
  List,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  isActive: boolean;
  isFeatured: boolean;
  prepTime?: string;
  dietary: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
  itemCount: number;
  isActive: boolean;
}

export function MenuManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string>('appetizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');

  const categories: Category[] = [
    { id: 'appetizers', name: 'Başlangıçlar', description: 'Lezzetli başlangıç tarifleri', order: 1, itemCount: 8, isActive: true },
    { id: 'pasta', name: 'Makarnalar', description: 'Ev yapımı taze makarnalar', order: 2, itemCount: 12, isActive: true },
    { id: 'pizza', name: 'Pizzalar', description: 'Odun ateşinde ince hamur', order: 3, itemCount: 10, isActive: true },
    { id: 'mains', name: 'Ana Yemekler', description: 'Doyurucu İtalyan yemekleri', order: 4, itemCount: 15, isActive: true },
    { id: 'desserts', name: 'Tatlılar', description: 'Tatlı son', order: 5, itemCount: 6, isActive: true },
    { id: 'beverages', name: 'İçecekler', description: 'İçecekler ve şaraplar', order: 6, itemCount: 20, isActive: false },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 45.99,
      category: 'appetizers',
      prepTime: '10 dk',
      dietary: ['vegetarian'],
      isFeatured: true,
      isActive: true
    },
    {
      id: '2', 
      name: 'Antipasto Misto',
      description: 'Şarküteri, peynir ve marine sebze seçkisi',
      price: 68.99,
      category: 'appetizers',
      prepTime: '5 dk',
      dietary: [],
      isFeatured: false,
      isActive: true
    },
    {
      id: '3',
      name: 'Arancini',
      description: 'Mozzarella ve bezelyeli çıtır risotto topları',
      price: 52.99,
      originalPrice: 59.99,
      category: 'appetizers',
      prepTime: '15 dk',
      dietary: ['vegetarian'],
      isFeatured: true,
      isActive: false
    },
    {
      id: '4',
      name: 'Calamari Fritti',
      description: 'Marinara soslu altın renginde kızarmış kalamar halkaları',
      price: 61.99,
      category: 'appetizers',
      prepTime: '12 dk',
      dietary: [],
      isFeatured: false,
      isActive: true
    },
  ];

  const filteredItems = menuItems
    .filter(item => item.category === selectedCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getDietaryBadgeColor = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'vegan': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'gluten-free': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'spicy': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const handlePriceEdit = (itemId: string, currentPrice: number) => {
    setEditingPrice(itemId);
    setTempPrice(currentPrice.toString());
  };

  const handlePriceSave = (itemId: string) => {
    // Here you would update the price via API
    console.log(`Updating price for item ${itemId} to ${tempPrice}`);
    setEditingPrice(null);
    setTempPrice('');
  };

  const handlePriceCancel = () => {
    setEditingPrice(null);
    setTempPrice('');
  };

  const toggleItemStatus = (itemId: string) => {
    // Here you would toggle the item status via API
    console.log(`Toggling status for item ${itemId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menü Yönetimi</h1>
          <p className="text-slate-400 mt-1">Menü kategorilerinizi ve öğelerinizi düzenleyin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-300">
                <Plus className="w-4 h-4 mr-2" />
                Kategori Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Yeni Kategori Ekle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName" className="text-slate-300">Kategori Adı</Label>
                  <Input id="categoryName" placeholder="ör. Deniz Ürünleri" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="categoryDescription" className="text-slate-300">Açıklama</Label>
                  <Textarea id="categoryDescription" placeholder="Bu kategorinin kısa açıklaması" className="mt-1 h-20 bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingCategory(false)} className="border-slate-600 text-slate-300">
                  İptal
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Kategori Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Öğe Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Yeni Menü Öğesi Ekle</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="itemName" className="text-slate-300">Öğe Adı</Label>
                    <Input id="itemName" placeholder="ör. Pasta Carbonara" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="itemPrice" className="text-slate-300">Fiyat (₺)</Label>
                    <Input id="itemPrice" type="number" step="0.01" placeholder="0.00" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="prepTime" className="text-slate-300">Hazırlık Süresi</Label>
                    <Input id="prepTime" placeholder="ör. 15 dk" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="itemDescription" className="text-slate-300">Açıklama</Label>
                    <Textarea id="itemDescription" placeholder="Yemeği tanımlayın..." className="mt-1 h-24 bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Diyet Seçenekleri</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Vejetaryen', 'Vegan', 'Glutensiz', 'Acılı'].map((option) => (
                        <Badge key={option} variant="outline" className="cursor-pointer hover:bg-blue-500/20 border-slate-600 text-slate-300">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingItem(false)} className="border-slate-600 text-slate-300">
                  İptal
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Öğe Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ChefHat className="w-5 h-5 mr-2 text-blue-400" />
                Kategoriler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-3 text-left transition-all duration-200",
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className={cn(
                        "text-xs mt-1",
                        selectedCategory === category.id ? "text-blue-200" : "text-slate-500"
                      )}>
                        {category.description}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        {category.itemCount}
                      </Badge>
                      {!category.isActive && (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      )}
                      <Move className="w-4 h-4 opacity-50" />
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Items Panel */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <CardTitle className="capitalize text-white">
                  {categories.find(c => c.id === selectedCategory)?.name} ({filteredItems.length} öğe)
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Öğe ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-blue-500' : 'text-slate-400 hover:text-white'}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-blue-500' : 'text-slate-400 hover:text-white'}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "gap-6",
                viewMode === 'grid' ? "grid grid-cols-1 xl:grid-cols-2" : "space-y-4"
              )}>
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "bg-slate-700/30 rounded-lg p-4 transition-all duration-200 border cursor-pointer",
                      item.isActive 
                        ? "border-slate-600 hover:border-blue-500/50 hover:bg-slate-700/50" 
                        : "border-slate-700 opacity-60"
                    )}
                    onClick={() => toggleItemStatus(item.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          {item.isFeatured && (
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Öne Çıkan
                            </Badge>
                          )}
                          {!item.isActive && (
                            <Badge variant="destructive" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                              Pasif
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{item.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-slate-400 mb-2">
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {editingPrice === item.id ? (
                              <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                <Input
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handlePriceSave(item.id);
                                    if (e.key === 'Escape') handlePriceCancel();
                                  }}
                                  className="w-20 h-6 text-xs bg-slate-600 border-slate-500 text-white"
                                  autoFocus
                                />
                                <Button size="sm" onClick={() => handlePriceSave(item.id)} className="h-6 px-2 text-xs">
                                  ✓
                                </Button>
                              </div>
                            ) : (
                              <span 
                                className="cursor-pointer hover:text-blue-400 font-medium"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePriceEdit(item.id, item.price);
                                }}
                              >
                                ₺{item.price}
                                {item.originalPrice && (
                                  <span className="line-through text-slate-500 ml-1">₺{item.originalPrice}</span>
                                )}
                              </span>
                            )}
                          </div>
                          {item.prepTime && (
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.prepTime}
                            </div>
                          )}
                        </div>

                        {item.dietary.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.dietary.map((diet) => (
                              <Badge key={diet} className={cn("text-xs border", getDietaryBadgeColor(diet))}>
                                {diet}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-600 hover:bg-slate-600 text-slate-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-red-600 hover:bg-red-600/20 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <ChefHat className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Öğe bulunamadı</h3>
                  <p className="text-slate-400 mb-4">
                    {searchTerm 
                      ? `"${searchTerm}" ile eşleşen öğe bulunamadı.` 
                      : "Bu kategoride henüz öğe yok."}
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={() => setIsAddingItem(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Öğeyi Ekle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}