import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, type Case, type CaseCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { HandHeart, Users, Stethoscope, GraduationCap, HomeIcon, LifeBuoy } from "lucide-react";

const CATEGORY_ICON: Record<CaseCategory, React.ElementType> = {
  medical: Stethoscope,
  education: GraduationCap,
  family: HomeIcon,
  relief: LifeBuoy,
};

export function CaseCard({ c }: { c: Case }) {
  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
  const Icon = CATEGORY_ICON[c.category];

  return (
    <Link
      to={`/case/${c.id}`}
      className="group block bg-surface rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
    >
      {/* Top strip */}
      <div className="relative px-4 pt-4 pb-3 bg-gradient-to-bl from-primary/8 via-surface to-accent/5">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-soft">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <Badge className="bg-primary/10 text-primary border-0 font-bold text-[10px] h-5">
                {CATEGORY_LABEL[c.category]}
              </Badge>
              {c.urgent && (
                <Badge className="bg-destructive text-destructive-foreground border-0 gap-1 text-[10px] h-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  عاجل
                </Badge>
              )}
            </div>
            <h3 className="font-extrabold text-foreground text-base leading-snug line-clamp-1">
              {c.title}
            </h3>
          </div>
          <div className="bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-glow shrink-0">
            {pct}٪
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 pt-1 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{c.shortDesc}</p>

        {c.beneficiaries && (
          <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {c.beneficiaries.toLocaleString("ar-EG")} مستفيد
          </p>
        )}

        <div className="space-y-1.5">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-accent rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-primary tabular-nums">{formatCurrency(c.raised)}</span>
            <span className="text-muted-foreground">
              من <span className="font-semibold text-foreground tabular-nums">{formatCurrency(c.goal)}</span>
            </span>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-1.5"
        >
          <HandHeart className="h-4 w-4" />
          تبرع الآن
        </Button>
      </div>
    </Link>
  );
}
