'use client';

import { ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className={cn(
        "bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg",
        sizeClasses[size]
      )}>
        <ChefHat className={cn("text-white", size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6')} />
      </div>
      {showText && (
        <div>
          <h1 className={cn(
            "font-bold text-foreground transition-colors duration-200",
            textSizeClasses[size]
          )}>
            SayNDone
          </h1>
          {size !== 'sm' && (
            <p className="text-sm text-muted-foreground">
              Restaurant Dashboard
            </p>
          )}
        </div>
      )}
    </div>
  );
}