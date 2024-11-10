import React, { ReactNode } from 'react';

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-y-auto ${className}`} style={{ maxHeight: '200px' }}>
      {children}
    </div>
  );
};
