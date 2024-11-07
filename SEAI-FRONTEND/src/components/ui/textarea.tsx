import React from 'react';

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ id, value, onChange, className = '' }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    className={`border rounded px-3 py-2 ${className}`}
  />
);
