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
  ChevronRight,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  Layers,
  Paintbrush,
  AlignLeft,
  AlignCenter,
  AlignRight
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
  const [selectedColorScheme, setSelectedColorScheme] = useState('rose-gold');
  const [fontSize, setFontSize] = useState([16]);
  const [density, setDensity] = useState([16]);
  const [borderRadius, setBorderRadius] = useState([8]);

  const applyThemePreset = (presetKey) => {
    const preset = themePresets[presetKey];
    if (preset) {
      setCurrentTheme(preset.blueprint);
      setSelectedPreset(presetKey);
    }
  };

  const applyColorScheme = (schemeKey) => {
    const scheme = colorSchemePresets[schemeKey];
    if (scheme) {
      setCurrentTheme(prev => ({
        ...prev,
        advancedSettings: {
          ...prev.advancedSettings,
          colors: {
            ...prev.advancedSettings.colors,
            ...scheme.colors
          }
        }
      }));
      setSelectedColorScheme(schemeKey);
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
    setSelectedColorScheme('rose-gold');
    setFontSize([16]);
    setDensity([16]);
    setBorderRadius([8]);
  };

  return (
    <div className={cn("space-y-6", isDarkMode && "dark")}>
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
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">Özelleştirme Modu</h3>
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
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Basit
              </Button>
              <Button
                variant={themeMode === 'advanced' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setThemeMode('advanced')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Gelişmiş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {themeMode === 'simple' ? (
            // Simple Mode
            <div className="space-y-6">
              {/* Theme Presets */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Tema Presetleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(themePresets).map(([key, preset]) => (
                      <div
                        key={key}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                          selectedPreset === key 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => applyThemePreset(key)}
                      >
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-muted">
                          <img 
                            src={preset.preview} 
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium mb-1 text-foreground">{preset.name}</h3>
                        <p className="text-sm text-muted-foreground">{preset.description}</p>
                        {selectedPreset === key && (
                          <Badge className="mt-2 bg-primary text-primary-foreground">
                            Seçili
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Schemes */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Renk Şemaları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(colorSchemePresets).map(([key, scheme]) => (
                      <div
                        key={key}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                          selectedColorScheme === key 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => applyColorScheme(key)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex space-x-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: scheme.colors.buttons }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: scheme.colors.productPrice }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: scheme.colors.header }}
                            />
                          </div>
                          <h3 className="font-medium text-foreground">{scheme.name}</h3>
                        </div>
                        {selectedColorScheme === key && (
                          <Badge className="bg-primary text-primary-foreground">
                            Seçili
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Settings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Hızlı Ayarlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground">Yazı Boyutu: {fontSize[0]}px</Label>
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      max={24}
                      min={12}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-foreground">Boşluk Yoğunluğu: {density[0]}px</Label>
                    <Slider
                      value={density}
                      onValueChange={setDensity}
                      max={32}
                      min={8}
                      step={2}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Advanced Mode
            <div className="space-y-6">
              {/* Colors */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Palette className="w-5 h-5 mr-2" />
                    Renk Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(currentTheme.advancedSettings.colors).map(([key, value]) => (
                      <div key={key}>
                        <Label className="capitalize text-foreground">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </Label>
                        <div className="flex items-center space-x-3 mt-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => updateAdvancedSetting(`colors.${key}`, e.target.value)}
                            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                          />
                          <div>
                            <div className="font-medium text-foreground">{key}</div>
                            <div className="text-sm text-muted-foreground">{value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Type className="w-5 h-5 mr-2" />
                    Yazı Tipi Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(currentTheme.advancedSettings.typography).map(([key, settings]) => (
                      <div key={key} className="border rounded-lg p-4 border-border">
                        <h4 className="font-medium mb-4 capitalize text-foreground">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-foreground">Font Family</Label>
                            <Select 
                              value={settings.fontFamily}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontFamily`, value)}
                            >
                              <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                {availableFonts.map((font) => (
                                  <SelectItem key={font} value={font}>{font}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground">Font Size</Label>
                            <Input 
                              value={settings.fontSize}
                              onChange={(e) => updateAdvancedSetting(`typography.${key}.fontSize`, e.target.value)}
                              className="mt-1 bg-background border-border text-foreground"
                            />
                          </div>
                          <div>
                            <Label className="text-foreground">Font Weight</Label>
                            <Select 
                              value={settings.fontWeight}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontWeight`, value)}
                            >
                              <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                <SelectItem value="300">Light (300)</SelectItem>
                                <SelectItem value="400">Regular (400)</SelectItem>
                                <SelectItem value="500">Medium (500)</SelectItem>
                                <SelectItem value="600">Semi Bold (600)</SelectItem>
                                <SelectItem value="700">Bold (700)</SelectItem>
                                <SelectItem value="800">Extra Bold (800)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-foreground">Alignment</Label>
                            <Select 
                              value={settings.alignment}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.alignment`, value)}
                            >
                              <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-background border-border">
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Layout & Components */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Layout className="w-5 h-5 mr-2" />
                    Düzen Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground">Kenar Yuvarlaklığı: {borderRadius[0]}px</Label>
                    <Slider
                      value={borderRadius}
                      onValueChange={setBorderRadius}
                      max={24}
                      min={0}
                      step={2}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-foreground">Sayfa Blokları Sırası</Label>
                    <div className="mt-2 space-y-2">
                      {currentTheme.advancedSettings.layout.blocks.map((block, index) => (
                        <div key={block} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                          <span className="capitalize text-foreground">
                            {block.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                              {index + 1}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Component Settings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Bileşen Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Öne Çıkan Ürünler Bölümü</div>
                        <div className="text-sm text-muted-foreground">Ana sayfada öne çıkan ürünleri göster</div>
                      </div>
                      <Switch
                        checked={currentTheme.advancedSettings.components.featuredSection.enabled}
                        onCheckedChange={(checked) => updateAdvancedSetting('components.featuredSection.enabled', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Reklam Butonu</div>
                        <div className="text-sm text-muted-foreground">Kampanyalar butonunu göster</div>
                      </div>
                      <Switch
                        checked={currentTheme.advancedSettings.components.advertisementButton.enabled}
                        onCheckedChange={(checked) => updateAdvancedSetting('components.advertisementButton.enabled', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Sosyal Medya İkonları</div>
                        <div className="text-sm text-muted-foreground">Header'da sosyal medya ikonlarını göster</div>
                      </div>
                      <Switch
                        checked={currentTheme.advancedSettings.components.header.socialIcons.enabled}
                        onCheckedChange={(checked) => updateAdvancedSetting('components.header.socialIcons.enabled', checked)}
                      />
                    </div>

                    <div>
                      <Label className="text-foreground">Logo Boyutu</Label>
                      <Select 
                        value={currentTheme.advancedSettings.components.header.logoSize}
                        onValueChange={(value) => updateAdvancedSetting('components.header.logoSize', value)}
                      >
                        <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="small">Küçük</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="large">Büyük</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground">İkon Paketi</Label>
                      <Select 
                        value={currentTheme.advancedSettings.components.header.socialIcons.iconPack}
                        onValueChange={(value) => updateAdvancedSetting('components.header.socialIcons.iconPack', value)}
                      >
                        <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          {Object.entries(socialIconPacks).map(([key, name]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground">Kategori Animasyonu</Label>
                      <Select 
                        value={currentTheme.advancedSettings.components.categoryAnimation.type}
                        onValueChange={(value) => updateAdvancedSetting('components.categoryAnimation.type', value)}
                      >
                        <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          {Object.entries(categoryAnimationTypes).map(([key, name]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Background Images */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Arka Plan Resimleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-foreground">Genel Arka Plan</Label>
                    <Input 
                      placeholder="Firebase Storage URL"
                      value={currentTheme.advancedSettings.backgrounds.global.url || ''}
                      onChange={(e) => updateAdvancedSetting('backgrounds.global.url', e.target.value)}
                      className="mt-1 bg-background border-border text-foreground"
                    />
                    <div className="mt-2">
                      <Label className="text-foreground">Opaklık: {Math.round(currentTheme.advancedSettings.backgrounds.global.opacity * 100)}%</Label>
                      <Slider
                        value={[currentTheme.advancedSettings.backgrounds.global.opacity]}
                        onValueChange={(value) => updateAdvancedSetting('backgrounds.global.opacity', value[0])}
                        max={1}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Header Arka Planı</Label>
                    <Input 
                      placeholder="Firebase Storage URL"
                      value={currentTheme.advancedSettings.backgrounds.sections.header.url || ''}
                      onChange={(e) => updateAdvancedSetting('backgrounds.sections.header.url', e.target.value)}
                      className="mt-1 bg-background border-border text-foreground"
                    />
                    <div className="mt-2">
                      <Label className="text-foreground">Opaklık: {Math.round(currentTheme.advancedSettings.backgrounds.sections.header.opacity * 100)}%</Label>
                      <Slider
                        value={[currentTheme.advancedSettings.backgrounds.sections.header.opacity]}
                        onValueChange={(value) => updateAdvancedSetting('backgrounds.sections.header.opacity', value[0])}
                        max={1}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Kategoriler Arka Planı</Label>
                    <Input 
                      placeholder="Firebase Storage URL"
                      value={currentTheme.advancedSettings.backgrounds.sections.categories.url || ''}
                      onChange={(e) => updateAdvancedSetting('backgrounds.sections.categories.url', e.target.value)}
                      className="mt-1 bg-background border-border text-foreground"
                    />
                    <div className="mt-2">
                      <Label className="text-foreground">Opaklık: {Math.round(currentTheme.advancedSettings.backgrounds.sections.categories.opacity * 100)}%</Label>
                      <Slider
                        value={[currentTheme.advancedSettings.backgrounds.sections.categories.opacity]}
                        onValueChange={(value) => updateAdvancedSetting('backgrounds.sections.categories.opacity', value[0])}
                        max={1}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
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
                    borderRadius: `${borderRadius[0]}px`
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
                  className="border border-border"
                  style={{ 
                    backgroundColor: currentTheme.advancedSettings.colors.cards,
                    borderRadius: `${borderRadius[0]}px`,
                    padding: `${density[0]}px`
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
                        borderRadius: `${borderRadius[0] / 2}px`,
                        fontSize: `${fontSize[0] - 2}px`
                      }}
                    >
                      Detay
                    </button>
                  </div>
                </div>

                {/* Preview Category */}
                <div 
                  className="border border-border"
                  style={{ 
                    backgroundColor: currentTheme.advancedSettings.colors.cards,
                    borderRadius: `${borderRadius[0]}px`,
                    padding: `${density[0]}px`
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