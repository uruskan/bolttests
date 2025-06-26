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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark' || !savedTheme);
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
      <div className={cn(
        "backdrop-blur-xl rounded-xl p-6 border transition-all duration-200",
        isDarkMode 
          ? "bg-blue-500/20 border-blue-500/20" 
          : "bg-blue-50 border-blue-200 shadow-light-elevated"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={cn(
              "text-2xl font-bold mb-2 transition-colors duration-200",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Günaydın, Ahmet Bey!
            </h1>
            <p className={cn(
              "transition-colors duration-200",
              isDarkMode ? "text-blue-200" : "text-blue-700"
            )}>
              Restoranınızda bugün neler oluyor
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className={cn(
              "text-2xl font-bold transition-colors duration-200",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              {currentTime.toLocaleDateString('tr-TR', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className={cn(
              "transition-colors duration-200",
              isDarkMode ? "text-blue-200" : "text-blue-700"
            )}>
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
            <Card key={index} className={cn(
              "backdrop-blur-xl border transition-all duration-300 hover:scale-105",
              isDarkMode 
                ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70" 
                : "bg-white/90 border-gray-200/50 hover:bg-white shadow-light-card hover:shadow-light-card-hover"
            )}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isDarkMode ? "text-slate-300" : "text-gray-600"
                )}>
                  {metric.title}
                </CardTitle>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg", metric.color)}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-2xl font-bold mb-1 transition-colors duration-200",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {metric.value}
                </div>
                <div className={cn(
                  "flex items-center text-xs transition-colors duration-200",
                  metric.trend === 'up' ? "text-green-400" : 
                  metric.trend === 'down' ? "text-red-400" : 
                  isDarkMode ? "text-slate-400" : "text-gray-500"
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
        <Card className={cn(
          "backdrop-blur-xl border transition-all duration-200",
          isDarkMode 
            ? "bg-slate-800/50 border-slate-700/50" 
            : "bg-white/90 border-gray-200/50 shadow-light-elevated"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center justify-between transition-colors duration-200",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              <span className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-blue-400" />
                İçerik İstatistikleri
              </span>
              <Button variant="outline" size="sm" className={cn(
                "transition-all duration-200",
                isDarkMode 
                  ? "border-slate-600 hover:bg-slate-700 text-slate-300" 
                  : "border-gray-300 hover:bg-gray-100 text-gray-700 shadow-light-card hover:shadow-light-card-hover"
              )}>
                Yönet
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                    isDarkMode 
                      ? "bg-slate-700/30 hover:bg-slate-700/50" 
                      : "bg-gray-50 hover:bg-gray-100 shadow-light-card hover:shadow-light-card-hover"
                  )}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium transition-colors duration-200",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {stat.name}
                        </div>
                        <div className={cn(
                          "text-sm transition-colors duration-200",
                          isDarkMode ? "text-slate-300" : "text-gray-600"
                        )}>
                          {stat.count} aktif
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "font-semibold transition-colors duration-200",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {stat.views || stat.clicks || stat.likes}
                      </div>
                      <div className={cn(
                        "text-xs transition-colors duration-200",
                        isDarkMode ? "text-slate-400" : "text-gray-500"
                      )}>
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
        <Card className={cn(
          "backdrop-blur-xl border transition-all duration-200",
          isDarkMode 
            ? "bg-slate-800/50 border-slate-700/50" 
            : "bg-white/90 border-gray-200/50 shadow-light-elevated"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center justify-between transition-colors duration-200",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              <span className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-blue-400" />
                Menü Özeti
              </span>
              <Button variant="outline" size="sm" className={cn(
                "transition-all duration-200",
                isDarkMode 
                  ? "border-slate-600 hover:bg-slate-700 text-slate-300" 
                  : "border-gray-300 hover:bg-gray-100 text-gray-700 shadow-light-card hover:shadow-light-card-hover"
              )}>
                Düzenle
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                isDarkMode ? "bg-slate-700/30" : "bg-gray-50 shadow-light-card"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Başlangıçlar
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  )}>
                    8 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  isDarkMode 
                    ? "bg-green-500/20 text-green-300 border-green-500/30" 
                    : "bg-green-100 text-green-800 border-green-200"
                )}>
                  Aktif
                </Badge>
              </div>
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                isDarkMode ? "bg-slate-700/30" : "bg-gray-50 shadow-light-card"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Ana Yemekler
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  )}>
                    15 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  isDarkMode 
                    ? "bg-green-500/20 text-green-300 border-green-500/30" 
                    : "bg-green-100 text-green-800 border-green-200"
                )}>
                  Aktif
                </Badge>
              </div>
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                isDarkMode ? "bg-slate-700/30" : "bg-gray-50 shadow-light-card"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Tatlılar
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  )}>
                    6 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  isDarkMode 
                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" 
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                )}>
                  2 Pasif
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className={cn(
        "backdrop-blur-xl border transition-all duration-200",
        isDarkMode 
          ? "bg-slate-800/50 border-slate-700/50" 
          : "bg-white/90 border-gray-200/50 shadow-light-elevated"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "transition-colors duration-200",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <ChefHat className="w-6 h-6" />
              <span className="text-sm font-medium">Menü Öğesi Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Megaphone className="w-6 h-6" />
              <span className="text-sm font-medium">Reklam Oluştur</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Camera className="w-6 h-6" />
              <span className="text-sm font-medium">Hikaye Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Palette className="w-6 h-6" />
              <span className="text-sm font-medium">Tema Düzenle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}