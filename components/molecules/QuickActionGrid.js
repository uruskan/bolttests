'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function QuickActionGrid({ actions }) {
  return (
    <Card className={cn(
      "backdrop-blur-xl border shadow-lg",
      "bg-white border-gray-200",
      "dark:bg-card/50 dark:border-border/50"
    )}>
      <CardHeader>
        <CardTitle className={cn(
          "transition-colors duration-200",
          "text-gray-900 dark:text-foreground"
        )}>
          Hızlı İşlemler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button 
                key={index}
                onClick={action.onClick}
                className={cn(
                  "h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 hover:scale-105",
                  "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
                  "dark:bg-gradient-to-br dark:from-primary dark:to-primary/80 dark:hover:from-primary/90 dark:hover:to-primary/70"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium text-center">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}