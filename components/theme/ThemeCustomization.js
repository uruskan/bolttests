'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Layout, 
  Save,
  RotateCcw,
  Eye,
  Download,
  Upload,
  Settings,
  Wand2,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Check,
  ChevronDown,
  Move,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  themePresets, 
  colorSchemePresets, 
  availableFonts, 
  socialIconPacks,
  categoryAnimationTypes,
  getDefaultThemeBlueprint 
} from '@/lib/theme/themeBlueprint';

export function ThemeCustomization() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('simple');
  const [currentTheme, setCurrentTheme] = useState(getDefaultThemeBlueprint());
  const [selectedPreset, setSelectedPreset] = useState('elegant-classic');
  const [fontSize, setFontSize] = useState([16]);
  const [density, setDensity] = useState([16]);
  const [activeColorElement, setActiveColorElement] = useState(null);
  const [activeTypographyElement, setActiveTypographyElement] = useState(null);

  const applyThemePreset = (presetKey) => {
    const preset = themePresets[presetKey];
    if (preset) {
      setCurrentTheme(preset.blueprint);
      setSelectedPreset(presetKey);
    }
  };

  const updateAdvancedSetting = (path, value) => {
    setCurrentTheme(prev => {
      const newTheme = { ...prev };
      const pathArray = path.split('.');
      let current = newTheme.advancedSettings;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      current[pathArray[pathArray.length - 1]] = value;
      return newTheme;
    });
  };

  const resetToDefault = () => {
    setCurrentTheme(getDefaultThemeBlueprint());
    setSelectedPreset('elegant-classic');
    setFontSize([16]);
    setDensity([16]);
  };

  const colorElements = [
    { key: 'header', label: 'Header', description: 'Header background color' },
    { key: 'buttons', label: 'Buttons', description: 'Primary button color' },
    { key: 'productPrice', label: 'Prices', description: 'Product price color' },
    { key: 'cards', label: 'Cards', description: 'Card background color' },
    { key: 'restaurantName', label: 'Restaurant Name', description: 'Main title color' },
    { key: 'productName', label: 'Product Names', description: 'Product title color' }
  ];

  const typographyElements = [
    { key: 'restaurantName', label: 'Restaurant Name', sample: 'Bella Vista' },
    { key: 'restaurantSlogan', label: 'Restaurant Slogan', sample: 'İtalyan Mutfağı' },
    { key: 'categoryName', label: 'Category Names', sample: 'Ana Yemekler' },
    { key: 'productName', label: 'Product Names', sample: 'Pasta Carbonara' },
    { key: 'productPrice', label: 'Product Prices', sample: '₺89.99' },
    { key: 'productDescription', label: 'Descriptions', sample: 'Taze malzemelerle lezzetli makarna' }
  ];

  const layoutBlocks = [
    { key: 'header', label: 'Header', icon: '🏠', enabled: true },
    { key: 'advertisementHero', label: 'Hero Ads', icon: '📢', enabled: false },
    { key: 'featuredItems', label: 'Featured Items', icon: '⭐', enabled: true },
    { key: 'advertisementButton', label: 'Ad Button', icon: '🎯', enabled: true },
    { key: 'categories', label: 'Categories', icon: '📋', enabled: true },
    { key: 'footer', label: 'Footer', icon: '📄', enabled: true }
  ];

  return (
    <div className={cn("space-y-8", isDarkMode && "dark")}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tema Özelleştirme</h1>
          <p className="text-muted-foreground mt-1">QR menünüzün görünümünü özelleştirin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="transition-all duration-200"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            İçe Aktar
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Mode Toggle */}
      <Card className="backdrop-blur-xl border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Özelleştirme Modu</h3>
              <p className="text-muted-foreground">
                {themeMode === 'simple' 
                  ? 'Basit mod: Hazır temalar ve hızlı ayarlar' 
                  : 'Gelişmiş mod: Tam kontrol ve detaylı özelleştirme'}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
              <Button
                variant={themeMode === 'simple' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setThemeMode('simple')}
                className="transition-all duration-200"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Basit
              </Button>
              <Button
                variant={themeMode === 'advanced' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setThemeMode('advanced')}
                className="transition-all duration-200"
              >
                <Settings className="w-4 h-4 mr-2" />
                Gelişmiş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {themeMode === 'simple' ? (
            // Simple Mode - Visual Theme Selector
            <div className="space-y-8">
              {/* Theme Presets */}
              <Card className="backdrop-blur-xl border bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">Tema Seçin</CardTitle>
                  <p className="text-muted-foreground">Restoranınıza uygun hazır temalardan birini seçin</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(themePresets).map(([key, preset]) => (
                      <div
                        key={key}
                        className={cn(
                          "group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105",
                          selectedPreset === key 
                            ? "ring-4 ring-primary shadow-2xl" 
                            : "hover:shadow-xl"
                        )}
                        onClick={() => applyThemePreset(key)}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={preset.preview} 
                            alt={preset.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {selectedPreset === key && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-6 bg-card">
                          <h3 className="text-xl font-bold text-foreground mb-2">{preset.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{preset.description}</p>
                          {selectedPreset === key && (
                            <Badge className="mt-3 bg-primary text-primary-foreground">
                              Seçili Tema
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Global Settings */}
              <Card className="backdrop-blur-xl border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">Hızlı Ayarlar</CardTitle>
                  <p className="text-muted-foreground">Genel görünüm ayarlarını hızlıca değiştirin</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-medium text-foreground">Yazı Boyutu</Label>
                        <Badge variant="outline" className="text-sm">{fontSize[0]}px</Badge>
                      </div>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Küçük</span>
                        <span>Büyük</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-medium text-foreground">Boşluk Yoğunluğu</Label>
                        <Badge variant="outline" className="text-sm">{density[0]}px</Badge>
                      </div>
                      <Slider
                        value={density}
                        onValueChange={setDensity}
                        max={32}
                        min={8}
                        step={2}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Sıkışık</span>
                        <span>Geniş</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Advanced Mode - Visual Editor
            <div className="space-y-8">
              {/* Colors Section */}
              <Card className="backdrop-blur-xl border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-bold text-foreground">
                    <Palette className="w-6 h-6 mr-3 text-primary" />
                    Renkler
                  </CardTitle>
                  <p className="text-muted-foreground">Her öğenin rengini ayrı ayrı özelleştirin</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {colorElements.map((element) => (
                      <div
                        key={element.key}
                        className={cn(
                          "group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg",
                          activeColorElement === element.key 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setActiveColorElement(activeColorElement === element.key ? null : element.key)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div 
                            className="w-8 h-8 rounded-lg border-2 border-white shadow-md"
                            style={{ backgroundColor: currentTheme.advancedSettings.colors[element.key] }}
                          />
                          <div>
                            <div className="font-medium text-foreground">{element.label}</div>
                            <div className="text-xs text-muted-foreground">{element.description}</div>
                          </div>
                        </div>
                        {activeColorElement === element.key && (
                          <div className="mt-4">
                            <input
                              type="color"
                              value={currentTheme.advancedSettings.colors[element.key]}
                              onChange={(e) => updateAdvancedSetting(`colors.${element.key}`, e.target.value)}
                              className="w-full h-12 rounded-lg border border-border cursor-pointer"
                            />
                            <div className="mt-2 text-xs text-center text-muted-foreground font-mono">
                              {currentTheme.advancedSettings.colors[element.key]}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Typography Section */}
              <Card className="backdrop-blur-xl border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-bold text-foreground">
                    <Type className="w-6 h-6 mr-3 text-primary" />
                    Tipografi
                  </CardTitle>
                  <p className="text-muted-foreground">Her metin öğesinin yazı tipini özelleştirin</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {typographyElements.map((element) => {
                      const settings = currentTheme.advancedSettings.typography[element.key];
                      return (
                        <div
                          key={element.key}
                          className={cn(
                            "group p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            activeTypographyElement === element.key 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          )}
                          onClick={() => setActiveTypographyElement(activeTypographyElement === element.key ? null : element.key)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-medium text-foreground">{element.label}</div>
                              <div className="text-sm text-muted-foreground">{settings.fontFamily} • {settings.fontSize} • {settings.fontWeight}</div>
                            </div>
                            <ChevronDown className={cn(
                              "w-5 h-5 text-muted-foreground transition-transform duration-200",
                              activeTypographyElement === element.key && "rotate-180"
                            )} />
                          </div>
                          
                          <div 
                            className="text-2xl font-medium mb-4"
                            style={{ 
                              fontFamily: settings.fontFamily,
                              fontSize: settings.fontSize,
                              fontWeight: settings.fontWeight,
                              textAlign: settings.alignment,
                              color: currentTheme.advancedSettings.colors[element.key] || currentTheme.advancedSettings.colors.productName
                            }}
                          >
                            {element.sample}
                          </div>

                          {activeTypographyElement === element.key && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                              <div>
                                <Label className="text-sm font-medium text-foreground">Font Family</Label>
                                <Select 
                                  value={settings.fontFamily}
                                  onValueChange={(value) => updateAdvancedSetting(`typography.${element.key}.fontFamily`, value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableFonts.map((font) => (
                                      <SelectItem key={font} value={font}>{font}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-foreground">Font Weight</Label>
                                <Select 
                                  value={settings.fontWeight}
                                  onValueChange={(value) => updateAdvancedSetting(`typography.${element.key}.fontWeight`, value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="300">Light (300)</SelectItem>
                                    <SelectItem value="400">Regular (400)</SelectItem>
                                    <SelectItem value="500">Medium (500)</SelectItem>
                                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                                    <SelectItem value="700">Bold (700)</SelectItem>
                                    <SelectItem value="800">Extra Bold (800)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Layout & Components */}
              <Card className="backdrop-blur-xl border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-bold text-foreground">
                    <Layout className="w-6 h-6 mr-3 text-primary" />
                    Düzen ve Bileşenler
                  </CardTitle>
                  <p className="text-muted-foreground">Sayfa düzenini ve bileşenleri yönetin</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Layout Blocks */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Sayfa Blokları</h4>
                    <div className="space-y-3">
                      {layoutBlocks.map((block, index) => (
                        <div key={block.key} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Move className="w-4 h-4 text-muted-foreground cursor-grab" />
                            <span className="text-2xl">{block.icon}</span>
                            <div>
                              <div className="font-medium text-foreground">{block.label}</div>
                              <div className="text-sm text-muted-foreground">Sıra: {index + 1}</div>
                            </div>
                          </div>
                          <Switch
                            checked={block.enabled}
                            onCheckedChange={(checked) => {
                              // Update block enabled state
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Component Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Bileşen Ayarları</h4>
                      
                      <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">Sosyal Medya İkonları</div>
                          <div className="text-sm text-muted-foreground">Header'da sosyal medya ikonlarını göster</div>
                        </div>
                        <Switch
                          checked={currentTheme.advancedSettings.components.header.socialIcons.enabled}
                          onCheckedChange={(checked) => updateAdvancedSetting('components.header.socialIcons.enabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">Öne Çıkan Ürünler</div>
                          <div className="text-sm text-muted-foreground">Ana sayfada öne çıkan ürünleri göster</div>
                        </div>
                        <Switch
                          checked={currentTheme.advancedSettings.components.featuredSection.enabled}
                          onCheckedChange={(checked) => updateAdvancedSetting('components.featuredSection.enabled', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Görünüm Ayarları</h4>
                      
                      <div>
                        <Label className="text-sm font-medium text-foreground">Logo Boyutu</Label>
                        <Select 
                          value={currentTheme.advancedSettings.components.header.logoSize}
                          onValueChange={(value) => updateAdvancedSetting('components.header.logoSize', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Küçük</SelectItem>
                            <SelectItem value="medium">Orta</SelectItem>
                            <SelectItem value="large">Büyük</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-foreground">İkon Paketi</Label>
                        <Select 
                          value={currentTheme.advancedSettings.components.header.socialIcons.iconPack}
                          onValueChange={(value) => updateAdvancedSetting('components.header.socialIcons.iconPack', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(socialIconPacks).map(([key, name]) => (
                              <SelectItem key={key} value={key}>{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Live Preview - Unchanged */}
        <div className="lg:col-span-1">
          <Card className="backdrop-blur-xl border sticky top-6 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                <span className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  QR Menü Önizlemesi
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Monitor className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Preview Header */}
                <div 
                  className="p-4 text-white rounded-lg"
                  style={{ 
                    backgroundColor: currentTheme.advancedSettings.colors.header,
                    borderRadius: '8px'
                  }}
                >
                  <h3 
                    className="font-bold text-lg"
                    style={{ 
                      fontSize: `${fontSize[0] + 4}px`,
                      fontFamily: currentTheme.advancedSettings.typography.restaurantName.fontFamily,
                      color: currentTheme.advancedSettings.colors.restaurantName
                    }}
                  >
                    Bella Vista
                  </h3>
                  <p 
                    className="text-sm opacity-90"
                    style={{ 
                      fontFamily: currentTheme.advancedSettings.typography.restaurantSlogan.fontFamily,
                      color: currentTheme.advancedSettings.colors.restaurantName
                    }}
                  >
                    İtalyan Mutfağı
                  </p>
                </div>

                {/* Preview Menu Item */}
                <div 
                  className="border"
                  style={{ 
                    backgroundColor: currentTheme.advancedSettings.colors.cards,
                    borderRadius: '8px',
                    padding: `${density[0]}px`,
                    borderColor: 'hsl(var(--border))'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      fontSize: `${fontSize[0] + 2}px`,
                      fontFamily: currentTheme.advancedSettings.typography.productName.fontFamily,
                      color: currentTheme.advancedSettings.colors.productName
                    }}
                  >
                    Pasta Carbonara
                  </h4>
                  <p 
                    className="mb-3"
                    style={{ 
                      fontSize: `${fontSize[0]}px`,
                      fontFamily: currentTheme.advancedSettings.typography.productDescription.fontFamily,
                      color: currentTheme.advancedSettings.colors.productDescription
                    }}
                  >
                    Taze malzemelerle lezzetli makarna
                  </p>
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-lg font-bold"
                      style={{ 
                        color: currentTheme.advancedSettings.colors.productPrice,
                        fontFamily: currentTheme.advancedSettings.typography.productPrice.fontFamily
                      }}
                    >
                      ₺89.99
                    </span>
                    <button
                      className="text-white px-3 py-1 rounded text-sm font-medium"
                      style={{ 
                        backgroundColor: currentTheme.advancedSettings.colors.buttons,
                        borderRadius: '4px',
                        fontSize: `${fontSize[0] - 2}px`
                      }}
                    >
                      Detay
                    </button>
                  </div>
                </div>

                {/* Preview Category */}
                <div 
                  className="border"
                  style={{ 
                    backgroundColor: currentTheme.advancedSettings.colors.cards,
                    borderRadius: '8px',
                    padding: `${density[0]}px`,
                    borderColor: 'hsl(var(--border))'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ 
                      fontSize: `${fontSize[0] + 2}px`,
                      fontFamily: currentTheme.advancedSettings.typography.categoryName.fontFamily,
                      color: currentTheme.advancedSettings.colors.productName
                    }}
                  >
                    Ana Yemekler
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: currentTheme.advancedSettings.colors.labels
                    }}
                  >
                    8 öğe
                  </p>
                </div>

                {/* Reset Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={resetToDefault}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Varsayılana Sıfırla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}