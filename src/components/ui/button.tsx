"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 shadow-lg shadow-neon-blue/25",
                secondary:
                    "border-2 border-neon-blue bg-transparent text-neon-blue hover:bg-neon-blue/10",
                ghost:
                    "hover:bg-glass-white text-foreground/80 hover:text-foreground",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600",
                neon:
                    "bg-transparent border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
