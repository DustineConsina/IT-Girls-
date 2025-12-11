import { FC, ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "maroon" | "darkred" | "accent" | "highlight" | "soft" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

const Button: FC<CustomButtonProps> = ({
  children,
  variant = "maroon",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    maroon: "bg-maroon text-white hover:bg-maroon/90",
    darkred: "bg-darkred text-white hover:bg-darkred/90",
    accent: "bg-accent text-white hover:bg-accent/90",
    highlight: "bg-highlight text-white hover:bg-highlight/90",
    soft: "bg-soft text-black hover:bg-soft/90",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    link: "text-maroon underline hover:text-darkred",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
