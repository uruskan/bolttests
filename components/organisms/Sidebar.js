'use client';

import { NavigationItem } from '@/components/molecules/NavigationItem';
import { 
  LayoutDashboard,
  ChefHat,
  Megaphone,
  Settings,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard, badge: undefined },
  { id: 'menu', label: 'Menü Yönetimi', icon: ChefHat, badge: undefined },
  { id: 'content', label: 'İçerik Yönetimi', icon: Megaphone, badge: '3' },
  { id: 'theme', label: 'Tema Özelleştirme', icon: Palette, badge: undefined },
  { id: 'settings', label: 'Ayarlar', icon: Settings, badge: undefined },
];

export function Sidebar({ activeView, onViewChange, sidebarOpen, onCloseSidebar }) {
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