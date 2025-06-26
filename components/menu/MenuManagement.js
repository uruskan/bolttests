'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
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
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Bruschetta Classica',
      description: 'Taze domates, fesleğen ve sarımsakla kızarmış ekmek',
      price: 45.99,
      category: 'Başlangıçlar',
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
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      active: true,
      featured: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menü Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Menü kategorilerinizi ve öğelerinizi düzenleyin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            + Kategori Ekle
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            + Öğe Ekle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">📂 Kategoriler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer",
                    "bg-accent/30 border-border hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{category.itemCount}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        category.active ? "bg-green-500" : "bg-red-500"
                      )} />
                      <div className="w-4 h-4 text-muted-foreground cursor-pointer">✏️</div>
                      <div className="w-4 h-4 text-muted-foreground cursor-pointer">🗑️</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Başlangıçlar (4 Öğe)</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="🔍 Öğe ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                  <Button variant="outline" size="icon">📋</Button>
                  <Button variant="outline" size="icon">⚙️</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200",
                    item.featured 
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-accent/30 border-border hover:bg-accent/50"
                  )}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                          ⭐
                        </Badge>
                      )}
                      <Badge className={cn(
                        item.active 
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                          : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                      )}>
                        {item.active ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary mb-2">₺{item.price}</div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        📋
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        ✏️
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        🗑️
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}