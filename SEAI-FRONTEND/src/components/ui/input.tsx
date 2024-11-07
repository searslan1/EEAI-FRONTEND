import React from 'react';

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ id, value, onChange, type = 'text', className = '' }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    type={type}
    className={`border rounded px-3 py-2 ${className}`}
  />
);
