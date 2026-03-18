import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-[#f97316] text-white hover:bg-[#ea580c] border border-transparent",
  secondary: "bg-[#161b22] text-[#e6edf3] hover:bg-[#21262d] border border-[#30363d]",
  outline: "bg-transparent text-[#e6edf3] border border-[#30363d] hover:bg-[#161b22]",
  ghost: "bg-transparent text-[#8b949e] border border-transparent hover:bg-[#161b22] hover:text-[#e6edf3]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-5 py-2.5 text-base rounded-xl gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center font-medium transition-all duration-150",
        "focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export { Button };
