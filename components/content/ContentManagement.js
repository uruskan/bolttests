'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Camera, 
  Megaphone, 
  Eye, 
  Heart,
  Share,
  Edit,
  Trash2,
  Play,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState('stories');

  const stories = [
    {
      id: '1',
      title: 'Fresh Pasta Making',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 234,
      likes: 45,
      active: true,
      timeLeft: '22h'
    },
    {
      id: '2',
      title: "Today's Special",
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 156,
      likes: 28,
      active: true,
      timeLeft: '20h'
    },
    {
      id: '3',
      title: 'Weekend Wine Tasting',
      type: 'image',
      thumbnail: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 89,
      likes: 12,
      active: true,
      timeLeft: '18h'
    }
  ];

  const advertisements = [
    {
      id: '1',
      title: 'Happy Hour Special',
      description: 'Buy one get one free on all cocktails from 5-7 PM daily',
      image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      clicks: 234,
      impressions: 1567,
      active: true
    },
    {
      id: '2',
      title: 'Weekend Brunch',
      description: 'Special weekend brunch menu available Saturday and Sunday',
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      clicks: 156,
      impressions: 934,
      active: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">İçerik Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Hikayeler, reklamlar ve içeriklerinizi yönetin</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          İçerik Oluştur
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-2 transition-colors duration-200",
          "bg-muted border border-border"
        )}>
          <TabsTrigger 
            value="stories" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Camera className="w-4 h-4 mr-2" />
            Hikayeler
          </TabsTrigger>
          <TabsTrigger 
            value="ads" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Reklamlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  Aktif Hikayeler ({stories.length})
                </span>
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                  24 saat canlı
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <div key={story.id} className="relative group">
                    <div className="aspect-[9/16] rounded-lg overflow-hidden bg-muted relative">
                      <img 
                        src={story.thumbnail} 
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      {story.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary ml-1" />
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/60 text-white border-none">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.timeLeft}
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <h3 className="font-semibold text-white mb-1">{story.title}</h3>
                        <div className="flex items-center justify-between text-xs text-white">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {story.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {story.likes}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" className="h-6 w-6 bg-white/20 border-white/30 hover:bg-white/30">
                              <Edit className="w-3 h-3 text-white" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-6 w-6 bg-white/20 border-white/30 hover:bg-white/30">
                              <Share className="w-3 h-3 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-primary" />
                Aktif Reklamlar ({advertisements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advertisements.map((ad) => (
                  <div key={ad.id} className="flex items-center space-x-4 p-4 bg-accent/30 rounded-lg border border-border">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={ad.image} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{ad.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {ad.impressions} görüntülenme
                        </span>
                        <span className="flex items-center">
                          <Share className="w-3 h-3 mr-1" />
                          {ad.clicks} tıklama
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                        Aktif
                      </Badge>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}