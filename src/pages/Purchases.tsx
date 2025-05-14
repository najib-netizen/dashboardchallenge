
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";

// Sample purchase data
const initialPurchases = [
  { id: 1, product: 'Ikawa Coffee Beans', supplier: 'Isaro Farms', code: 'Rw7821', quantity: 50, unit: 'kg', price: 12500, total: 625000, date: '2025-05-01' },
  { id: 2, product: 'Imyumbati', supplier: 'Iraguha Cooperative', code: 'Rw4532', quantity: 100, unit: 'kg', price: 800, total: 80000, date: '2025-05-03' },
  { id: 3, product: 'Potatoes', supplier: 'Gasana Produce', code: 'Rw9876', quantity: 200, unit: 'kg', price: 500, total: 100000, date: '2025-05-05' },
  { id: 4, product: 'Amata', supplier: 'Kigali Dairy', code: 'Rw3421', quantity: 100, unit: 'liter', price: 1200, total: 120000, date: '2025-05-07' },
  { id: 5, product: 'Sugar cane', supplier: 'Rwanda Sugar Ltd', code: 'Rw6543', quantity: 50, unit: 'kg', price: 2000, total: 100000, date: '2025-05-10' },
  { id: 6, product: 'Ibishyimbo', supplier: 'Manzi Farms', code: 'Rw2345', quantity: 80, unit: 'kg', price: 1500, total: 120000, date: '2025-05-12' },
];

const Purchases = () => {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Filter purchases based on search term
  const filteredPurchases = purchases.filter(
    purchase => 
      purchase.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePurchase = () => {
    toast({
      title: "Feature coming soon",
      description: "The create purchase functionality will be available in the next update.",
    });
  };

  // Calculate total value of all purchases
  const totalPurchaseValue = filteredPurchases.reduce((total, purchase) => total + purchase.total, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
            <p className="text-xs text-muted-foreground mt-1">From various suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(totalPurchaseValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">In Rwandan Francs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialPurchases[initialPurchases.length - 1].product}</div>
            <p className="text-xs text-muted-foreground mt-1">{initialPurchases[initialPurchases.length - 1].date}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-1/3">
              <Input
                type="search"
                placeholder="Search purchases..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center">
              <Button 
                className="bg-primary hover:bg-primary/90 ml-auto" 
                onClick={handleCreatePurchase}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Create Purchase
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PRODUCT</TableHead>
                <TableHead>SUPPLIER</TableHead>
                <TableHead>CODE</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>UNIT</TableHead>
                <TableHead>PRICE (RWF)</TableHead>
                <TableHead>TOTAL (RWF)</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-medium">{purchase.product}</TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {purchase.code}
                    </span>
                  </TableCell>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>{purchase.unit}</TableCell>
                  <TableCell>{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(purchase.price)}</TableCell>
                  <TableCell>{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(purchase.total)}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                        </svg>
                      </button>
                      <button className="p-1 text-indigo-600 hover:text-indigo-800">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPurchases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No purchases found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Purchases;
