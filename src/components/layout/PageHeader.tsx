
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(segment => segment !== 'app' && segment !== '');
    return segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground">
        {getBreadcrumbs().join(' / ') || 'Dashboard'}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
