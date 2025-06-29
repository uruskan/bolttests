'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Pipette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Predefined color palettes for easy selection
const colorPalettes = {
  warm: {
    name: "Sıcak Renkler",
    colors: ["#FF6B6B", "#FF8E53", "#FF6B9D", "#C44569", "#F8B500", "#FF7675"]
  },
  cool: {
    name: "Soğuk Renkler", 
    colors: ["#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]
  },
  neutral: {
    name: "Nötr Renkler",
    colors: ["#95A5A6", "#7F8C8D", "#BDC3C7", "#ECF0F1", "#34495E", "#2C3E50"]
  },
  vibrant: {
    name: "Canlı Renkler",
    colors: ["#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C", "#F39C12", "#27AE60"]
  },
  pastel: {
    name: "Pastel Renkler",
    colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E1BAFF"]
  },
  earth: {
    name: "Toprak Tonları",
    colors: ["#8B4513", "#D2691E", "#CD853F", "#DEB887", "#F4A460", "#BC8F8F"]
  }
};

// Popular color combinations for restaurants
const restaurantColorSchemes = {
  italian: {
    name: "İtalyan Restoranı",
    description: "Klasik İtalyan renkleri",
    colors: {
      header: "#2C5530",
      buttons: "#C8102E", 
      productPrice: "#C8102E",
      cards: "#FFFFFF",
      labels: "#666666"
    }
  },
  modern: {
    name: "Modern Şık",
    description: "Çağdaş ve minimalist",
    colors: {
      header: "#1A1A1A",
      buttons: "#FF6B35",
      productPrice: "#FF6B35", 
      cards: "#FFFFFF",
      labels: "#666666"
    }
  },
  elegant: {
    name: "Zarif Klasik",
    description: "Sofistike ve zamansız",
    colors: {
      header: "#2C3E50",
      buttons: "#E67E22",
      productPrice: "#E67E22",
      cards: "#FFFFFF", 
      labels: "#7F8C8D"
    }
  },
  fresh: {
    name: "Taze & Doğal",
    description: "Organik ve sağlıklı",
    colors: {
      header: "#27AE60",
      buttons: "#F39C12",
      productPrice: "#E74C3C",
      cards: "#FFFFFF",
      labels: "#2ECC71"
    }
  }
};

// Color element descriptions
const colorDescriptions = {
  header: {
    name: "Header Arka Planı",
    description: "Üst kısım ve logo alanının arka plan rengi"
  },
  body: {
    name: "Sayfa Arka Planı", 
    description: "Ana sayfa arka plan rengi"
  },
  cards: {
    name: "Kart Arka Planları",
    description: "Ürün kartları ve kategori kartlarının arka planı"
  },
  buttons: {
    name: "Butonlar",
    description: "Tüm butonların rengi (detay, sipariş vb.)"
  },
  labels: {
    name: "Etiketler",
    description: "Yardımcı metinler ve etiketlerin rengi"
  },
  restaurantName: {
    name: "Restoran Adı",
    description: "Header'daki restoran adının metin rengi"
  },
  categoryName: {
    name: "Kategori Adları",
    description: "Kategori kartlarındaki başlık metinleri"
  },
  productName: {
    name: "Ürün Adları", 
    description: "Ürün kartlarındaki ürün isimlerinin rengi"
  },
  productPrice: {
    name: "Ürün Fiyatları",
    description: "Fiyat etiketlerinin rengi"
  },
  productDescription: {
    name: "Ürün Açıklamaları",
    description: "Ürün açıklama metinlerinin rengi"
  }
};

function ColorPalette({ palette, onColorSelect }) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-foreground">{palette.name}</h4>
      <div className="grid grid-cols-6 gap-2">
        {palette.colors.map((color, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md"
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}

function RestaurantScheme({ scheme, onApplyScheme, isSelected }) {
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border hover:border-primary/50 hover:shadow-sm"
      )}
      onClick={() => onApplyScheme(scheme.colors)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex space-x-1">
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: scheme.colors.header }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: scheme.colors.buttons }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: scheme.colors.productPrice }}
          />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{scheme.name}</h4>
          <p className="text-xs text-muted-foreground">{scheme.description}</p>
        </div>
      </div>
      {isSelected && (
        <Badge className="bg-primary text-primary-foreground">
          Seçili
        </Badge>
      )}
    </div>
  );
}

function ColorInput({ label, value, onChange, description }) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorPickerChange = (newValue) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-foreground font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorPickerChange(e.target.value)}
          className="w-12 h-12 rounded-lg border border-border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        />
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
            placeholder="#FFFFFF"
            className="font-mono"
          />
        </div>
        <div 
          className="w-12 h-12 rounded-lg border border-border shadow-sm"
          style={{ backgroundColor: value }}
          title={`Önizleme: ${value}`}
        />
      </div>
    </div>
  );
}

export function EnhancedColorSection({ currentTheme, updateAdvancedSetting }) {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [activeColorKey, setActiveColorKey] = useState(null);

  const handleColorChange = (colorKey, newColor) => {
    updateAdvancedSetting(`colors.${colorKey}`, newColor);
  };

  const handlePaletteColorSelect = (color) => {
    if (activeColorKey) {
      handleColorChange(activeColorKey, color);
    }
  };

  const handleApplyScheme = (schemeColors) => {
    Object.entries(schemeColors).forEach(([key, color]) => {
      updateAdvancedSetting(`colors.${key}`, color);
    });
    setSelectedScheme(schemeColors);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="schemes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted border border-border">
          <TabsTrigger 
            value="schemes" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Hazır Şemalar
          </TabsTrigger>
          <TabsTrigger 
            value="palettes" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Palette className="w-4 h-4 mr-2" />
            Renk Paletleri
          </TabsTrigger>
          <TabsTrigger 
            value="custom" 
            className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Pipette className="w-4 h-4 mr-2" />
            Özel Renkler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schemes" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Restoran Renk Şemaları</h3>
              <p className="text-sm text-muted-foreground">
                Restoranınızın tarzına uygun hazır renk kombinasyonlarından birini seçin
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(restaurantColorSchemes).map(([key, scheme]) => (
                <RestaurantScheme
                  key={key}
                  scheme={scheme}
                  onApplyScheme={handleApplyScheme}
                  isSelected={selectedScheme === scheme.colors}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="palettes" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Renk Paletleri</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Önce aşağıdan değiştirmek istediğiniz renk öğesini seçin, sonra paletlerden bir renk tıklayın
              </p>
              
              {/* Active Color Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
                {Object.entries(colorDescriptions).map(([key, info]) => (
                  <Button
                    key={key}
                    variant={activeColorKey === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveColorKey(key)}
                    className="text-xs h-auto py-2 px-3"
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2 border border-border"
                      style={{ backgroundColor: currentTheme.advancedSettings.colors[key] }}
                    />
                    {info.name}
                  </Button>
                ))}
              </div>

              {activeColorKey && (
                <div className="p-4 bg-accent/30 rounded-lg border border-border mb-6">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-lg border border-border"
                      style={{ backgroundColor: currentTheme.advancedSettings.colors[activeColorKey] }}
                    />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {colorDescriptions[activeColorKey].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {colorDescriptions[activeColorKey].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(colorPalettes).map(([key, palette]) => (
                <ColorPalette
                  key={key}
                  palette={palette}
                  onColorSelect={handlePaletteColorSelect}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Özel Renk Ayarları</h3>
              <p className="text-sm text-muted-foreground">
                Her renk öğesini ayrı ayrı özelleştirin. Renk seçici veya hex kod ile renk belirleyebilirsiniz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(currentTheme.advancedSettings.colors).map(([key, value]) => (
                <ColorInput
                  key={key}
                  label={colorDescriptions[key]?.name || key}
                  description={colorDescriptions[key]?.description || ''}
                  value={value}
                  onChange={(newColor) => handleColorChange(key, newColor)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}