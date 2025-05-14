
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Utensils, 
  Shirt, 
  Smartphone, 
  Droplet, 
  Home as HomeIcon 
} from 'lucide-react';

const categoryTypes = [
  { name: 'Groceries', icon: <ShoppingCart className="h-5 w-5" /> },
  { name: 'Food', icon: <Utensils className="h-5 w-5" /> },
  { name: 'Clothes', icon: <Shirt className="h-5 w-5" /> },
  { name: 'Electronics', icon: <Smartphone className="h-5 w-5" /> },
  { name: 'Skin care', icon: <Droplet className="h-5 w-5" /> },
  { name: 'Home decoration', icon: <HomeIcon className="h-5 w-5" /> },
];

const Categories = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" fill="currentColor"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryTypes.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Categories
            </CardTitle>
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L6.5 11H17.5L12 2ZM5 13L3 21H21L19 13H5Z" fill="currentColor"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryTypes.length}</div>
            <p className="text-xs text-muted-foreground">
              All categories are active
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Categories Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome to the categories management section. Here you can create, edit, and manage product categories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {categoryTypes.map((category, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 border rounded-md hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="mr-3 p-2 bg-primary/10 rounded-full text-primary">
                  {category.icon}
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
