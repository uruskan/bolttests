'use client';

import { useState } from 'react';
import { Bell, User, Menu, X, LayoutDashboard, ChefHat, Megaphone, Settings, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/atoms/Logo';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard },
  { id: 'menu', label: 'Menü Yönetimi', icon: ChefHat },
  { id: 'content', label: 'İçerik Yönetimi', icon: Megaphone, badge: '3' },
  { id: 'theme', label: 'Tema Özelleştirme', icon: Palette },
  { id: 'settings', label: 'Ayarlar', icon: Settings },
];

function Header({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className={cn(
      "backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300",
      "bg-white/95 border-gray-200 shadow-sm",
      "dark:bg-slate-900/80 dark:border-slate-700/50"
    )}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden transition-colors duration-200",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                "dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              )}
              onClick={onToggleSidebar}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Logo />
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "relative transition-colors duration-200",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                "dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              )}
            >
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                5
              </Badge>
            </Button>

            <ThemeToggle />

            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "transition-colors duration-200",
                "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                "dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              )}
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavigationItem({ id, label, icon: Icon, badge, isActive, onClick }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 text-left font-medium transition-all duration-200",
        isActive 
          ? cn(
              "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm text-blue-700",
              "dark:bg-gradient-to-r dark:from-primary/20 dark:to-primary/10 dark:border dark:border-primary/30 dark:shadow-lg dark:shadow-primary/10 dark:text-white"
            )
          : cn(
              "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm",
              "dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground dark:hover:shadow-sm"
            )
      )}
      onClick={() => onClick(id)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
      {badge && (
        <Badge className={cn(
          "ml-auto text-xs border",
          isActive 
            ? cn(
                "bg-blue-100 text-blue-700 border-blue-200",
                "dark:bg-primary/20 dark:text-primary dark:border-primary/30"
              )
            : cn(
                "bg-gray-100 text-gray-600 border-gray-200",
                "dark:bg-muted dark:text-muted-foreground dark:border-border"
              )
        )}>
          {badge}
        </Badge>
      )}
    </Button>
  );
}

function Sidebar({ activeView, onViewChange, sidebarOpen, onCloseSidebar }) {
  const handleViewChange = (view) => {
    onViewChange(view);
    onCloseSidebar();
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 backdrop-blur-xl border-r transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
      "bg-white/95 border-gray-200 shadow-lg lg:shadow-none",
      "dark:bg-slate-900/90 dark:border-slate-700/50",
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full pt-16 lg:pt-0">
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              badge={item.badge}
              isActive={activeView === item.id}
              onClick={handleViewChange}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className={cn(
        "backdrop-blur-xl border shadow-lg transition-all duration-200",
        "bg-card border-border"
      )}>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={cn(
                "text-2xl font-bold mb-2 transition-colors duration-200",
                "text-foreground"
              )}>
                Günaydın, Ahmet Bey!
              </h1>
              <p className={cn(
                "transition-colors duration-200",
                "text-muted-foreground"
              )}>
                Restoranınızda bugün neler oluyor
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className={cn(
                "text-2xl font-bold transition-colors duration-200",
                "text-foreground"
              )}>
                {new Date().toLocaleDateString('tr-TR', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className={cn(
                "transition-colors duration-200",
                "text-muted-foreground"
              )}>
                {new Date().toLocaleTimeString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Toplam Menü Öğesi", value: "127", change: "+5 bu hafta", icon: ChefHat },
          { title: "Aktif Kategoriler", value: "8", change: "Tümü aktif", icon: User },
          { title: "QR Kod Taramaları", value: "2,847", change: "+12.5% bu ay", icon: LayoutDashboard },
          { title: "Müşteri Puanı", value: "4.8", change: "+0.2 bu hafta", icon: Settings }
        ].map((metric, index) => (
          <div key={index} className={cn(
            "backdrop-blur-sm border transition-all duration-300 hover:scale-105",
            "bg-white border-gray-200 hover:bg-white shadow-sm hover:shadow-md",
            "dark:bg-card/50 dark:border-border/50 dark:hover:bg-card/70"
          )}>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <div className={cn(
                "text-sm font-medium transition-colors duration-200",
                "text-gray-600 dark:text-slate-300"
              )}>
                {metric.title}
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg">
                <metric.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className={cn(
                "text-2xl font-bold mb-1 transition-colors duration-200",
                "text-gray-900 dark:text-white"
              )}>
                {metric.value}
              </div>
              <div className={cn(
                "flex items-center text-xs transition-colors duration-200 text-green-600 dark:text-green-400"
              )}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardLayout({ children, activeView, onViewChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    if (activeView === 'dashboard') {
      return <DashboardPage />;
    }
    return children;
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-300",
      "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
      "dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
    )}>
      <Header 
        sidebarOpen={sidebarOpen} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />

      <div className="flex">
        <Sidebar 
          activeView={activeView}
          onViewChange={onViewChange}
          sidebarOpen={sidebarOpen}
          onCloseSidebar={() => setSidebarOpen(false)}
        />

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}