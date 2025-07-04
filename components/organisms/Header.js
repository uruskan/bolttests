'use client';

import { Bell, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/atoms/Logo';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { SearchInput } from '@/components/atoms/SearchInput';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

export function Header({ sidebarOpen, onToggleSidebar }) {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className={cn(
      "backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300",
      "bg-white/95 border-gray-200 shadow-sm",
      "dark:bg-slate-900/80 dark:border-slate-700/50"
    )}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Restaurant Name */}
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

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchInput 
                placeholder="Menü, içerik ara..."
                className="w-64"
              />
            </div>
            
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user?.email}
                </div>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}