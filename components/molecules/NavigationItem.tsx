'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export function NavigationItem({ 
  id, 
  label, 
  icon: Icon, 
  badge, 
  isActive, 
  onClick 
}: NavigationItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-12 text-left font-medium transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-lg shadow-primary/10 text-foreground" 
          : "text-muted-foreground hover:bg-accent hover:text-foreground hover:shadow-sm"
      )}
      onClick={() => onClick(id)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
      {badge && (
        <Badge className={cn(
          "ml-auto text-xs border",
          isActive 
            ? "bg-primary/20 text-primary border-primary/30"
            : "bg-muted text-muted-foreground border-border"
        )}>
          {badge}
        </Badge>
      )}
    </Button>
  );
}