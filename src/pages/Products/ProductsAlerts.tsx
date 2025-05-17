import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, Clock, Truck, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppLayout } from '@/components/AppLayout';

// Sample alerts data
const initialAlerts = [
  { 
    id: 1,
    productName: 'Fanta Citron', 
    sku: 'RW-BEV-002',
    category: 'Beverages',
    currentStock: 19,
    minimumStock: 50,
    alertType: 'Low Stock',
    severity: 'Medium',
    location: 'Kigali Warehouse',
    dateDetected: '2025-05-10',
    status: 'Pending',
    action: 'Order Needed'
  },
  { 
    id: 2,
    productName: 'Umukate (Bread)', 
    sku: 'RW-BKR-005',
    category: 'Groceries',
    currentStock: 0,
    minimumStock: 30,
    alertType: 'Out of Stock',
    severity: 'High',
    location: 'Kigali Store',
    dateDetected: '2025-05-09',
    status: 'In Progress',
    action: 'Order Placed'
  },
  { 
    id: 3,
    productName: 'Ishati (Shirt)', 
    sku: 'RW-APP-006',
    category: 'Clothing',
    currentStock: 50,
    minimumStock: 20,
    alertType: 'Expiring Soon',
    severity: 'Low',
    location: 'Kigali Store',
    dateDetected: '2025-05-11',
    status: 'Pending',
    action: 'Review Needed'
  },
  { 
    id: 4,
    productName: 'Ikawa (Coffee)', 
    sku: 'RW-COF-001',
    category: 'Groceries',
    currentStock: 1199,
    minimumStock: 200,
    alertType: 'Overstocked',
    severity: 'Low',
    location: 'Kigali Warehouse',
    dateDetected: '2025-05-12',
    status: 'Pending',
    action: 'Promotion Suggested'
  },
  { 
    id: 5,
    productName: 'Agatambaro (Fabric)', 
    sku: 'RW-FAB-003',
    category: 'Clothing',
    currentStock: 52,
    minimumStock: 20,
    alertType: 'Approaching Min',
    severity: 'Low',
    location: 'Muhanga Store',
    dateDetected: '2025-05-13',
    status: 'Monitored',
    action: 'No Action Required'
  },
];

// Sample stock projection data
const stockProjections = [
  { 
    id: 1, 
    productName: 'Fanta Citron', 
    sku: 'RW-BEV-002', 
    currentStock: 19, 
    dailyUsage: 3.5, 
    daysRemaining: 5, 
    projectedOutOfStock: '2025-05-17', 
    suggestedOrder: 100,
    orderStatus: 'None'
  },
  { 
    id: 2, 
    productName: 'Agatambaro (Fabric)', 
    sku: 'RW-FAB-003', 
    currentStock: 52, 
    dailyUsage: 2.1, 
    daysRemaining: 25, 
    projectedOutOfStock: '2025-06-06', 
    suggestedOrder: 50,
    orderStatus: 'None'
  },
  { 
    id: 3, 
    productName: 'Umukate (Bread)', 
    sku: 'RW-BKR-005', 
    currentStock: 0, 
    dailyUsage: 10, 
    daysRemaining: 0, 
    projectedOutOfStock: '2025-05-09', 
    suggestedOrder: 100,
    orderStatus: 'Ordered'
  },
];

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProductsAlerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter alerts based on search term and status
  const filteredAlerts = alerts.filter(
    alert => 
      (alert.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.alertType.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === 'all' || alert.status === selectedStatus)
  );

  // Alert severity badge styles
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive">{severity}</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{severity}</Badge>;
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  // Alert type badge styles
  const getAlertTypeBadge = (type: string) => {
    switch (type) {
      case 'Low Stock':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{type}</Badge>;
      case 'Out of Stock':
        return <Badge variant="destructive">{type}</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{type}</Badge>;
      case 'Overstocked':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{type}</Badge>;
      case 'Approaching Min':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Alert status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline">{status}</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Monitored':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Stock level indicator
  const getStockLevelIndicator = (current: number, minimum: number) => {
    const ratio = minimum > 0 ? current / minimum : 1;
    let color = "bg-green-500";
    
    if (ratio === 0) {
      color = "bg-red-500";
    } else if (ratio < 1) {
      color = "bg-amber-500";
    } else if (ratio > 3) {
      color = "bg-blue-500";
    }
    
    return (
      <div className="flex items-center gap-2 w-full">
        <Progress 
          value={Math.min(ratio * 100, 100)} 
          className={`h-2 ${color}`} 
        />
        <span className="text-xs whitespace-nowrap">{current} / {minimum}</span>
      </div>
    );
  };

  // Calculate alert statistics
  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'High').length;
  const pendingAlerts = alerts.filter(alert => alert.status === 'Pending').length;
  const resolvedAlerts = alerts.filter(alert => alert.status === 'Resolved').length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <p className="text-muted-foreground">Monitor stock levels and product alerts</p>
        </div>
        <div className="flex gap-2">
          <Button>Generate Restock Plan</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Urgent action needed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting action
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Issues addressed
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">Current Alerts</TabsTrigger>
          <TabsTrigger value="projections">Stock Projections</TabsTrigger>
          <TabsTrigger value="orders">Reorder Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Active Stock Alerts</CardTitle>
              <CardDescription>View and manage inventory alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search alerts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select 
                    value={selectedStatus} 
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Monitored">Monitored</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date Detected</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <TableRow key={alert.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{alert.productName}</span>
                              <span className="text-xs text-muted-foreground">{alert.sku}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getAlertTypeBadge(alert.alertType)}</TableCell>
                          <TableCell className="min-w-[150px]">
                            {getStockLevelIndicator(alert.currentStock, alert.minimumStock)}
                          </TableCell>
                          <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                          <TableCell>{alert.location}</TableCell>
                          <TableCell>{alert.dateDetected}</TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              {alert.action}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No alerts found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Stock Projections</CardTitle>
              <CardDescription>Forecast when products will reach critical levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Daily Usage</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead>Stock Timeline</TableHead>
                    <TableHead>Out of Stock Date</TableHead>
                    <TableHead>Suggested Order</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockProjections.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-xs text-muted-foreground">{item.sku}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell>{item.dailyUsage}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            item.daysRemaining <= 0 ? "bg-red-100 text-red-800 hover:bg-red-100" :
                            item.daysRemaining < 7 ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                            "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {item.daysRemaining <= 0 ? 'Out of Stock' : `${item.daysRemaining} days`}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[150px]">
                        <Progress 
                          value={Math.min(item.daysRemaining * 3.33, 100)} 
                          className={
                            item.daysRemaining <= 0 ? "h-2 bg-red-500" :
                            item.daysRemaining < 7 ? "h-2 bg-amber-500" :
                            item.daysRemaining < 14 ? "h-2 bg-lime-500" :
                            "h-2 bg-green-500"
                          } 
                        />
                      </TableCell>
                      <TableCell>
                        {item.daysRemaining <= 0 ? 
                          <Badge variant="destructive">Already Out</Badge> : 
                          item.projectedOutOfStock
                        }
                      </TableCell>
                      <TableCell>{item.suggestedOrder}</TableCell>
                      <TableCell>
                        {item.orderStatus === 'None' ? (
                          <Button size="sm">Order Now</Button>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {item.orderStatus}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Reorder Recommendations</CardTitle>
              <CardDescription>Suggested purchases based on stock levels and demand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                <Truck className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">Auto-generated Purchase Orders</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[500px]">
                  The system will provide intelligent reorder recommendations based on
                  historical sales data, current inventory levels, and lead times.
                </p>
                <Button>Create Purchase Orders</Button>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Manual Restock Items</h3>
                <Table>
                  <TableCaption>Products that need to be restocked soon</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Minimum Level</TableHead>
                      <TableHead>Recommended Order</TableHead>
                      <TableHead>Estimated Cost</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Lead Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">Fanta Citron</span>
                          <span className="text-xs text-muted-foreground">RW-BEV-002</span>
                        </div>
                      </TableCell>
                      <TableCell>19</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>{formatRwf(50000)}</TableCell>
                      <TableCell>BRALIRWA</TableCell>
                      <TableCell>3 days</TableCell>
                      <TableCell>
                        <Button size="sm">Order Now</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">Umukate (Bread)</span>
                          <span className="text-xs text-muted-foreground">RW-BKR-005</span>
                        </div>
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>{formatRwf(60000)}</TableCell>
                      <TableCell>Kigali Bakery</TableCell>
                      <TableCell>1 day</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          Ordered
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsAlerts;