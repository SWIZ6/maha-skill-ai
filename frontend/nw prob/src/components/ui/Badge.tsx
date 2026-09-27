import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "saffron"
    | "deprecate"
    | "highDemand"
    | "critical";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variant === "default" &&
          "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        variant === "secondary" &&
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
        variant === "destructive" &&
          "border-transparent bg-red-100 text-red-800 border-red-200",
        variant === "outline" && "text-slate-700 border-slate-300",
        variant === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-700 font-medium",
        variant === "warning" &&
          "border-amber-200 bg-amber-50 text-amber-800 font-medium",
        variant === "saffron" &&
          "border-orange-200 bg-orange-50 text-orange-700 font-medium",
        // Heavy specialized badges for Diff Engine
        variant === "deprecate" &&
          "border-red-300 bg-red-50 text-red-700 font-bold uppercase tracking-wider text-[10px] animate-pulse",
        variant === "highDemand" &&
          "border-emerald-400 bg-emerald-500/10 text-emerald-800 font-bold tracking-wider text-[11px]",
        variant === "critical" &&
          "border-purple-300 bg-purple-100 text-purple-800 font-bold text-[11px]",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
