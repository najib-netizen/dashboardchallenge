
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Settings, LogOut, User, ChevronRight, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '../Logo';

// Helper function to get page title from route
const getPageTitle = (pathname: string) => {
  const routes = {
    '/app/dashboard': { main: 'Dashboard', sub: 'Overview' },
    '/app/dashboard/analytics': { main: 'Dashboard', sub: 'Analytics' },
    '/app/dashboard/reports': { main: 'Dashboard', sub: 'Reports' },
    '/app/products': { main: 'Products', sub: 'All Products' },
    '/app/products/inventory': { main: 'Products', sub: 'Inventory' },
    '/app/products/tracking': { main: 'Products', sub: 'Tracking' },
    '/app/products/alerts': { main: 'Products', sub: 'Stock Alerts' },
    '/app/categories': { main: 'Categories', sub: 'All Categories' },
    '/app/categories/tags': { main: 'Categories', sub: 'Manage Tags' },
    '/app/sales': { main: 'Sales', sub: 'Orders' },
    '/app/sales/invoices': { main: 'Sales', sub: 'Invoices' },
    '/app/sales/customers': { main: 'Sales', sub: 'Customers' },
    '/app/sales/returns': { main: 'Sales', sub: 'Returns' },
    '/app/purchases': { main: 'Purchases', sub: 'All Purchases' },
    '/app/purchases/suppliers': { main: 'Purchases', sub: 'Suppliers' },
    '/app/purchases/orders': { main: 'Purchases', sub: 'Orders' },
  };

  return routes[pathname as keyof typeof routes] || { main: 'Dashboard', sub: 'Overview' };
};

const AppHeader = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { main, sub } = getPageTitle(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Left Section - Logo, Menu Toggle and Current Page */}
        <div className="flex items-center space-x-4">
          <Logo />
          <SidebarTrigger />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{main}</span>
            <ChevronRight className="h-4 w-4" />
            <span>{sub}</span>
          </div>
        </div>

        {/* Right Section - Notifications & User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-muted">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-destructive flex items-center justify-center text-destructive-foreground">
                6
              </Badge>
            </Button>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-muted">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="w-fit text-xs capitalize mt-1">
                  {user?.role}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  <span className="text-sm">Dark mode</span>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
