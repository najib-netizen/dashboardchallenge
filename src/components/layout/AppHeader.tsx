
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, Settings, LogOut, User, Grid3X3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '../Logo';

const AppHeader = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    const segments = location.pathname.split('/').filter(segment => segment !== 'app');
    return segments.pop() || 'Dashboard';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section - Logo, Menu, Search */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-3">
            <Logo />
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold capitalize hidden md:block">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10 bg-muted/30 border-0 focus:bg-white focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section - Navigation & User */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/app/products">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Products
              </Button>
            </Link>
            <Link to="/app/sales">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sales
              </Button>
            </Link>
            <Link to="/app/purchases">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Purchases
              </Button>
            </Link>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
              3
            </Badge>
          </Button>

          {/* Grid Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Grid3X3 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/app/dashboard" className="flex items-center">
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/categories" className="flex items-center">
                  <span>Categories</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/products/inventory" className="flex items-center">
                  <span>Inventory</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/app/sales/customers" className="flex items-center">
                  <span>Customers</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
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
