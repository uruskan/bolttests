'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Users, 
  Search, 
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Clock,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'chef' | 'server' | 'host' | 'bartender';
  status: 'active' | 'inactive' | 'on-break';
  hiredDate: Date;
  hourlyRate: number;
  hoursThisWeek: number;
  rating: number;
  avatar?: string;
}

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Marco Rossi',
      email: 'marco@bellavista.com',
      phone: '+1 (555) 123-4567',
      role: 'manager',
      status: 'active',
      hiredDate: new Date('2020-03-15'),
      hourlyRate: 25.00,
      hoursThisWeek: 42,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Sofia Chen',
      email: 'sofia@bellavista.com',
      phone: '+1 (555) 234-5678',
      role: 'chef',
      status: 'active',
      hiredDate: new Date('2021-07-22'),
      hourlyRate: 22.00,
      hoursThisWeek: 38,
      rating: 4.9
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james@bellavista.com',
      phone: '+1 (555) 345-6789',
      role: 'server',
      status: 'on-break',
      hiredDate: new Date('2022-01-10'),
      hourlyRate: 15.00,
      hoursThisWeek: 28,
      rating: 4.6
    },
    {
      id: '4',
      name: 'Isabella Rodriguez',
      email: 'isabella@bellavista.com',
      phone: '+1 (555) 456-7890',
      role: 'server',
      status: 'active',
      hiredDate: new Date('2022-05-18'),
      hourlyRate: 15.00,
      hoursThisWeek: 35,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Thomas Anderson',
      email: 'thomas@bellavista.com',
      phone: '+1 (555) 567-8901',
      role: 'bartender',
      status: 'active',
      hiredDate: new Date('2021-11-05'),
      hourlyRate: 18.00,
      hoursThisWeek: 32,
      rating: 4.5
    },
    {
      id: '6',
      name: 'Emma Thompson',
      email: 'emma@bellavista.com',
      phone: '+1 (555) 678-9012',
      role: 'host',
      status: 'inactive',
      hiredDate: new Date('2023-02-14'),
      hourlyRate: 14.00,
      hoursThisWeek: 0,
      rating: 4.3
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'chef': return 'bg-red-100 text-red-800 border-red-200';
      case 'server': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bartender': return 'bg-green-100 text-green-800 border-green-200';
      case 'host': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return UserCheck;
      case 'on-break': return Clock;
      case 'inactive': return UserX;
      default: return Users;
    }
  };

  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getYearsOfService = (hiredDate: Date) => {
    const years = (new Date().getTime() - hiredDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  };

  const roleStats = {
    manager: staffMembers.filter(s => s.role === 'manager').length,
    chef: staffMembers.filter(s => s.role === 'chef').length,
    server: staffMembers.filter(s => s.role === 'server').length,
    bartender: staffMembers.filter(s => s.role === 'bartender').length,
    host: staffMembers.filter(s => s.role === 'host').length,
  };

  const activeStaff = staffMembers.filter(s => s.status === 'active').length;
  const totalHours = staffMembers.reduce((sum, s) => sum + s.hoursThisWeek, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant team and schedules</p>
        </div>
        <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="staffName">Full Name</Label>
                  <Input id="staffName" placeholder="e.g., John Smith" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="staffEmail">Email</Label>
                  <Input id="staffEmail" type="email" placeholder="john@bellavista.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="staffPhone">Phone</Label>
                  <Input id="staffPhone" placeholder="+1 (555) 123-4567" className="mt-1" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="staffRole">Role</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="chef">Chef</SelectItem>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="bartender">Bartender</SelectItem>
                      <SelectItem value="host">Host</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input id="hourlyRate" type="number" step="0.01" placeholder="15.00" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hiredDate">Hire Date</Label>
                  <Input id="hiredDate" type="date" className="mt-1" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingStaff(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl font-bold text-gray-900">{activeStaff}</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours This Week</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(staffMembers.reduce((sum, s) => sum + s.rating, 0) / staffMembers.length).toFixed(1)}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-rose-200 focus:border-rose-400"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="chef">Chef</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="bartender">Bartender</SelectItem>
                  <SelectItem value="host">Host</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-break">On Break</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => {
          const StatusIcon = getStatusIcon(member.status);
          
          return (
            <Card key={member.id} className="bg-white/80 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={cn("text-xs border", getRoleColor(member.role))}>
                          {member.role}
                        </Badge>
                        <Badge className={cn("text-xs border", getStatusColor(member.status))}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 mb-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{member.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {getYearsOfService(member.hiredDate)} years of service
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{member.hoursThisWeek}h</div>
                      <div className="text-xs text-gray-500">This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">${member.hourlyRate}/hr</div>
                      <div className="text-xs text-gray-500">Hourly Rate</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 flex-1">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 flex-1 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                    >
                      View Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? "No staff members match your current filters."
                : "Add your first staff member to get started."}
            </p>
            <Button 
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
              onClick={() => setIsAddingStaff(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}