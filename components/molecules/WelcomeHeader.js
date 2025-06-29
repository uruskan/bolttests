'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function WelcomeHeader({ userName = "Kullanıcı", currentTime }) {
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };

  return (
    <Card className={cn(
      "backdrop-blur-xl border shadow-lg transition-all duration-200",
      "bg-card border-border"
    )}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className={cn(
              "text-2xl font-bold mb-2 transition-colors duration-200",
              "text-foreground"
            )}>
              {getGreeting()}, {userName}!
            </h1>
            <p className={cn(
              "transition-colors duration-200",
              "text-muted-foreground"
            )}>
              Restoranınızı yönetmeye başlayın
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className={cn(
              "text-2xl font-bold transition-colors duration-200",
              "text-foreground"
            )}>
              {currentTime.toLocaleDateString('tr-TR', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className={cn(
              "transition-colors duration-200",
              "text-muted-foreground"
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