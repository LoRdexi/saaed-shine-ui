import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { box: "h-8 w-8", text: "text-lg", icon: "h-4 w-4" },
    md: { box: "h-12 w-12", text: "text-2xl", icon: "h-6 w-6" },
    lg: { box: "h-20 w-20", text: "text-4xl", icon: "h-10 w-10" },
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "gradient-primary rounded-2xl flex items-center justify-center shadow-elevated",
          sizes.box,
        )}
      >
        <Flame className={cn("text-accent fill-accent/40", sizes.icon)} />
      </div>
      <span className={cn("font-extrabold text-primary tracking-tight", sizes.text)}>ساعد</span>
    </div>
  );
}
