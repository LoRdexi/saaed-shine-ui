import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { useAppStore } from "@/lib/store";
import { CATEGORY_LABEL } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/format";
import { HandHeart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AMOUNTS = [25, 50, 100, 200, 500, 1000];

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = useAppStore((s) => s.cases.find((x) => x.id === id));
  const donate = useAppStore((s) => s.donate);
  const [amount, setAmount] = useState(100);

  if (!c) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">الحالة غير موجودة</p>
      </div>
    );
  }

  const handleDonate = () => {
    donate(c.id, amount);
    toast.success(`تم التبرع بـ ${formatCurrency(amount)} لـ ${c.title}`, {
      description: "بارك الله بك — تبرعك ظاهر الآن في شاشة الشفافية.",
    });
    navigate("/transparency");
  };

  return (
    <div className="pb-28">
      <ScreenHeader title={c.title} subtitle={CATEGORY_LABEL[c.category]} />

      <div className="relative h-56 bg-muted overflow-hidden">
        <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {c.urgent && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground border-0">
            حالة عاجلة
          </Badge>
        )}
      </div>

      <div className="px-5 -mt-10 relative">
        <div className="bg-surface rounded-2xl border border-border shadow-elevated p-5 space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">{c.title}</h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.story}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground">تم جمع</p>
              <p className="font-extrabold text-primary mt-0.5">{formatCurrency(c.raised)}</p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground">الهدف</p>
              <p className="font-extrabold text-foreground mt-0.5">{formatCurrency(c.goal)}</p>
            </div>
          </div>

          <ProgressBar value={c.raised} max={c.goal} />

          {c.beneficiaries && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/10 rounded-xl p-3">
              <Users className="h-4 w-4 text-accent-foreground" />
              <span>عدد المستفيدين: <b className="text-foreground">{formatNumber(c.beneficiaries)}</b></span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 className="text-sm font-bold text-foreground mb-3">اختر مبلغ التبرع</h3>
        <div className="grid grid-cols-3 gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={cn(
                "h-12 rounded-xl border text-sm font-bold transition-all",
                amount === a
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-surface text-foreground border-border hover:border-primary/40",
              )}
            >
              {formatCurrency(a)}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 bg-surface/95 backdrop-blur-md border-t border-border">
        <div className="max-w-[440px] mx-auto">
          <Button onClick={handleDonate} className="w-full h-13 py-3.5 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow text-base">
            <HandHeart className="h-5 w-5" />
            تبرع بـ {formatCurrency(amount)}
          </Button>
        </div>
      </div>
    </div>
  );
}
