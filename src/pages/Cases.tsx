import { useMemo, useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { CaseCard } from "@/components/CaseCard";
import { useAppStore } from "@/lib/store";
import { CATEGORY_LABEL, type CaseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | CaseCategory; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "medical", label: CATEGORY_LABEL.medical },
  { id: "education", label: CATEGORY_LABEL.education },
  { id: "family", label: CATEGORY_LABEL.family },
  { id: "relief", label: CATEGORY_LABEL.relief },
];

export default function Cases() {
  const cases = useAppStore((s) => s.cases);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const list = useMemo(
    () => (filter === "all" ? cases : cases.filter((c) => c.category === filter)),
    [filter, cases],
  );

  return (
    <div>
      <ScreenHeader title="الحالات المحتاجة" subtitle={`${list.length} حالة بانتظار دعمك`} back={false} />

      <div className="px-5 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 h-9 px-4 rounded-full text-xs font-bold border transition-all",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-surface text-foreground border-border hover:border-primary/40",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="px-5 pt-3 space-y-3">
        {list.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
