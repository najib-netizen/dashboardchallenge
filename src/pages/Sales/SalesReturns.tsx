
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  RotateCcw, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Sample return data
const initialReturns = [
  { 
    id: 'RET-001', 
    orderId: 'ORD-125',
    customer: 'Uwamahoro Jean',
    customerEmail: 'jean@example.com',
    date: '2025-05-10', 
    amount: 5000, 
    status: 'Approved',
    reason: 'Damaged on arrival',
    items: [
      { name: 'Fanta Citron', quantity: 10, price: 500, subtotal: 5000 }
    ],
    refunded: true,
    processedBy: 'Kamaliza Alice'
  },
  { 
    id: 'RET-002', 
    orderId: 'ORD-130',
    customer: 'Mukamana Emily',
    customerEmail: 'emily@example.com',
    date: '2025-05-11', 
    amount: 15000, 
    status: 'Pending',
    reason: 'Wrong item received',
    items: [
      { name: 'Intebe (Chair)', quantity: 1, price: 15000, subtotal: 15000 }
    ],
    refunded: false,
    processedBy: 'Pending Review'
  },
  { 
    id: 'RET-003', 
    orderId: 'ORD-122',
    customer: 'Niyonzima Robert',
    customerEmail: 'robert@example.com',
    date: '2025-05-08', 
    amount: 6000, 
    status: 'Rejected',
    reason: 'Past return window',
    items: [
      { name: 'Ishati (Shirt)', quantity: 1, price: 6000, subtotal: 6000 }
    ],
    refunded: false,
    processedBy: 'Kamaliza Alice'
  },
  { 
    id: 'RET-004', 
    orderId: 'ORD-135',
    customer: 'Kabera Michael',
    customerEmail: 'michael@example.com',
    date: '2025-05-13', 
    amount: 2400, 
    status: 'Pending',
    reason: 'Changed mind',
    items: [
      { name: 'Umukate (Bread)', quantity: 2, price: 1200, subtotal: 2400 }
    ],
    refunded: false,
    processedBy: 'Pending Review'
  },
];

// Sample return policy sections
const returnPolicySections = [
  {
    title: 'Return Window',
    content: 'Items may be returned within 14 days of purchase with a valid receipt.'
  },
  {
    title: 'Condition Requirements',
    content: 'Products must be in original packaging and unused condition unless defective.'
  },
  {
    title: 'Refund Methods',
    content: 'Refunds will be processed in the original payment method used for purchase.'
  },
  {
    title: 'Non-Returnable Items',
    content: 'Food items, perishable goods, and custom orders are not eligible for return.'
  },
];

const SalesReturns = () => {
  const [returns, setReturns] = useState(initialReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedReturn, setSelectedReturn] = useState<typeof initialReturns[0] | null>(null);
  
  // Filter returns based on search term and status
  const filteredReturns = returns.filter(
    returnItem => 
      (returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === 'all' || returnItem.status === selectedStatus)
  );
  
  // Calculate return statistics
  const totalReturns = returns.length;
  const pendingReturns = returns.filter(r => r.status === 'Pending').length;
  const approvedReturns = returns.filter(r => r.status === 'Approved').length;
  const rejectedReturns = returns.filter(r => r.status === 'Rejected').length;
  const totalRefundAmount = returns
    .filter(r => r.refunded)
    .reduce((sum, r) => sum + r.amount, 0);
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">{status}</Badge>;
      case 'Pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Returns & Refunds</h1>
          <p className="text-muted-foreground">Manage customer returns and process refunds</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <RotateCcw className="mr-2 h-4 w-4" />
            New Return
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReturns}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReturns}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Amount</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRwf(totalRefundAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Total refunded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
            <p className="text-xs text-muted-foreground">
              Of total orders
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="returns" className="w-full">
        <TabsList>
          <TabsTrigger value="returns">Return Requests</TabsTrigger>
          <TabsTrigger value="policy">Return Policy</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="returns">
          <Card>
            <CardHeader>
              <CardTitle>Return Management</CardTitle>
              <CardDescription>Process and manage customer return requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search returns..."
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
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReturns.length > 0 ? (
                      filteredReturns.map((returnItem) => (
                        <TableRow 
                          key={returnItem.id} 
                          className={`hover:bg-muted/50 ${selectedReturn?.id === returnItem.id ? 'bg-muted/30' : ''}`}
                          onClick={() => setSelectedReturn(returnItem)}
                        >
                          <TableCell className="font-medium">{returnItem.id}</TableCell>
                          <TableCell>{returnItem.orderId}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{returnItem.customer}</span>
                              <span className="text-xs text-muted-foreground">{returnItem.customerEmail}</span>
                            </div>
                          </TableCell>
                          <TableCell>{returnItem.date}</TableCell>
                          <TableCell>{formatRwf(returnItem.amount)}</TableCell>
                          <TableCell className="max-w-[150px] truncate" title={returnItem.reason}>
                            {returnItem.reason}
                          </TableCell>
                          <TableCell>{getStatusBadge(returnItem.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Details</Button>
                              {returnItem.status === 'Pending' && (
                                <Button variant="ghost" size="sm" className="text-green-600">Process</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No returns found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {selectedReturn && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Return Details: {selectedReturn.id}</CardTitle>
                    <CardDescription>Order {selectedReturn.orderId} by {selectedReturn.customer}</CardDescription>
                  </div>
                  <div>
                    {getStatusBadge(selectedReturn.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Return Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Return Date:</span>
                        <span>{selectedReturn.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason:</span>
                        <span>{selectedReturn.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Refund Status:</span>
                        <span>{selectedReturn.refunded ? 'Refunded' : 'Not Refunded'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processed By:</span>
                        <span>{selectedReturn.processedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Customer Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{selectedReturn.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedReturn.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Original Order:</span>
                        <span>{selectedReturn.orderId}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Returned Items</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedReturn.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatRwf(item.price)}</TableCell>
                            <TableCell>{formatRwf(item.subtotal)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">Total:</TableCell>
                          <TableCell className="font-bold">{formatRwf(selectedReturn.amount)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              {selectedReturn.status === 'Pending' && (
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" /> Reject Return
                  </Button>
                  <Button className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Approve Return
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Return Policy</CardTitle>
              <CardDescription>Rules and guidelines for processing returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {returnPolicySections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{section.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Process for Handling Returns</h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</div>
                    <div className="flex-1">
                      <p className="font-medium">Receive Return Request</p>
                      <p className="text-sm text-muted-foreground">
                        Customer submits a return request with reason and order details.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</div>
                    <div className="flex-1">
                      <p className="font-medium">Evaluate Request</p>
                      <p className="text-sm text-muted-foreground">
                        Review return reason and confirm eligibility based on policy terms.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</div>
                    <div className="flex-1">
                      <p className="font-medium">Authorize Return</p>
                      <p className="text-sm text-muted-foreground">
                        If approved, provide return instructions and authorization code.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">4</div>
                    <div className="flex-1">
                      <p className="font-medium">Process Refund</p>
                      <p className="text-sm text-muted-foreground">
                        Issue refund in original payment method after receiving returned items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Policy
                </Button>
                <Button>
                  Edit Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Return Reports</CardTitle>
              <CardDescription>Analytics and insights on product returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Return Rate by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Beverages</span>
                          <span>2.8%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full w-[2.8%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Furniture</span>
                          <span>4.5%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full w-[4.5%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Clothing</span>
                          <span>3.2%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full w-[3.2%] rounded-full bg-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Groceries</span>
                          <span>1.5%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full w-[1.5%] rounded-full bg-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Return Reasons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />
                          <span className="text-sm">Damaged on arrival</span>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500" />
                          <span className="text-sm">Wrong item received</span>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500" />
                          <span className="text-sm">Changed mind</span>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                          <span className="text-sm">Not as described</span>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500" />
                          <span className="text-sm">Other</span>
                        </div>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top Returned Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-7">1.</span>
                        <div className="flex-1">
                          <div className="text-sm">Fanta Citron</div>
                          <div className="text-xs text-muted-foreground">10 returns</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-7">2.</span>
                        <div className="flex-1">
                          <div className="text-sm">Intebe (Chair)</div>
                          <div className="text-xs text-muted-foreground">7 returns</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-7">3.</span>
                        <div className="flex-1">
                          <div className="text-sm">Ishati (Shirt)</div>
                          <div className="text-xs text-muted-foreground">5 returns</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-7">4.</span>
                        <div className="flex-1">
                          <div className="text-sm">Umukate (Bread)</div>
                          <div className="text-xs text-muted-foreground">3 returns</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium w-7">5.</span>
                        <div className="flex-1">
                          <div className="text-sm">Ikawa (Coffee)</div>
                          <div className="text-xs text-muted-foreground">2 returns</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monthly Return Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-72 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Charts will be displayed here</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Monthly return rates showing trends over time would be displayed here with actual data integration.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-4">
                <Button>
                  Generate Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReturns;
