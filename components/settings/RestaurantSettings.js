'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Store, 
  Bell, 
  Shield, 
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Save,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function RestaurantSettings() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    staffUpdates: false,
    customerReviews: true,
    promotions: true
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '11:00', close: '22:00', closed: false },
    tuesday: { open: '11:00', close: '22:00', closed: false },
    wednesday: { open: '11:00', close: '22:00', closed: false },
    thursday: { open: '11:00', close: '22:00', closed: false },
    friday: { open: '11:00', close: '23:00', closed: false },
    saturday: { open: '10:00', close: '23:00', closed: false },
    sunday: { open: '10:00', close: '21:00', closed: false }
  });

  const days = [
    { key: 'monday', label: 'Pazartesi' },
    { key: 'tuesday', label: 'Salı' },
    { key: 'wednesday', label: 'Çarşamba' },
    { key: 'thursday', label: 'Perşembe' },
    { key: 'friday', label: 'Cuma' },
    { key: 'saturday', label: 'Cumartesi' },
    { key: 'sunday', label: 'Pazar' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Restoran Ayarları</h1>
          <p className="text-muted-foreground mt-1">Restoran profilinizi ve tercihlerinizi yönetin</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0">
          <Save className="w-4 h-4 mr-2" />
          Tüm Değişiklikleri Kaydet
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-4 transition-colors duration-200",
          "bg-muted border border-border"
        )}>
          <TabsTrigger 
            value="profile" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Store className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger 
            value="hours" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Clock className="w-4 h-4 mr-2" />
            Çalışma Saatleri
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Bell className="w-4 h-4 mr-2" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className={cn(
              "flex items-center transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:text-foreground"
            )}
          >
            <Shield className="w-4 h-4 mr-2" />
            Güvenlik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="restaurantName" className="text-foreground">Restoran Adı</Label>
                  <Input 
                    id="restaurantName" 
                    placeholder="Restoran adınızı girin"
                    className="mt-1 bg-background border-border text-foreground" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="cuisine" className="text-foreground">Mutfak Türü</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                      <SelectValue placeholder="Mutfak türünü seçin" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="italian">İtalyan</SelectItem>
                      <SelectItem value="turkish">Türk</SelectItem>
                      <SelectItem value="french">Fransız</SelectItem>
                      <SelectItem value="american">Amerikan</SelectItem>
                      <SelectItem value="asian">Asya</SelectItem>
                      <SelectItem value="mexican">Meksika</SelectItem>
                      <SelectItem value="mediterranean">Akdeniz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground">Açıklama</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Restoranınız hakkında kısa bir açıklama yazın"
                    className="mt-1 h-24 bg-background border-border text-foreground" 
                  />
                </div>

                <div>
                  <Label className="text-foreground">Restoran Logosu</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Logo yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG 2MB'a kadar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-foreground">Adres</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="address" 
                      placeholder="Restoran adresinizi girin"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground">Telefon Numarası</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      placeholder="+90 (5XX) XXX-XXXX"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">E-posta</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="info@restoraniniz.com"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-foreground">Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="website" 
                      placeholder="https://restoraniniz.com"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity" className="text-foreground">Oturma Kapasitesi</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      placeholder="80"
                      className="mt-1 bg-background border-border text-foreground" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="tables" className="text-foreground">Masa Sayısı</Label>
                    <Input 
                      id="tables" 
                      type="number" 
                      placeholder="20"
                      className="mt-1 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Sosyal Medya Hesapları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="instagram" className="text-foreground">Instagram</Label>
                  <div className="relative mt-1">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="instagram" 
                      placeholder="@restoraniniz"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="facebook" className="text-foreground">Facebook</Label>
                  <div className="relative mt-1">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="facebook" 
                      placeholder="facebook.com/restoraniniz"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="twitter" className="text-foreground">Twitter</Label>
                  <div className="relative mt-1">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="twitter" 
                      placeholder="@restoraniniz"
                      className="pl-10 bg-background border-border text-foreground" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center space-x-4 p-4 bg-accent/30 rounded-lg">
                    <div className="w-24">
                      <Label className="font-medium text-foreground">{day.label}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={!businessHours[day.key].closed}
                        onCheckedChange={(checked) => 
                          setBusinessHours(prev => ({
                            ...prev,
                            [day.key]: { ...prev[day.key], closed: !checked }
                          }))
                        }
                      />
                      <Label className="text-sm text-muted-foreground">Açık</Label>
                    </div>

                    {!businessHours[day.key].closed && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm text-foreground">Açılış:</Label>
                          <Input
                            type="time"
                            value={businessHours[day.key].open}
                            onChange={(e) => 
                              setBusinessHours(prev => ({
                                ...prev,
                                [day.key]: { ...prev[day.key], open: e.target.value }
                              }))
                            }
                            className="w-24 bg-background border-border text-foreground"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm text-foreground">Kapanış:</Label>
                          <Input
                            type="time"
                            value={businessHours[day.key].close}
                            onChange={(e) => 
                              setBusinessHours(prev => ({
                                ...prev,
                                [day.key]: { ...prev[day.key], close: e.target.value }
                              }))
                            }
                            className="w-24 bg-background border-border text-foreground"
                          />
                        </div>
                      </>
                    )}

                    {businessHours[day.key].closed && (
                      <div className="text-sm text-muted-foreground italic">Kapalı</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Bildirim Tercihleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { key: 'newOrders', label: 'QR Kod Taramaları', description: 'Yeni QR kod taramaları hakkında bildirim al' },
                  { key: 'lowStock', label: 'Düşük Stok Uyarıları', description: 'Stok azaldığında uyarı al' },
                  { key: 'staffUpdates', label: 'Personel Güncellemeleri', description: 'Personel programı ve güncellemeleri hakkında bildirim' },
                  { key: 'customerReviews', label: 'Müşteri Yorumları', description: 'Yeni müşteri yorumları hakkında bildirim al' },
                  { key: 'promotions', label: 'Promosyon Hatırlatıcıları', description: 'Aktif promosyonlar ve kampanyalar hakkında hatırlatıcı' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Hesap Güvenliği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-foreground">Mevcut Şifre</Label>
                  <Input id="currentPassword" type="password" className="mt-1 bg-background border-border text-foreground" />
                </div>
                
                <div>
                  <Label htmlFor="newPassword" className="text-foreground">Yeni Şifre</Label>
                  <Input id="newPassword" type="password" className="mt-1 bg-background border-border text-foreground" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-foreground">Yeni Şifre Tekrar</Label>
                  <Input id="confirmPassword" type="password" className="mt-1 bg-background border-border text-foreground" />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Şifreyi Güncelle
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Güvenlik Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">İki Faktörlü Kimlik Doğrulama</div>
                    <div className="text-sm text-muted-foreground">Ekstra güvenlik katmanı ekle</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Giriş Bildirimleri</div>
                    <div className="text-sm text-muted-foreground">Yeni girişler hakkında bildirim al</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Oturum Zaman Aşımı</div>
                    <div className="text-sm text-muted-foreground">Hareketsizlik sonrası otomatik çıkış</div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="15">15 dk</SelectItem>
                      <SelectItem value="30">30 dk</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="120">2 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-2">Son Aktiviteler</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Henüz aktivite kaydı yok</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}