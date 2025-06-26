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
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Sun,
  Moon
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
  const [themeMode, setThemeMode] = useState('simple'); // 'simple' or 'advanced'
  const [currentTheme, setCurrentTheme] = useState(getDefaultThemeBlueprint());
  
  // Simple mode states
  const [selectedPreset, setSelectedPreset] = useState('elegant-classic');
  const [selectedColorScheme, setSelectedColorScheme] = useState('rose-gold');
  const [fontSize, setFontSize] = useState([16]);
  const [density, setDensity] = useState([16]);

  // Advanced mode states
  const [primaryColor, setPrimaryColor] = useState('#E11D48');
  const [secondaryColor, setSecondaryColor] = useState('#F97316');
  const [accentColor, setAccentColor] = useState('#A3907C');
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
    setPrimaryColor('#E11D48');
    setSecondaryColor('#F97316');
    setAccentColor('#A3907C');
    setBorderRadius([8]);
  };

  return (
    <div className={cn("space-y-6", isDarkMode && "dark")}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={cn(
            "text-3xl font-bold transition-colors duration-200",
            "text-gray-900 dark:text-white"
          )}>
            Tema Özelleştirme
          </h1>
          <p className={cn(
            "mt-1 transition-colors duration-200",
            "text-gray-600 dark:text-slate-400"
          )}>
            QR menünüzün görünümünü özelleştirin
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={cn(
              "transition-all duration-200",
              "border-gray-300 hover:bg-gray-100 text-gray-600",
              "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
            )}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" className={cn(
            "transition-all duration-200",
            "border-gray-300 hover:bg-gray-100 text-gray-700",
            "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
          )}>
            <Upload className="w-4 h-4 mr-2" />
            Tema İçe Aktar
          </Button>
          <Button variant="outline" className={cn(
            "transition-all duration-200",
            "border-gray-300 hover:bg-gray-100 text-gray-700",
            "dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
          )}>
            <Download className="w-4 h-4 mr-2" />
            Tema Dışa Aktar
          </Button>
          <Button className={cn(
            "transition-all duration-200",
            "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          )}>
            <Save className="w-4 h-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Mode Toggle */}
      <Card className={cn(
        "backdrop-blur-xl border transition-colors duration-200",
        "bg-white border-gray-200",
        "dark:bg-slate-800/50 dark:border-slate-700/50"
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn(
                "text-lg font-semibold mb-1 transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
                Özelleştirme Modu
              </h3>
              <p className={cn(
                "text-sm transition-colors duration-200",
                "text-gray-600 dark:text-slate-400"
              )}>
                {themeMode === 'simple' 
                  ? 'Basit mod: Hazır temalar ve hızlı ayarlar' 
                  : 'Gelişmiş mod: Tam kontrol ve detaylı özelleştirme'}
              </p>
            </div>
            <div className={cn(
              "flex items-center space-x-2 rounded-lg p-1 transition-colors duration-200",
              "bg-gray-100 dark:bg-slate-700"
            )}>
              <Button
                variant={themeMode === 'simple' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setThemeMode('simple')}
                className={cn(
                  "transition-all duration-200",
                  themeMode === 'simple' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Basit
              </Button>
              <Button
                variant={themeMode === 'advanced' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setThemeMode('advanced')}
                className={cn(
                  "transition-all duration-200",
                  themeMode === 'advanced' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                <Settings className="w-4 h-4 mr-2" />
                Gelişmiş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Controls */}
        <div className="lg:col-span-2 space-y-6">
          {themeMode === 'simple' ? (
            // Simple Mode
            <div className="space-y-6">
              {/* Theme Presets */}
              <Card className={cn(
                "backdrop-blur-xl border transition-colors duration-200",
                "bg-white border-gray-200",
                "dark:bg-slate-800/50 dark:border-slate-700/50"
              )}>
                <CardHeader>
                  <CardTitle className={cn(
                    "transition-colors duration-200",
                    "text-gray-900 dark:text-white"
                  )}>
                    Tema Presetleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(themePresets).map(([key, preset]) => (
                      <div
                        key={key}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                          selectedPreset === key 
                            ? "border-blue-400 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10" 
                            : "border-gray-300 hover:border-gray-400 dark:border-slate-600 dark:hover:border-slate-500"
                        )}
                        onClick={() => applyThemePreset(key)}
                      >
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-slate-700">
                          <img 
                            src={preset.preview} 
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className={cn(
                          "font-medium mb-1 transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {preset.name}
                        </h3>
                        <p className={cn(
                          "text-sm transition-colors duration-200",
                          "text-gray-600 dark:text-slate-400"
                        )}>
                          {preset.description}
                        </p>
                        {selectedPreset === key && (
                          <Badge className={cn(
                            "mt-2 transition-colors duration-200",
                            "bg-blue-100 text-blue-800 border-blue-200",
                            "dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30"
                          )}>
                            Seçili
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Schemes */}
              <Card className={cn(
                "backdrop-blur-xl border transition-colors duration-200",
                "bg-white border-gray-200",
                "dark:bg-slate-800/50 dark:border-slate-700/50"
              )}>
                <CardHeader>
                  <CardTitle className={cn(
                    "transition-colors duration-200",
                    "text-gray-900 dark:text-white"
                  )}>
                    Renk Şemaları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(colorSchemePresets).map(([key, scheme]) => (
                      <div
                        key={key}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                          selectedColorScheme === key 
                            ? "border-blue-400 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10" 
                            : "border-gray-300 hover:border-gray-400 dark:border-slate-600 dark:hover:border-slate-500"
                        )}
                        onClick={() => applyColorScheme(key)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex space-x-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300 dark:border-slate-500"
                              style={{ backgroundColor: scheme.colors.buttons }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300 dark:border-slate-500"
                              style={{ backgroundColor: scheme.colors.productPrice }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300 dark:border-slate-500"
                              style={{ backgroundColor: scheme.colors.header }}
                            />
                          </div>
                          <h3 className={cn(
                            "font-medium transition-colors duration-200",
                            "text-gray-900 dark:text-white"
                          )}>
                            {scheme.name}
                          </h3>
                        </div>
                        {selectedColorScheme === key && (
                          <Badge className={cn(
                            "transition-colors duration-200",
                            "bg-blue-100 text-blue-800 border-blue-200",
                            "dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30"
                          )}>
                            Seçili
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Settings */}
              <Card className={cn(
                "backdrop-blur-xl border transition-colors duration-200",
                "bg-white border-gray-200",
                "dark:bg-slate-800/50 dark:border-slate-700/50"
              )}>
                <CardHeader>
                  <CardTitle className={cn(
                    "transition-colors duration-200",
                    "text-gray-900 dark:text-white"
                  )}>
                    Hızlı Ayarlar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className={cn(
                      "transition-colors duration-200",
                      "text-gray-700 dark:text-slate-300"
                    )}>
                      Yazı Boyutu: {fontSize[0]}px
                    </Label>
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
                    <Label className={cn(
                      "transition-colors duration-200",
                      "text-gray-700 dark:text-slate-300"
                    )}>
                      Boşluk Yoğunluğu: {density[0]}px
                    </Label>
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
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className={cn(
                "grid w-full grid-cols-4 transition-colors duration-200",
                "bg-gray-100 border border-gray-200",
                "dark:bg-slate-800/50 dark:border dark:border-slate-700/50"
              )}>
                <TabsTrigger 
                  value="colors" 
                  className={cn(
                    "flex items-center transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-blue-600",
                    "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
                  )}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Renkler
                </TabsTrigger>
                <TabsTrigger 
                  value="typography" 
                  className={cn(
                    "flex items-center transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-blue-600",
                    "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
                  )}
                >
                  <Type className="w-4 h-4 mr-2" />
                  Tipografi
                </TabsTrigger>
                <TabsTrigger 
                  value="layout" 
                  className={cn(
                    "flex items-center transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-blue-600",
                    "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
                  )}
                >
                  <Layout className="w-4 h-4 mr-2" />
                  Düzen
                </TabsTrigger>
                <TabsTrigger 
                  value="components" 
                  className={cn(
                    "flex items-center transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-blue-600",
                    "dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-300"
                  )}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Bileşenler
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-6">
                {/* Individual Color Controls */}
                <Card className={cn(
                  "backdrop-blur-xl border transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/50 dark:border-slate-700/50"
                )}>
                  <CardHeader>
                    <CardTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Renk Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Object.entries(currentTheme.advancedSettings.colors).map(([key, value]) => (
                        <div key={key}>
                          <Label className={cn(
                            "capitalize transition-colors duration-200",
                            "text-gray-700 dark:text-slate-300"
                          )}>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </Label>
                          <div className="flex items-center space-x-3 mt-2">
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => updateAdvancedSetting(`colors.${key}`, e.target.value)}
                              className="w-12 h-12 rounded-lg border border-gray-300 dark:border-slate-600 cursor-pointer"
                            />
                            <div>
                              <div className={cn(
                                "font-medium transition-colors duration-200",
                                "text-gray-900 dark:text-white"
                              )}>
                                {key}
                              </div>
                              <div className={cn(
                                "text-sm transition-colors duration-200",
                                "text-gray-600 dark:text-slate-400"
                              )}>
                                {value}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                {/* Typography Settings */}
                <Card className={cn(
                  "backdrop-blur-xl border transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/50 dark:border-slate-700/50"
                )}>
                  <CardHeader>
                    <CardTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Yazı Tipi Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(currentTheme.advancedSettings.typography).map(([key, settings]) => (
                      <div key={key} className={cn(
                        "border rounded-lg p-4 transition-colors duration-200",
                        "border-gray-300 dark:border-slate-600"
                      )}>
                        <h4 className={cn(
                          "font-medium mb-4 capitalize transition-colors duration-200",
                          "text-gray-900 dark:text-white"
                        )}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className={cn(
                              "transition-colors duration-200",
                              "text-gray-700 dark:text-slate-300"
                            )}>
                              Font Family
                            </Label>
                            <Select 
                              value={settings.fontFamily}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontFamily`, value)}
                            >
                              <SelectTrigger className={cn(
                                "mt-1 transition-all duration-200",
                                "bg-white border-gray-300 text-gray-900",
                                "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              )}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className={cn(
                                "transition-colors duration-200",
                                "bg-white border-gray-200",
                                "dark:bg-slate-700 dark:border-slate-600"
                              )}>
                                {availableFonts.map((font) => (
                                  <SelectItem key={font} value={font}>{font}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className={cn(
                              "transition-colors duration-200",
                              "text-gray-700 dark:text-slate-300"
                            )}>
                              Font Size
                            </Label>
                            <Input 
                              value={settings.fontSize}
                              onChange={(e) => updateAdvancedSetting(`typography.${key}.fontSize`, e.target.value)}
                              className={cn(
                                "mt-1 transition-all duration-200",
                                "bg-white border-gray-300 text-gray-900",
                                "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              )}
                            />
                          </div>
                          <div>
                            <Label className={cn(
                              "transition-colors duration-200",
                              "text-gray-700 dark:text-slate-300"
                            )}>
                              Font Weight
                            </Label>
                            <Select 
                              value={settings.fontWeight}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.fontWeight`, value)}
                            >
                              <SelectTrigger className={cn(
                                "mt-1 transition-all duration-200",
                                "bg-white border-gray-300 text-gray-900",
                                "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              )}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className={cn(
                                "transition-colors duration-200",
                                "bg-white border-gray-200",
                                "dark:bg-slate-700 dark:border-slate-600"
                              )}>
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
                            <Label className={cn(
                              "transition-colors duration-200",
                              "text-gray-700 dark:text-slate-300"
                            )}>
                              Alignment
                            </Label>
                            <Select 
                              value={settings.alignment}
                              onValueChange={(value) => updateAdvancedSetting(`typography.${key}.alignment`, value)}
                            >
                              <SelectTrigger className={cn(
                                "mt-1 transition-all duration-200",
                                "bg-white border-gray-300 text-gray-900",
                                "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              )}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className={cn(
                                "transition-colors duration-200",
                                "bg-white border-gray-200",
                                "dark:bg-slate-700 dark:border-slate-600"
                              )}>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                {/* Layout Settings */}
                <Card className={cn(
                  "backdrop-blur-xl border transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/50 dark:border-slate-700/50"
                )}>
                  <CardHeader>
                    <CardTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Düzen Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Kenar Yuvarlaklığı: {borderRadius[0]}px
                      </Label>
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
                      <Label className={cn(
                        "transition-colors duration-200",
                        "text-gray-700 dark:text-slate-300"
                      )}>
                        Sayfa Blokları Sırası
                      </Label>
                      <div className="mt-2 space-y-2">
                        {currentTheme.advancedSettings.layout.blocks.map((block, index) => (
                          <div key={block} className={cn(
                            "flex items-center justify-between p-3 rounded-lg transition-colors duration-200",
                            "bg-gray-50 dark:bg-slate-700/30"
                          )}>
                            <span className={cn(
                              "capitalize transition-colors duration-200",
                              "text-gray-900 dark:text-white"
                            )}>
                              {block.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={cn(
                                "text-xs transition-colors duration-200",
                                "border-gray-300 text-gray-600",
                                "dark:border-slate-600 dark:text-slate-300"
                              )}>
                                {index + 1}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-6">
                {/* Component Settings */}
                <Card className={cn(
                  "backdrop-blur-xl border transition-colors duration-200",
                  "bg-white border-gray-200",
                  "dark:bg-slate-800/50 dark:border-slate-700/50"
                )}>
                  <CardHeader>
                    <CardTitle className={cn(
                      "transition-colors duration-200",
                      "text-gray-900 dark:text-white"
                    )}>
                      Bileşen Ayarları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={cn(
                            "font-medium transition-colors duration-200",
                            "text-gray-900 dark:text-white"
                          )}>
                            Öne Çıkan Ürünler Bölümü
                          </div>
                          <div className={cn(
                            "text-sm transition-colors duration-200",
                            "text-gray-600 dark:text-slate-400"
                          )}>
                            Ana sayfada öne çıkan ürünleri göster
                          </div>
                        </div>
                        <Switch
                          checked={currentTheme.advancedSettings.components.featuredSection.enabled}
                          onCheckedChange={(checked) => updateAdvancedSetting('components.featuredSection.enabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className={cn(
                            "font-medium transition-colors duration-200",
                            "text-gray-900 dark:text-white"
                          )}>
                            Reklam Butonu
                          </div>
                          <div className={cn(
                            "text-sm transition-colors duration-200",
                            "text-gray-600 dark:text-slate-400"
                          )}>
                            Kampanyalar butonunu göster
                          </div>
                        </div>
                        <Switch
                          checked={currentTheme.advancedSettings.components.advertisementButton.enabled}
                          onCheckedChange={(checked) => updateAdvancedSetting('components.advertisementButton.enabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className={cn(
                            "font-medium transition-colors duration-200",
                            "text-gray-900 dark:text-white"
                          )}>
                            Sosyal Medya İkonları
                          </div>
                          <div className={cn(
                            "text-sm transition-colors duration-200",
                            "text-gray-600 dark:text-slate-400"
                          )}>
                            Header'da sosyal medya ikonlarını göster
                          </div>
                        </div>
                        <Switch
                          checked={currentTheme.advancedSettings.components.header.socialIcons.enabled}
                          onCheckedChange={(checked) => updateAdvancedSetting('components.header.socialIcons.enabled', checked)}
                        />
                      </div>

                      <div>
                        <Label className={cn(
                          "transition-colors duration-200",
                          "text-gray-700 dark:text-slate-300"
                        )}>
                          Logo Boyutu
                        </Label>
                        <Select 
                          value={currentTheme.advancedSettings.components.header.logoSize}
                          onValueChange={(value) => updateAdvancedSetting('components.header.logoSize', value)}
                        >
                          <SelectTrigger className={cn(
                            "mt-1 transition-all duration-200",
                            "bg-white border-gray-300 text-gray-900",
                            "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          )}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={cn(
                            "transition-colors duration-200",
                            "bg-white border-gray-200",
                            "dark:bg-slate-700 dark:border-slate-600"
                          )}>
                            <SelectItem value="small">Küçük</SelectItem>
                            <SelectItem value="medium">Orta</SelectItem>
                            <SelectItem value="large">Büyük</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className={cn(
                          "transition-colors duration-200",
                          "text-gray-700 dark:text-slate-300"
                        )}>
                          İkon Paketi
                        </Label>
                        <Select 
                          value={currentTheme.advancedSettings.components.header.socialIcons.iconPack}
                          onValueChange={(value) => updateAdvancedSetting('components.header.socialIcons.iconPack', value)}
                        >
                          <SelectTrigger className={cn(
                            "mt-1 transition-all duration-200",
                            "bg-white border-gray-300 text-gray-900",
                            "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          )}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={cn(
                            "transition-colors duration-200",
                            "bg-white border-gray-200",
                            "dark:bg-slate-700 dark:border-slate-600"
                          )}>
                            {Object.entries(socialIconPacks).map(([key, name]) => (
                              <SelectItem key={key} value={key}>{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className={cn(
                          "transition-colors duration-200",
                          "text-gray-700 dark:text-slate-300"
                        )}>
                          Kategori Animasyonu
                        </Label>
                        <Select 
                          value={currentTheme.advancedSettings.components.categoryAnimation.type}
                          onValueChange={(value) => updateAdvancedSetting('components.categoryAnimation.type', value)}
                        >
                          <SelectTrigger className={cn(
                            "mt-1 transition-all duration-200",
                            "bg-white border-gray-300 text-gray-900",
                            "dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                          )}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={cn(
                            "transition-colors duration-200",
                            "bg-white border-gray-200",
                            "dark:bg-slate-700 dark:border-slate-600"
                          )}>
                            {Object.entries(categoryAnimationTypes).map(([key, name]) => (
                              <SelectItem key={key} value={key}>{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
          <Card className={cn(
            "backdrop-blur-xl border sticky top-6 transition-colors duration-200",
            "bg-white border-gray-200",
            "dark:bg-slate-800/50 dark:border-slate-700/50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center justify-between transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
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
                  className={cn(
                    "border transition-colors duration-200",
                    "border-gray-300 dark:border-slate-600"
                  )}
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
                  className={cn(
                    "border transition-colors duration-200",
                    "border-gray-300 dark:border-slate-600"
                  )}
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
                  className={cn(
                    "w-full mt-6 transition-all duration-200",
                    "border-gray-300 text-gray-700",
                    "dark:border-slate-600 dark:text-slate-300"
                  )}
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