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
          <h1 className="text-3xl font-bold text-white">Restoran Ayarları</h1>
          <p className="text-slate-400 mt-1">Restoran profilinizi ve tercihlerinizi yönetin</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 mt-4 sm:mt-0">
          <Save className="w-4 h-4 mr-2" />
          Tüm Değişiklikleri Kaydet
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger value="profile" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Store className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Clock className="w-4 h-4 mr-2" />
            Çalışma Saatleri
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Bell className="w-4 h-4 mr-2" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <Shield className="w-4 h-4 mr-2" />
            Güvenlik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="restaurantName" className="text-slate-300">Restoran Adı</Label>
                  <Input id="restaurantName" defaultValue="Bella Vista" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                
                <div>
                  <Label htmlFor="cuisine" className="text-slate-300">Mutfak Türü</Label>
                  <Select defaultValue="italian">
                    <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
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
                  <Label htmlFor="description" className="text-slate-300">Açıklama</Label>
                  <Textarea 
                    id="description" 
                    defaultValue="Şehrin kalbinde otantik İtalyan mutfağı. Nesiller boyu aktarılan geleneksel tarifleri sunan aile işletmesi restoran."
                    className="mt-1 h-24 bg-slate-700 border-slate-600 text-white" 
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Restoran Logosu</Label>
                  <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-300">Logo yüklemek için tıklayın</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG 2MB'a kadar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-slate-300">Adres</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="address" 
                      defaultValue="Atatürk Caddesi No:123, Merkez, İstanbul"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-300">Telefon Numarası</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      defaultValue="+90 (212) 123-4567"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">E-posta</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="email" 
                      type="email"
                      defaultValue="info@bellavista.com"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-slate-300">Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="website" 
                      defaultValue="https://bellavista.com"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity" className="text-slate-300">Oturma Kapasitesi</Label>
                    <Input id="capacity" type="number" defaultValue="80" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="tables" className="text-slate-300">Masa Sayısı</Label>
                    <Input id="tables" type="number" defaultValue="20" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Sosyal Medya Hesapları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="instagram" className="text-slate-300">Instagram</Label>
                  <div className="relative mt-1">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="instagram" 
                      placeholder="@bellavista"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="facebook" className="text-slate-300">Facebook</Label>
                  <div className="relative mt-1">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="facebook" 
                      placeholder="facebook.com/bellavista"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="twitter" className="text-slate-300">Twitter</Label>
                  <div className="relative mt-1">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="twitter" 
                      placeholder="@bellavista"
                      className="pl-10 bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-24">
                      <Label className="font-medium text-white">{day.label}</Label>
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
                      <Label className="text-sm text-slate-300">Açık</Label>
                    </div>

                    {!businessHours[day.key].closed && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm text-slate-300">Açılış:</Label>
                          <Input
                            type="time"
                            value={businessHours[day.key].open}
                            onChange={(e) => 
                              setBusinessHours(prev => ({
                                ...prev,
                                [day.key]: { ...prev[day.key], open: e.target.value }
                              }))
                            }
                            className="w-24 bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm text-slate-300">Kapanış:</Label>
                          <Input
                            type="time"
                            value={businessHours[day.key].close}
                            onChange={(e) => 
                              setBusinessHours(prev => ({
                                ...prev,
                                [day.key]: { ...prev[day.key], close: e.target.value }
                              }))
                            }
                            className="w-24 bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </>
                    )}

                    {businessHours[day.key].closed && (
                      <div className="text-sm text-slate-500 italic">Kapalı</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Bildirim Tercihleri</CardTitle>
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
                  <div key={item.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.label}</div>
                      <div className="text-sm text-slate-400 mt-1">{item.description}</div>
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
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Hesap Güvenliği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-slate-300">Mevcut Şifre</Label>
                  <Input id="currentPassword" type="password" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                
                <div>
                  <Label htmlFor="newPassword" className="text-slate-300">Yeni Şifre</Label>
                  <Input id="newPassword" type="password" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">Yeni Şifre Tekrar</Label>
                  <Input id="confirmPassword" type="password" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Şifreyi Güncelle
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Güvenlik Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">İki Faktörlü Kimlik Doğrulama</div>
                    <div className="text-sm text-slate-400">Ekstra güvenlik katmanı ekle</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Giriş Bildirimleri</div>
                    <div className="text-sm text-slate-400">Yeni girişler hakkında bildirim al</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Oturum Zaman Aşımı</div>
                    <div className="text-sm text-slate-400">Hareketsizlik sonrası otomatik çıkış</div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="15">15 dk</SelectItem>
                      <SelectItem value="30">30 dk</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="120">2 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <h4 className="font-medium text-white mb-2">Son Aktiviteler</h4>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div>Son giriş: Bugün 09:30</div>
                    <div>Şifre değiştirildi: 2 hafta önce</div>
                    <div>Hesap oluşturuldu: 15 Mart 2020</div>
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