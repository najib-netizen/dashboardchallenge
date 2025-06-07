
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Menu items structure with submenus
const menuItems = [
  {
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

import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck,
  Tags
} from 'lucide-react';

interface SidebarNavProps {
  className?: string;
}

const SidebarNav = ({ className }: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Automatically open the section that matches the current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which main section this path belongs to
    const activeSection = menuItems.find(item => 
      currentPath === item.path || item.submenus.some(submenu => submenu.path === currentPath)
    );
    
    if (activeSection) {
      setOpenMenus(prev => ({
        ...prev,
        [activeSection.label]: true
      }));
    }
  }, [location.pathname]);

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

  // Handle click on a menu item or submenu item
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarGroup className={className}>
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
                      onClick={() => handleNavigation(item.path)}
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
                            <NavLink to={submenu.path} end>
                              <span>{submenu.label}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton 
                  asChild
                  onClick={() => handleNavigation(item.path)}
                >
                  <NavLink
                    to={item.path}
                    end
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
  );
};

export default SidebarNav;