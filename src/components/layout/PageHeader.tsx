
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
    <div className={`fixed top-16 left-0 right-0 z-40 bg-muted/30 backdrop-blur-sm border-b border-border px-6 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          {/* Current Page Title */}
          <h1 className="text-lg font-semibold text-foreground">{getPageTitle()}</h1>
          {/* Breadcrumbs */}
          <div className="text-xs text-muted-foreground">
            {getBreadcrumbs().join(' / ') || 'Dashboard'}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
