'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ContentStat {
  name: string;
  count: number;
  value: number;
  icon: LucideIcon;
  valueLabel: string;
}

interface ContentStatCardProps {
  title: string;
  icon: LucideIcon;
  stats: ContentStat[];
  onManage?: () => void;
}

export function ContentStatCard({ title, icon: TitleIcon, stats, onManage }: ContentStatCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span className="flex items-center">
            <TitleIcon className="w-5 h-5 mr-2 text-primary" />
            {title}
          </span>
          {onManage && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onManage}
              className="border-border hover:bg-accent text-muted-foreground hover:text-foreground shadow-sm hover:shadow-md transition-all duration-200"
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
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent/70 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {stat.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.count} aktif
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
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