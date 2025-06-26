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
  ChefHat, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Move,
  Copy,
  Archive
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MenuManagement() {
  const [activeTab, setActiveTab] = useState('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const categories = [
    {
      id: '1',
      name: 'Başlangıçlar',
      description: 'Lezzetli başlangıç tarifleri',
      itemCount: 8,
      active: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 1
    },
    {
      id: '2',
      name: 'Makarnalar',
      description: 'Ev yapımı taze makarnalar',
      itemCount: 12,
      active: true,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 2
    },
    {
      id: '3',
      name: 'Pizzalar',
      description: 'Odun ateşinde İnce hamur',
      itemCount: 10,
      active: true,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 3
    },
    {
      id: '4',
      name: 'Ana Yemekler',
      description: 'Doyurucu İtalyan yemekleri',
      itemCount: 15,
      active: true,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 4
    },
    {
      id: '5',
      name: 'Tatlılar',
      description: 'Tatlı son',
      itemCount: 6,
      active: true,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 5
    },
    {
      id: '6',
      name: 'İçecekler',
      description: 'İçecekler ve şaraplar',
      itemCount: 20,
      active: false,
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      order: 6
    }
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 45.99,
      category: 'Başlangıçlar',
      categoryId: '1',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: true,
      preparationTime: 10,
      allergens: ['Gluten'],
      calories: 180
    },
    {
      id: '2',
      name: 'Antipasto Misto',
      description: 'Karışık peynir ve marine sebze seçkisi',
      price: 68.99,
      category: 'Başlangıçlar',
      categoryId: '1',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: false,
      preparationTime: 5,
      allergens: ['Süt'],
      calories: 320
    },
    {
      id: '3',
      name: 'Arancini',
      description: 'Mozzarella ve bezelyeli çıtır risotto topları',
      price: 52.99,
      category: 'Başlangıçlar',
      categoryId: '1',
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: false,
      preparationTime: 15,
      allergens: ['Gluten', 'Süt'],
      calories: 280
    },
    {
      id: '4',
      name: 'Calamari Fritti',
      description: 'Limonla servis edilen kızarmış kalamar halkaları',
      price: 61.99,
      category: 'Başlangıçlar',
      categoryId: '1',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: false,
      preparationTime: 12,
      allergens: ['Gluten', 'Deniz Ürünleri'],
      calories: 240
    }
  ];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && category.active) ||
                         (statusFilter === 'inactive' && !category.active);
    return matchesSearch && matchesStatus;
  });

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.categoryId === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && item.active) ||
                         (statusFilter === 'inactive' && !item.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-bold transition-colors duration-200",
            "text-gray-900 dark:text-white"
          )}>
            Menü Yönetimi
          </h1>
          <p className={cn(
            "mt-1 transition-colors duration-200",
            "text-gray-600 dark:text-slate-400"
          )}>
            Menü kategorilerinizi ve öğelerinizi düzenleyin
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
            <DialogTrigger asChild>
              <Button variant="outline" className={cn(
                "transition-all duration-200",
                "border-gray-300 hover:bg-gray-100 text-gray-700",
                "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
              )}>
                <Plus className="w-4 h-4 mr-2" />
                Kategori Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className={cn(
              "max-w-2xl transition-colors duration-200",
              "bg-white border-gray-200",
              "dark:bg-slate-800 dark:border-slate-700"
            )}>
              <DialogHeader>
                <DialogTitle className={cn(
                  "transition-colors duration-200",
                  "text-gray-900 dark:text-white"
                )}>
                  Yeni Kategori Ekle
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName" className={cn(
                    "transition-colors duration-200",
                    "text-gray-700 dark:text-slate-300"
                  )}>
                    Kategori Adı
                  </Label>
                  <Input 
                    id="categoryName" 
                    placeholder="ör. Ana Yemekler" 
                    className={cn(
                      "mt-1 transition-all duration-200",
                      "bg-white border-gray-300 text-gray-900",
                      "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    )} 
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDescription" className={cn(
                    "transition-colors duration-200",
                    "text-gray-700 dark:text-slate-300"
                  )}>
                    Açıklama
                  </Label>
                  <Textarea 
                    id="categoryDescription" 
                    placeholder="Kategori açıklaması..." 
                    className={cn(
                      "mt-1 h-20 transition-all duration-200",
                      "bg-white border-gray-300 text-gray-900",
                      "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    )} 
                  />
                </div>
                <div>
                  <Label className={cn(
                    "transition-colors duration-200",
                    "text-gray-700 dark:text-slate-300"
                  )}>
                    Kategori Resmi
                  </Label>
                  <div className={cn(
                    "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                    "border-gray-300 bg-gray-50",
                    "dark:border-slate-600 dark:bg-slate-700/30"
                  )}>
                    <ImageIcon className={cn(
                      "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                      "text-gray-400 dark:text-slate-400"
                    )} />
                    <p className={cn(
                      "text-sm transition-colors duration-200",
                      "text-gray-600 dark:text-slate-300"
                    )}>
                      Resim yüklemek için tıklayın
                    </p>
                    <p className={cn(
                      "text-xs mt-1 transition-colors duration-200",
                      "text-gray-500 dark:text-slate-500"
                    )}>
                      PNG, JPG 5MB'a kadar
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingCategory(false)}
                  className={cn(
                    "transition-all duration-200",
                    "border-gray-300 text-gray-700",
                    "dark:border-slate-600 dark:text-slate-300"
                  )}
                >
                  İptal
                </Button>
                <Button className={cn(
                  "transition-all duration-200",
                  "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                )}>
                  Kategori Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button className={cn(
                "transition-all duration-200",
                "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              )}>
                <Plus className="w-4 h-4 mr-2" />
                Öğe Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className={cn(
              "max-w-4xl transition-colors duration-200",
              "bg-white border-gray-200",
              "dark:bg-slate-800 dark:border-slate-700"
            )}>
              <DialogHeader>
                <DialogTitle className={cn(
                  "transition-colors duration-200",
                  "text-gray-900 dark:text-white"
                )}>
                  Yeni Menü Öğesi Ekle
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="itemName" className={cn(
                      "transition-colors duration-200",
                      "text-gray-700 dark:text-slate-300"
                    )}>
                      Öğe Adı
                    </Label>
                    <Input 
                      id="itemName" 
                      placeholder="ör. Pasta Carbonara" 
                      className={cn(
                        "mt-1 transition-all duration-200",
                        "bg-white border-gray-300 text-gray-900",
                        "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      )} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemDescription" className={cn(
                      "transition-colors duration-200",
                      "text-gray-700 dark:text-slate-300"
                    )}>
                      Açıklama
                    </Label>
                    <Textarea 
                      id="itemDescription" 
                      placeholder="Öğe açıklaması..." 
                      className={cn(
                        "mt-1 h-24 transition-all duration-200",
                        "bg-white border-gray-300 text-gray-900",
                        "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      )} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="itemPrice" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Fiyat (₺)
                      </Label>
                      <Input 
                        id="itemPrice" 
                        type="number" 
                        step="0.01" 
                        placeholder="89.99" 
                        className={cn(
                          "mt-1 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemCategory" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Kategori
                      </Label>
                      <Select>
                        <SelectTrigger className={cn(
                          "mt-1 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )}>
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent className={cn(
                          "transition-colors duration-200",
                          "bg-white border-gray-200",
                          "dark:bg-slate-700 dark:border-slate-600"
                        )}>
                          {categories.filter(cat => cat.active).map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className={cn(
                      "transition-colors duration-200",
                      "text-gray-700 dark:text-slate-300"
                    )}>
                      Öğe Resmi
                    </Label>
                    <div className={cn(
                      "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                      "border-gray-300 bg-gray-50",
                      "dark:border-slate-600 dark:bg-slate-700/30"
                    )}>
                      <ImageIcon className={cn(
                        "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                        "text-gray-400 dark:text-slate-400"
                      )} />
                      <p className={cn(
                        "text-sm transition-colors duration-200",
                        "text-gray-600 dark:text-slate-300"
                      )}>
                        Resim yüklemek için tıklayın
                      </p>
                      <p className={cn(
                        "text-xs mt-1 transition-colors duration-200",
                        "text-gray-500 dark:text-slate-500"
                      )}>
                        PNG, JPG 5MB'a kadar
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prepTime" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Hazırlık Süresi (dk)
                      </Label>
                      <Input 
                        id="prepTime" 
                        type="number" 
                        placeholder="15" 
                        className={cn(
                          "mt-1 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="calories" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Kalori
                      </Label>
                      <Input 
                        id="calories" 
                        type="number" 
                        placeholder="320" 
                        className={cn(
                          "mt-1 transition-all duration-200",
                          "bg-white border-gray-300 text-gray-900",
                          "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        )} 
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="featured" />
                      <Label htmlFor="featured" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Öne Çıkan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="active" defaultChecked />
                      <Label htmlFor="active" className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Aktif
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingItem(false)}
                  className={cn(
                    "transition-all duration-200",
                    "border-gray-300 text-gray-700",
                    "dark:border-slate-600 dark:text-slate-300"
                  )}
                >
                  İptal
                </Button>
                <Button className={cn(
                  "transition-all duration-200",
                  "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                )}>
                  Öğe Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-2 transition-colors duration-200",
          "bg-gray-100 border border-gray-200",
          "dark:bg-slate-800/50 dark:border dark:border-slate-700/50"
        )}>
          <TabsTrigger 
            value="categories" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
              "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
            )}
          >
            <ChefHat className="w-4 h-4 mr-2" />
            Kategoriler
          </TabsTrigger>
          <TabsTrigger 
            value="items" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
              "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
            )}
          >
            <Star className="w-4 h-4 mr-2" />
            Menü Öğeleri
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {/* Filters */}
          <Card className={cn(
            "backdrop-blur-sm border shadow-sm transition-colors duration-200",
            "bg-white border-gray-200",
            "dark:bg-card/80 dark:border-border"
          )}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                    "text-gray-400 dark:text-muted-foreground"
                  )} />
                  <Input
                    placeholder="Kategori ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "pl-10 transition-all duration-200",
                      "bg-white border-gray-300 focus:border-blue-500 text-gray-900",
                      "dark:bg-background/50 dark:border-border dark:focus:border-primary dark:text-white"
                    )}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className={cn(
                      "w-4 h-4 transition-colors duration-200",
                      "text-gray-500 dark:text-muted-foreground"
                    )} />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className={cn(
                        "w-32 transition-all duration-200",
                        "bg-white border-gray-300 text-gray-900",
                        "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      )}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={cn(
                        "transition-colors duration-200",
                        "bg-white border-gray-200",
                        "dark:bg-slate-700 dark:border-slate-600"
                      )}>
                        <SelectItem value="all">Tümü</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Pasif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className={cn(
                "backdrop-blur-sm border hover:shadow-lg transition-all duration-300 shadow-sm group",
                "bg-white border-gray-200 hover:border-blue-300",
                "dark:bg-card/80 dark:border-border dark:hover:shadow-lg"
              )}>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 rounded-t-lg overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 right-3 flex items-center space-x-2">
                      <Badge className={cn(
                        "text-xs border transition-colors duration-200",
                        category.active 
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                          : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                      )}>
                        {category.active ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={cn(
                          "font-semibold mb-1 transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {category.name}
                        </h3>
                        <p className={cn(
                          "text-sm mb-2 transition-colors duration-200",
                          "text-gray-600 dark:text-slate-300"
                        )}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className={cn(
                          "font-medium transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {category.itemCount}
                        </span>
                        <span className={cn(
                          "ml-1 transition-colors duration-200",
                          "text-gray-500 dark:text-slate-400"
                        )}>
                          öğe
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className={cn(
                          "h-8 w-8 transition-all duration-200",
                          "border-gray-300 hover:bg-gray-100 text-gray-600",
                          "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                        )}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className={cn(
                          "h-8 w-8 transition-all duration-200",
                          category.active 
                            ? "border-red-300 hover:bg-red-50 text-red-600 dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                            : "border-gray-300 hover:bg-gray-100 text-gray-600 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                        )}>
                          {category.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="icon" className={cn(
                          "h-8 w-8 transition-all duration-200",
                          "border-red-300 hover:bg-red-50 text-red-600",
                          "dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                        )}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Menu Items Tab */}
        <TabsContent value="items" className="space-y-6">
          {/* Filters */}
          <Card className={cn(
            "backdrop-blur-sm border shadow-sm transition-colors duration-200",
            "bg-white border-gray-200",
            "dark:bg-card/80 dark:border-border"
          )}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                    "text-gray-400 dark:text-muted-foreground"
                  )} />
                  <Input
                    placeholder="Menü öğesi ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "pl-10 transition-all duration-200",
                      "bg-white border-gray-300 focus:border-blue-500 text-gray-900",
                      "dark:bg-background/50 dark:border-border dark:focus:border-primary dark:text-white"
                    )}
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className={cn(
                      "w-40 transition-all duration-200",
                      "bg-white border-gray-300 text-gray-900",
                      "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    )}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={cn(
                      "transition-colors duration-200",
                      "bg-white border-gray-200",
                      "dark:bg-slate-700 dark:border-slate-600"
                    )}>
                      <SelectItem value="all">Tüm Kategoriler</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={cn(
                      "w-32 transition-all duration-200",
                      "bg-white border-gray-300 text-gray-900",
                      "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    )}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={cn(
                      "transition-colors duration-200",
                      "bg-white border-gray-200",
                      "dark:bg-slate-700 dark:border-slate-600"
                    )}>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Pasif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items List */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className={cn(
                "backdrop-blur-sm border hover:shadow-lg transition-all duration-300 shadow-sm",
                "bg-white border-gray-200",
                "dark:bg-card/80 dark:border-border"
              )}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={cn(
                              "text-lg font-semibold transition-colors duration-200",
                              "text-gray-900 dark:text-white"
                            )}>
                              {item.name}
                            </h3>
                            {item.featured && (
                              <Badge className={cn(
                                "text-xs border transition-colors duration-200",
                                "bg-yellow-100 text-yellow-800 border-yellow-200",
                                "dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
                              )}>
                                <Star className="w-3 h-3 mr-1" />
                                Öne Çıkan
                              </Badge>
                            )}
                            <Badge className={cn(
                              "text-xs border transition-colors duration-200",
                              item.active 
                                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                                : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                            )}>
                              {item.active ? 'Aktif' : 'Pasif'}
                            </Badge>
                          </div>
                          <p className={cn(
                            "text-sm mb-2 transition-colors duration-200",
                            "text-gray-600 dark:text-slate-300"
                          )}>
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className={cn(
                              "flex items-center transition-colors duration-200",
                              "text-gray-500 dark:text-slate-400"
                            )}>
                              <Clock className="w-3 h-3 mr-1" />
                              {item.preparationTime} dk
                            </span>
                            <span className={cn(
                              "transition-colors duration-200",
                              "text-gray-500 dark:text-slate-400"
                            )}>
                              {item.calories} kalori
                            </span>
                            <Badge variant="outline" className={cn(
                              "text-xs transition-colors duration-200",
                              "border-gray-300 text-gray-600",
                              "dark:border-slate-600 dark:text-slate-300"
                            )}>
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={cn(
                            "text-2xl font-bold mb-1 transition-colors duration-200",
                            "text-blue-600 dark:text-blue-400"
                          )}>
                            ₺{item.price}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" className={cn(
                              "h-8 w-8 transition-all duration-200",
                              "border-gray-300 hover:bg-gray-100 text-gray-600",
                              "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                            )}>
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className={cn(
                              "h-8 w-8 transition-all duration-200",
                              "border-gray-300 hover:bg-gray-100 text-gray-600",
                              "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                            )}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className={cn(
                              "h-8 w-8 transition-all duration-200",
                              "border-red-300 hover:bg-red-50 text-red-600",
                              "dark:border-red-600 dark:hover:bg-red-600/20 dark:text-red-400"
                            )}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}