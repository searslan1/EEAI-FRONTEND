import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button className={`px-4 py-2 font-semibold rounded ${className}`}>
      {children}
    </button>
  );
};
