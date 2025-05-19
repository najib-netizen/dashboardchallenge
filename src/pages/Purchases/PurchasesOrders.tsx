
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, ArrowUpDown, Download, Filter, Clock, CheckCircle, Truck, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Type definition for order items
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// Type definition for purchase order
interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  deliveryDate: string;
  amount: number;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  paymentStatus: 'Paid' | 'Not Paid' | 'Partially Paid';
  paymentMethod: string;
  createdBy: string;
}

// Type definition for draft orders
interface DraftOrder {
  id: string;
  supplier: string;
  date: string;
  amount: number;
  items: OrderItem[];
  createdBy: string;
}

// Sample purchase order data
const initialPurchaseOrders: PurchaseOrder[] = [
  { 
    id: 'PO-001', 
    supplier: 'BRALIRWA',
    date: '2025-05-10', 
    deliveryDate: '2025-05-17',
    amount: 250000, 
    status: 'Pending',
    items: [
      { name: 'Fanta Citron', quantity: 500, price: 500, subtotal: 250000 }
    ],
    paymentStatus: 'Not Paid',
    paymentMethod: 'Bank Transfer',
    createdBy: 'Uwamahoro Jean'
  },
  { 
    id: 'PO-002', 
    supplier: 'Kigali Textiles',
    date: '2025-05-08', 
    deliveryDate: '2025-05-15',
    amount: 300000, 
    status: 'Delivered',
    items: [
      { name: 'Agatambaro (Fabric)', quantity: 60, price: 5000, subtotal: 300000 }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'Mobile Money',
    createdBy: 'Kamaliza Alice'
  },
  { 
    id: 'PO-003', 
    supplier: 'Muhanga Furniture',
    date: '2025-05-05', 
    deliveryDate: '2025-05-20',
    amount: 450000, 
    status: 'In Transit',
    items: [
      { name: 'Intebe (Chair)', quantity: 30, price: 15000, subtotal: 450000 }
    ],
    paymentStatus: 'Partially Paid',
    paymentMethod: 'Credit (Net 30)',
    createdBy: 'Niyonzima Robert'
  },
  { 
    id: 'PO-004', 
    supplier: 'Rwanda Coffee Cooperative',
    date: '2025-05-12', 
    deliveryDate: '2025-05-19',
    amount: 180000, 
    status: 'Pending',
    items: [
      { name: 'Ikawa (Coffee)', quantity: 90, price: 2000, subtotal: 180000 }
    ],
    paymentStatus: 'Not Paid',
    paymentMethod: 'Check',
    createdBy: 'Mukamana Emily'
  },
  { 
    id: 'PO-005', 
    supplier: 'Kigali Bakery',
    date: '2025-05-13', 
    deliveryDate: '2025-05-14',
    amount: 120000, 
    status: 'Delivered',
    items: [
      { name: 'Umukate (Bread)', quantity: 100, price: 1200, subtotal: 120000 }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'Mobile Money',
    createdBy: 'Kabera Michael'
  },
];

// Sample draft orders
const draftOrders: DraftOrder[] = [
  { 
    id: 'DRF-001', 
    supplier: 'BRALIRWA',
    date: '2025-05-14', 
    amount: 100000, 
    items: [
      { name: 'Fanta Citron', quantity: 200, price: 500, subtotal: 100000 }
    ],
    createdBy: 'Uwamahoro Jean'
  },
  { 
    id: 'DRF-002', 
    supplier: 'Rwanda Coffee Cooperative',
    date: '2025-05-13', 
    amount: 80000, 
    items: [
      { name: 'Ikawa (Coffee)', quantity: 40, price: 2000, subtotal: 80000 }
    ],
    createdBy: 'Kamaliza Alice'
  },
];

const PurchasesOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [newStatusValue, setNewStatusValue] = useState<string>('');
  
  // Get upcoming deliveries for calendar display
  const upcomingDeliveries = purchaseOrders.map(order => ({
    id: order.id,
    supplier: order.supplier,
    date: new Date(order.deliveryDate),
    status: order.status
  }));
  
  // Filter purchase orders based on search term and status
  const filteredOrders = purchaseOrders.filter(
    order => 
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === 'all' || order.status === selectedStatus)
  );
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge variant="success">{status}</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">{status}</Badge>;
      case 'Pending':
        return <Badge variant="warning">{status}</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Payment status badge styles
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success">{status}</Badge>;
      case 'Not Paid':
        return <Badge variant="outline">{status}</Badge>;
      case 'Partially Paid':
        return <Badge variant="warning">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Calculate purchase order statistics
  const totalOrders = purchaseOrders.length;
  const pendingOrders = purchaseOrders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = purchaseOrders.filter(o => o.status === 'Delivered').length;
  const totalSpent = purchaseOrders
    .filter(o => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.amount, 0);
  
  // Handle status update
  const handleStatusUpdate = () => {
    if (!selectedOrder || !newStatusValue || newStatusValue === selectedOrder.status) return;
    
    const updatedOrders = purchaseOrders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatusValue as PurchaseOrder['status'] } 
        : order
    );
    
    setPurchaseOrders(updatedOrders);
    setSelectedOrder({...selectedOrder, status: newStatusValue as PurchaseOrder['status']});
    setNewStatusValue('');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Manage orders from your suppliers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Create Draft
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRwf(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              On delivered orders
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="drafts">Draft Orders</TabsTrigger>
          <TabsTrigger value="calendar">Delivery Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Management</CardTitle>
              <CardDescription>Track and manage orders from suppliers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
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
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          PO #
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Supplier
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Amount
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <TableRow 
                          key={order.id} 
                          className={`hover:bg-muted/50 ${selectedOrder?.id === order.id ? 'bg-muted/30' : ''}`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.deliveryDate}</TableCell>
                          <TableCell>{formatRwf(order.amount)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No orders found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {selectedOrder && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Purchase Order Details: {selectedOrder.id}</CardTitle>
                    <CardDescription>Order from {selectedOrder.supplier}</CardDescription>
                  </div>
                  <div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Order Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Date:</span>
                        <span>{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Date:</span>
                        <span>{selectedOrder.deliveryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created By:</span>
                        <span>{selectedOrder.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Status:</span>
                        <span>{getPaymentStatusBadge(selectedOrder.paymentStatus)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span>{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="font-semibold">{formatRwf(selectedOrder.amount)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Delivery Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Status:</span>
                        <span>{selectedOrder.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Arrival:</span>
                        <span>{selectedOrder.deliveryDate}</span>
                      </div>
                      {selectedOrder.status === 'In Transit' && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Track Shipment
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Order Items</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatRwf(item.price)}</TableCell>
                            <TableCell>{formatRwf(item.subtotal)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">Total:</TableCell>
                          <TableCell className="font-bold">{formatRwf(selectedOrder.amount)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {selectedOrder.status === 'Pending' && (
                  <Button variant="outline" className="flex gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cancel Order
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex gap-1">
                      <Truck className="h-4 w-4" />
                      {selectedOrder.status === 'Delivered' ? 'View Receipt' : 'Update Status'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {selectedOrder.status === 'Delivered' ? 'Delivery Receipt' : 'Update Order Status'}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedOrder.status === 'Delivered' 
                          ? 'View the delivery confirmation receipt for this order.' 
                          : 'Update the current status of this purchase order.'}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedOrder.status === 'Delivered' ? (
                      <div className="space-y-4">
                        <div className="p-6 border rounded-lg">
                          <div className="text-center mb-4">
                            <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
                            <h3 className="text-xl font-semibold mt-2">Delivery Confirmed</h3>
                            <p className="text-muted-foreground">All items have been received</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Delivery Date:</span>
                              <span>{selectedOrder.deliveryDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Received By:</span>
                              <span>Kamaliza Alice</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Receipt Number:</span>
                              <span>RCP-{selectedOrder.id.split('-')[1]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline">Print Receipt</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label>Update Status</label>
                          <Select 
                            defaultValue={selectedOrder.status}
                            onValueChange={setNewStatusValue}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select new status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label>Notes</label>
                          <textarea 
                            className="w-full min-h-[100px] p-2 border rounded-md resize-none" 
                            placeholder="Add any notes about this status update"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleStatusUpdate}>Save Status</Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Purchase Orders</CardTitle>
              <CardDescription>Incomplete purchase orders that haven't been sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Draft ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {draftOrders.map((draft) => (
                      <TableRow key={draft.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{draft.id}</TableCell>
                        <TableCell>{draft.supplier}</TableCell>
                        <TableCell>{draft.date}</TableCell>
                        <TableCell>{draft.items.length}</TableCell>
                        <TableCell>{formatRwf(draft.amount)}</TableCell>
                        <TableCell>{draft.createdBy}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button size="sm">Create Order</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {draftOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No draft orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Calendar</CardTitle>
              <CardDescription>View scheduled deliveries by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    classNames={{
                      day_today: "bg-muted text-foreground",
                      day_selected: "bg-primary text-primary-foreground",
                    }}
                    components={{
                      DayContent: (props) => {
                        // Check if there are any deliveries on this day
                        const formattedDate = format(props.date, 'yyyy-MM-dd');
                        const hasDelivery = upcomingDeliveries.some(
                          d => format(d.date, 'yyyy-MM-dd') === formattedDate
                        );
                        
                        return (
                          <div className="relative flex h-9 items-center justify-center">
                            {props.date.getDate()}
                            {hasDelivery && (
                              <div className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"></div>
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {date && format(date, 'MMMM d, yyyy')} Deliveries
                  </h3>
                  {date && (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>PO #</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingDeliveries
                            .filter(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                            .map((delivery) => (
                              <TableRow key={delivery.id}>
                                <TableCell className="font-medium">{delivery.id}</TableCell>
                                <TableCell>{delivery.supplier}</TableCell>
                                <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedOrder(purchaseOrders.find(o => o.id === delivery.id) || null)}
                                  >
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          {upcomingDeliveries.filter(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4">
                                No deliveries scheduled for this date
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchasesOrders;
