'use client';

import { useState } from 'react';
import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';
import { cn } from '@/lib/utils';

export function DashboardLayout({ children, activeView, onViewChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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