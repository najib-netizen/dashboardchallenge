
import React from 'react';
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
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import Footer from './Footer';

const menuItems = [
  {
    label: 'Dashboard',
    path: '/app/dashboard',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13H10V6H4V13ZM4 18H10V15H4V18ZM12 18H18V11H12V18ZM12 6V9H18V6H12Z" fill="currentColor"/>
    </svg>
  },
  {
    label: 'Products',
    path: '/app/products',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L12 2L7 7H3V21H21V7H17ZM10 19H7V16H10V19ZM10 14H7V11H10V14ZM14 19H11V16H14V19ZM14 14H11V11H14V14ZM17 19V16H18V19H17Z" fill="currentColor"/>
    </svg>
  },
  {
    label: 'Categories',
    path: '/app/categories',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L6.5 11H17.5L12 2ZM5 13L3 21H21L19 13H5Z" fill="currentColor"/>
    </svg>
  },
  {
    label: 'Sales',
    path: '/app/sales',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 18L15 14V15H5V17H15V18L19 14V18ZM5 6H15V7L19 3V7L15 3V4H5V6Z" fill="currentColor"/>
    </svg>
  },
  {
    label: 'Purchases',
    path: '/app/purchases',
    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75Z" fill="currentColor"/>
    </svg>
  }
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

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
                  {location.pathname.split('/').pop() || 'Dashboard'}
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
