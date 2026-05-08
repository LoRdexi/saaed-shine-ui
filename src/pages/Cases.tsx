import { useMemo, useState } from "react";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { CaseCard } from "@/components/CaseCard";
import { useAppStore } from "@/lib/store";
import { CATEGORY_LABEL, type CaseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import {
  Search,
  Layers,
  Stethoscope,
  GraduationCap,
  Home as HomeIcon,
  LifeBuoy,
  Flame,
  SlidersHorizontal,
} from "lucide-react";

const FILTERS: { id: "all" | CaseCategory; label: string; Icon: React.ElementType }[] = [
  { id: "all", label: "الكل", Icon: Layers },
  { id: "medical", label: CATEGORY_LABEL.medical, Icon: Stethoscope },
  { id: "education", label: CATEGORY_LABEL.education, Icon: GraduationCap },
  { id: "family", label: CATEGORY_LABEL.family, Icon: HomeIcon },
  { id: "relief", label: CATEGORY_LABEL.relief, Icon: LifeBuoy },
];

type Sort = "urgent" | "progress" | "recent";

export default function Cases() {
  const cases = useAppStore((s) => s.cases);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("urgent");

  const list = useMemo(() => {
    let arr = filter === "all" ? cases : cases.filter((c) => c.category === filter);
    if (query.trim()) {
      const q = query.trim();
      arr = arr.filter(
        (c) => c.title.includes(q) || c.shortDesc?.includes(q),
      );
    }
    arr = [...arr].sort((a, b) => {
      if (sort === "urgent") return Number(!!b.urgent) - Number(!!a.urgent);
      if (sort === "progress") return b.raised / b.goal - a.raised / a.goal;
      return 0;
    });
    return arr;
  }, [filter, cases, query, sort]);

  const totalRaised = useMemo(
    () => cases.reduce((s, c) => s + c.raised, 0),
    [cases],
  );
  const urgentCount = useMemo(() => cases.filter((c) => c.urgent).length, [cases]);

  return (
    <div className="pb-6">
      <ScreenHeader
        title="الحالات المحتاجة"
        subtitle={`${list.length} حالة بانتظار دعمك`}
        back={false}
      />

      {/* Hero stats strip */}
      <div className="px-5 pt-3">
        <div className="relative overflow-hidden rounded-2xl gradient-hero text-primary-foreground p-4 shadow-elevated">
          <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-accent/25 blur-2xl" />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-primary-foreground/75">إجمالي ما تم جمعه</p>
              <p className="text-xl font-extrabold mt-0.5 tabular-nums">
                {formatCurrency(totalRaised)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-destructive/90 text-destructive-foreground px-2.5 h-7 rounded-full">
                <Flame className="h-3.5 w-3.5" />
                {urgentCount} عاجلة
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-accent/25 text-primary-foreground px-2.5 h-7 rounded-full border border-accent/40">
                {cases.length} حالة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pt-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن حالة…"
            className="w-full h-11 pr-9 pl-3 rounded-xl bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="px-5 pt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const Icon = f.Icon;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 h-9 pr-3 pl-3.5 rounded-full text-xs font-bold border transition-all inline-flex items-center gap-1.5",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-surface text-foreground border-border hover:border-primary/40",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Sort row */}
      <div className="px-5 pt-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          الترتيب
        </div>
        <div className="flex gap-1.5">
          {([
            { id: "urgent", label: "العاجلة" },
            { id: "progress", label: "الأكثر دعمًا" },
            { id: "recent", label: "الأحدث" },
          ] as { id: Sort; label: string }[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className={cn(
                "h-7 px-3 rounded-full text-[11px] font-bold border transition-all",
                sort === s.id
                  ? "bg-accent/15 text-accent-foreground border-accent/40"
                  : "bg-surface text-muted-foreground border-border",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-5 pt-4 space-y-3">
        {list.length === 0 ? (
          <div className="bg-surface border border-dashed border-border rounded-2xl p-8 text-center">
            <p className="text-sm font-semibold text-foreground">لا توجد حالات مطابقة</p>
            <p className="text-xs text-muted-foreground mt-1">جرّب تعديل البحث أو التصفية</p>
          </div>
        ) : (
          list.map((c) => <CaseCard key={c.id} c={c} />)
        )}
      </div>
    </div>
  );
}
