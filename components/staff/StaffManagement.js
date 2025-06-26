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

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const staffMembers = [
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

  const getRoleColor = (role) => {
    switch (role) {
      case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      case 'chef': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'server': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'bartender': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'host': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'on-break': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status) => {
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

  const getYearsOfService = (hiredDate) => {
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
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage your restaurant team and schedules</p>
        </div>
        <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 mt-4 sm:mt-0">
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
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold text-foreground">{staffMembers.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-foreground">{activeStaff}</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours This Week</p>
                <p className="text-2xl font-bold text-foreground">{totalHours}</p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">
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
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-primary"
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
            <Card key={member.id} className="bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
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
                      <span className="text-sm font-medium text-foreground">{member.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {getYearsOfService(member.hiredDate)} years of service
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{member.hoursThisWeek}h</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">${member.hourlyRate}/hr</div>
                      <div className="text-xs text-muted-foreground">Hourly Rate</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 flex-1">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 flex-1 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
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
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-sm">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No staff members found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? "No staff members match your current filters."
                : "Add your first staff member to get started."}
            </p>
            <Button 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
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