import * as React from "react";
import { cn } from "../lib/utils"; // utils dosyasının doğru yolunu kontrol edin

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string; // Eksik olan className prop'u eklendi
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      onChange,
      type = "text",
      placeholder = "",
      className = "", // className için varsayılan değer eklendi
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
