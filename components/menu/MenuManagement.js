'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
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
  EyeOff,
  Edit,
  Trash2,
  AlertTriangle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sortable Category Component
function SortableCategory({ category, onToggleActive, onEdit, onDelete }) {
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
      <div 
        className={cn(
          "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md",
          category.active 
            ? "bg-green-50/80 border-green-200/80 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-800/50 dark:hover:bg-green-900/40"
            : "bg-red-50/80 border-red-200/80 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-800/50 dark:hover:bg-red-900/40"
        )}
        onClick={() => onToggleActive(category.id)}
      >
        <div className="flex items-center space-x-4">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className={cn(
              "cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors",
              "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-4 h-4" />
          </div>
          
          {/* Category Image */}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Category Info */}
          <div>
            <div className={cn(
              "font-semibold text-lg",
              category.active 
                ? "text-green-800 dark:text-green-200" 
                : "text-red-800 dark:text-red-200"
            )}>
              {category.name}
            </div>
            <div className={cn(
              "text-sm",
              category.active 
                ? "text-green-600 dark:text-green-300" 
                : "text-red-600 dark:text-red-300"
            )}>
              {category.description}
            </div>
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className={cn(
              "text-2xl font-bold",
              category.active 
                ? "text-green-800 dark:text-green-200" 
                : "text-red-800 dark:text-red-200"
            )}>
              {category.itemCount}
            </div>
          </div>
          
          {/* Status Indicator and Actions */}
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              category.active ? "bg-green-500" : "bg-red-500"
            )} />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 hover:bg-white/50 dark:hover:bg-slate-800/50",
                category.active 
                  ? "text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200" 
                  : "text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onToggleActive(category.id);
              }}
            >
              {category.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 text-slate-600 hover:text-slate-800 hover:bg-white/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 text-slate-600 hover:text-red-600 hover:bg-white/50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-slate-800/50"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(category);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sortable Product Component
function SortableProduct({ product, onToggleActive, onPriceChange, onEdit, onDelete }) {
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
      <div 
        className={cn(
          "flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 shadow-sm hover:shadow-md",
          product.active 
            ? "bg-green-50/80 border-green-200/80 hover:bg-green-100/80 dark:bg-green-950/30 dark:border-green-800/50 dark:hover:bg-green-900/40"
            : "bg-red-50/80 border-red-200/80 hover:bg-red-100/80 dark:bg-red-950/30 dark:border-red-800/50 dark:hover:bg-red-900/40",
          product.featured && "ring-2 ring-yellow-400/50"
        )}
        onClick={() => onToggleActive(product.id)}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors",
            "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </div>
        
        {/* Product Image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={cn(
              "font-semibold text-lg truncate",
              product.active 
                ? "text-green-800 dark:text-green-200" 
                : "text-red-800 dark:text-red-200"
            )}>
              {product.name}
            </h3>
            {product.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700 flex-shrink-0">
                <Star className="w-3 h-3 mr-1" />
                ⭐
              </Badge>
            )}
          </div>
          <p className={cn(
            "text-sm line-clamp-2",
            product.active 
              ? "text-green-600 dark:text-green-300" 
              : "text-red-600 dark:text-red-300"
          )}>
            {product.description}
          </p>
        </div>
        
        {/* Price and Actions - Single Line */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Price */}
          <div className="text-right">
            {isEditingPrice ? (
              <Input
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
                onBlur={handlePriceBlur}
                onKeyDown={handlePriceKeyDown}
                className="w-24 text-right text-xl font-bold bg-white dark:bg-slate-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div 
                className={cn(
                  "text-xl font-bold cursor-pointer transition-all duration-200 px-3 py-1 rounded-lg border-2 border-dashed hover:border-solid",
                  product.active 
                    ? "text-green-700 border-green-300 hover:border-green-500 hover:bg-green-100/50 dark:text-green-300 dark:border-green-600 dark:hover:border-green-400 dark:hover:bg-green-900/40"
                    : "text-red-700 border-red-300 hover:border-red-500 hover:bg-red-100/50 dark:text-red-300 dark:border-red-600 dark:hover:border-red-400 dark:hover:bg-red-900/40"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePriceClick();
                }}
                title="Fiyatı düzenlemek için tıklayın"
              >
                ₺{product.price.toFixed(2)}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 hover:bg-white/50 dark:hover:bg-slate-800/50",
                product.active 
                  ? "text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200" 
                  : "text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onToggleActive(product.id);
              }}
              title={product.active ? "Ürünü pasif yap" : "Ürünü aktif yap"}
            >
              {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 text-slate-600 hover:text-slate-800 hover:bg-white/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              title="Ürünü düzenle"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 text-slate-600 hover:text-red-600 hover:bg-white/50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-slate-800/50"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product);
              }}
              title="Ürünü sil"
            >
              <Trash2 className="w-4 h-4" />
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
  
  // Dialog states
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    description: '',
    onConfirm: null,
    variant: 'default',
    icon: null
  });
  
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
      active: false,
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
    const category = categories.find(cat => cat.id === categoryId);
    const action = category.active ? 'pasif' : 'aktif';
    
    setConfirmDialog({
      open: true,
      title: `Kategoriyi ${action} yap`,
      description: `"${category.name}" kategorisini ${action} yapmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setCategories(prev => prev.map(cat => 
          cat.id === categoryId ? { ...cat, active: !cat.active } : cat
        ));
      },
      variant: 'default',
      icon: category.active ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />
    });
  };

  const toggleProductActive = (productId) => {
    const product = menuItems.find(item => item.id === productId);
    const action = product.active ? 'pasif' : 'aktif';
    
    setConfirmDialog({
      open: true,
      title: `Ürünü ${action} yap`,
      description: `"${product.name}" ürününü ${action} yapmak istediğinizden emin misiniz?`,
      onConfirm: () => {
        setMenuItems(prev => prev.map(item => 
          item.id === productId ? { ...item, active: !item.active } : item
        ));
      },
      variant: 'default',
      icon: product.active ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />
    });
  };

  const updateProductPrice = (productId, newPrice) => {
    setMenuItems(prev => prev.map(item => 
      item.id === productId ? { ...item, price: newPrice } : item
    ));
  };

  const handleCategoryEdit = (category) => {
    // TODO: Open category edit modal
    console.log('Edit category:', category);
  };

  const handleCategoryDelete = (category) => {
    setConfirmDialog({
      open: true,
      title: 'Kategoriyi sil',
      description: `"${category.name}" kategorisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve kategorideki tüm ürünler de silinecektir.`,
      onConfirm: () => {
        setCategories(prev => prev.filter(cat => cat.id !== category.id));
        setMenuItems(prev => prev.filter(item => item.categoryId !== category.id));
      },
      variant: 'destructive',
      icon: <AlertTriangle className="w-5 h-5" />
    });
  };

  const handleProductEdit = (product) => {
    // TODO: Open product edit modal
    console.log('Edit product:', product);
  };

  const handleProductDelete = (product) => {
    setConfirmDialog({
      open: true,
      title: 'Ürünü sil',
      description: `"${product.name}" ürününü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      onConfirm: () => {
        setMenuItems(prev => prev.filter(item => item.id !== product.id));
      },
      variant: 'destructive',
      icon: <AlertTriangle className="w-5 h-5" />
    });
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
          <h1 className="text-3xl font-bold text-foreground">Menü Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Menü kategorilerinizi ve öğelerinizi düzenleyin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="border-border text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            + Kategori Ekle
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            + Öğe Ekle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
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
                        selectedCategory === category.id && "ring-2 ring-blue-500 ring-offset-2 ring-offset-background"
                      )}
                    >
                      <SortableCategory 
                        category={category} 
                        onToggleActive={toggleCategoryActive}
                        onEdit={handleCategoryEdit}
                        onDelete={handleCategoryDelete}
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
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">
                  {selectedCategoryData?.name} ({filteredProducts.length} Öğe)
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="🔍 Öğe ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48 pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-border text-muted-foreground hover:bg-accent hover:text-foreground"
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
                      onEdit={handleProductEdit}
                      onDelete={handleProductDelete}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        variant={confirmDialog.variant}
        icon={confirmDialog.icon}
      />
    </div>
  );
}