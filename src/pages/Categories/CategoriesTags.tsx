
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Tag, Edit, Trash2, ShoppingBag, Tag as TagIcon } from "lucide-react";
import { AppLayout } from '@/components/AppLayout';

// Sample tags data
const initialTags = [
  { 
    id: 1, 
    name: 'Organic', 
    description: 'Naturally grown without pesticides',
    color: '#4ade80',
    associatedProducts: 2,
    dateCreated: '2025-04-10'
  },
  { 
    id: 2, 
    name: 'Imported', 
    description: 'Products sourced from outside Rwanda',
    color: '#60a5fa',
    associatedProducts: 3,
    dateCreated: '2025-04-12'
  },
  { 
    id: 3, 
    name: 'Local', 
    description: 'Made in Rwanda products',
    color: '#f97316',
    associatedProducts: 4,
    dateCreated: '2025-04-15'
  },
  { 
    id: 4, 
    name: 'Discount', 
    description: 'Products on sale or discount',
    color: '#a855f7',
    associatedProducts: 1,
    dateCreated: '2025-04-18'
  },
  { 
    id: 5, 
    name: 'Bestseller', 
    description: 'Top selling products',
    color: '#ec4899',
    associatedProducts: 3,
    dateCreated: '2025-04-20'
  },
  { 
    id: 6, 
    name: 'New Arrival', 
    description: 'Recently added products',
    color: '#f43f5e',
    associatedProducts: 2,
    dateCreated: '2025-05-01'
  },
];

// Sample product categories with tags associated
const associatedProducts = [
  { 
    id: 1, 
    name: 'Ikawa (Coffee)', 
    tags: ['Organic', 'Local', 'Bestseller'] 
  },
  { 
    id: 2, 
    name: 'Fanta Citron', 
    tags: ['Imported', 'Bestseller', 'Discount'] 
  },
  { 
    id: 3, 
    name: 'Agatambaro (Fabric)', 
    tags: ['Local', 'New Arrival'] 
  },
  { 
    id: 4, 
    name: 'Intebe (Chair)', 
    tags: ['Local'] 
  },
  { 
    id: 5, 
    name: 'Umukate (Bread)', 
    tags: ['Local', 'Organic'] 
  },
];

const CategoriesTags = () => {
  const [tags, setTags] = useState(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewTagDialogOpen, setIsNewTagDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', description: '', color: '#4ade80' });
  
  // Filter tags based on search term
  const filteredTags = tags.filter(
    tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTag(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTagItem = {
      id: tags.length + 1,
      name: newTag.name,
      description: newTag.description,
      color: newTag.color,
      associatedProducts: 0,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    setTags([...tags, newTagItem]);
    setNewTag({ name: '', description: '', color: '#4ade80' });
    setIsNewTagDialogOpen(false);
  };
  
  // Delete a tag
  const handleDeleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };
  
  // Color options for tags
  const colorOptions = [
    { name: 'Green', value: '#4ade80' },
    { name: 'Blue', value: '#60a5fa' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Red', value: '#f43f5e' },
    { name: 'Yellow', value: '#facc15' },
    { name: 'Teal', value: '#2dd4bf' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Create and manage product tags</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewTagDialogOpen} onOpenChange={setIsNewTagDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Tag</DialogTitle>
                  <DialogDescription>
                    Create a new tag to categorize your products.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newTag.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={newTag.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="color" className="text-right">
                      Color
                    </Label>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <div 
                          key={color.value}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${newTag.color === color.value ? 'border-gray-900 dark:border-white' : 'border-transparent'}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setNewTag(prev => ({ ...prev, color: color.value }))}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Tag</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
            <TagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">
              Used for product categorization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Tag</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Local</div>
            <p className="text-xs text-muted-foreground">
              Applied to 4 products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tagged Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Products with at least one tag
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Manage your product tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tags..."
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
                  <TableHead>Tag</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Associated Products</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <TableRow key={tag.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: tag.color }}
                          />
                          <span className="font-medium">{tag.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{tag.description}</TableCell>
                      <TableCell>{tag.associatedProducts}</TableCell>
                      <TableCell>{tag.dateCreated}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteTag(tag.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No tags found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Products with Tags</CardTitle>
          <CardDescription>View products and their associated tags</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {associatedProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tagName, index) => {
                        const tagInfo = tags.find(t => t.name === tagName);
                        return (
                          <Badge 
                            key={index} 
                            className="flex items-center gap-1"
                            style={{ 
                              backgroundColor: tagInfo ? `${tagInfo.color}20` : undefined,
                              color: tagInfo ? tagInfo.color : undefined,
                              borderColor: tagInfo ? tagInfo.color : undefined 
                            }}
                            variant="outline"
                          >
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: tagInfo ? tagInfo.color : undefined }}
                            />
                            {tagName}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View All Products</Button>
          <Button>Manage Product Tags</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CategoriesTags;
