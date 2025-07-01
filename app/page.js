'use client';

import { useState, useEffect } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { MenuManagement } from '@/components/menu/MenuManagement';
import { ContentManagement } from '@/components/content/ContentManagement';
import { RestaurantSettings } from '@/components/settings/RestaurantSettings';
import { ThemeCustomization } from '@/components/theme/ThemeCustomization';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
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
        return <DashboardPage />;
      case 'menu':
        return <MenuManagement />;
      case 'content':
        return <ContentManagement />;
      case 'theme':
        return <ThemeCustomization />;
      case 'settings':
        return <RestaurantSettings />;
      default:
        return <DashboardPage />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout activeView={activeView} onViewChange={setActiveView}>
        {renderActiveView()}
      </DashboardLayout>
    </AuthGuard>
  );
}