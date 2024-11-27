import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  isLoading,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" &&
          "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        variant === "secondary" &&
          "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
