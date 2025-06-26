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
      name: 'Warm Italian',
      colors: { primary: '#E11D48', secondary: '#F97316', accent: '#A3907C' },
      description: 'Rose gold and warm oranges'
    },
    {
      name: 'Classic Elegance',
      colors: { primary: '#1F2937', secondary: '#6B7280', accent: '#D1D5DB' },
      description: 'Sophisticated grays'
    },
    {
      name: 'Mediterranean',
      colors: { primary: '#0EA5E9', secondary: '#22C55E', accent: '#FCD34D' },
      description: 'Ocean blues and olives'
    },
    {
      name: 'Modern Minimalist',
      colors: { primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899' },
      description: 'Clean purples and pinks'
    }
  ];

  const fontOptions = [
    { name: 'Inter', category: 'Modern Sans-serif', preview: 'The quick brown fox' },
    { name: 'Playfair Display', category: 'Elegant Serif', preview: 'The quick brown fox' },
    { name: 'Poppins', category: 'Friendly Sans-serif', preview: 'The quick brown fox' },
    { name: '  ', category: 'Classic Serif', preview: 'The quick brown fox' }
  ];

  const applyPresetTheme = (theme: typeof presetThemes[0]) => {
    setPrimaryColor(theme.colors.primary);
    setSecondaryColor(theme.colors.secondary);
    setAccentColor(theme.colors.accent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Customization</h1>
          <p className="text-gray-600 mt-1">Customize your restaurant's brand appearance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="border-rose-200 hover:bg-rose-50">
            <Upload className="w-4 h-4 mr-2" />
            Import Theme
          </Button>
          <Button variant="outline" className="border-rose-200 hover:bg-rose-50">
            <Download className="w-4 h-4 mr-2" />
            Export Theme
          </Button>
          <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Controls */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center">
                <Type className="w-4 h-4 mr-2" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center">
                <Layout className="w-4 h-4 mr-2" />
                Layout
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Preset Themes */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Preset Themes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {presetThemes.map((theme) => (
                      <div
                        key={theme.name}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-rose-300 transition-colors"
                        onClick={() => applyPresetTheme(theme)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex space-x-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                          </div>
                          <h3 className="font-medium text-gray-900">{theme.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{theme.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Colors */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Custom Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="primaryColor"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Primary</div>
                          <div className="text-sm text-gray-600">{primaryColor}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="secondaryColor"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Secondary</div>
                          <div className="text-sm text-gray-600">{secondaryColor}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <input
                          type="color"
                          id="accentColor"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Accent</div>
                          <div className="text-sm text-gray-600">{accentColor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              {/* Font Selection */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Font Family</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fontOptions.map((font) => (
                      <div
                        key={font.name}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-rose-300 transition-colors"
                      >
                        <div className="mb-2">
                          <h3 className="font-medium text-gray-900" style={{ fontFamily: font.name }}>
                            {font.name}
                          </h3>
                          <p className="text-sm text-gray-600">{font.category}</p>
                        </div>
                        <p className="text-lg" style={{ fontFamily: font.name }}>
                          {font.preview}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Font Size */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Font Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Base Font Size: {fontSize[0]}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p style={{ fontSize: `${fontSize[0]}px` }}>
                        This is how your text will appear with the selected font size.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              {/* Border Radius */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Corner Roundness: {borderRadius[0]}px</Label>
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
                        className="w-16 h-16 bg-gradient-to-br from-rose-400 to-orange-400"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                      <div 
                        className="w-16 h-16 border-2 border-gray-300"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                      <div 
                        className="w-16 h-16 bg-gray-100"
                        style={{ borderRadius: `${borderRadius[0]}px` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Spacing */}
              <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
                <CardHeader>
                  <CardTitle>Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Base Spacing: {spacing[0]}px</Label>
                      <Slider
                        value={spacing}
                        onValueChange={setSpacing}
                        max={32}
                        min={8}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div 
                        className="bg-white border border-gray-200 rounded-lg"
                        style={{ padding: `${spacing[0]}px` }}
                      >
                        <p>This card uses your selected spacing value for padding.</p>
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
          <Card className="bg-white/80 backdrop-blur-sm border-rose-100 sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview
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
                  <p className="text-sm opacity-90">Italian Cuisine</p>
                </div>

                {/* Preview Card */}
                <div 
                  className="border border-gray-200 bg-white"
                  style={{ 
                    borderRadius: `${borderRadius[0]}px`,
                    padding: `${spacing[0]}px`
                  }}
                >
                  <h4 className="font-semibold mb-2" style={{ fontSize: `${fontSize[0] + 2}px` }}>
                    Menu Item
                  </h4>
                  <p className="text-gray-600 mb-3" style={{ fontSize: `${fontSize[0]}px` }}>
                    Delicious pasta with fresh ingredients
                  </p>
                  <button
                    className="text-white px-4 py-2 rounded font-medium"
                    style={{ 
                      backgroundColor: primaryColor,
                      borderRadius: `${borderRadius[0] / 2}px`,
                      fontSize: `${fontSize[0] - 2}px`
                    }}
                  >
                    Order Now
                  </button>
                </div>

                {/* Preview Buttons */}
                <div className="space-y-2">
                  <button
                    className="w-full text-white py-2 px-4 rounded font-medium"
                    style={{ 
                      backgroundColor: primaryColor,
                      borderRadius: `${borderRadius[0]}px`,
                      fontSize: `${fontSize[0]}px`
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="w-full border-2 py-2 px-4 rounded font-medium"
                    style={{ 
                      borderColor: primaryColor,
                      color: primaryColor,
                      borderRadius: `${borderRadius[0]}px`,
                      fontSize: `${fontSize[0]}px`
                    }}
                  >
                    Secondary Button
                  </button>
                </div>

                {/* Reset Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
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
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}