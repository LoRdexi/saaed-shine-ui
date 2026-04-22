import { useEffect, useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { useAppStore, useTotalDonatedToday } from "@/lib/store";
import { formatCurrency, timeAgo } from "@/lib/format";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Transparency() {
  const donations = useAppStore((s) => s.donations);
  const todayTotal = useTotalDonatedToday();
  const [scope, setScope] = useState<"all" | "mine">("all");
  const [, force] = useState(0);

  // re-render every 5s so timeAgo stays fresh
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const list = scope === "mine" ? donations.filter((d) => d.isMine) : donations;

  return (
    <div>
      <ScreenHeader
        title="الشفافية المباشرة"
        subtitle="كل تبرع يظهر هنا فور حدوثه"
        back={false}
        right={
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-foreground bg-accent/15 border border-accent/30 px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-accent live-pulse" />
            مباشر
          </span>
        }
      />

      {/* Live counter */}
      <div className="px-5 pt-4">
        <div className="gradient-hero rounded-2xl p-4 text-primary-foreground shadow-elevated relative overflow-hidden">
          <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
          <div className="flex items-center justify-between relative">
            <div>
              <p className="text-xs text-primary-foreground/75">إجمالي تبرعات اليوم</p>
              <p className="text-2xl font-extrabold mt-1 tabular-nums">{formatCurrency(todayTotal)}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-primary-foreground/80">
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            تحديث لحظي من جميع المتبرعين
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div className="px-5 pt-4 flex gap-2">
        {[
          { id: "all", label: "عرض الكل" },
          { id: "mine", label: "تبرعاتي" },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setScope(opt.id as "all" | "mine")}
            className={cn(
              "h-9 px-4 rounded-full text-xs font-bold border transition-all",
              scope === opt.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface text-foreground border-border",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Ticker */}
      <ul className="px-5 pt-3 pb-4 space-y-2">
        {list.length === 0 && (
          <li className="text-center py-12 text-sm text-muted-foreground">لا توجد تبرعات بعد</li>
        )}
        {list.map((d) => {
          const isFresh = Date.now() - d.timestamp < 1500;
          return (
            <li
              key={d.id}
              className={cn(
                "bg-surface border border-border rounded-2xl p-3.5 flex items-center gap-3",
                isFresh && "ticker-flash",
                d.isMine && "border-accent/50 bg-accent/5",
              )}
            >
              <div
                className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0",
                  d.isMine ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary",
                )}
              >
                {d.donorName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-foreground truncate">
                    {d.isMine ? "أنت" : d.donorName}
                  </p>
                  <p className="text-sm font-extrabold text-accent-foreground tabular-nums shrink-0">
                    +{formatCurrency(d.amount)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="text-xs text-muted-foreground truncate">
                    {d.caseTitle}
                  </p>
                  <p className="text-[11px] text-muted-foreground shrink-0">{timeAgo(d.timestamp)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
