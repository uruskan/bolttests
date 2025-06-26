'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className 
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-10 bg-background/50 border-border focus:border-primary transition-all duration-200 shadow-sm focus:shadow-md"
      />
    </div>
  );
}