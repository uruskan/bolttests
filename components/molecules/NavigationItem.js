'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function NavigationItem({ 
  id, 
  label, 
  icon: Icon, 
  badge, 
  isActive, 
  onClick 
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 text-left font-medium transition-all duration-200",
        isActive 
          ? cn(
              "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm text-blue-700",
              "dark:bg-gradient-to-r dark:from-primary/20 dark:to-primary/10 dark:border dark:border-primary/30 dark:shadow-lg dark:shadow-primary/10 dark:text-white"
            )
          : cn(
              "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm",
              "dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground dark:hover:shadow-sm"
            )
      )}
      onClick={() => onClick(id)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
      {badge && (
        <Badge className={cn(
          "ml-auto text-xs border",
          isActive 
            ? cn(
                "bg-blue-100 text-blue-700 border-blue-200",
                "dark:bg-primary/20 dark:text-primary dark:border-primary/30"
              )
            : cn(
                "bg-gray-100 text-gray-600 border-gray-200",
                "dark:bg-muted dark:text-muted-foreground dark:border-border"
              )
        )}>
          {badge}
        </Badge>
      )}
    </Button>
  );
}