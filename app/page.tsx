'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { MenuManagement } from '@/components/menu/MenuManagement';
import { ContentManagement } from '@/components/content/ContentManagement';
import { RestaurantSettings } from '@/components/settings/RestaurantSettings';
import { ThemeCustomization } from '@/components/theme/ThemeCustomization';

type ActiveView = 'dashboard' | 'menu' | 'content' | 'settings' | 'theme';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'menu':
        return <MenuManagement />;
      case 'content':
        return <ContentManagement />;
      case 'settings':
        return <RestaurantSettings />;
      case 'theme':
        return <ThemeCustomization />;
      default:
        return <DashboardOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-300">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout activeView={activeView} onViewChange={setActiveView}>
      {renderActiveView()}
    </MainLayout>
  );
}