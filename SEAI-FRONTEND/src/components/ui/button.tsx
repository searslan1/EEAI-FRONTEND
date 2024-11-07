import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'destructive';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant, className = '' }) => {
  const variantClass =
    variant === 'outline' ? 'border border-gray-300 text-gray-700' : 
    variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-blue-500 text-white';
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};
