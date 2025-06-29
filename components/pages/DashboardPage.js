'use client';

import { useState, useEffect } from 'react';
import { MetricCard } from '@/components/atoms/MetricCard';
import { WelcomeHeader } from '@/components/molecules/WelcomeHeader';
import { ContentStatCard } from '@/components/molecules/ContentStatCard';
import { QuickActionGrid } from '@/components/molecules/QuickActionGrid';
import { 
  ChefHat,
  Users,
  Eye,
  Star,
  Megaphone,
  Heart,
  Camera,
  Palette
} from 'lucide-react';

export function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Empty state metrics - all zeros
  const metrics = [
    {
      title: "Toplam Menü Öğesi",
      value: "0",
      change: "Henüz ürün eklenmemiş",
      trend: "neutral",
      icon: ChefHat,
      colorClass: "from-green-400 to-emerald-500"
    },
    {
      title: "Aktif Kategoriler",
      value: "0",
      change: "Henüz kategori eklenmemiş",
      trend: "neutral",
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
      title: "Müşteri Puanı",
      value: "-",
      change: "Henüz değerlendirme yok",
      trend: "neutral",
      icon: Star,
      colorClass: "from-yellow-400 to-yellow-500"
    }
  ];

  // Empty state content stats
  const contentStats = [
    { name: "Aktif Hikayeler", count: 0, value: 0, icon: Eye, valueLabel: 'görüntülenme' },
    { name: "Aktif Reklamlar", count: 0, value: 0, icon: Megaphone, valueLabel: 'tıklama' },
    { name: "Öne Çıkan Ürünler", count: 0, value: 0, icon: Heart, valueLabel: 'beğeni' },
  ];

  // Empty state menu stats
  const menuStats = [
    { name: "Kategoriler", count: 0, value: 0, icon: ChefHat, valueLabel: 'toplam' },
    { name: "Ürünler", count: 0, value: 0, icon: ChefHat, valueLabel: 'toplam' },
    { name: "Pasif Ürünler", count: 0, value: 0, icon: ChefHat, valueLabel: 'toplam' },
  ];

  const quickActions = [
    { icon: ChefHat, label: 'Menü Öğesi Ekle', onClick: () => {} },
    { icon: Megaphone, label: 'Reklam Oluştur', onClick: () => {} },
    { icon: Camera, label: 'Hikaye Ekle', onClick: () => {} },
    { icon: Palette, label: 'Tema Düzenle', onClick: () => {} },
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader userName="Kullanıcı" currentTime={currentTime} />

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