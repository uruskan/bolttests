'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingCart, 
  Clock, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Utensils,
  Phone,
  MapPin,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  customerName: string;
  customerPhone?: string;
  type: 'dine-in' | 'takeout' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  table?: string;
  address?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  createdAt: Date;
  estimatedTime: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  modifications?: string[];
}

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const orders: Order[] = [
    {
      id: 'ORD-1247',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 123-4567',
      type: 'dine-in',
      status: 'preparing',
      table: 'Table 8',
      items: [
        { id: '1', name: 'Pasta Carbonara', quantity: 1, price: 18.99 },
        { id: '2', name: 'House Wine (Red)', quantity: 1, price: 12.00 },
        { id: '3', name: 'Tiramisu', quantity: 1, price: 8.99 }
      ],
      subtotal: 39.98,
      tax: 3.20,
      total: 43.18,
      notes: 'Extra parmesan on pasta',
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
      estimatedTime: '25 min'
    },
    {
      id: 'ORD-1246',
      customerName: 'Mike Chen',
      customerPhone: '+1 (555) 987-6543',
      type: 'takeout',
      status: 'ready',
      items: [
        { id: '4', name: 'Margherita Pizza', quantity: 2, price: 16.99 },
        { id: '5', name: 'Caesar Salad', quantity: 1, price: 12.99 }
      ],
      subtotal: 46.97,
      tax: 3.76,
      total: 50.73,
      createdAt: new Date(Date.now() - 35 * 60 * 1000),
      estimatedTime: 'Ready'
    },
    {
      id: 'ORD-1245',
      customerName: 'Emily Rodriguez',
      customerPhone: '+1 (555) 456-7890',
      type: 'delivery',
      status: 'preparing',
      address: '123 Oak Street, Downtown',
      items: [
        { id: '6', name: 'Chicken Parmesan', quantity: 1, price: 22.99 },
        { id: '7', name: 'Garlic Bread', quantity: 1, price: 6.99 },
        { id: '8', name: 'Soda', quantity: 2, price: 3.50 }
      ],
      subtotal: 36.98,
      tax: 2.96,
      total: 39.94,
      notes: 'Ring doorbell, apartment 2B',
      createdAt: new Date(Date.now() - 45 * 60 * 1000),
      estimatedTime: '45 min'
    },
    {
      id: 'ORD-1244',
      customerName: 'David Wilson',
      type: 'dine-in',
      status: 'served',
      table: 'Table 12',
      items: [
        { id: '9', name: 'Seafood Risotto', quantity: 1, price: 24.99 },
        { id: '10', name: 'White Wine', quantity: 1, price: 14.00 }
      ],
      subtotal: 38.99,
      tax: 3.12,
      total: 42.11,
      createdAt: new Date(Date.now() - 75 * 60 * 1000),
      estimatedTime: 'Served'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'served': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'preparing': return Clock;
      case 'ready': return CheckCircle;
      case 'served': return Utensils;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dine-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'takeout': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivery': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dine-in': return Utensils;
      case 'takeout': return ShoppingCart;
      case 'delivery': return MapPin;
      default: return ShoppingCart;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTimeSince = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const statusStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    served: orders.filter(o => o.status === 'served').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage customer orders in real-time</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-800">{statusStats.pending}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Preparing</p>
                <p className="text-2xl font-bold text-blue-800">{statusStats.preparing}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Ready</p>
                <p className="text-2xl font-bold text-green-800">{statusStats.ready}</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Served</p>
                <p className="text-2xl font-bold text-purple-800">{statusStats.served}</p>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-4 h-4 text-white" />
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
                placeholder="Search orders by ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-rose-200 focus:border-rose-400"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="served">Served</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dine-in">Dine-in</SelectItem>
                  <SelectItem value="takeout">Takeout</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          const TypeIcon = getTypeIcon(order.type);
          
          return (
            <Card key={order.id} className="bg-white/80 backdrop-blur-sm border-rose-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <Badge className={cn("text-xs border", getStatusColor(order.status))}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status}
                      </Badge>
                      <Badge className={cn("text-xs border", getTypeColor(order.type))}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {order.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {order.customerName}
                      </div>
                      {order.customerPhone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {order.customerPhone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{getTimeSince(order.createdAt)}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Location/Table Info */}
                  {order.table && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Utensils className="w-4 h-4 mr-2" />
                      {order.table}
                    </div>
                  )}
                  {order.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {order.address}
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <span className="text-gray-900">{item.quantity}x {item.name}</span>
                          {item.modifications && item.modifications.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.modifications.join(', ')}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> {order.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-gray-600">ETA: {order.estimatedTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {order.status === 'pending' && (
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          Start Preparing
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Mark Ready
                        </Button>
                      )}
                      {order.status === 'ready' && order.type === 'dine-in' && (
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                          Mark Served
                        </Button>
                      )}
                      {order.status === 'ready' && order.type !== 'dine-in' && (
                        <Button size="sm" className="bg-gray-500 hover:bg-gray-600 text-white">
                          Complete Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-rose-100">
          <CardContent className="py-12 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? "No orders match your current filters."
                : "No orders to display at the moment."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}