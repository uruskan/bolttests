'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function WelcomeHeader({ userName, currentTime }) {
  return (
    <Card className={cn(
      "backdrop-blur-xl border shadow-lg",
      "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
      "dark:bg-primary/10 dark:backdrop-blur-xl dark:border-primary/20"
    )}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={cn(
              "text-2xl font-bold mb-2 transition-colors duration-200",
              "text-gray-900 dark:text-foreground"
            )}>
              Günaydın, {userName}!
            </h1>
            <p className={cn(
              "transition-colors duration-200",
              "text-blue-700 dark:text-primary/80"
            )}>
              Restoranınızda bugün neler oluyor
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className={cn(
              "text-2xl font-bold transition-colors duration-200",
              "text-gray-900 dark:text-foreground"
            )}>
              {currentTime.toLocaleDateString('tr-TR', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className={cn(
              "transition-colors duration-200",
              "text-blue-700 dark:text-primary/80"
            )}>
              {currentTime.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}