'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical,
  Search,
  List,
  Grid3X3,
  Star,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sortable Category Component
function SortableCategory({ category, onToggleActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        isDragging && "opacity-50"
      )}
    >
      <div className={cn(
        "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
        "bg-slate-800/60 border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/80"
      )}>
        <div className="flex items-center space-x-4">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-700/50 transition-colors"
          >
            <GripVertical className="w-4 h-4 text-slate-400" />
          </div>
          
          {/* Category Image */}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-700">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Category Info */}
          <div>
            <div className="font-semibold text-white text-lg">{category.name}</div>
            <div className="text-slate-400 text-sm">{category.description}</div>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{category.itemCount}</div>
          </div>
          
          {/* Active/Inactive Toggle */}
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              category.active ? "bg-green-500" : "bg-red-500"
            )} />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
              onClick={() => onToggleActive(category.id)}
            >
              {category.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              ✏️
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-slate-700/50"
            >
              🗑️
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sortable Product Component
function SortableProduct({ product, onToggleActive, onPriceChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(product.price.toString());

  const handlePriceClick = () => {
    setIsEditingPrice(true);
    setTempPrice(product.price.toString());
  };

  const handlePriceBlur = () => {
    setIsEditingPrice(false);
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      onPriceChange(product.id, newPrice);
    } else {
      setTempPrice(product.price.toString());
    }
  };

  const handlePriceKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePriceBlur();
    } else if (e.key === 'Escape') {
      setIsEditingPrice(false);
      setTempPrice(product.price.toString());
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        isDragging && "opacity-50"
      )}
    >
      <div className={cn(
        "flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200",
        product.featured 
          ? "bg-green-900/30 border-green-700/50 hover:border-green-600/70"
          : "bg-slate-800/60 border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/80"
      )}>
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-700/50 transition-colors"
        >
          <GripVertical className="w-4 h-4 text-slate-400" />
        </div>
        
        {/* Product Image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-white text-lg">{product.name}</h3>
            {product.featured && (
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                <Star className="w-3 h-3 mr-1" />
                ⭐
              </Badge>
            )}
            <Badge className={cn(
              product.active 
                ? "bg-green-500/20 text-green-300 border-green-500/30"
                : "bg-red-500/20 text-red-300 border-red-500/30"
            )}>
              {product.active ? 'Aktif' : 'Pasif'}
            </Badge>
          </div>
          <p className="text-slate-400 text-sm">{product.description}</p>
        </div>
        
        {/* Price and Actions */}
        <div className="text-right">
          <div className="mb-3">
            {isEditingPrice ? (
              <Input
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
                onBlur={handlePriceBlur}
                onKeyDown={handlePriceKeyDown}
                className="w-24 text-right text-xl font-bold bg-slate-700 border-slate-600 text-blue-400"
                autoFocus
              />
            ) : (
              <div 
                className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                onClick={handlePriceClick}
              >
                ₺{product.price.toFixed(2)}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
              onClick={() => onToggleActive(product.id)}
            >
              {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              📋
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              ✏️
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-slate-700/50"
            >
              🗑️
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Başlangıçlar',
      description: 'Lezzetli başlangıç tarifleri',
      itemCount: 8,
      active: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Makarnalar',
      description: 'Ev yapımı taze makarnalar',
      itemCount: 12,
      active: true,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Pizzalar',
      description: 'Odun ateşinde İnce hamur',
      itemCount: 10,
      active: true,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'Ana Yemekler',
      description: 'Doyurucu İtalyan yemekleri',
      itemCount: 15,
      active: true,
      image: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Tatlılar',
      description: 'Tatlı son',
      itemCount: 6,
      active: true,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'İçecekler',
      description: 'İçecekler ve şaraplar',
      itemCount: 20,
      active: false,
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 45.99,
      category: 'Başlangıçlar',
      categoryId: '1',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: true
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
      featured: false
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
      featured: false
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
      featured: false
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCategoryDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleProductDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleCategoryActive = (categoryId) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, active: !cat.active } : cat
    ));
  };

  const toggleProductActive = (productId) => {
    setMenuItems(prev => prev.map(item => 
      item.id === productId ? { ...item, active: !item.active } : item
    ));
  };

  const updateProductPrice = (productId, newPrice) => {
    setMenuItems(prev => prev.map(item => 
      item.id === productId ? { ...item, price: newPrice } : item
    ));
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const filteredProducts = menuItems.filter(item => 
    item.categoryId === selectedCategory &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menü Yönetimi</h1>
          <p className="text-slate-400 mt-1">Menü kategorilerinizi ve öğelerinizi düzenleyin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            + Kategori Ekle
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Öğe Ekle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                📂 Kategoriler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleCategoryDragEnd}
              >
                <SortableContext 
                  items={categories.map(cat => cat.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        selectedCategory === category.id && "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-800"
                      )}
                    >
                      <SortableCategory 
                        category={category} 
                        onToggleActive={toggleCategoryActive}
                      />
                    </div>
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  {selectedCategoryData?.name} ({filteredProducts.length} Öğe)
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="🔍 Öğe ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48 pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleProductDragEnd}
              >
                <SortableContext 
                  items={filteredProducts.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredProducts.map((item) => (
                    <SortableProduct 
                      key={item.id}
                      product={item} 
                      onToggleActive={toggleProductActive}
                      onPriceChange={updateProductPrice}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}