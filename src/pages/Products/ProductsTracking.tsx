import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, PackageCheck, Truck, Warehouse, Clock } from "lucide-react";
import { AppLayout } from '@/components/AppLayout';

// Sample product movement data
const initialMovements = [
  { 
    id: '1001', 
    productName: 'Ikawa (Coffee)',
    productSKU: 'RW-COF-001',
    type: 'Inbound', 
    quantity: 250,
    source: 'Supplier',
    destination: 'Kigali Warehouse',
    status: 'Completed', 
    date: '2025-05-10',
    handler: 'Uwamahoro Jean'
  },
  { 
    id: '1002', 
    productName: 'Fanta Citron',
    productSKU: 'RW-BEV-002',
    type: 'Transfer', 
    quantity: 50,
    source: 'Kigali Warehouse',
    destination: 'Muhanga Store',
    status: 'In Transit', 
    date: '2025-05-12',
    handler: 'Kamaliza Alice'
  },
  { 
    id: '1003', 
    productName: 'Agatambaro (Fabric)',
    productSKU: 'RW-FAB-003',
    type: 'Outbound', 
    quantity: 20,
    source: 'Muhanga Store',
    destination: 'Customer Order #5678',
    status: 'Completed', 
    date: '2025-05-13',
    handler: 'Niyonzima Robert'
  },
  { 
    id: '1004', 
    productName: 'Intebe (Chair)',
    productSKU: 'RW-FRN-004',
    type: 'Inbound', 
    quantity: 15,
    source: 'Supplier',
    destination: 'Muhanga Warehouse',
    status: 'Scheduled', 
    date: '2025-05-17',
    handler: 'Mukamana Emily'
  },
  { 
    id: '1005', 
    productName: 'Umukate (Bread)',
    productSKU: 'RW-BKR-005',
    type: 'Outbound', 
    quantity: 50,
    source: 'Kigali Store',
    destination: 'Customer Order #5679',
    status: 'Completed', 
    date: '2025-05-09',
    handler: 'Kabera Michael'
  },
  { 
    id: '1006', 
    productName: 'Ishati (Shirt)',
    productSKU: 'RW-APP-006',
    type: 'Transfer', 
    quantity: 25,
    source: 'Kigali Store',
    destination: 'Muhanga Store',
    status: 'Completed', 
    date: '2025-05-11',
    handler: 'Uwamahoro Jean'
  },
];

// Sample pending transfer data
const pendingTransfers = [
  {
    id: '2001',
    productName: 'Fanta Citron',
    productSKU: 'RW-BEV-002',
    quantity: 50,
    source: 'Kigali Warehouse',
    destination: 'Muhanga Store',
    requestDate: '2025-05-12',
    estimatedDelivery: '2025-05-15',
    status: 'In Transit'
  },
  {
    id: '2002',
    productName: 'Intebe (Chair)',
    productSKU: 'RW-FRN-004',
    quantity: 15,
    source: 'Supplier',
    destination: 'Muhanga Warehouse',
    requestDate: '2025-05-14',
    estimatedDelivery: '2025-05-17',
    status: 'Scheduled'
  }
];

// Sample locations
const locations = [
  { id: 1, name: 'Kigali Warehouse', type: 'Warehouse', address: 'KK 15 Ave, Kigali', manager: 'Uwamahoro Jean' },
  { id: 2, name: 'Kigali Store', type: 'Retail Store', address: 'KN 3 St, Kigali', manager: 'Kamaliza Alice' },
  { id: 3, name: 'Muhanga Warehouse', type: 'Warehouse', address: 'MH 5 Rd, Muhanga', manager: 'Niyonzima Robert' },
  { id: 4, name: 'Muhanga Store', type: 'Retail Store', address: 'MH 10 Ave, Muhanga', manager: 'Mukamana Emily' }
];

const ProductsTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movements, setMovements] = useState(initialMovements);
  
  // Filter movements based on search term
  const filteredMovements = movements.filter(
    movement => 
      movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.productSKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case 'Scheduled':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Movement type badge styles
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Inbound':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{type}</Badge>;
      case 'Outbound':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{type}</Badge>;
      case 'Transfer':
        return <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Product Tracking</h1>
          <p className="text-muted-foreground">Track product movements between locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Record Movement
          </Button>
          <Button>
            New Transfer
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movements</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movements.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Product transfer ongoing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              Active inventory locations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Pending movement
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="movements" className="w-full">
        <TabsList>
          <TabsTrigger value="movements">Product Movements</TabsTrigger>
          <TabsTrigger value="transfers">Pending Transfers</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Product Movement Log</CardTitle>
              <CardDescription>Track all inbound, outbound and transfer movements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search movements..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Movement Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="inTransit">In Transit</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Handler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.length > 0 ? (
                      filteredMovements.map((movement) => (
                        <TableRow key={movement.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{movement.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{movement.productName}</span>
                              <span className="text-xs text-muted-foreground">{movement.productSKU}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(movement.type)}</TableCell>
                          <TableCell>{movement.quantity}</TableCell>
                          <TableCell>{movement.source}</TableCell>
                          <TableCell>{movement.destination}</TableCell>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>{getStatusBadge(movement.status)}</TableCell>
                          <TableCell>{movement.handler}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-4">
                          No movements found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredMovements.length} of {movements.length} movements
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="transfers">
          <Card>
            <CardHeader>
              <CardTitle>Pending Transfers</CardTitle>
              <CardDescription>Product transfers in progress or scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTransfers.map((transfer) => (
                      <TableRow key={transfer.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{transfer.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{transfer.productName}</span>
                            <span className="text-xs text-muted-foreground">{transfer.productSKU}</span>
                          </div>
                        </TableCell>
                        <TableCell>{transfer.quantity}</TableCell>
                        <TableCell>{transfer.source}</TableCell>
                        <TableCell>{transfer.destination}</TableCell>
                        <TableCell>{transfer.requestDate}</TableCell>
                        <TableCell>{transfer.estimatedDelivery}</TableCell>
                        <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Details <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Locations</CardTitle>
              <CardDescription>All warehouses and retail stores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <Card key={location.id}>
                    <CardHeader>
                      <CardTitle className="text-base flex justify-between">
                        {location.name}
                        <Badge variant="outline">{location.type}</Badge>
                      </CardTitle>
                      <CardDescription>{location.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm"><span className="font-medium">Manager:</span> {location.manager}</p>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">View Inventory</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add New Location</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTracking;