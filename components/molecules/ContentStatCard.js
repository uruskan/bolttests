'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ContentStatCard({ title, icon: TitleIcon, stats, onManage }) {
  return (
    <Card className={cn(
      "backdrop-blur-xl border shadow-lg",
      "bg-white border-gray-200",
      "dark:bg-card/50 dark:border-border/50"
    )}>
      <CardHeader>
        <CardTitle className={cn(
          "flex items-center justify-between transition-colors duration-200",
          "text-gray-900 dark:text-foreground"
        )}>
          <span className="flex items-center">
            <TitleIcon className={cn(
              "w-5 h-5 mr-2 transition-colors duration-200",
              "text-blue-600 dark:text-primary"
            )} />
            {title}
          </span>
          {onManage && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onManage}
              className={cn(
                "transition-all duration-200",
                "border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm hover:shadow-md",
                "dark:border-border dark:hover:bg-accent dark:text-muted-foreground dark:hover:text-foreground"
              )}
            >
              Yönet
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                "bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md",
                "dark:bg-accent/50 dark:hover:bg-accent/70"
              )}>
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shadow-lg",
                    "bg-gradient-to-br from-blue-500 to-indigo-600",
                    "dark:bg-gradient-to-br dark:from-primary dark:to-primary/80"
                  )}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className={cn(
                      "font-medium transition-colors duration-200",
                      "text-gray-900 dark:text-foreground"
                    )}>
                      {stat.name}
                    </div>
                    <div className={cn(
                      "text-sm transition-colors duration-200",
                      "text-gray-600 dark:text-muted-foreground"
                    )}>
                      {stat.count} aktif
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "font-semibold transition-colors duration-200",
                    "text-gray-900 dark:text-foreground"
                  )}>
                    {stat.value}
                  </div>
                  <div className={cn(
                    "text-xs transition-colors duration-200",
                    "text-gray-500 dark:text-muted-foreground"
                  )}>
                    {stat.valueLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}