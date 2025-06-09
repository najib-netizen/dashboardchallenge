
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
  const location = useLocation();

  const getPageTitle = () => {
    const segments = location.pathname.split('/').filter(segment => segment !== 'app' && segment !== '');
    const lastSegment = segments.pop() || 'dashboard';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(segment => segment !== 'app' && segment !== '');
    return segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
  };

  return (
    <div className={`bg-muted/30 border-b px-6 py-4 ${className}`}>
      <div className="space-y-1">
        {/* Current Page Title */}
        <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground">
          {getBreadcrumbs().join(' / ') || 'Dashboard'}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
