
import React from 'react';

interface SidebarUserProfileProps {
  className?: string;
}

const SidebarUserProfile = ({ className }: SidebarUserProfileProps) => {
  return (
    <div className={`px-4 py-2 border-t ${className}`}>
      <div className="text-xs text-muted-foreground">
        <p>User profile moved to header</p>
      </div>
    </div>
  );
};

export default SidebarUserProfile;
