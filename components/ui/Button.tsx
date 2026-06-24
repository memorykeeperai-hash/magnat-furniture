import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "gold" | "text";
  showArrow?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  showArrow = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles = "btn flex items-center justify-center gap-2 transition-all duration-300 active:scale-95";
  
  const variantStyles = {
    primary: "bg-[#111] text-[#FCFCFC] uppercase font-bold tracking-widest hover:bg-[#C0001A] rounded-full px-8 py-3",
    outline: "border border-[#111] text-[#111] uppercase font-bold tracking-widest hover:bg-[#111] hover:text-[#FCFCFC] rounded-full px-8 py-3",
    gold: "bg-[#c9a96e] text-[#FCFCFC] uppercase font-bold tracking-widest hover:bg-[#111] rounded-full px-8 py-3",
    text: "p-0 bg-transparent text-[#111] font-bold uppercase tracking-widest text-sm hover:text-[#C0001A]",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight size={16} className={variant === "text" ? "transition-transform group-hover:translate-x-1" : ""} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${combinedClassName} group`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${combinedClassName} group`}>
      {content}
    </button>
  );
}
