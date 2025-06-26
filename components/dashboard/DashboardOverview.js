'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Star,
  ChefHat,
  Eye,
  Heart,
  Megaphone,
  Palette,
  Settings,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardOverview() {
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
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Aktif Kategoriler",
      value: "8",
      change: "Tümü aktif",
      trend: "neutral", 
      icon: Users,
      color: "from-blue-400 to-blue-500"
    },
    {
      title: "QR Kod Taramaları",
      value: "2,847",
      change: "+12.5% bu ay",
      trend: "up",
      icon: Eye,
      color: "from-orange-400 to-orange-500"
    },
    {
      title: "Müşteri Puanı",
      value: "4.8",
      change: "+0.2 bu hafta",
      trend: "up",
      icon: Star,
      color: "from-yellow-400 to-yellow-500"
    }
  ];

  const contentStats = [
    { name: "Aktif Hikayeler", count: 3, views: 234, icon: Eye },
    { name: "Aktif Reklamlar", count: 2, clicks: 156, icon: Megaphone },
    { name: "Öne Çıkan Ürünler", count: 5, likes: 89, icon: Heart },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-white">
              Günaydın, Ahmet Bey!
            </h1>
            <p className="text-blue-200">Restoranınızda bugün neler oluyor</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-2xl font-bold text-white">
              {currentTime.toLocaleDateString('tr-TR', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-blue-200">
              {currentTime.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {metric.title}
                </CardTitle>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br", metric.color)}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className={cn(
                  "flex items-center text-xs",
                  metric.trend === 'up' ? "text-green-400" : 
                  metric.trend === 'down' ? "text-red-400" : "text-slate-400"
                )}>
                  {metric.trend !== 'neutral' && (
                    <TrendIcon className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Stats */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-blue-400" />
                İçerik İstatistikleri
              </span>
              <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700 text-slate-300">
                Yönet
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{stat.name}</div>
                        <div className="text-sm text-slate-300">{stat.count} aktif</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        {stat.views || stat.clicks || stat.likes}
                      </div>
                      <div className="text-xs text-slate-400">
                        {stat.views ? 'görüntülenme' : stat.clicks ? 'tıklama' : 'beğeni'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Menu Overview */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-blue-400" />
                Menü Özeti
              </span>
              <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700 text-slate-300">
                Düzenle
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div>
                  <div className="font-medium text-white">Başlangıçlar</div>
                  <div className="text-sm text-slate-300">8 öğe</div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div>
                  <div className="font-medium text-white">Ana Yemekler</div>
                  <div className="text-sm text-slate-300">15 öğe</div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Aktif
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div>
                  <div className="font-medium text-white">Tatlılar</div>
                  <div className="text-sm text-slate-300">6 öğe</div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  2 Pasif
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <ChefHat className="w-6 h-6" />
              <span className="text-sm font-medium">Menü Öğesi Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Megaphone className="w-6 h-6" />
              <span className="text-sm font-medium">Reklam Oluştur</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Camera className="w-6 h-6" />
              <span className="text-sm font-medium">Hikaye Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Palette className="w-6 h-6" />
              <span className="text-sm font-medium">Tema Düzenle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}