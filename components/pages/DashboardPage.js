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

  const metrics = [
    {
      title: "Toplam Menü Öğesi",
      value: "127",
      change: "+5 bu hafta",
      trend: "up",
      icon: ChefHat,
      colorClass: "from-green-400 to-emerald-500"
    },
    {
      title: "Aktif Kategoriler",
      value: "8",
      change: "Tümü aktif",
      trend: "neutral",
      icon: Users,
      colorClass: "from-blue-400 to-blue-500"
    },
    {
      title: "QR Kod Taramaları",
      value: "2,847",
      change: "+12.5% bu ay",
      trend: "up",
      icon: Eye,
      colorClass: "from-orange-400 to-orange-500"
    },
    {
      title: "Müşteri Puanı",
      value: "4.8",
      change: "+0.2 bu hafta",
      trend: "up",
      icon: Star,
      colorClass: "from-yellow-400 to-yellow-500"
    }
  ];

  const contentStats = [
    { name: "Aktif Hikayeler", count: 3, value: 234, icon: Eye, valueLabel: 'görüntülenme' },
    { name: "Aktif Reklamlar", count: 2, value: 156, icon: Megaphone, valueLabel: 'tıklama' },
    { name: "Öne Çıkan Ürünler", count: 5, value: 89, icon: Heart, valueLabel: 'beğeni' },
  ];

  const menuStats = [
    { name: "Başlangıçlar", count: 8, value: 0, icon: ChefHat, valueLabel: 'aktif' },
    { name: "Ana Yemekler", count: 15, value: 0, icon: ChefHat, valueLabel: 'aktif' },
    { name: "Tatlılar", count: 6, value: 2, icon: ChefHat, valueLabel: 'pasif' },
  ];

  const quickActions = [
    { icon: ChefHat, label: 'Menü Öğesi Ekle', onClick: () => {} },
    { icon: Megaphone, label: 'Reklam Oluştur', onClick: () => {} },
    { icon: Camera, label: 'Hikaye Ekle', onClick: () => {} },
    { icon: Palette, label: 'Tema Düzenle', onClick: () => {} },
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader userName="Ahmet Bey" currentTime={currentTime} />

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