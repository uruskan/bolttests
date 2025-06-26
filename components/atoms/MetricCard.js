'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MetricCard({ title, value, change, trend, icon: Icon, colorClass }) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className={cn(
      "backdrop-blur-sm border transition-all duration-300 hover:scale-105",
      "bg-white border-gray-200 hover:bg-white shadow-sm hover:shadow-md",
      "dark:bg-card/50 dark:border-border/50 dark:hover:bg-card/70"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium transition-colors duration-200",
          "text-gray-600 dark:text-slate-300"
        )}>
          {title}
        </CardTitle>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-lg", colorClass)}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold mb-1 transition-colors duration-200",
          "text-gray-900 dark:text-white"
        )}>
          {value}
        </div>
        <div className={cn(
          "flex items-center text-xs transition-colors duration-200",
          trend === 'up' ? "text-green-600 dark:text-green-400" : 
          trend === 'down' ? "text-red-600 dark:text-red-400" : 
          "text-gray-500 dark:text-slate-400"
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