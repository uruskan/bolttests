'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { EnhancedColorSection } from '@/components/ui/color-picker';
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
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  ImageIcon,
  GripVertical
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

// Sortable Block Component
function SortableBlock({ block, blockLabels }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg bg-accent/30 border border-border transition-all duration-200",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-accent transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="font-medium text-foreground">
          {blockLabels[block] || block}
        </span>
      </div>
      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
        Sıra: {block}
      </Badge>
    </div>
  );
}

export function ThemeCustomization() {
  const [themeMode, setThemeMode] = useState('simple');
  const [currentTheme, setCurrentTheme] = useState(getDefaultThemeBlueprint());
  const [selectedPreset, setSelectedPreset] = useState('elegant-classic');
  const [selectedColorScheme, setSelectedColorScheme] = useState('rose-gold');
  const [fontSize, setFontSize] = useState([16]);
  const [density, setDensity] = useState([16]);
  const [borderRadius, setBorderRadius] = useState([8]);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Block labels for layout section
  const blockLabels = {
    header: "Header",
    advertisementHero: "Reklam Hero Slider",
    featuredItems: "Öne Çıkan Ürünler",
    advertisementButton: "Kampanyalar Butonu",
    categories: "Kategoriler",
    footer: "Footer"
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = currentTheme.advancedSettings.layout.blocks.findIndex(
        (block) => block === active.id
      );
      const newIndex = currentTheme.advancedSettings.layout.blocks.findIndex(
        (block) => block === over.id
      );

      const newBlocks = arrayMove(
        currentTheme.advancedSettings.layout.blocks,
        oldIndex,
        newIndex
      );

      setCurrentTheme(prev => ({
        ...prev,
        advancedSettings: {
          ...prev.advancedSettings,
          layout: {
            ...prev.advancedSettings.layout,
            blocks: newBlocks
          }
        }
      }));
    }
  };

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

  const getFontPreviewText = (key) => {
    const previewTexts = {
      restaurantName: "Bella Vista Restaurant",
      restaurantSlogan: "Otantik İtalyan Mutfağı 1985'ten Beri",
      categoryName: "Ana Yemekler",
      productName: "Pasta Carbonara",
      productPrice: "₺89.99",
      productDescription: "Taze malzemelerle hazırlanan geleneksel İtalyan makarnası, krema sosu ve parmesan peyniri ile servis edilir."
    };
    return previewTexts[key] || "Örnek Metin";
  };

  const getTypographyLabel = (key) => {
    const labels = {
      restaurantName: "Restoran Adı",
      restaurantSlogan: "Restoran Sloganı",
      categoryName: "Kategoriler",
      productName: "Ürün Adları",
      productPrice: "Fiyatlar",
      productDescription: "Açıklamalar"
    };
    return labels[key] || key;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tema Özelleştirme</h1>
          <p className="text-muted-foreground mt-1">QR menünüzün görünümünü özelleştirin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
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
            // Advanced Mode with Tabs
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted border border-border">
                <TabsTrigger 
                  value="colors" 
                  className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Renkler
                </TabsTrigger>
                <TabsTrigger 
                  value="typography" 
                  className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Type className="w-4 h-4 mr-2" />
                  Tipografi
                </TabsTrigger>
                <TabsTrigger 
                  value="layout" 
                  className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Layout className="w-4 h-4 mr-2" />
                  Düzen
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="flex items-center data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Gelişmiş
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Renk Ayarları</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Menünüzün renklerini kolayca özelleştirin. Hazır renk paletlerinden seçim yapabilir veya kendi renklerinizi belirleyebilirsiniz.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <EnhancedColorSection 
                      currentTheme={currentTheme}
                      updateAdvancedSetting={updateAdvancedSetting}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Typography Settings - Fixed Height with Full Content Distribution */}
                  <Card className="bg-card border-border h-[700px]">
                    <CardHeader>
                      <CardTitle className="text-foreground">Tipografi Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-[calc(100%-80px)]">
                      <Tabs defaultValue="restaurantName" orientation="vertical" className="flex h-full">
                        <TabsList className="flex flex-col h-full w-48 bg-muted/30 rounded-none border-r border-border py-4">
                          {Object.keys(currentTheme.advancedSettings.typography).map((key) => (
                            <TabsTrigger 
                              key={key}
                              value={key} 
                              className="w-full justify-start data-[state=active]:bg-background mb-2 py-3"
                            >
                              {getTypographyLabel(key)}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        <div className="flex-1 h-full">
                          {Object.entries(currentTheme.advancedSettings.typography).map(([key, settings]) => (
                            <TabsContent key={key} value={key} className="mt-0 h-full p-8">
                              <div className="h-full flex flex-col justify-between space-y-12">
                                {/* Header */}
                                <div className="text-center">
                                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                                    {getTypographyLabel(key)}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    Bu bölümün tipografi ayarlarını düzenleyin
                                  </p>
                                </div>

                                {/* Font Family */}
                                <div className="space-y-4">
                                  <Label className="text-foreground text-lg font-medium">Font Ailesi</Label>
                                  <Select 
                                    value={settings.fontFamily}
                                    onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontFamily`, value)}
                                  >
                                    <SelectTrigger className="bg-background border-border text-foreground h-14 text-lg">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background border-border">
                                      {availableFonts.map((font) => (
                                        <SelectItem key={font} value={font} className="text-lg py-3">{font}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Font Size */}
                                <div className="space-y-6">
                                  <Label className="text-foreground text-lg font-medium">
                                    Boyut: {settings.fontSize}
                                  </Label>
                                  <div className="flex items-center space-x-6">
                                    <Slider
                                      value={[parseInt(settings.fontSize)]}
                                      onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontSize`, `${value[0]}px`)}
                                      max={48}
                                      min={8}
                                      step={1}
                                      className="flex-1"
                                    />
                                    <span className="text-lg text-muted-foreground w-20 text-right font-medium">
                                      {settings.fontSize}
                                    </span>
                                  </div>
                                </div>

                                {/* Alignment and Style */}
                                <div className="space-y-6">
                                  <Label className="text-foreground text-lg font-medium">Hizalama ve Stil</Label>
                                  <div className="flex items-center justify-center space-x-6">
                                    <div className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                                      <Button
                                        variant={settings.alignment === 'left' ? 'default' : 'ghost'}
                                        size="lg"
                                        onClick={() => updateAdvancedSetting(`typography.${key}.alignment`, 'left')}
                                      >
                                        <AlignLeft className="w-5 h-5" />
                                      </Button>
                                      <Button
                                        variant={settings.alignment === 'center' ? 'default' : 'ghost'}
                                        size="lg"
                                        onClick={() => updateAdvancedSetting(`typography.${key}.alignment`, 'center')}
                                      >
                                        <AlignCenter className="w-5 h-5" />
                                      </Button>
                                      <Button
                                        variant={settings.alignment === 'right' ? 'default' : 'ghost'}
                                        size="lg"
                                        onClick={() => updateAdvancedSetting(`typography.${key}.alignment`, 'right')}
                                      >
                                        <AlignRight className="w-5 h-5" />
                                      </Button>
                                    </div>

                                    <div className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                                      <Button
                                        variant={parseInt(settings.fontWeight) >= 600 ? 'default' : 'ghost'}
                                        size="lg"
                                        onClick={() => updateAdvancedSetting(`typography.${key}.fontWeight`, parseInt(settings.fontWeight) >= 600 ? '400' : '700')}
                                      >
                                        <Bold className="w-5 h-5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="lg"
                                      >
                                        <Italic className="w-5 h-5" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Spacer */}
                                <div className="flex-1"></div>
                              </div>
                            </TabsContent>
                          ))}
                        </div>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Font Preview - Fixed Height */}
                  <Card className="bg-card border-border h-[700px]">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Font Önizlemesi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                      <div className="space-y-6">
                        {Object.entries(currentTheme.advancedSettings.typography).map(([key, settings]) => (
                          <div key={key} className="p-4 bg-accent/20 rounded-lg border border-border">
                            <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-medium">
                              {getTypographyLabel(key)}
                            </div>
                            <div
                              style={{
                                fontFamily: settings.fontFamily,
                                fontSize: settings.fontSize,
                                fontWeight: settings.fontWeight,
                                textAlign: settings.alignment,
                                color: currentTheme.advancedSettings.colors[key] || currentTheme.advancedSettings.colors.productName,
                                lineHeight: '1.4'
                              }}
                              className="transition-all duration-200 mb-3"
                            >
                              {getFontPreviewText(key)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {settings.fontFamily} • {settings.fontSize} • {settings.fontWeight} • {settings.alignment}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Sayfa Blokları Sırası</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Blokları sürükleyerek menü sayfasındaki sıralamayı değiştirin
                    </p>
                  </CardHeader>
                  <CardContent>
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext 
                        items={currentTheme.advancedSettings.layout.blocks}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {currentTheme.advancedSettings.layout.blocks.map((block) => (
                            <SortableBlock 
                              key={block} 
                              block={block} 
                              blockLabels={blockLabels}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Diğer Düzen Ayarları</CardTitle>
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
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
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Live Preview */}
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