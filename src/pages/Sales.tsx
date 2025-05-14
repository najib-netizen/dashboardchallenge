
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  DollarSign, 
  CreditCard, 
  Receipt, 
  ChartBar, 
  ChartLine 
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for charts with RWF values
const monthlySalesData = [
  { month: 'Jan', sales: 400000 },
  { month: 'Feb', sales: 300000 },
  { month: 'Mar', sales: 500000 },
  { month: 'Apr', sales: 278000 },
  { month: 'May', sales: 189000 },
  { month: 'Jun', sales: 239000 },
  { month: 'Jul', sales: 349000 },
  { month: 'Aug', sales: 200000 },
  { month: 'Sep', sales: 278000 },
  { month: 'Oct', sales: 189000 },
  { month: 'Nov', sales: 357800 },
  { month: 'Dec', sales: 500000 },
];

const recentTransactions = [
  { id: 1, customer: 'Isaro Jean', date: '2025-05-14', amount: 29999, method: 'Mobile Money', status: 'Completed' },
  { id: 2, customer: 'Kamaliza Alice', date: '2025-05-13', amount: 14950, method: 'Airtel Money', status: 'Completed' },
  { id: 3, customer: 'Senga Robert', date: '2025-05-13', amount: 8999, method: 'Bank Transfer', status: 'Processing' },
  { id: 4, customer: 'Keza Emily', date: '2025-05-12', amount: 19999, method: 'Mobile Money', status: 'Completed' },
  { id: 5, customer: 'Kabera Michael', date: '2025-05-11', amount: 7450, method: 'Cash', status: 'Completed' },
];

const salesCards = [
  { title: 'Total Revenue', value: '12,845,500 RWF', change: '+12.5%', icon: <DollarSign className="h-5 w-5 text-primary" /> },
  { title: 'Sales Count', value: '534', change: '+8.2%', icon: <ShoppingCart className="h-5 w-5 text-primary" /> },
  { title: 'Average Order', value: '54,320 RWF', change: '+5.1%', icon: <Receipt className="h-5 w-5 text-primary" /> },
  { title: 'Refunds', value: '1,240,000 RWF', change: '-3.4%', icon: <CreditCard className="h-5 w-5 text-primary" /> },
];

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' RWF';
};

const Sales: React.FC = () => {
  const { user } = useAuth();

  return (
    
      <div className="space-y-6">
        {/* Sales summary cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {salesCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className={`text-xs ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {card.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts section */}
        <Tabs defaultValue="overview" className="space-y-2">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <ChartBar className="h-2 w-2" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <ChartLine className="h-2 w-2" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-0">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Your sales performance over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={10 / 3}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value/1000}K`} />
                      <Tooltip formatter={(value) => [`${formatRwf(Number(value))}`, 'Sales']} />
                      <Bar dataKey="sales" fill="#9b87f5" name="Sales (RWF)" />
                    </BarChart>
                  </ResponsiveContainer>
                </AspectRatio>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Your sales trend over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={12 / 3}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value/1000}K`} />
                      <Tooltip formatter={(value) => [`${formatRwf(Number(value))}`, 'Sales']} />
                      <Line type="monotone" dataKey="sales" stroke="#9b87f5" activeDot={{ r: 8 }} name="Sales (RWF)" />
                    </LineChart>
                  </ResponsiveContainer>
                </AspectRatio>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your most recent sales transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">ID</th>
                    <th className="text-left py-3 px-2">Customer</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Payment</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">#{transaction.id}</td>
                      <td className="py-3 px-2">{transaction.customer}</td>
                      <td className="py-3 px-2">{transaction.date}</td>
                      <td className="py-3 px-2">{formatRwf(transaction.amount)}</td>
                      <td className="py-3 px-2">{transaction.method}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    
  );
};

export default Sales;
