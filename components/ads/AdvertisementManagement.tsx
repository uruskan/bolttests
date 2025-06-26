'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Megaphone, 
  Clock, 
  Eye, 
  BarChart3,
  Edit,
  Trash2,
  Calendar,
  Target,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  startTime: string;
  endTime: string;
  priority: number;
  active: boolean;
  clicks: number;
  impressions: number;
  targetAudience: string;
  createdAt: Date;
}

export function AdvertisementManagement() {
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'archived'>('active');

  const advertisements: Advertisement[] = [
    {
      id: '1',
      title: 'Happy Hour Special',
      description: 'Buy one get one free on all cocktails from 5-7 PM daily',
      imageUrl: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkUrl: 'https://bellavista.com/happy-hour',
      startTime: '17:00',
      endTime: '19:00',
      priority: 1,
      active: true,
      clicks: 234,
      impressions: 1567,
      targetAudience: 'All customers',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Weekend Brunch',
      description: 'Special weekend brunch menu available Saturday and Sunday',
      imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkUrl: 'https://bellavista.com/brunch-menu',
      startTime: '09:00',
      endTime: '14:00',
      priority: 2,
      active: true,
      clicks: 156,
      impressions: 934,
      targetAudience: 'Weekend visitors',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Chef\'s Tasting Menu',
      description: 'Experience our 7-course tasting menu featuring seasonal ingredients',
      imageUrl: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      linkUrl: 'https://bellavista.com/tasting-menu',
      startTime: '18:00',
      endTime: '22:00',
      priority: 3,
      active: false,
      clicks: 89,
      impressions: 445,
      targetAudience: 'Fine dining enthusiasts',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ];

  const activeAds = advertisements.filter(ad => ad.active);
  const scheduledAds = advertisements.filter(ad => !ad.active);
  const archivedAds: Advertisement[] = [];

  const getCurrentAds = () => {
    switch (activeTab) {
      case 'active': return activeAds;
      case 'scheduled': return scheduledAds;
      case 'archived': return archivedAds;
      default: return activeAds;
    }
  };

  const getClickThroughRate = (clicks: number, impressions: number) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(1) + '%';
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800 border-red-200';
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 3: return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Normal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advertisement Management</h1>
          <p className="text-gray-600 mt-1">Manage promotions and special offers</p>
        </div>
        <Dialog open={isAddingAd} onOpenChange={setIsAddingAd}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create Advertisement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Advertisement</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="adTitle">Advertisement Title</Label>
                    <Input id="adTitle" placeholder="e.g., Happy Hour Special" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="adDescription">Description</Label>
                    <Textarea 
                      id="adDescription" 
                      placeholder="Describe your promotion..." 
                      className="mt-1 h-20" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkUrl">Link URL (Optional)</Label>
                    <Input id="linkUrl" placeholder="https://your-website.com/promotion" className="mt-1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Upload Image</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors cursor-pointer">
                      <Megaphone className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="activeToggle" />
                <Label htmlFor="activeToggle">Activate immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAd(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                Create Advertisement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Ads</p>
                <p className="text-2xl font-bold text-gray-900">{activeAds.length}</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {advertisements.reduce((sum, ad) => sum + ad.clicks, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {advertisements.reduce((sum, ad) => sum + ad.impressions, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. CTR</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getClickThroughRate(
                    advertisements.reduce((sum, ad) => sum + ad.clicks, 0),
                    advertisements.reduce((sum, ad) => sum + ad.impressions, 0)
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'active', label: 'Active', count: activeAds.length },
          { id: 'scheduled', label: 'Scheduled', count: scheduledAds.length },
          { id: 'archived', label: 'Archived', count: archivedAds.length },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className={cn(
              "relative h-9 px-4",
              activeTab === tab.id 
                ? "bg-white shadow-sm text-gray-900" 
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge className="ml-2 bg-rose-100 text-rose-800 text-xs px-1.5 py-0.5">
                {tab.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Advertisement List */}
      <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
        <CardContent className="p-6">
          {getCurrentAds().length > 0 ? (
            <div className="space-y-6">
              {getCurrentAds().map((ad) => (
                <div key={ad.id} className="border border-gray-200 rounded-lg p-6 hover:border-rose-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{ad.title}</h3>
                          <p className="text-gray-600 mb-2">{ad.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {ad.startTime} - {ad.endTime}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {ad.createdAt.toLocaleDateString()}
                            </div>
                            {ad.linkUrl && (
                              <div className="flex items-center">
                                <LinkIcon className="w-4 h-4 mr-1" />
                                Link attached
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={cn("border", getPriorityColor(ad.priority))}>
                            {getPriorityLabel(ad.priority)}
                          </Badge>
                          <Badge className={ad.active ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}>
                            {ad.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{ad.impressions.toLocaleString()}</div>
                            <div className="text-gray-500">Impressions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{ad.clicks.toLocaleString()}</div>
                            <div className="text-gray-500">Clicks</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{getClickThroughRate(ad.clicks, ad.impressions)}</div>
                            <div className="text-gray-500">CTR</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} advertisements
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'active' 
                  ? "Create your first advertisement to promote your restaurant"
                  : `No ${activeTab} advertisements found`}
              </p>
              <Button 
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                onClick={() => setIsAddingAd(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Advertisement
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}