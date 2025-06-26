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
      {/* Welcome Header - Fixed for proper dark mode */}
      <Card className={cn(
        "backdrop-blur-xl border transition-all duration-200",
        "bg-card border-border shadow-sm"
      )}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-foreground">
                Günaydın, Ahmet Bey!
              </h1>
              <p className="text-muted-foreground">
                Restoranınızda bugün neler oluyor
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className="text-2xl font-bold text-foreground">
                {currentTime.toLocaleDateString('tr-TR', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-muted-foreground">
                {currentTime.toLocaleTimeString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className={cn(
              "backdrop-blur-xl border transition-all duration-300 hover:scale-105",
              "bg-card/80 border-border shadow-sm hover:shadow-lg"
            )}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  "text-muted-foreground"
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
                  "text-foreground"
                )}>
                  {metric.value}
                </div>
                <div className={cn(
                  "flex items-center text-xs transition-colors duration-200",
                  metric.trend === 'up' ? "text-green-600 dark:text-green-400" : 
                  metric.trend === 'down' ? "text-red-600 dark:text-red-400" : 
                  "text-muted-foreground"
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
          "bg-card/80 border-border shadow-sm"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center justify-between transition-colors duration-200",
              "text-foreground"
            )}>
              <span className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-primary" />
                İçerik İstatistikleri
              </span>
              <Button variant="outline" size="sm" className={cn(
                "transition-all duration-200",
                "border-border hover:bg-accent text-muted-foreground hover:text-foreground"
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
                    "bg-accent/50 hover:bg-accent/70"
                  )}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium transition-colors duration-200",
                          "text-foreground"
                        )}>
                          {stat.name}
                        </div>
                        <div className={cn(
                          "text-sm transition-colors duration-200",
                          "text-muted-foreground"
                        )}>
                          {stat.count} aktif
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "font-semibold transition-colors duration-200",
                        "text-foreground"
                      )}>
                        {stat.views || stat.clicks || stat.likes}
                      </div>
                      <div className={cn(
                        "text-xs transition-colors duration-200",
                        "text-muted-foreground"
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
          "bg-card/80 border-border shadow-sm"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "flex items-center justify-between transition-colors duration-200",
              "text-foreground"
            )}>
              <span className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-primary" />
                Menü Özeti
              </span>
              <Button variant="outline" size="sm" className={cn(
                "transition-all duration-200",
                "border-border hover:bg-accent text-muted-foreground hover:text-foreground"
              )}>
                Düzenle
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                "bg-accent/50"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    "text-foreground"
                  )}>
                    Başlangıçlar
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    "text-muted-foreground"
                  )}>
                    8 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                )}>
                  Aktif
                </Badge>
              </div>
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                "bg-accent/50"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    "text-foreground"
                  )}>
                    Ana Yemekler
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    "text-muted-foreground"
                  )}>
                    15 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                )}>
                  Aktif
                </Badge>
              </div>
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                "bg-accent/50"
              )}>
                <div>
                  <div className={cn(
                    "font-medium transition-colors duration-200",
                    "text-foreground"
                  )}>
                    Tatlılar
                  </div>
                  <div className={cn(
                    "text-sm transition-colors duration-200",
                    "text-muted-foreground"
                  )}>
                    6 öğe
                  </div>
                </div>
                <Badge className={cn(
                  "transition-colors duration-200",
                  "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
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
        "bg-card/80 border-border shadow-sm"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "transition-colors duration-200",
            "text-foreground"
          )}>
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <ChefHat className="w-6 h-6" />
              <span className="text-sm font-medium">Menü Öğesi Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Megaphone className="w-6 h-6" />
              <span className="text-sm font-medium">Reklam Oluştur</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Camera className="w-6 h-6" />
              <span className="text-sm font-medium">Hikaye Ekle</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Palette className="w-6 h-6" />
              <span className="text-sm font-medium">Tema Düzenle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}