
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download, Eye, Printer, Filter, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Sample invoice data
const initialInvoices = [
  { 
    id: 'INV-001', 
    customer: 'Uwamahoro Jean',
    customerEmail: 'jean@example.com',
    date: '2025-05-14', 
    amount: 29999, 
    status: 'Paid',
    paymentMethod: 'Mobile Money',
    items: 3
  },
  { 
    id: 'INV-002', 
    customer: 'Kamaliza Alice',
    customerEmail: 'alice@example.com',
    date: '2025-05-13', 
    amount: 14950, 
    status: 'Paid',
    paymentMethod: 'Airtel Money',
    items: 2
  },
  { 
    id: 'INV-003', 
    customer: 'Niyonzima Robert',
    customerEmail: 'robert@example.com',
    date: '2025-05-13', 
    amount: 8999, 
    status: 'Processing',
    paymentMethod: 'Bank Transfer',
    items: 1
  },
  { 
    id: 'INV-004', 
    customer: 'Mukamana Emily',
    customerEmail: 'emily@example.com',
    date: '2025-05-12', 
    amount: 19999, 
    status: 'Paid',
    paymentMethod: 'Mobile Money',
    items: 2
  },
  { 
    id: 'INV-005', 
    customer: 'Kabera Michael',
    customerEmail: 'michael@example.com',
    date: '2025-05-11', 
    amount: 7450, 
    status: 'Paid',
    paymentMethod: 'Cash',
    items: 1
  },
  { 
    id: 'INV-006', 
    customer: 'Ingabire Sophie',
    customerEmail: 'sophie@example.com',
    date: '2025-05-11', 
    amount: 12500, 
    status: 'Unpaid',
    paymentMethod: 'Pending',
    items: 2
  },
];

// Sample draft invoices
const draftInvoices = [
  { 
    id: 'DRF-001', 
    customer: 'Habimana Thomas',
    customerEmail: 'thomas@example.com',
    date: '2025-05-15', 
    amount: 17500, 
    status: 'Draft',
    items: 2
  },
  { 
    id: 'DRF-002', 
    customer: 'Mutoni Sarah',
    customerEmail: 'sarah@example.com',
    date: '2025-05-14', 
    amount: 8750, 
    status: 'Draft',
    items: 1
  },
];

const SalesInvoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  
  // Calculate invoice statistics
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(i => i.status === 'Paid').length;
  const unpaidInvoices = invoices.filter(i => i.status === 'Unpaid').length;
  const processingInvoices = invoices.filter(i => i.status === 'Processing').length;
  
  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter(
    invoice => 
      (invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === 'all' || invoice.status === selectedStatus)
  );
  
  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Apply sorting
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'ascending' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });
  
  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'Unpaid':
        return <Badge variant="destructive">{status}</Badge>;
      case 'Processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case 'Draft':
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Manage and track your sales invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Create Draft
          </Button>
          <Button>
            New Invoice
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
            <p className="text-xs text-muted-foreground">
              For the current month
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
              From all invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidInvoices}</div>
            <p className="text-xs text-muted-foreground">
              {((paidInvoices / totalInvoices) * 100).toFixed(0)}% of total invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid/Processing</CardTitle>
            <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unpaidInvoices + processingInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Requiring follow-up
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>View, print, or download your invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search invoices..."
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
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
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
                        <Button variant="ghost" size="sm" onClick={() => handleSort('id')} className="flex items-center gap-1">
                          Invoice
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('customer')} className="flex items-center gap-1">
                          Customer
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('date')} className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm" onClick={() => handleSort('amount')} className="flex items-center gap-1">
                          Amount
                          <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedInvoices.length > 0 ? (
                      sortedInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{invoice.customer}</span>
                              <span className="text-xs text-muted-foreground">{invoice.customerEmail}</span>
                            </div>
                          </TableCell>
                          <TableCell>{invoice.items}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell className="font-medium">{formatRwf(invoice.amount)}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>{invoice.paymentMethod}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Download className="h-4 w-4" /> Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Printer className="h-4 w-4" /> Print
                                </DropdownMenuItem>
                                {invoice.status === 'Unpaid' && (
                                  <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Mark as Paid
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No invoices found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {sortedInvoices.length} of {invoices.length} invoices
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Invoices</CardTitle>
              <CardDescription>Incomplete invoices that haven't been sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Draft ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {draftInvoices.map((draft) => (
                      <TableRow key={draft.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{draft.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{draft.customer}</span>
                            <span className="text-xs text-muted-foreground">{draft.customerEmail}</span>
                          </div>
                        </TableCell>
                        <TableCell>{draft.items}</TableCell>
                        <TableCell>{draft.date}</TableCell>
                        <TableCell className="font-medium">{formatRwf(draft.amount)}</TableCell>
                        <TableCell>{getStatusBadge(draft.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Finalize
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent invoice activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  { 
                    id: 'INV-003', 
                    customer: 'Niyonzima Robert',
                    activity: 'Payment received via Bank Transfer',
                    date: '2025-05-13 14:23',
                    amount: formatRwf(8999)
                  },
                  { 
                    id: 'INV-006', 
                    customer: 'Ingabire Sophie',
                    activity: 'Invoice created and sent',
                    date: '2025-05-11 10:45',
                    amount: formatRwf(12500)
                  },
                  { 
                    id: 'INV-001', 
                    customer: 'Uwamahoro Jean',
                    activity: 'Invoice viewed by customer',
                    date: '2025-05-14 08:12',
                    amount: formatRwf(29999)
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">
                        {activity.id} - {activity.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.activity}
                      </p>
                      <div className="flex text-xs text-muted-foreground gap-3">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span>{activity.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesInvoices;
