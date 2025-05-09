
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-500"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">∞</div>
      </div>
      <span className="text-xl font-bold app-logo">infy-pos</span>
    </div>
  );
};

export default Logo;
