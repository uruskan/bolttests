'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface QuickActionGridProps {
  actions: QuickAction[];
}

export function QuickActionGrid({ actions }: QuickActionGridProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">Hızlı İşlemler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button 
                key={index}
                onClick={action.onClick}
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
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