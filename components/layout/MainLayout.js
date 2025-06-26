'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ChefHat,
  Megaphone,
  Settings,
  Bell,
  Search,
  User,
  Menu,
  X,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard, badge: null },
  { id: 'menu', label: 'Menü Yönetimi', icon: ChefHat, badge: null },
  { id: 'content', label: 'İçerik Yönetimi', icon: Megaphone, badge: '3' },
  { id: 'theme', label: 'Tema Özelleştirme', icon: Palette, badge: null },
  { id: 'settings', label: 'Ayarlar', icon: Settings, badge: null },
];

export function MainLayout({ children, activeView, onViewChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update the theme context or localStorage
  };

  return (
    <div className={cn("min-h-screen", isDarkMode ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" : "bg-gradient-to-br from-gray-50 via-white to-gray-100")}>
      {/* Header */}
      <header className={cn("backdrop-blur-xl border-b sticky top-0 z-50", isDarkMode ? "bg-slate-900/80 border-slate-700/50" : "bg-white/80 border-gray-200/50")}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Restaurant Name */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden", isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>SayNDone</h1>
                <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-gray-600")}>Restaurant Dashboard</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="relative">
                  <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4", isDarkMode ? "text-slate-400" : "text-gray-400")} />
                  <Input
                    placeholder="Menü, içerik ara..."
                    className={cn("pl-10 w-64 focus:border-blue-400", isDarkMode ? "bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500")}
                  />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("relative", isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  5
                </Badge>
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}
              >
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 backdrop-blur-xl border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isDarkMode ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-gray-200/50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 text-left font-medium transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                        : isDarkMode 
                          ? "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      isActive && (isDarkMode ? "text-white" : "text-blue-600")
                    )}
                    onClick={() => {
                      onViewChange(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-auto bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}