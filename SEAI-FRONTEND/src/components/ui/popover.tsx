"use client"

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../lib/utils"; // Kullanıyorsanız, stil birleştirme fonksiyonu

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg outline-none",
        "data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut",
        "data-[side=bottom]:animate-slideInFromTop data-[side=left]:animate-slideInFromRight data-[side=right]:animate-slideInFromLeft data-[side=top]:animate-slideInFromBottom",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
