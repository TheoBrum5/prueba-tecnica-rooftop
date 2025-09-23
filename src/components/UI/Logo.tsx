import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: { main: 'text-lg', sub: 'text-xs' },
    md: { main: 'text-xl', sub: 'text-xs' },
    lg: { main: 'text-2xl', sub: 'text-sm' }
  };

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <div className="flex flex-col">
        <span 
          className={`${sizeClasses[size].main} font-bold text-gray-900 leading-tight`}
          style={{fontFamily: 'Arial, sans-serif'}}
        >
          ACME
        </span>
        <span 
          className={`${sizeClasses[size].sub} text-gray-600 font-normal tracking-widest`}
          style={{fontFamily: 'Arial, sans-serif'}}
        >
          CORPORATION
        </span>
      </div>
    </div>
  );
};

export default Logo;