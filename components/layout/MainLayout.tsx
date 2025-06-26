'use client';

import { ReactNode } from 'react';
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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

type ActiveView = 'dashboard' | 'menu' | 'content' | 'settings';

interface MainLayoutProps {
  children: ReactNode;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard, badge: null },
  { id: 'menu', label: 'Menü Yönetimi', icon: ChefHat, badge: null },
  { id: 'content', label: 'İçerik Yönetimi', icon: Megaphone, badge: '3' },
  { id: 'settings', label: 'Ayarlar', icon: Settings, badge: null },
];

export function MainLayout({ children, activeView, onViewChange }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Restaurant Name */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SayNDone</h1>
                <p className="text-sm text-slate-400">Restaurant Dashboard</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Menü, sipariş ara..."
                    className="pl-10 w-64 bg-slate-800/50 border-slate-600 focus:border-blue-400 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
              
              <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white hover:bg-slate-800">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  5
                </Badge>
              </Button>

              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
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
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10" 
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    )}
                    onClick={() => {
                      onViewChange(item.id as ActiveView);
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