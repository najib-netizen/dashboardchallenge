import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck,
  BarChart,
  Users,
  Settings,
  Clock,
  AlertCircle,
  Search,
  FileSpreadsheet,
  PackageCheck,
  Warehouse,
  Tags
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import Footer from './Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';

// Menu items structure with submenus
const menuItems = [ {
    label: 'Dashboard',
    path: '/app/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    submenus: [
      { label: 'Overview', path: '/app/dashboard' },
      { label: 'Analytics', path: '/app/dashboard/analytics' },
      { label: 'Reports', path: '/app/dashboard/reports' }
    ]
  },
  {
    label: 'Products',
    path: '/app/products',
    icon: <Package className="w-5 h-5" />,
    submenus: [
      { label: 'All Products', path: '/app/products' },
      { label: 'Inventory', path: '/app/products/inventory' },
      { label: 'Tracking', path: '/app/products/tracking' },
      { label: 'Stock Alerts', path: '/app/products/alerts' }
    ]
  },
  {
    label: 'Categories',
    path: '/app/categories',
    icon: <Tags className="w-5 h-5" />,
    submenus: [
      { label: 'All Categories', path: '/app/categories' },
      { label: 'Manage Tags', path: '/app/categories/tags' }
    ]
  },
  {
    label: 'Sales',
    path: '/app/sales',
    icon: <ShoppingCart className="w-5 h-5" />,
    submenus: [
      { label: 'Orders', path: '/app/sales' },
      { label: 'Invoices', path: '/app/sales/invoices' },
      { label: 'Customers', path: '/app/sales/customers' },
      { label: 'Returns', path: '/app/sales/returns' }
    ]
  },
  {
    label: 'Purchases',
    path: '/app/purchases',
    icon: <Truck className="w-5 h-5" />,
    submenus: [
      { label: 'All Purchases', path: '/app/purchases' },
      { label: 'Suppliers', path: '/app/purchases/suppliers' },
      { label: 'Orders', path: '/app/purchases/orders' }
    ]
  }
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Check if the current path is in the submenu
  const isSubmenuActive = (item: typeof menuItems[0]) => {
    return item.submenus?.some(submenu => location.pathname === submenu.path);
  };

  // Check if this is the main route for this section
  const isMainRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
       <div className="min-h-screen flex w-full flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-4 py-2">
                <Logo />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        {item.submenus && item.submenus.length > 0 ? (
                          <Collapsible 
                            open={openMenus[item.label] || isSubmenuActive(item)}
                            onOpenChange={() => toggleSubmenu(item.label)}
                          >
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton 
                                className={cn(
                                  "w-full justify-between",
                                  (isMainRoute(item.path) || isSubmenuActive(item)) && "text-primary font-medium"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon}
                                  <span>{item.label}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.submenus.map((submenu) => (
                                  <SidebarMenuSubItem key={submenu.path}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={location.pathname === submenu.path}
                                    >
                                      <NavLink to={submenu.path}>
                                        <span>{submenu.label}</span>
                                      </NavLink>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                cn("flex items-center gap-2", isActive && "text-primary font-medium")
                              }
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-4 py-2 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto flex flex-col">
            <div className="container py-4 md:py-6 space-y-6 flex-1">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold capitalize">
                  {location.pathname.split('/').pop() || 'DashboardS'}
                </h1>
                <SidebarTrigger />
              </div>
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
