
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search } from "lucide-react";
import { FormDialog } from "@/components/ui/form-dialog";
import { ProductForm, ProductFormValues } from "@/pages/Products/ProductForm"; 

// Define the product type to ensure type safety
interface Product {
  id: number;
  name: string;
  code: string;
  brand: string;
  price: number;
  unit: string;
  stock: number;
  created: string;
}

// Sample product data
const initialProducts: Product[] = [
  { id: 1, name: 'Ikawa (Coffee)', code: '123454', brand: 'Rwanda Select', price: 2000.00, unit: 'piece', stock: 1199, created: '2025-05-07' },
  { id: 2, name: 'Fanta Citron', code: 'R267734', brand: 'BRALIRWA', price: 500.00, unit: 'piece', stock: 19, created: '2025-05-07' },
  { id: 3, name: 'Agatambaro (Fabric)', code: '4575278', brand: 'Kigali Textiles', price: 5000.00, unit: 'meter', stock: 52, created: '2025-05-07' },
  { id: 4, name: 'Intebe (Chair)', code: '1236597', brand: 'Muhanga Furniture', price: 15000.00, unit: 'piece', stock: 39, created: '2025-05-07' },
  { id: 5, name: 'Umukate (Bread)', code: '124514321334', brand: 'Kigali Bakery', price: 1200.00, unit: 'piece', stock: 20, created: '2025-05-09' },
  { id: 6, name: 'Ishati (Shirt)', code: '9823024', brand: 'Rwanda Clothing', price: 6000.00, unit: 'piece', stock: 50, created: '2025-05-09' },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Filter products based on search term
  const filteredProducts = products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle create product
  const handleCreateProduct = (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const newProduct: Product = {
        id: products.length + 1,
        name: data.name,
        code: data.code,
        brand: data.brand,
        price: data.price,
        unit: data.unit,
        stock: data.stock,
        created: new Date().toISOString().split('T')[0],
      };
      
      setProducts([...products, newProduct]);
      setIsSubmitting(false);
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Product created",
        description: `${data.name} has been added successfully.`,
      });
    }, 500);
  };

  // Handle edit product
  const handleEditProduct = (data: ProductFormValues) => {
    if (!currentProduct) return;
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id 
          ? { 
              ...product,
              name: data.name,
              code: data.code,
              brand: data.brand,
              price: data.price,
              unit: data.unit,
              stock: data.stock
            }
          : product
      );
      
      setProducts(updatedProducts);
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      
      toast({
        title: "Product updated",
        description: `${data.name} has been updated successfully.`,
      });
    }, 500);
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
            <div className="flex items-center">
              <FormDialog
                title="Create New Product"
                description="Enter the details of the new product."
                trigger={
                  <Button className="bg-primary hover:bg-primary/90 ml-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Product
                  </Button>
                }
                form={
                  <ProductForm 
                    onSubmit={handleCreateProduct}
                    isSubmitting={isSubmitting}
                  />
                }
                onSubmit={() => {}}
                submitLabel="Create Product"
                isSubmitting={isSubmitting}
                isOpen={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">PRODUCT</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">NAME</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CODE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">BRAND</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">PRICE (RWF)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">PRODUCT UNIT</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">IN STOCK</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CREATED ON</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      {product.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.brand}</td>
                  <td className="px-4 py-3 text-sm">{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {product.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{product.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => openEditDialog(product)}
                      >
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
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Product Dialog */}
      {currentProduct && (
        <FormDialog
          title="Edit Product"
          description="Update the details of the product."
          trigger={<></>} // Empty trigger because we're controlling open state
          form={
            <ProductForm
              defaultValues={{
                name: currentProduct.name,
                code: currentProduct.code,
                brand: currentProduct.brand,
                price: currentProduct.price,
                unit: currentProduct.unit,
                stock: currentProduct.stock,
              }}
              onSubmit={handleEditProduct}
              isSubmitting={isSubmitting}
            />
          }
          onSubmit={() => {}}
          submitLabel="Update Product"
          isSubmitting={isSubmitting}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </div>
  );
};

export default Products;
