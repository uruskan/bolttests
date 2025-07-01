'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from '@/components/atoms/MetricCard';
import { WelcomeHeader } from '@/components/molecules/WelcomeHeader';
import { ContentStatCard } from '@/components/molecules/ContentStatCard';
import { QuickActionGrid } from '@/components/molecules/QuickActionGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChefHat,
  Users,
  Eye,
  Star,
  Megaphone,
  Heart,
  Camera,
  Palette,
  ExternalLink,
  Copy,
  QrCode,
  Smartphone
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useCategories } from '@/lib/react-query/hooks/useCategories';
import { useProducts } from '@/lib/react-query/hooks/useProducts';
import { useContent } from '@/lib/react-query/hooks/useContent';

export function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  const restaurantId = useAuthStore((state) => state.getRestaurantId());
  
  // Fetch real data
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();
  const { data: content = [] } = useContent();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate real metrics
  const activeCategories = categories.filter(cat => cat.is_active);
  const activeProducts = products.filter(prod => prod.is_active);
  const featuredProducts = products.filter(prod => prod.is_featured);
  const activeContent = content.filter(item => item.status === 'active');

  const metrics = [
    {
      title: "Toplam Menü Öğesi",
      value: products.length.toString(),
      change: activeProducts.length > 0 ? `${activeProducts.length} aktif` : "Henüz ürün eklenmemiş",
      trend: activeProducts.length > 0 ? "up" : "neutral",
      icon: ChefHat,
      colorClass: "from-green-400 to-emerald-500"
    },
    {
      title: "Aktif Kategoriler",
      value: activeCategories.length.toString(),
      change: categories.length > 0 ? `${categories.length} toplam` : "Henüz kategori eklenmemiş",
      trend: activeCategories.length > 0 ? "up" : "neutral",
      icon: Users,
      colorClass: "from-blue-400 to-blue-500"
    },
    {
      title: "QR Kod Taramaları",
      value: "0",
      change: "Henüz tarama yok",
      trend: "neutral",
      icon: Eye,
      colorClass: "from-orange-400 to-orange-500"
    },
    {
      title: "Öne Çıkan Ürünler",
      value: featuredProducts.length.toString(),
      change: featuredProducts.length > 0 ? "Aktif" : "Henüz yok",
      trend: featuredProducts.length > 0 ? "up" : "neutral",
      icon: Star,
      colorClass: "from-yellow-400 to-yellow-500"
    }
  ];

  // Content stats with real data
  const contentStats = [
    { 
      name: "Aktif Hikayeler", 
      count: content.filter(item => item.type === 'story' && item.status === 'active').length, 
      value: content.filter(item => item.type === 'story').reduce((sum, item) => sum + (item.metadata?.views || 0), 0), 
      icon: Eye, 
      valueLabel: 'görüntülenme' 
    },
    { 
      name: "Aktif Reklamlar", 
      count: content.filter(item => item.type === 'advertisement' && item.status === 'active').length, 
      value: content.filter(item => item.type === 'advertisement').reduce((sum, item) => sum + (item.metadata?.clicks || 0), 0), 
      icon: Megaphone, 
      valueLabel: 'tıklama' 
    },
    { 
      name: "Öne Çıkan İçerik", 
      count: content.filter(item => item.type === 'featured' && item.status === 'active').length, 
      value: content.filter(item => item.type === 'featured').reduce((sum, item) => sum + (item.metadata?.likes || 0), 0), 
      icon: Heart, 
      valueLabel: 'beğeni' 
    },
  ];

  // Menu stats with real data
  const menuStats = [
    { name: "Kategoriler", count: activeCategories.length, value: categories.length, icon: ChefHat, valueLabel: 'toplam' },
    { name: "Ürünler", count: activeProducts.length, value: products.length, icon: ChefHat, valueLabel: 'toplam' },
    { name: "Pasif Ürünler", count: products.length - activeProducts.length, value: products.length - activeProducts.length, icon: ChefHat, valueLabel: 'toplam' },
  ];

  const quickActions = [
    { icon: ChefHat, label: 'Menü Öğesi Ekle', onClick: () => {} },
    { icon: Megaphone, label: 'Reklam Oluştur', onClick: () => {} },
    { icon: Camera, label: 'Hikaye Ekle', onClick: () => {} },
    { icon: Palette, label: 'Tema Düzenle', onClick: () => {} },
  ];

  // Public menu URL
  const publicMenuUrl = `${window.location.origin}/menu/delago-cafe`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(publicMenuUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const openPublicMenu = () => {
    window.open(publicMenuUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <WelcomeHeader userName="Kullanıcı" currentTime={currentTime} />

      {/* Public Menu URL Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            QR Menü URL'niz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Müşterileriniz bu URL'den menünüze erişebilir</span>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                <code className="text-sm text-blue-700 dark:text-blue-300 break-all">
                  {publicMenuUrl}
                </code>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copiedUrl ? 'Kopyalandı!' : 'Kopyala'}
              </Button>
              <Button
                size="sm"
                onClick={openPublicMenu}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Görüntüle
              </Button>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex items-center space-x-2 mt-4">
            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50 dark:border-green-600 dark:text-green-300 dark:bg-green-900/30">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Menü Aktif
            </Badge>
            <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:bg-blue-900/30">
              {categories.length} Kategori
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:bg-purple-900/30">
              {products.length} Ürün
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentStatCard
          title="İçerik İstatistikleri"
          icon={Megaphone}
          stats={contentStats}
          onManage={() => {}}
        />

        <ContentStatCard
          title="Menü Özeti"
          icon={ChefHat}
          stats={menuStats}
          onManage={() => {}}
        />
      </div>

      <QuickActionGrid actions={quickActions} />
    </div>
  );
}