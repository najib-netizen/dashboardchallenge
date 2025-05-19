
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSpreadsheet, FilePieChart, FileBarChart, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppLayout } from '@/components/AppLayout';

// Format number to Rwandan francs
const formatRwf = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' RWF';
};

const reportTypes = [
  {
    id: "sales",
    name: "Sales Report",
    description: "Comprehensive view of all sales transactions",
    icon: <FileSpreadsheet className="h-5 w-5" />,
    metrics: [
      { name: "Total Sales", value: formatRwf(1250000) },
      { name: "Number of Transactions", value: "156" },
      { name: "Average Transaction", value: formatRwf(8013) },
      { name: "Top Selling Product", value: "Ikawa (Coffee)" }
    ]
  },
  {
    id: "inventory",
    name: "Inventory Report",
    description: "Current stock levels and product movements",
    icon: <FileBarChart className="h-5 w-5" />,
    metrics: [
      { name: "Total Products", value: "56" },
      { name: "Out of Stock Items", value: "3" },
      { name: "Low Stock Alerts", value: "8" },
      { name: "Inventory Value", value: formatRwf(1845200) }
    ]
  },
  {
    id: "financial",
    name: "Financial Report",
    description: "Profit and loss statements and financial metrics",
    icon: <FilePieChart className="h-5 w-5" />,
    metrics: [
      { name: "Total Revenue", value: formatRwf(1250000) },
      { name: "Total Expenses", value: formatRwf(725000) },
      { name: "Net Profit", value: formatRwf(525000) },
      { name: "Profit Margin", value: "42%" }
    ]
  }
];

const DashboardReports = () => {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          
          <p className="text-muted-foreground">Generate and view detailed reports for your business</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] pl-3 text-left font-normal">
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <Card 
                key={report.id} 
                className={cn(
                  "cursor-pointer hover:border-primary/80 transition-all", 
                  selectedReport.id === report.id && "border-primary bg-primary/5"
                )}
                onClick={() => setSelectedReport(report)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-primary/10">
                      {report.icon}
                    </div>
                    <CardTitle className="text-base">{report.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{selectedReport.name}</CardTitle>
                  <CardDescription>Data from May 1, 2025 - May 15, 2025</CardDescription>
                </div>
                <Button className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {selectedReport.metrics.map((metric, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold">Report Preview</h3>
                <div className="border rounded-md p-4 min-h-[300px] bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Report Preview Will Appear Here</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Select parameters above and click "Generate Report" to view
                    </p>
                    <Button className="mt-4">Generate Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Set up automated report delivery to your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 items-center justify-center min-h-[300px]">
                <FileBarChart className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">No Scheduled Reports</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[500px]">
                  You haven't set up any scheduled reports yet. Schedule reports to have them automatically
                  generated and sent to your email on a regular basis.
                </p>
                <Button>Schedule New Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>
                Access your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 items-center justify-center min-h-[300px]">
                <FilePieChart className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">No Saved Reports</h3>
                <p className="text-sm text-muted-foreground text-center max-w-[500px]">
                  You don't have any saved reports yet. When you generate reports, you can save them
                  here for future reference.
                </p>
                <Button>Generate New Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardReports;
