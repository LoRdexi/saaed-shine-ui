import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, type Case } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { HandHeart, Users } from "lucide-react";

export function CaseCard({ c }: { c: Case }) {
  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));

  return (
    <Link
      to={`/case/${c.id}`}
      className="group block bg-surface rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
    >
      {/* Image with overlays */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={c.image}
          alt={c.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {c.urgent && (
            <Badge className="bg-destructive text-destructive-foreground border-0 shadow-soft gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              عاجل
            </Badge>
          )}
          <Badge className="bg-white/95 text-primary border-0 font-bold">
            {CATEGORY_LABEL[c.category]}
          </Badge>
        </div>

        {/* Percentage chip */}
        <div className="absolute top-3 left-3 bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-glow">
          {pct}٪
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-extrabold text-white text-base line-clamp-1 drop-shadow-md">{c.title}</h3>
          {c.beneficiaries && (
            <p className="text-[11px] text-white/85 mt-0.5 inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {c.beneficiaries.toLocaleString("ar-EG")} مستفيد
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{c.shortDesc}</p>

        {/* Custom progress bar */}
        <div className="space-y-1.5">
          <div className="h-2 bg-muted rounded-full overflow-hidden relative">
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
