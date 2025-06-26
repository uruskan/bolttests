'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { 
  Plus, 
  Camera, 
  Clock, 
  Eye, 
  Heart,
  Share,
  Edit,
  Trash2,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  title: string;
  content: string;
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnail: string;
  createdAt: Date;
  expiresAt: Date;
  views: number;
  likes: number;
  active: boolean;
}

export function StoryManagement() {
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [selectedType, setSelectedType] = useState<'image' | 'video'>('image');

  const stories: Story[] = [
    {
      id: '1',
      title: 'Fresh Pasta Making',
      content: 'Watch our chef prepare fresh pasta from scratch using traditional Italian techniques.',
      type: 'video',
      mediaUrl: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
      views: 234,
      likes: 45,
      active: true
    },
    {
      id: '2',
      title: "Today's Special",
      content: 'Our special risotto with truffle and parmesan - limited quantity available!',
      type: 'image',
      mediaUrl: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/8753999/pexels-photo-8753999.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
      views: 156,
      likes: 28,
      active: true
    },
    {
      id: '3',
      title: 'Weekend Wine Tasting',
      content: 'Join us this weekend for a special wine tasting event featuring Italian wines.',
      type: 'image',
      mediaUrl: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
      views: 89,
      likes: 12,
      active: true
    },
    {
      id: '4',
      title: 'Chef Interview',
      content: 'Behind the scenes with our head chef discussing seasonal ingredients.',
      type: 'video',
      mediaUrl: 'https://images.pexels.com/photos/4253315/pexels-photo-4253315.jpeg?auto=compress&cs=tinysrgb&w=400',
      thumbnail: 'https://images.pexels.com/photos/4253315/pexels-photo-4253315.jpeg?auto=compress&cs=tinysrgb&w=400',
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      views: 312,
      likes: 67,
      active: false
    }
  ];

  const activeStories = stories.filter(story => story.active);
  const expiredStories = stories.filter(story => !story.active);

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft}m left`;
    }
    return `${minutesLeft}m left`;
  };

  const getTimeSince = (createdAt: Date) => {
    const now = new Date();
    const timePassed = now.getTime() - createdAt.getTime();
    const hoursPassed = Math.floor(timePassed / (1000 * 60 * 60));
    
    if (hoursPassed > 0) {
      return `${hoursPassed}h ago`;
    }
    const minutesPassed = Math.floor(timePassed / (1000 * 60));
    return `${minutesPassed}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Story Management</h1>
          <p className="text-gray-600 mt-1">Share moments and specials with your customers</p>
        </div>
        <Dialog open={isAddingStory} onOpenChange={setIsAddingStory}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Type Selection */}
              <div>
                <Label>Story Type</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant={selectedType === 'image' ? 'default' : 'outline'}
                    onClick={() => setSelectedType('image')}
                    className={selectedType === 'image' ? 'bg-gradient-to-r from-rose-500 to-orange-500' : ''}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Image
                  </Button>
                  <Button
                    variant={selectedType === 'video' ? 'default' : 'outline'}
                    onClick={() => setSelectedType('video')}
                    className={selectedType === 'video' ? 'bg-gradient-to-r from-rose-500 to-orange-500' : ''}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storyTitle">Story Title</Label>
                    <Input id="storyTitle" placeholder="e.g., Fresh Pasta Making" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="storyDescription">Description</Label>
                    <Textarea 
                      id="storyDescription" 
                      placeholder="Describe what's happening in this story..." 
                      className="mt-1 h-24" 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Upload {selectedType === 'image' ? 'Image' : 'Video'}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedType === 'image' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 50MB'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingStory(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                Create Story
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Stories */}
      <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-rose-500" />
              Active Stories ({activeStories.length})
            </span>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Live for 24 hours
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeStories.map((story) => (
                <div key={story.id} className="relative group">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100 relative">
                    <img 
                      src={story.thumbnail} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    {story.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-rose-600 ml-1" />
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold mb-1">{story.title}</h3>
                        <p className="text-sm text-gray-200 mb-2 line-clamp-2">{story.content}</p>
                        <div className="flex items-center justify-between text-xs">
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
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/20 border-white/30 hover:bg-white/30">
                              <Edit className="w-4 h-4 text-white" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-white/20 border-white/30 hover:bg-white/30">
                              <Share className="w-4 h-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time remaining badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/60 text-white border-none">
                        <Clock className="w-3 h-3 mr-1" />
                        {getTimeRemaining(story.expiresAt)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h3 className="font-medium text-gray-900 truncate">{story.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                      <span>{getTimeSince(story.createdAt)}</span>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {story.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {story.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active stories</h3>
              <p className="text-gray-600 mb-4">Create your first story to engage with customers</p>
              <Button 
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                onClick={() => setIsAddingStory(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Story
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Story Archive */}
      {expiredStories.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              Story Archive ({expiredStories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiredStories.map((story) => (
                <div key={story.id} className="flex items-center space-x-4 p-4 bg-gray-50/80 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img 
                      src={story.thumbnail} 
                      alt={story.title}
                      className="w-full h-full object-cover opacity-75"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{story.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{story.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                      <span>{getTimeSince(story.createdAt)}</span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {story.views} views
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {story.likes} likes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}