
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Search, AlertCircle, Filter, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Sample inventory data with Rwandan product names
const initialInventory = [
  { 
    id: 1, 
    name: 'Ikawa (Coffee)', 
    sku: 'RW-COF-001', 
    category: 'Groceries',
    stockLevel: 1199, 
    location: 'Kigali Warehouse',
    minimumStock: 200,
    restockLevel: 500,
    unitPrice: 2000.00,
    totalValue: 2398000.00,
    lastUpdated: '2025-05-07',
    status: 'In Stock'
  },
  { 
    id: 2, 
    name: 'Fanta Citron', 
    sku: 'RW-BEV-002', 
    category: 'Beverages',
    stockLevel: 19, 
    location: 'Kigali Warehouse',
    minimumStock: 50,
    restockLevel: 100,
    unitPrice: 500.00,
    totalValue: 9500.00,
    lastUpdated: '2025-05-07',
    status: 'Low Stock'
  },
  { 
    id: 3, 
    name: 'Agatambaro (Fabric)', 
    sku: 'RW-FAB-003', 
    category: 'Clothing',
    stockLevel: 52, 
    location: 'Muhanga Store',
    minimumStock: 20,
    restockLevel: 40,
    unitPrice: 5000.00,
    totalValue: 260000.00,
    lastUpdated: '2025-05-07',
    status: 'In Stock'
  },
  { 
    id: 4, 
    name: 'Intebe (Chair)', 
    sku: 'RW-FRN-004', 
    category: 'Furniture',
    stockLevel: 39, 
    location: 'Muhanga Warehouse',
    minimumStock: 10,
    restockLevel: 20,
    unitPrice: 15000.00,
    totalValue: 585000.00,
    lastUpdated: '2025-05-07',
    status: 'In Stock'
  },
  { 
    id: 5, 
    name: 'Umukate (Bread)', 
    sku: 'RW-BKR-005', 
    category: 'Groceries',
    stockLevel: 0, 
    location: 'Kigali Store',
    minimumStock: 30,
    restockLevel: 60,
    unitPrice: 1200.00,
    totalValue: 0.00,
    lastUpdated: '2025-05-09',
    status: 'Out of Stock'
  },
  { 
    id: 6, 
    name: 'Ishati (Shirt)', 
    sku: 'RW-APP-006', 
    category: 'Clothing',
    stockLevel: 50, 
    location: 'Kigali Store',
    minimumStock: 20,
    restockLevel: 30,
    unitPrice: 6000.00,
    totalValue: 300000.00,
    lastUpdated: '2025-05-09',
    status: 'In Stock'
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

const ProductsInventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products based on search term and category
  const filteredProducts = inventory.filter(
    product => 
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
  );

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  
  // Calculate inventory statistics
  const totalItems = inventory.reduce((sum, item) => sum + item.stockLevel, 0);
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'Out of Stock').length;
  
  // Get unique categories
  const categories = ['all', ...new Set(inventory.map(item => item.category))];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Track, manage and optimize your product inventory</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across {inventory.length} different products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.97 9.47L7.1 19H9.13L11.97 9.53L14.83 19H16.87L14 9.47H9.97Z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRwf(totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              Total inventory value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items below restock level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items needing immediate restock
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              
              <Button className="gap-1">
                Export Data
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
                          <span>Product</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('name')}>
                          Sort by Name
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
                          <span>Stock Level</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('stockLevel')}>
                          Sort by Stock Level
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
                          <span>Unit Price</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('unitPrice')}>
                          Sort by Unit Price
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
                          <span>Total Value</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => handleSort('totalValue')}>
                          Sort by Total Value
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stockLevel}</TableCell>
                      <TableCell>{product.location}</TableCell>
                      <TableCell>{formatRwf(product.unitPrice)}</TableCell>
                      <TableCell>{formatRwf(product.totalValue)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            product.status === 'Out of Stock' ? 'destructive' :
                            product.status === 'Low Stock' ? 'warning' : 'outline'
                          }
                          className={
                            product.status === 'In Stock' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No products found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsInventory;
