
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Categories from "./pages/Categories";
import Sales from "./pages/Sales";
import NotFound from "./pages/NotFound";

// Import products submenu pages
import ProductsInventory from "./pages/Products/ProductsInventory";
import ProductsTracking from "./pages/Products/ProductsTracking";
import ProductsAlerts from "./pages/Products/ProductsAlerts";


// Import or add placeholder components for submenus
const DashboardAnalytics = () => <div>Dashboard Analytics</div>;
const DashboardReports = () => <div>Dashboard Reports</div>;


const CategoriesTags = () => <div>Categories Tags</div>;
const SalesInvoices = () => <div>Sales Invoices</div>;
const SalesCustomers = () => <div>Sales Customers</div>;
const SalesReturns = () => <div>Sales Returns</div>;
const PurchasesSuppliers = () => <div>Purchases Suppliers</div>;
const PurchasesOrders = () => <div>Purchases Orders</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            <Route path="/app" element={<ProtectedRoute />}>
              {/* Dashboard routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/analytics" element={<DashboardAnalytics />} />
              <Route path="dashboard/reports" element={<DashboardReports />} />
              
              {/* Products routes */}
              <Route path="products" element={<Products />} />
              <Route path="products/inventory" element={<ProductsInventory />} />
              <Route path="products/tracking" element={<ProductsTracking />} />
              <Route path="products/alerts" element={<ProductsAlerts />} />
              
              {/* Categories routes */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/tags" element={<CategoriesTags />} />
              
              {/* Sales routes */}
              <Route path="sales" element={<Sales />} />
              <Route path="sales/invoices" element={<SalesInvoices />} />
              <Route path="sales/customers" element={<SalesCustomers />} />
              <Route path="sales/returns" element={<SalesReturns />} />
              
              {/* Purchases routes */}
              <Route path="purchases" element={<Purchases />} />
              <Route path="purchases/suppliers" element={<PurchasesSuppliers />} />
              <Route path="purchases/orders" element={<PurchasesOrders />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>




        
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
