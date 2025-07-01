'use client';

import { useState, useRef, useEffect } from 'react';
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
  layoutOptions,
  getDefaultThemeBlueprint 
} from '@/lib/theme/themeBlueprint';

// Live Preview Component with PostMessage Communication
function LivePreview({ currentTheme }) {
  const iframeRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [previewError, setPreviewError] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.source === 'PREVIEW') {
        const { type, payload } = event.data;
        
        switch (type) {
          case 'PREVIEW_LOADED':
            setIsConnected(true);
            setPreviewError(null);
            // Send initial theme data
            sendThemeUpdate(currentTheme);
            break;
          case 'PREVIEW_ERROR':
            setPreviewError(payload.error);
            setIsConnected(false);
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (isConnected) {
      sendThemeUpdate(currentTheme);
    }
  }, [currentTheme, isConnected]);

  const sendThemeUpdate = (themeConfig) => {
    if (iframeRef.current?.contentWindow && isConnected) {
      iframeRef.current.contentWindow.postMessage({
        source: 'DASHBOARD',
        type: 'THEME_UPDATE',
        payload: themeConfig
      }, '*');
    }
  };

  const handleIframeLoad = () => {
    // Wait a bit for the iframe content to initialize
    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          source: 'DASHBOARD',
          type: 'PREVIEW_READY',
          payload: { timestamp: Date.now() }
        }, '*');
      }
    }, 1000);
  };

  return (
    <Card className="backdrop-blur-xl border sticky top-6 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            QR Menü Önizlemesi
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
              {isConnected ? "Bağlı" : "Bağlanıyor..."}
            </Badge>
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button variant="default" size="sm" className="h-6 px-2 text-xs">
                <Smartphone className="w-3 h-3 mr-1" />
                Mobil
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Mobile Frame */}
          <div className="mx-auto w-80 h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
              {/* Mobile Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
              
              {/* Preview Content */}
              <div className="w-full h-full">
                {previewError ? (
                  <div className="flex items-center justify-center h-full text-center p-4">
                    <div>
                      <div className="text-red-500 mb-2">⚠️</div>
                      <p className="text-sm text-red-600">Önizleme yüklenemedi</p>
                      <p className="text-xs text-gray-500 mt-1">{previewError}</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src="/menu/delago-cafe"
                    className="w-full h-full border-none"
                    onLoad={handleIframeLoad}
                    title="Menu Preview"
                  />
                )}
              </div>
              
              {/* Loading Overlay */}
              {!isConnected && !previewError && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Önizleme yükleniyor...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Değişiklikler otomatik olarak önizlemede görünür
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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

// Layout Selection Component
function LayoutSelection({ type, currentLayout, onLayoutChange }) {
  const layouts = layoutOptions[type] || {};
  
  return (
    <div className="space-y-4">
      <Label className="text-foreground text-lg font-medium">
        {type === 'category' ? 'Kategori Düzeni' : 'Ürün Düzeni'}
      </Label>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(layouts).map(([key, layout]) => (
          <div
            key={key}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all duration-200",
              currentLayout === key 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            )}
            onClick={() => onLayoutChange(key)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted">
                <img 
                  src={layout.preview} 
                  alt={layout.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1 text-foreground">{layout.name}</h3>
                <p className="text-sm text-muted-foreground">{layout.description}</p>
                {currentLayout === key && (
                  <Badge className="mt-2 bg-primary text-primary-foreground">
                    Seçili
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color) {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

// Helper function to get contrasting text color
function getContrastingTextColor(backgroundColor) {
  return isLightColor(backgroundColor) ? '#1f2937' : '#f9fafb';
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

                  {/* Font Preview - Fixed Height with Better Contrast */}
                  <Card className="bg-card border-border h-[700px]">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Font Önizlemesi
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Fontların nasıl görüneceğini kontrol edin. Önizleme her zaman okunabilir renklerde gösterilir.
                      </p>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-120px)] overflow-y-auto">
                      <div className="space-y-6">
                        {Object.entries(currentTheme.advancedSettings.typography).map(([key, settings]) => (
                          <div key={key} className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-border shadow-sm">
                            <div className="text-xs text-muted-foreground mb-4 uppercase tracking-wide font-medium flex items-center justify-between">
                              <span>{getTypographyLabel(key)}</span>
                              <Badge variant="outline" className="text-xs">
                                {settings.fontFamily}
                              </Badge>
                            </div>
                            <div
                              style={{
                                fontFamily: settings.fontFamily,
                                fontSize: settings.fontSize,
                                fontWeight: settings.fontWeight,
                                textAlign: settings.alignment,
                                // Always use contrasting colors for readability in preview
                                color: 'hsl(var(--foreground))',
                                lineHeight: '1.5'
                              }}
                              className="transition-all duration-200 mb-4 min-h-[3rem] flex items-center"
                            >
                              {getFontPreviewText(key)}
                            </div>
                            <div className="text-xs text-muted-foreground bg-background/50 rounded px-3 py-2 border">
                              <div className="grid grid-cols-2 gap-2">
                                <span><strong>Boyut:</strong> {settings.fontSize}</span>
                                <span><strong>Ağırlık:</strong> {settings.fontWeight}</span>
                                <span><strong>Hizalama:</strong> {settings.alignment}</span>
                                <span><strong>Tema Rengi:</strong> 
                                  <span 
                                    className="inline-block w-3 h-3 rounded-full ml-2 border border-border"
                                    style={{ 
                                      backgroundColor: currentTheme.advancedSettings.colors[key] || currentTheme.advancedSettings.colors.productName 
                                    }}
                                  />
                                </span>
                              </div>
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

                {/* Layout Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Kategori Düzeni</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Kategorilerin nasıl görüneceğini seçin
                      </p>
                    </CardHeader>
                    <CardContent>
                      <LayoutSelection
                        type="category"
                        currentLayout={currentTheme.advancedSettings.layout.categoryLayout}
                        onLayoutChange={(layout) => updateAdvancedSetting('layout.categoryLayout', layout)}
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Ürün Düzeni</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Ürünlerin nasıl görüneceğini seçin
                      </p>
                    </CardHeader>
                    <CardContent>
                      <LayoutSelection
                        type="product"
                        currentLayout={currentTheme.advancedSettings.layout.productLayout}
                        onLayoutChange={(layout) => updateAdvancedSetting('layout.productLayout', layout)}
                      />
                    </CardContent>
                  </Card>
                </div>

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
          <LivePreview currentTheme={currentTheme} />
          
          {/* Reset Button */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetToDefault}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Varsayılana Sıfırla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}