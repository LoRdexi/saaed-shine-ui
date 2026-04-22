import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full gradient-accent rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span className="font-semibold text-accent-foreground/80">{pct}%</span>
        <span>تم جمع {pct}% من الهدف</span>
      </div>
    </div>
  );
}
