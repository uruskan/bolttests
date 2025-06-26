'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChefHat, 
  DollarSign,
  Clock,
  Star,
  Grid,
  List,
  Eye,
  EyeOff,
  Camera,
  Check,
  X,
  GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MenuManagement() {
  const [selectedCategory, setSelectedCategory] = useState('appetizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [tempPrice, setTempPrice] = useState('');
  const [draggedCategory, setDraggedCategory] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark' || !savedTheme);
  }, []);

  const [categories, setCategories] = useState([
    { 
      id: 'appetizers', 
      name: 'Başlangıçlar', 
      description: 'Lezzetli başlangıç tarifleri', 
      order: 1, 
      itemCount: 8, 
      isActive: true,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'pasta', 
      name: 'Makarnalar', 
      description: 'Ev yapımı taze makarnalar', 
      order: 2, 
      itemCount: 12, 
      isActive: true,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'pizza', 
      name: 'Pizzalar', 
      description: 'Odun ateşinde ince hamur', 
      order: 3, 
      itemCount: 10, 
      isActive: true,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'mains', 
      name: 'Ana Yemekler', 
      description: 'Doyurucu İtalyan yemekleri', 
      order: 4, 
      itemCount: 15, 
      isActive: true,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'desserts', 
      name: 'Tatlılar', 
      description: 'Tatlı son', 
      order: 5, 
      itemCount: 6, 
      isActive: true,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    { 
      id: 'beverages', 
      name: 'İçecekler', 
      description: 'İçecekler ve şaraplar', 
      order: 6, 
      itemCount: 20, 
      isActive: false,
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 45.99,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      prepTime: '10 dk',
      dietary: ['vegetarian'],
      isFeatured: true,
      isActive: true,
      order: 1
    },
    {
      id: '2', 
      name: 'Antipasto Misto',
      description: 'Şarküteri, peynir ve marine sebze seçkisi',
      price: 68.99,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400',
      prepTime: '5 dk',
      dietary: [],
      isFeatured: false,
      isActive: true,
      order: 2
    },
    {
      id: '3',
      name: 'Arancini',
      description: 'Mozzarella ve bezelyeli çıtır risotto topları',
      price: 52.99,
      originalPrice: 59.99,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      prepTime: '15 dk',
      dietary: ['vegetarian'],
      isFeatured: true,
      isActive: false,
      order: 3
    },
    {
      id: '4',
      name: 'Calamari Fritti',
      description: 'Marinara soslu altın renginde kızarmış kalamar halkaları',
      price: 61.99,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      prepTime: '12 dk',
      dietary: [],
      isFeatured: false,
      isActive: true,
      order: 4
    },
  ]);

  const filteredItems = menuItems
    .filter(item => item.category === selectedCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  const getDietaryBadgeColor = (dietary) => {
    if (isDarkMode) {
      switch (dietary) {
        case 'vegetarian': return 'bg-green-500/20 text-green-300 border-green-500/30';
        case 'vegan': return 'bg-green-500/20 text-green-300 border-green-500/30';
        case 'gluten-free': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        case 'spicy': return 'bg-red-500/20 text-red-300 border-red-500/30';
        default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      }
    } else {
      switch (dietary) {
        case 'vegetarian': return 'bg-green-100 text-green-800 border-green-200';
        case 'vegan': return 'bg-green-100 text-green-800 border-green-200';
        case 'gluten-free': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'spicy': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const handlePriceEdit = (itemId, currentPrice) => {
    setEditingPrice(itemId);
    setTempPrice(currentPrice.toString());
  };

  const handlePriceSave = (itemId) => {
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      setMenuItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, price: newPrice } : item
      ));
    }
    setEditingPrice(null);
    setTempPrice('');
  };

  const handlePriceCancel = () => {
    setEditingPrice(null);
    setTempPrice('');
  };

  const toggleItemStatus = (itemId) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const toggleCategoryStatus = (categoryId) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId ? { ...category, isActive: !category.isActive } : category
    ));
  };

  // Drag and drop handlers for categories
  const handleCategoryDragStart = (e, categoryId) => {
    setDraggedCategory(categoryId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCategoryDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCategoryDrop = (e, targetCategoryId) => {
    e.preventDefault();
    
    if (draggedCategory && draggedCategory !== targetCategoryId) {
      const draggedIndex = categories.findIndex(cat => cat.id === draggedCategory);
      const targetIndex = categories.findIndex(cat => cat.id === targetCategoryId);
      
      const newCategories = [...categories];
      const [draggedItem] = newCategories.splice(draggedIndex, 1);
      newCategories.splice(targetIndex, 0, draggedItem);
      
      // Update order values
      const updatedCategories = newCategories.map((cat, index) => ({
        ...cat,
        order: index + 1
      }));
      
      setCategories(updatedCategories);
    }
    
    setDraggedCategory(null);
  };

  const handleCategoryDragEnd = () => {
    setDraggedCategory(null);
  };

  // Drag and drop handlers for menu items
  const handleItemDragStart = (e, itemId) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleItemDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleItemDrop = (e, targetItemId) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetItemId) {
      const categoryItems = menuItems.filter(item => item.category === selectedCategory);
      const draggedIndex = categoryItems.findIndex(item => item.id === draggedItem);
      const targetIndex = categoryItems.findIndex(item => item.id === targetItemId);
      
      const newCategoryItems = [...categoryItems];
      const [draggedItemObj] = newCategoryItems.splice(draggedIndex, 1);
      newCategoryItems.splice(targetIndex, 0, draggedItemObj);
      
      // Update order values for this category
      const updatedCategoryItems = newCategoryItems.map((item, index) => ({
        ...item,
        order: index + 1
      }));
      
      // Update the main menu items array
      setMenuItems(prev => prev.map(item => {
        if (item.category === selectedCategory) {
          const updatedItem = updatedCategoryItems.find(updated => updated.id === item.id);
          return updatedItem || item;
        }
        return item;
      }));
    }
    
    setDraggedItem(null);
  };

  const handleItemDragEnd = () => {
    setDraggedItem(null);
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    // If deleting the currently selected category, switch to the first available one
    if (selectedCategory === categoryId) {
      const remainingCategories = categories.filter(cat => cat.id !== categoryId);
      if (remainingCategories.length > 0) {
        setSelectedCategory(remainingCategories[0].id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-bold transition-colors duration-200",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Menü Yönetimi
          </h1>
          <p className={cn(
            "mt-1 transition-colors duration-200",
            isDarkMode ? "text-slate-400" : "text-gray-600"
          )}>
            Menü kategorilerinizi ve öğelerinizi düzenleyin
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
            <DialogTrigger asChild>
              <Button variant="outline" className={cn(
                "transition-all duration-200",
                isDarkMode 
                  ? "border-slate-600 hover:bg-slate-700 text-slate-300" 
                  : "border-gray-300 hover:bg-gray-100 text-gray-700 shadow-light-card hover:shadow-light-card-hover"
              )}>
                <Plus className="w-4 h-4 mr-2" />
                Kategori Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className={cn(
              "transition-colors duration-200",
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200 shadow-light-elevated"
            )}>
              <DialogHeader>
                <DialogTitle className={cn(
                  "transition-colors duration-200",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Yeni Kategori Ekle
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName" className={cn(
                    "transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  )}>
                    Kategori Adı
                  </Label>
                  <Input 
                    id="categoryName" 
                    placeholder="ör. Deniz Ürünleri" 
                    className={cn(
                      "mt-1 transition-all duration-200",
                      isDarkMode 
                        ? "bg-slate-700 border-slate-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                    )} 
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDescription" className={cn(
                    "transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  )}>
                    Açıklama
                  </Label>
                  <Textarea 
                    id="categoryDescription" 
                    placeholder="Bu kategorinin kısa açıklaması" 
                    className={cn(
                      "mt-1 h-20 transition-all duration-200",
                      isDarkMode 
                        ? "bg-slate-700 border-slate-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                    )} 
                  />
                </div>
                <div>
                  <Label className={cn(
                    "transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  )}>
                    Kategori Resmi
                  </Label>
                  <div className={cn(
                    "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                    isDarkMode ? "border-slate-600" : "border-gray-300 shadow-light-card hover:shadow-light-card-hover"
                  )}>
                    <Camera className={cn(
                      "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                      isDarkMode ? "text-slate-400" : "text-gray-400"
                    )} />
                    <p className={cn(
                      "text-sm transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-600"
                    )}>
                      Resim yüklemek için tıklayın
                    </p>
                    <p className={cn(
                      "text-xs mt-1 transition-colors duration-200",
                      isDarkMode ? "text-slate-500" : "text-gray-500"
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
                    "transition-colors duration-200",
                    isDarkMode 
                      ? "border-slate-600 text-slate-300" 
                      : "border-gray-300 text-gray-700"
                  )}
                >
                  İptal
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                  Kategori Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Öğe Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className={cn(
              "max-w-2xl transition-colors duration-200",
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200 shadow-light-elevated"
            )}>
              <DialogHeader>
                <DialogTitle className={cn(
                  "transition-colors duration-200",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Yeni Menü Öğesi Ekle
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="itemName" className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Öğe Adı
                    </Label>
                    <Input 
                      id="itemName" 
                      placeholder="ör. Pasta Carbonara" 
                      className={cn(
                        "mt-1 transition-all duration-200",
                        isDarkMode 
                          ? "bg-slate-700 border-slate-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                      )} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemPrice" className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Fiyat (₺)
                    </Label>
                    <Input 
                      id="itemPrice" 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      className={cn(
                        "mt-1 transition-all duration-200",
                        isDarkMode 
                          ? "bg-slate-700 border-slate-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                      )} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="prepTime" className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Hazırlık Süresi
                    </Label>
                    <Input 
                      id="prepTime" 
                      placeholder="ör. 15 dk" 
                      className={cn(
                        "mt-1 transition-all duration-200",
                        isDarkMode 
                          ? "bg-slate-700 border-slate-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                      )} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemDescription" className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Açıklama
                    </Label>
                    <Textarea 
                      id="itemDescription" 
                      placeholder="Yemeği tanımlayın..." 
                      className={cn(
                        "mt-1 h-20 transition-all duration-200",
                        isDarkMode 
                          ? "bg-slate-700 border-slate-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                      )} 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Ürün Resmi
                    </Label>
                    <div className={cn(
                      "mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer",
                      isDarkMode ? "border-slate-600" : "border-gray-300 shadow-light-card hover:shadow-light-card-hover"
                    )}>
                      <Camera className={cn(
                        "w-8 h-8 mx-auto mb-2 transition-colors duration-200",
                        isDarkMode ? "text-slate-400" : "text-gray-400"
                      )} />
                      <p className={cn(
                        "text-sm transition-colors duration-200",
                        isDarkMode ? "text-slate-300" : "text-gray-600"
                      )}>
                        Resim yüklemek için tıklayın
                      </p>
                      <p className={cn(
                        "text-xs mt-1 transition-colors duration-200",
                        isDarkMode ? "text-slate-500" : "text-gray-500"
                      )}>
                        PNG, JPG 5MB'a kadar
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className={cn(
                      "transition-colors duration-200",
                      isDarkMode ? "text-slate-300" : "text-gray-700"
                    )}>
                      Diyet Seçenekleri
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Vejetaryen', 'Vegan', 'Glutensiz', 'Acılı'].map((option) => (
                        <Badge 
                          key={option} 
                          variant="outline" 
                          className={cn(
                            "cursor-pointer hover:bg-blue-500/20 transition-colors duration-200",
                            isDarkMode 
                              ? "border-slate-600 text-slate-300" 
                              : "border-gray-300 text-gray-700 shadow-light-card hover:shadow-light-card-hover"
                          )}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingItem(false)} 
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode 
                      ? "border-slate-600 text-slate-300" 
                      : "border-gray-300 text-gray-700"
                  )}
                >
                  İptal
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
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
          <Card className={cn(
            "backdrop-blur-xl transition-all duration-200",
            isDarkMode 
              ? "bg-slate-800/50 border-slate-700/50" 
              : "bg-white/90 border-gray-200/50 shadow-light-elevated"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center transition-colors duration-200",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                <ChefHat className="w-5 h-5 mr-2 text-blue-400" />
                Kategoriler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 relative",
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50"
                      : category.isActive
                        ? isDarkMode 
                          ? "border-green-500/50 hover:border-green-400" 
                          : "border-green-500 hover:border-green-600 shadow-light-card hover:shadow-light-card-hover"
                        : isDarkMode 
                          ? "border-red-500/50 hover:border-red-400 opacity-60" 
                          : "border-red-500 hover:border-red-600 opacity-60 shadow-light-card hover:shadow-light-card-hover",
                    draggedCategory === category.id && "opacity-50"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                  draggable
                  onDragStart={(e) => handleCategoryDragStart(e, category.id)}
                  onDragOver={handleCategoryDragOver}
                  onDrop={(e) => handleCategoryDrop(e, category.id)}
                  onDragEnd={handleCategoryDragEnd}
                >
                  <div className="flex items-start space-x-3">
                    <GripVertical className={cn(
                      "w-4 h-4 cursor-move mt-1 flex-shrink-0 transition-colors duration-200",
                      isDarkMode ? "text-slate-500" : "text-gray-400"
                    )} />
                    <div className={cn(
                      "w-12 h-12 rounded-lg overflow-hidden flex-shrink-0",
                      isDarkMode ? "bg-slate-700" : "bg-gray-200"
                    )}>
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={cn(
                          "font-medium truncate transition-colors duration-200",
                          selectedCategory === category.id 
                            ? "text-white" 
                            : isDarkMode 
                              ? "text-slate-300" 
                              : "text-gray-700"
                        )}>
                          {category.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Badge variant="secondary" className={cn(
                            "text-xs transition-colors duration-200",
                            isDarkMode 
                              ? "bg-slate-700 text-slate-300" 
                              : "bg-gray-200 text-gray-700"
                          )}>
                            {category.itemCount}
                          </Badge>
                        </div>
                      </div>
                      <p className={cn(
                        "text-xs truncate mb-2 transition-colors duration-200",
                        selectedCategory === category.id 
                          ? "text-blue-200" 
                          : isDarkMode 
                            ? "text-slate-500" 
                            : "text-gray-500"
                      )}>
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategoryStatus(category.id);
                            }}
                          >
                            {category.isActive ? (
                              <Eye className="w-3 h-3 text-green-400" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-red-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCategory(category.id);
                            }}
                          >
                            <Edit className={cn(
                              "w-3 h-3 hover:text-blue-400 transition-colors duration-200",
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            )} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCategory(category.id);
                            }}
                          >
                            <Trash2 className={cn(
                              "w-3 h-3 hover:text-red-400 transition-colors duration-200",
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            )} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Items Panel */}
        <div className="lg:col-span-3">
          <Card className={cn(
            "backdrop-blur-xl transition-all duration-200",
            isDarkMode 
              ? "bg-slate-800/50 border-slate-700/50" 
              : "bg-white/90 border-gray-200/50 shadow-light-elevated"
          )}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <CardTitle className={cn(
                  "capitalize transition-colors duration-200",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {categories.find(c => c.id === selectedCategory)?.name} ({filteredItems.length} öğe)
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                      isDarkMode ? "text-slate-400" : "text-gray-400"
                    )} />
                    <Input
                      placeholder="Öğe ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={cn(
                        "pl-10 w-64 transition-all duration-200",
                        isDarkMode 
                          ? "bg-slate-700 border-slate-600 text-white" 
                          : "bg-white border-gray-300 text-gray-900 shadow-light-card focus:shadow-light-card-hover"
                      )}
                    />
                  </div>
                  <div className={cn(
                    "flex items-center space-x-1 rounded-lg p-1 transition-all duration-200",
                    isDarkMode ? "bg-slate-700" : "bg-gray-200 shadow-light-card"
                  )}>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-blue-500 shadow-lg' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-blue-500 shadow-lg' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "gap-3",
                viewMode === 'grid' ? "grid grid-cols-1 xl:grid-cols-2" : "space-y-2"
              )}>
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "rounded-lg transition-all duration-200 border-2 cursor-pointer",
                      viewMode === 'list' ? "p-2" : "p-4",
                      item.isActive 
                        ? isDarkMode 
                          ? "border-green-500 bg-slate-700/30 hover:border-green-400 hover:bg-slate-700/50" 
                          : "border-green-500 bg-green-50 hover:border-green-600 hover:bg-green-100 shadow-light-card hover:shadow-light-card-hover"
                        : isDarkMode 
                          ? "border-red-500 bg-slate-700/20 opacity-60 hover:border-red-400" 
                          : "border-red-500 bg-red-50 opacity-60 hover:border-red-600 shadow-light-card hover:shadow-light-card-hover",
                      draggedItem === item.id && "opacity-50"
                    )}
                    onClick={() => toggleItemStatus(item.id)}
                    draggable
                    onDragStart={(e) => handleItemDragStart(e, item.id)}
                    onDragOver={handleItemDragOver}
                    onDrop={(e) => handleItemDrop(e, item.id)}
                    onDragEnd={handleItemDragEnd}
                  >
                    {viewMode === 'list' ? (
                      // Ultra Compact List Layout
                      <div className="flex items-center space-x-3">
                        <GripVertical className={cn(
                          "w-4 h-4 cursor-move flex-shrink-0 transition-colors duration-200",
                          isDarkMode ? "text-slate-500" : "text-gray-400"
                        )} />
                        
                        {/* Product Image */}
                        <div className={cn(
                          "w-12 h-12 rounded-lg overflow-hidden flex-shrink-0",
                          isDarkMode ? "bg-slate-700" : "bg-gray-200"
                        )}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className={cn(
                              "font-medium text-sm truncate transition-colors duration-200",
                              isDarkMode ? "text-white" : "text-gray-900"
                            )}>
                              {item.name}
                            </h3>
                            {item.isFeatured && (
                              <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <p className={cn(
                            "text-xs truncate transition-colors duration-200",
                            isDarkMode ? "text-slate-400" : "text-gray-600"
                          )}>
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                          {editingPrice === item.id ? (
                            <div className="flex items-center space-x-1">
                              <Input
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handlePriceSave(item.id);
                                  if (e.key === 'Escape') handlePriceCancel();
                                }}
                                className="w-20 h-8 text-sm bg-blue-600 border-blue-500 text-white px-2 font-bold"
                                autoFocus
                              />
                              <Button 
                                size="sm" 
                                onClick={() => handlePriceSave(item.id)} 
                                className="h-8 px-2 text-xs bg-green-600 hover:bg-green-700 shadow-lg"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={handlePriceCancel} 
                                className="h-8 px-2 text-xs border-red-500 text-red-400 hover:bg-red-600/20"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="cursor-pointer hover:bg-blue-600 font-bold text-sm px-3 py-2 rounded-lg bg-blue-500 text-white min-w-[80px] text-center transition-all duration-200 hover:scale-105 shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePriceEdit(item.id, item.price);
                              }}
                            >
                              ₺{item.price}
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="icon" 
                            className={cn(
                              "h-8 w-8 border-0 transition-all duration-200 shadow-lg",
                              isDarkMode 
                                ? "bg-slate-600 hover:bg-blue-600 text-white" 
                                : "bg-gray-300 hover:bg-blue-500 text-gray-700 hover:text-white"
                            )}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="icon" 
                            className={cn(
                              "h-8 w-8 border-0 transition-all duration-200 shadow-lg",
                              isDarkMode 
                                ? "bg-slate-600 hover:bg-red-600 text-white" 
                                : "bg-gray-300 hover:bg-red-500 text-gray-700 hover:text-white"
                            )}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Grid Layout
                      <div className="flex items-start space-x-3">
                        <GripVertical className={cn(
                          "w-4 h-4 cursor-move flex-shrink-0 mt-1 transition-colors duration-200",
                          isDarkMode ? "text-slate-500" : "text-gray-400"
                        )} />
                        <div className={cn(
                          "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0",
                          isDarkMode ? "bg-slate-700" : "bg-gray-200"
                        )}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={cn(
                                  "font-semibold truncate transition-colors duration-200",
                                  isDarkMode ? "text-white" : "text-gray-900"
                                )}>
                                  {item.name}
                                </h3>
                                {item.isFeatured && (
                                  <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                                )}
                              </div>
                              <p className={cn(
                                "text-sm mb-2 line-clamp-2 transition-colors duration-200",
                                isDarkMode ? "text-slate-300" : "text-gray-600"
                              )}>
                                {item.description}
                              </p>
                              
                              <div className={cn(
                                "flex items-center space-x-4 text-xs mb-2 transition-colors duration-200",
                                isDarkMode ? "text-slate-400" : "text-gray-500"
                              )}>
                                {item.prepTime && (
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {item.prepTime}
                                  </div>
                                )}
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
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-3">
                              <Button 
                                size="icon" 
                                className={cn(
                                  "h-7 w-7 border-0 transition-all duration-200 shadow-lg",
                                  isDarkMode 
                                    ? "bg-slate-600 hover:bg-blue-600 text-white" 
                                    : "bg-gray-300 hover:bg-blue-500 text-gray-700 hover:text-white"
                                )}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="icon" 
                                className={cn(
                                  "h-7 w-7 border-0 transition-all duration-200 shadow-lg",
                                  isDarkMode 
                                    ? "bg-slate-600 hover:bg-red-600 text-white" 
                                    : "bg-gray-300 hover:bg-red-500 text-gray-700 hover:text-white"
                                )}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center">
                              <DollarSign className={cn(
                                "w-3 h-3 mr-1 transition-colors duration-200",
                                isDarkMode ? "text-slate-400" : "text-gray-500"
                              )} />
                              {editingPrice === item.id ? (
                                <div className="flex items-center space-x-1">
                                  <Input
                                    value={tempPrice}
                                    onChange={(e) => setTempPrice(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handlePriceSave(item.id);
                                      if (e.key === 'Escape') handlePriceCancel();
                                    }}
                                    className="w-20 h-8 text-sm bg-blue-600 border-blue-500 text-white px-2 font-bold"
                                    autoFocus
                                  />
                                  <Button 
                                    size="sm" 
                                    onClick={() => handlePriceSave(item.id)} 
                                    className="h-8 px-2 text-xs bg-green-600 hover:bg-green-700 shadow-lg"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={handlePriceCancel} 
                                    className="h-8 px-2 text-xs border-red-500 text-red-400 hover:bg-red-600/20"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div 
                                  className="cursor-pointer hover:bg-blue-600 font-bold text-sm px-3 py-2 rounded-lg bg-blue-500 text-white transition-all duration-200 hover:scale-105 shadow-lg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePriceEdit(item.id, item.price);
                                  }}
                                >
                                  ₺{item.price}
                                  {item.originalPrice && (
                                    <span className="line-through text-blue-200 ml-1 text-xs">₺{item.originalPrice}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <ChefHat className={cn(
                    "w-12 h-12 mx-auto mb-4 transition-colors duration-200",
                    isDarkMode ? "text-slate-500" : "text-gray-400"
                  )} />
                  <h3 className={cn(
                    "text-lg font-medium mb-2 transition-colors duration-200",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Öğe bulunamadı
                  </h3>
                  <p className={cn(
                    "mb-4 transition-colors duration-200",
                    isDarkMode ? "text-slate-400" : "text-gray-600"
                  )}>
                    {searchTerm 
                      ? `"${searchTerm}" ile eşleşen öğe bulunamadı.` 
                      : "Bu kategoride henüz öğe yok."}
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
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