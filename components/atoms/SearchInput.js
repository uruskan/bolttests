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
      <Search className={cn(
        "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
        "text-gray-400 dark:text-muted-foreground"
      )} />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "pl-10 transition-all duration-200",
          "bg-white border-gray-300 focus:border-blue-500 shadow-sm focus:shadow-md text-gray-900 placeholder:text-gray-500",
          "dark:bg-background/50 dark:border-border dark:focus:border-primary dark:text-white dark:placeholder:text-slate-400"
        )}
      />
    </div>
  );
}