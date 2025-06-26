'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MetricCard({ title, value, change, trend, icon: Icon, colorClass }) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg", colorClass)}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        <div className={cn(
          "flex items-center text-xs",
          trend === 'up' ? "text-green-600 dark:text-green-400" : 
          trend === 'down' ? "text-red-600 dark:text-red-400" : 
          "text-muted-foreground"
        )}>
          {trend !== 'neutral' && (
            <TrendIcon className="w-3 h-3 mr-1" />
          )}
          {change}
        </div>
      </CardContent>
    </Card>
  );
}