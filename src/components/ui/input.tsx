import * as React from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{ fontFamily: "Poppins, sans-serif" }}
        className={cn(
          "w-full border-b border-gray-200 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
