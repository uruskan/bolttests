'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WelcomeHeaderProps {
  userName: string;
  currentTime: Date;
}

export function WelcomeHeader({ userName, currentTime }: WelcomeHeaderProps) {
  return (
    <Card className="bg-primary/10 backdrop-blur-xl border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">
              Günaydın, {userName}!
            </h1>
            <p className="text-primary/80">
              Restoranınızda bugün neler oluyor
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-2xl font-bold text-foreground">
              {currentTime.toLocaleDateString('tr-TR', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-primary/80">
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