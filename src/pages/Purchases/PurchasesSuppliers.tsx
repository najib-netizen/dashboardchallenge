
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building2, MapPin, Phone, Mail, Star, MoreHorizontal, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

// Sample supplier data
const initialSuppliers = [
  { 
    id: 1, 
    name: 'BRALIRWA', 
    contactPerson: 'Emmanuel Habimana',
    email: 'info@bralirwa.co.rw',
    phone: '+250 788 123 456',
    address: 'KK 100 St, Kigali, Rwanda',
    categories: ['Beverages'],
    status: 'Active',
    rating: 4.8,
    totalOrders: 15,
    lastOrder: '2025-05-05',
    paymentTerms: 'Net 30',
    avatarUrl: ''
  },
  { 
    id: 2, 
    name: 'Kigali Textiles', 
    contactPerson: 'Alice Mugabo',
    email: 'sales@kigalitextiles.rw',
    phone: '+250 722 456 789',
    address: 'KN 5 Ave, Kigali, Rwanda',
    categories: ['Clothing', 'Fabric'],
    status: 'Active',
    rating: 4.5,
    totalOrders: 8,
    lastOrder: '2025-05-02',
    paymentTerms: 'Net 15',
    avatarUrl: ''
  },
  { 
    id: 3, 
    name: 'Muhanga Furniture', 
    contactPerson: 'Robert Niyonzima',
    email: 'info@muhangafurniture.rw',
    phone: '+250 788 789 123',
    address: 'MH 5 Rd, Muhanga, Rwanda',
    categories: ['Furniture'],
    status: 'Active',
    rating: 4.2,
    totalOrders: 5,
    lastOrder: '2025-04-28',
    paymentTerms: 'Net 30',
    avatarUrl: ''
  },
  { 
    id: 4, 
    name: 'Kigali Bakery', 
    contactPerson: 'Emily Mukamana',
    email: 'orders@kigalibakery.rw',
    phone: '+250 722 333 444',
    address: 'KK 15 Ave, Kigali, Rwanda',
    categories: ['Groceries', 'Food'],
    status: 'Inactive',
    rating: 3.9,
    totalOrders: 12,
    lastOrder: '2025-03-15',
    paymentTerms: 'Prepaid',
    avatarUrl: ''
  },
  { 
    id: 5, 
    name: 'Rwanda Coffee Cooperative', 
    contactPerson: 'Michael Kabera',
    email: 'info@rwandacoffee.rw',
    phone: '+250 788 222 111',
    address: 'KG 12 Ave, Huye, Rwanda',
    categories: ['Groceries', 'Coffee'],
    status: 'Active',
    rating: 5.0,
    totalOrders: 20,
    lastOrder: '2025-05-10',
    paymentTerms: 'Net 15',
    avatarUrl: ''
  },
];

// Sample supplier performance metrics
const performanceMetrics = [
  { name: 'On-Time Delivery', score: 92, color: 'bg-green-500' },
  { name: 'Quality Rating', score: 87, color: 'bg-green-500' },
  { name: 'Price Competitiveness', score: 75, color: 'bg-amber-500' },
  { name: 'Communication', score: 95, color: 'bg-green-500' },
  { name: 'Issue Resolution', score: 85, color: 'bg-green-500' },
];

const PurchasesSuppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<typeof initialSuppliers[0] | null>(null);
  
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Manage and track your supplier relationships</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Enter the details of the new supplier. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">Name</label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="contact" className="text-right">Contact Person</label>
                  <Input id="contact" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">Email</label>
                  <Input id="email" className="col-span-3" type="email" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">Phone</label>
                  <Input id="phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="address" className="text-right">Address</label>
                  <Input id="address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right">Categories</label>
                  <Input id="category" className="col-span-3" placeholder="Separate with commas" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Supplier</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              {suppliers.filter(s => s.status === 'Active').length} currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories Covered</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(suppliers.flatMap(s => s.categories)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Product categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Supplier</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((max, s) => s.rating > max.rating ? s : max, suppliers[0]).name}
            </div>
            <p className="text-xs text-muted-foreground">
              5.0/5.0 rating
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all suppliers
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Directory</CardTitle>
              <CardDescription>Manage your list of product suppliers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search suppliers..."
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
                      <TableHead>Supplier</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length > 0 ? (
                      filteredSuppliers.map((supplier) => (
                        <TableRow 
                          key={supplier.id} 
                          className={`hover:bg-muted/50 ${selectedSupplier?.id === supplier.id ? 'bg-muted/30' : ''}`}
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={supplier.avatarUrl} />
                                <AvatarFallback>{getInitials(supplier.name)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{supplier.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {supplier.contactPerson}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {supplier.categories.map((category, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{supplier.rating}</span>
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            </div>
                          </TableCell>
                          <TableCell>{supplier.totalOrders}</TableCell>
                          <TableCell>{supplier.lastOrder}</TableCell>
                          <TableCell>{getStatusBadge(supplier.status)}</TableCell>
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
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Truck className="h-4 w-4" />
                                  New Order
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                  </svg>
                                  View Orders
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No suppliers found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          {selectedSupplier ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedSupplier.name}</CardTitle>
                    <CardDescription>Supplier Details</CardDescription>
                  </div>
                  {getStatusBadge(selectedSupplier.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedSupplier.email}`} className="text-sm hover:underline">
                      {selectedSupplier.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{selectedSupplier.address}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Performance Metrics</h3>
                  {performanceMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span>{metric.score}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className={`h-full rounded-full ${metric.color}`} 
                          style={{ width: `${metric.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Terms:</span>
                    <span>{selectedSupplier.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Orders:</span>
                    <span>{selectedSupplier.totalOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Order:</span>
                    <span>{selectedSupplier.lastOrder}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit Details</Button>
                <Button>Place Order</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Building2 className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">Select a Supplier</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[250px]">
                  Click on any supplier from the list to view their details here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasesSuppliers;
