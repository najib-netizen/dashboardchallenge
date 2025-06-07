
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface PageHeaderProps {
  className?: string;
}

const PageHeader = ({ className }: PageHeaderProps) => {
  const location = useLocation();

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <h1 className="text-2xl font-bold capitalize">
        {location.pathname.split('/').filter(segment => segment !== 'app').pop() || 'Dashboard'}
      </h1>
      <SidebarTrigger />
    </div>
  );
};

export default PageHeader;
