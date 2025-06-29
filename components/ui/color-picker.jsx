'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Palette, Pipette, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

// Predefined color palettes for easy selection
const colorPalettes = {
  primary: {
    name: "Ana Renkler",
    colors: [
      "#E91E63", "#F44336", "#FF5722", "#FF9800", "#FFC107",
      "#FFEB3B", "#CDDC39", "#8BC34A", "#4CAF50", "#009688",
      "#00BCD4", "#03A9F4", "#2196F3", "#3F51B5", "#673AB7",
      "#9C27B0", "#E91E63", "#795548", "#607D8B", "#9E9E9E"
    ]
  },
  neutral: {
    name: "Nötr Renkler",
    colors: [
      "#FFFFFF", "#F8F9FA", "#F1F3F4", "#E8EAED", "#DADCE0",
      "#BDC1C6", "#9AA0A6", "#80868B", "#5F6368", "#3C4043",
      "#202124", "#000000", "#FFF8E1", "#F3E5F5", "#E8F5E8",
      "#E3F2FD", "#FFF3E0", "#FCE4EC", "#F1F8E9", "#E0F2F1"
    ]
  },
  warm: {
    name: "Sıcak Renkler",
    colors: [
      "#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350",
      "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C",
      "#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726",
      "#FF9800", "#FB8C00", "#F57C00", "#EF6C00", "#E65100"
    ]
  },
  cool: {
    name: "Soğuk Renkler",
    colors: [
      "#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5",
      "#2196F3", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1",
      "#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A",
      "#009688", "#00897B", "#00796B", "#00695C", "#004D40"
    ]
  }
};

// Popular restaurant color combinations
const restaurantColorSets = [
  {
    name: "Klasik Kırmızı",
    description: "Geleneksel restoran teması",
    colors: {
      header: "#D32F2F",
      buttons: "#F44336",
      productPrice: "#C62828",
      accent: "#FFCDD2"
    }
  },
  {
    name: "Modern Mavi",
    description: "Modern ve profesyonel",
    colors: {
      header: "#1976D2",
      buttons: "#2196F3",
      productPrice: "#1565C0",
      accent: "#BBDEFB"
    }
  },
  {
    name: "Doğal Yeşil",
    description: "Organik ve doğal",
    colors: {
      header: "#388E3C",
      buttons: "#4CAF50",
      productPrice: "#2E7D32",
      accent: "#C8E6C9"
    }
  },
  {
    name: "Lüks Mor",
    description: "Şık ve lüks",
    colors: {
      header: "#7B1FA2",
      buttons: "#9C27B0",
      productPrice: "#6A1B9A",
      accent: "#E1BEE7"
    }
  },
  {
    name: "Sıcak Turuncu",
    description: "Enerjik ve sıcak",
    colors: {
      header: "#F57C00",
      buttons: "#FF9800",
      productPrice: "#EF6C00",
      accent: "#FFE0B2"
    }
  },
  {
    name: "Zarif Gri",
    description: "Minimalist ve zarif",
    colors: {
      header: "#424242",
      buttons: "#616161",
      productPrice: "#212121",
      accent: "#E0E0E0"
    }
  }
];

export function ColorPicker({ 
  value, 
  onChange, 
  label, 
  description,
  className 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handleColorSelect = (color) => {
    onChange(color);
    setCustomColor(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (color) => {
    setCustomColor(color);
    onChange(color);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-foreground font-medium">{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start h-12 border-2 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg border-2 border-white shadow-md"
                style={{ backgroundColor: value }}
              />
              <div className="text-left">
                <div className="font-medium text-foreground">{label}</div>
                <div className="text-sm text-muted-foreground">{value}</div>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-96 p-0" align="start">
          <Tabs defaultValue="palettes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="palettes" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Paletler
              </TabsTrigger>
              <TabsTrigger value="sets" className="flex items-center">
                <Pipette className="w-4 h-4 mr-2" />
                Setler
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center">
                <Hash className="w-4 h-4 mr-2" />
                Özel
              </TabsTrigger>
            </TabsList>

            <TabsContent value="palettes" className="p-4 space-y-4">
              {Object.entries(colorPalettes).map(([key, palette]) => (
                <div key={key}>
                  <h4 className="font-medium text-foreground mb-2">{palette.name}</h4>
                  <div className="grid grid-cols-10 gap-2">
                    {palette.colors.map((color, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-md",
                          value === color ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="sets" className="p-4 space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Restoran temanız için hazır renk kombinasyonları
              </div>
              {restaurantColorSets.map((set, index) => (
                <div 
                  key={index}
                  className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleColorSelect(set.colors.buttons)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{set.name}</h4>
                      <p className="text-xs text-muted-foreground">{set.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      {Object.values(set.colors).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="custom" className="p-4 space-y-4">
              <div>
                <Label className="text-foreground">Renk Seçici</Label>
                <div className="mt-2 flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-16 h-12 rounded-lg border border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <Input
                      value={customColor}
                      onChange={(e) => handleCustomColorChange(e.target.value)}
                      placeholder="#000000"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-foreground">Son Kullanılan Renkler</Label>
                <div className="mt-2 grid grid-cols-8 gap-2">
                  {/* This would be populated from localStorage or state */}
                  {[value, "#E91E63", "#2196F3", "#4CAF50", "#FF9800", "#9C27B0", "#607D8B", "#795548"].map((color, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110",
                        value === color ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <Button 
                  onClick={() => handleColorSelect(customColor)}
                  className="w-full"
                >
                  Bu Rengi Kullan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Enhanced Color Section Component for Theme Customization
export function EnhancedColorSection({ currentTheme, updateAdvancedSetting }) {
  const colorLabels = {
    header: "Header Arka Planı",
    body: "Sayfa Arka Planı", 
    cards: "Kart Arka Planları",
    buttons: "Buton Renkleri",
    labels: "Etiket Metinleri",
    restaurantName: "Restoran Adı",
    categoryName: "Kategori Adları",
    productName: "Ürün Adları",
    productPrice: "Ürün Fiyatları",
    productDescription: "Ürün Açıklamaları"
  };

  const colorDescriptions = {
    header: "Menü üst kısmının arka plan rengi",
    body: "Ana sayfa arka plan rengi",
    cards: "Ürün ve kategori kartlarının arka planı",
    buttons: "Tüm butonların rengi",
    labels: "Yardımcı metin ve etiketlerin rengi",
    restaurantName: "Restoran isminin metin rengi",
    categoryName: "Kategori isimlerinin metin rengi",
    productName: "Ürün isimlerinin metin rengi",
    productPrice: "Fiyat bilgilerinin metin rengi",
    productDescription: "Ürün açıklamalarının metin rengi"
  };

  return (
    <div className="space-y-6">
      {/* Quick Color Schemes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Hızlı Renk Şemaları</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {restaurantColorSets.map((set, index) => (
            <div 
              key={index}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => {
                // Apply the color set to relevant theme colors
                updateAdvancedSetting('colors.header', set.colors.header);
                updateAdvancedSetting('colors.buttons', set.colors.buttons);
                updateAdvancedSetting('colors.productPrice', set.colors.productPrice);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {set.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{set.description}</p>
                </div>
                <div className="flex space-x-1">
                  {Object.values(set.colors).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded border border-border group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Color Controls */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Detaylı Renk Ayarları</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(currentTheme.advancedSettings.colors).map(([key, value]) => (
            <ColorPicker
              key={key}
              value={value}
              onChange={(color) => updateAdvancedSetting(`colors.${key}`, color)}
              label={colorLabels[key] || key}
              description={colorDescriptions[key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}