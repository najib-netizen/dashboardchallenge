
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  UserPlus, 
  Users, 
  ShoppingCart, 
  PhoneCall, 
  Mail, 
  Edit, 
  MoreHorizontal, 
  UserCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from '@/components/AppLayout';

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sample customer data
const initialCustomers = [
  { 
    id: 1, 
    name: 'Uwamahoro Jean',
    email: 'jean@example.com',
    phone: '+250 789 123 456',
    address: 'KK 15 Ave, Kigali',
    totalSpent: 85000,
    totalOrders: 5,
    status: 'Active',
    lastPurchase: '2025-05-14',
    dateJoined: '2024-12-10',
    avatarUrl: '', // Empty for avatarFallback
    loyaltyPoints: 250
  },
  { 
    id: 2, 
    name: 'Kamaliza Alice',
    email: 'alice@example.com',
    phone: '+250 728 456 789',
    address: 'KN 3 St, Kigali',
    totalSpent: 42500,
    totalOrders: 3,
    status: 'Active',
    lastPurchase: '2025-05-13',
    dateJoined: '2025-01-05',
    avatarUrl: '',
    loyaltyPoints: 120
  },
  { 
    id: 3, 
    name: 'Niyonzima Robert',
    email: 'robert@example.com',
    phone: '+250 788 789 123',
    address: 'MH 5 Rd, Muhanga',
    totalSpent: 25000,
    totalOrders: 2,
    status: 'Inactive',
    lastPurchase: '2025-03-20',
    dateJoined: '2025-01-15',
    avatarUrl: '',
    loyaltyPoints: 50
  },
  { 
    id: 4, 
    name: 'Mukamana Emily',
    email: 'emily@example.com',
    phone: '+250 722 333 444',
    address: 'MH 10 Ave, Muhanga',
    totalSpent: 110000,
    totalOrders: 6,
    status: 'Active',
    lastPurchase: '2025-05-12',
    dateJoined: '2024-10-08',
    avatarUrl: '',
    loyaltyPoints: 350
  },
  { 
    id: 5, 
    name: 'Kabera Michael',
    email: 'michael@example.com',
    phone: '+250 738 222 111',
    address: 'KK 22 St, Kigali',
    totalSpent: 7450,
    totalOrders: 1,
    status: 'New',
    lastPurchase: '2025-05-11',
    dateJoined: '2025-05-11',
    avatarUrl: '',
    loyaltyPoints: 10
  },
];

// Customer loyalty tiers
const loyaltyTiers = [
  { name: 'Bronze', minPoints: 0, maxPoints: 100, benefits: ['5% discount on select items'] },
  { name: 'Silver', minPoints: 101, maxPoints: 300, benefits: ['10% discount on select items', 'Free delivery on orders over 5,000 RWF'] },
  { name: 'Gold', minPoints: 301, maxPoints: 999, benefits: ['15% discount on select items', 'Free delivery on all orders', 'Early access to promotions'] },
];

// Customer group segments
const customerSegments = [
  { id: 1, name: 'High-Value Customers', count: 2, criteria: 'Total spent > 50,000 RWF' },
  { id: 2, name: 'New Customers (Last 30 days)', count: 1, criteria: 'Joined within the last 30 days' },
  { id: 3, name: 'Repeat Customers', count: 3, criteria: 'More than 1 purchase' },
  { id: 4, name: 'At-Risk Customers', count: 1, criteria: 'No purchase in 45+ days' },
];

const SalesCustomers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get customer loyalty tier
  const getCustomerTier = (loyaltyPoints: number) => {
    if (loyaltyPoints >= 301) return 'Gold';
    if (loyaltyPoints >= 101) return 'Silver';
    return 'Bronze';
  };
  
  // Get customer tier badge
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{tier}</Badge>;
      case 'Silver':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{tier}</Badge>;
      case 'Bronze':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{tier}</Badge>;
      default:
        return <Badge variant="outline">{tier}</Badge>;
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Inactive':
        return <Badge variant="secondary">{status}</Badge>;
      case 'New':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Calculate customer statistics
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgSpentPerCustomer = totalRevenue / totalCustomers;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {activeCustomers} currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRwf(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From all customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spending</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRwf(avgSpentPerCustomer)}</div>
            <p className="text-xs text-muted-foreground">
              Per customer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage your customer base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Loyalty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={customer.avatarUrl} />
                                <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{customer.name}</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {customer.address}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col text-sm">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span>{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <PhoneCall className="h-3 w-3 text-muted-foreground" />
                                <span>{customer.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{formatRwf(customer.totalSpent)}</div>
                            <div className="text-xs text-muted-foreground">
                              Last: {customer.lastPurchase}
                            </div>
                          </TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTierBadge(getCustomerTier(customer.loyaltyPoints))}
                              <span className="text-sm">{customer.loyaltyPoints} pts</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(customer.status)}</TableCell>
                          <TableCell>{customer.dateJoined}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4" /> View Orders
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" /> Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" /> Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg> 
                                  {customer.status === 'Active' ? 'Mark as Inactive' : 'Mark as Active'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No customers found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Group customers based on behavior and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customerSegments.map((segment) => (
                  <Card key={segment.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{segment.name}</CardTitle>
                      <CardDescription>{segment.criteria}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">{segment.count}</span>
                          <span className="text-sm text-muted-foreground ml-2">customers</span>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  Create New Segment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program</CardTitle>
              <CardDescription>Manage your customer loyalty tiers and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Loyalty tiers */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Loyalty Tiers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {loyaltyTiers.map((tier, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{tier.name}</CardTitle>
                            {getTierBadge(tier.name)}
                          </div>
                          <CardDescription>{tier.minPoints} - {tier.maxPoints} points</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1">
                            {tier.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Customers by tier */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Customers by Tier</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Bronze ({customers.filter(c => c.loyaltyPoints <= 100).length} customers)</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Silver ({customers.filter(c => c.loyaltyPoints > 100 && c.loyaltyPoints <= 300).length} customers)</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Gold ({customers.filter(c => c.loyaltyPoints > 300).length} customers)</span>
                            <span>20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Point actions */}
                <div className="flex justify-between pt-4">
                  <Button variant="outline">View Point History</Button>
                  <Button>Manage Rewards</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesCustomers;
