'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  Save,
  RotateCcw,
  Eye,
  Download,
  Upload
} from 'lucide-react';

export function ThemeCustomization() {
  const [primaryColor, setPrimaryColor] = useState('#E11D48');
  const [secondaryColor, setSecondaryColor] = useState('#F97316');
  const [accentColor, setAccentColor] = useState('#A3907C');
  const [fontSize, setFontSize] = useState([16]);
  const [borderRadius, setBorderRadius] = useState([8]);
  const [spacing, setSpacing] = useState([16]);

  const presetThemes = [
    {
      name: 'Sıcak İtalyan',
      colors: { primary: '#E11D48', secondary: '#F97316', accent: '#A3907C' },
      description: 'Gül altını ve sıcak turuncular'
    },
    {
      name: 'Klasik Elegans',
      colors: { primary: '#1F2937', secondary: '#6B7280', accent: '#D1D5DB' },
      description: 'Sofistike gri tonları'
    },
    {
      name: 'Akdeniz',
      colors: { primary: '#0EA5E9', secondary: '#22C55E', accent: '#FCD34D' },
      description: 'Okyanus mavisi ve zeytin yeşili'
    },
    {
      name: 'Modern Minimalist',
      colors: { primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899' },
      description: 'Temiz mor ve pembe tonları'
    }
  ];

  const fontOptions = [
    { name: 'Inter', category: 'Modern Sans-serif', preview: 'Hızlı kahverengi tilki' },
    { name: 'Playfair Display', category: 'Elegant Serif', preview: 'Hızlı kahverengi tilki' },
    { name: 'Poppins', category: 'Friendly Sans-serif', preview: 'Hızlı kahverengi tilki' },
    { name: 'Merriweather', category: 'Classic Serif', preview: 'Hızlı kahverengi tilki' }
  ];

  const applyPresetTheme = (theme) => {
    setPrimaryColor(theme.colors.primary);
    setSecondaryColor(theme.colors.secondary);
    setAccentColor(theme.colors.accent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tema Özelleştirme</h1>
          <p className="text-slate-400 mt-1">Halkın göreceği QR menünüzün görünümünü özelleştirin</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-300">
            <Upload className="w-4 h-4 mr-2" />
            Tema İçe Aktar
          </Button>
          <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Tema Dışa Aktar
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Controls */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50">
              <TabsTrigger value="colors" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                <Palette className="w-4 h-4 mr-2" />
                Renkler
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                <Type className="w-4 h-4 mr-2" />
                Tipografi
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                <Layout className="w-4 h-4 mr-2" />
                Düzen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Preset Themes */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Hazır Temalar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {presetThemes.map((theme) => (
                      <div
                        key={theme.name}
                        className="border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => applyPresetTheme(theme)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex space-x-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-slate-500"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-slate-500"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-slate-500"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                          </div>
                          <h3 className="font-medium text-white">{theme.name}</h3>
                        </div>
                        <p className="text-sm text-slate-400">{theme.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Colors */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Özel Renkler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="primaryColor" className="text-slate-300">Ana Renk</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="primaryColor"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-white">Ana Renk</div>
                          <div className="text-sm text-slate-400">{primaryColor}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor" className="text-slate-300">İkincil Renk</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="secondaryColor"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-white">İkincil</div>
                          <div className="text-sm text-slate-400">{secondaryColor}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accentColor" className="text-slate-300">Vurgu Rengi</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="accentColor"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-white">Vurgu</div>
                          <div className="text-sm text-slate-400">{accentColor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              {/* Font Selection */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Yazı Tipi Ailesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fontOptions.map((font) => (
                      <div
                        key={font.name}
                        className="border border-slate-600 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <div className="mb-2">
                          <h3 className="font-medium text-white" style={{ fontFamily: font.name }}>
                            {font.name}
                          </h3>
                          <p className="text-sm text-slate-400">{font.category}</p>
                        </div>
                        <p className="text-lg text-slate-300" style={{ fontFamily: font.name }}>
                          {font.preview}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Font Size */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Yazı Tipi Boyutu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Temel Yazı Boyutu: {fontSize[0]}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p style={{ fontSize: `${fontSize[0]}px` }} className="text-white">
                        Bu metin seçilen yazı boyutuyla nasıl görüneceğini gösterir.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              {/* Border Radius */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Kenar Yuvarlaklığı</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Köşe Yuvarlaklığı: {borderRadius[0]}px</Label>
                      <Slider
                        value={borderRadius}
                        onValueChange={setBorderRadius}
                        max={24}
                        min={0}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div 
                        className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                      <div 
                        className="w-16 h-16 border-2 border-slate-500"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                      <div 
                        className="w-16 h-16 bg-slate-600"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spacing */}
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Boşluk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Temel Boşluk: {spacing[0]}px</Label>
                      <Slider
                        value={spacing}
                        onValueChange={setSpacing}
                        max={32}
                        min={8}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <div 
                        className="bg-slate-800 border border-slate-600 rounded-lg text-white"
                        style={{ padding: `${spacing[0]}px` }}
                      >
                        <p>Bu kart seçilen boşluk değerini kullanır.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Eye className="w-5 h-5 mr-2" />
                QR Menü Önizlemesi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Preview Header */}
                <div 
                  className="p-4 text-white rounded-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    borderRadius: `${borderRadius[0]}px`
                  }}
                >
                  <h3 className="font-bold text-lg" style={{ fontSize: `${fontSize[0] + 4}px` }}>
                    Bella Vista
                  </h3>
                  <p className="text-sm opacity-90">İtalyan Mutfağı</p>
                </div>

                {/* Preview Menu Item */}
                <div 
                  className="border border-slate-600 bg-slate-800"
                  style={{ 
                    borderRadius: `${borderRadius[0]}px`,
                    padding: `${spacing[0]}px`
                  }}
                >
                  <h4 className="font-semibold mb-2 text-white" style={{ fontSize: `${fontSize[0] + 2}px` }}>
                    Pasta Carbonara
                  </h4>
                  <p className="text-slate-300 mb-3" style={{ fontSize: `${fontSize[0]}px` }}>
                    Taze malzemelerle lezzetli makarna
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: primaryColor }}>
                      ₺89.99
                    </span>
                    <button
                      className="text-white px-3 py-1 rounded text-sm font-medium"
                      style={{ 
                        backgroundColor: primaryColor,
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
                  className="border border-slate-600 bg-slate-800"
                  style={{ 
                    borderRadius: `${borderRadius[0]}px`,
                    padding: `${spacing[0]}px`
                  }}
                >
                  <h4 className="font-semibold text-white mb-2" style={{ fontSize: `${fontSize[0] + 2}px` }}>
                    Ana Yemekler
                  </h4>
                  <p className="text-slate-400 text-sm">8 öğe</p>
                </div>

                {/* Reset Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-6 border-slate-600 text-slate-300"
                  onClick={() => {
                    setPrimaryColor('#E11D48');
                    setSecondaryColor('#F97316');
                    setAccentColor('#A3907C');
                    setFontSize([16]);
                    setBorderRadius([8]);
                    setSpacing([16]);
                  }}
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