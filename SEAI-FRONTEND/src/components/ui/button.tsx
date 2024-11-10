import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant, size, disabled }) => {
  const baseStyle = 'px-4 py-2 rounded';
  const variantStyle = variant === 'destructive' ? 'bg-red-500 text-white' : 'border border-gray-300';
  const sizeStyle = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-md';

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${sizeStyle}`} disabled={disabled}>
      {children}
    </button>
  );
};
