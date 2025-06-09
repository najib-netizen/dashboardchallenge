
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import Logo from './Logo';
import Footer from './Footer';
import SidebarNav from './sidebar/SidebarNav';
import AppHeader from './layout/AppHeader';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 return (
    <SidebarProvider>
       <div className="min-h-screen flex w-full flex-col">
        <AppHeader />
        <div className="flex flex-1 pt-14">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-4 py-2">
                <span className="text-sm font-medium text-muted-foreground">Menu</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <div className="px-4 py-2 text-xs text-muted-foreground border-t">
                <p>© 2025 Shopy iPosita</p>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto flex flex-col">
            <div className="container py-4 md:py-6 space-y-6 flex-1">
              
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
