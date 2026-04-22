import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { CATEGORY_LABEL, type Case } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

export function CaseCard({ c }: { c: Case }) {
  return (
    <Link
      to={`/case/${c.id}`}
      className="block bg-surface rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
    >
      <div className="relative h-40 overflow-hidden bg-muted">
        <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {c.urgent && (
            <Badge className="bg-destructive text-destructive-foreground border-0 shadow-soft">
              عاجل
            </Badge>
          )}
          <Badge variant="secondary" className="bg-surface/95 text-primary border-0">
            {CATEGORY_LABEL[c.category]}
          </Badge>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-foreground line-clamp-1">{c.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{c.shortDesc}</p>
        </div>
        <ProgressBar value={c.raised} max={c.goal} />
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            <span className="font-bold text-foreground">{formatCurrency(c.raised)}</span> من{" "}
            {formatCurrency(c.goal)}
          </span>
          <Button size="sm" className="h-8 rounded-full px-4 bg-primary hover:bg-primary/90">
            تبرع
          </Button>
        </div>
      </div>
    </Link>
  );
}
