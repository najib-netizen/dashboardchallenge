
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LayoutDashboard, TrendingUp, PieChart as PieChartIcon, Users } from "lucide-react";
import { AppLayout } from '@/components/AppLayout';

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' RWF';
};

const salesData = [
  { name: 'Jan', revenue: 210000, profit: 70000 },
  { name: 'Feb', revenue: 180000, profit: 56000 },
  { name: 'Mar', revenue: 250000, profit: 90000 },
  { name: 'Apr', revenue: 290000, profit: 105000 },
  { name: 'May', revenue: 320000, profit: 120000 }
];

const categoryDistribution = [
  { name: 'Groceries', value: 35 },
  { name: 'Food', value: 25 },
  { name: 'Clothes', value: 15 },
  { name: 'Electronic', value: 10 },
  { name: 'Skin care', value: 8 },
  { name: 'Home decoration', value: 7 }
];

const customerGrowth = [
  { month: 'Jan', customers: 120 },
  { month: 'Feb', customers: 145 },
  { month: 'Mar', customers: 162 },
  { month: 'Apr', customers: 190 },
  { month: 'May', customers: 210 }
];

const COLORS = ['#9b87f5', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

const DashboardAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Detailed performance metrics and trends</p>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue="monthly" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.2%</div>
            <p className="text-xs text-muted-foreground">
              Compared to last month
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Growth
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210</div>
            <p className="text-xs text-muted-foreground">
              +10.5% new customers
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerGrowth}>
                  <Bar dataKey="customers" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Category Distribution
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 Categories</div>
            <p className="text-xs text-muted-foreground">
              35% of sales from Groceries
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={35}
                    dataKey="value"
                    label={false}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Analysis</CardTitle>
          <CardDescription>Monthly revenue and profit trends</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={9 / 2}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value/1000}K`} />
                <Tooltip formatter={(value) => [formatRwf(Number(value))]} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (RWF)" fill="#9b87f5" />
                <Bar dataKey="profit" name="Profit (RWF)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </AspectRatio>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Products with highest sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Ikawa (Coffee)', percentage: 78, value: formatRwf(132000) },
                { name: 'Agatambaro (Fabric)', percentage: 65, value: formatRwf(115000) },
                { name: 'Fanta Citron', percentage: 59, value: formatRwf(92000) },
                { name: 'Umukate (Bread)', percentage: 47, value: formatRwf(78000) },
                { name: 'Ishati (Shirt)', percentage: 38, value: formatRwf(65000) },
              ].map((item) => (
                <div className="flex items-center" key={item.name}>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div 
                          className="h-full rounded-full bg-primary" 
                          style={{ width: `${item.percentage}%` }} 
                        />
                      </div>
                      <span className="ml-2">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="ml-auto font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Distribution of sales across Rwanda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Kigali City', amount: formatRwf(250000), percentage: 42 },
                { name: 'Eastern Province', amount: formatRwf(120000), percentage: 20 },
                { name: 'Western Province', amount: formatRwf(95000), percentage: 16 },
                { name: 'Northern Province', amount: formatRwf(85000), percentage: 14 },
                { name: 'Southern Province', amount: formatRwf(50000), percentage: 8 },
              ].map((region) => (
                <div key={region.name} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{region.name}</span>
                    <div className="w-full h-2 bg-secondary mt-1 rounded-full">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{region.amount}</span>
                    <span className="text-xs text-muted-foreground">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
