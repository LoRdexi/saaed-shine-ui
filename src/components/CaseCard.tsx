import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, type Case, type CaseCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { HandHeart, Users, Stethoscope, GraduationCap, Home as HomeIcon, LifeBuoy } from "lucide-react";

const CATEGORY_ICON: Record<CaseCategory, React.ElementType> = {
  medical: Stethoscope,
  education: GraduationCap,
  family: HomeIcon,
  relief: LifeBuoy,
};

interface Props {
  c: Case;
  compact?: boolean;
}

export function CaseCard({ c, compact = false }: Props) {
  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
  const Icon = CATEGORY_ICON[c.category];
  // SVG circular progress
  const R = 22;
  const C = 2 * Math.PI * R;
  const dash = (pct / 100) * C;

  return (
    <Link
      to={`/case/${c.id}`}
      className="group relative block bg-surface rounded-3xl border border-border shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Accent side bar */}
      <span className="absolute top-0 right-0 h-full w-1.5 gradient-accent" />
      {/* Soft tinted backdrop */}
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <div className="relative p-4">
        {/* Top row: badges + circular progress */}
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <Badge className="bg-primary/10 text-primary border-0 font-bold text-[10px] h-5 gap-1">
                <Icon className="h-3 w-3" />
                {CATEGORY_LABEL[c.category]}
              </Badge>
              {c.urgent && (
                <Badge className="bg-destructive text-destructive-foreground border-0 gap-1 text-[10px] h-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  عاجل
                </Badge>
              )}
            </div>
            <h3 className="font-extrabold text-foreground text-[15px] leading-snug line-clamp-2">
              {c.title}
            </h3>
            {!compact && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1.5">
                {c.shortDesc}
              </p>
            )}
          </div>

          {/* Circular progress */}
          <div className="relative shrink-0 h-14 w-14">
            <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
              <circle cx="28" cy="28" r={R} className="fill-none stroke-muted" strokeWidth="5" />
              <circle
                cx="28"
                cy="28"
                r={R}
                className="fill-none stroke-accent transition-all duration-700"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-extrabold text-foreground tabular-nums">{pct}٪</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground">تم جمع</p>
            <p className="font-extrabold text-primary tabular-nums leading-tight">
              {formatCurrency(c.raised)}
            </p>
            <p className="text-[10px] text-muted-foreground tabular-nums mt-0.5">
              من {formatCurrency(c.goal)}
            </p>
          </div>
          {c.beneficiaries && (
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground">المستفيدون</p>
              <p className="text-sm font-extrabold text-foreground inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-accent-foreground" />
                {c.beneficiaries.toLocaleString("ar-EG")}
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-accent rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-1.5 mt-3"
        >
          <HandHeart className="h-4 w-4" />
          تبرع الآن
        </Button>
      </div>
    </Link>
  );
}
