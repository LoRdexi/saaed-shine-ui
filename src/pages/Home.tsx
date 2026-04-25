import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ChevronLeft, HandHeart, HeartPulse, Plus, ScrollText, TrendingUp, Users } from "lucide-react";
import { useMartyrs } from "@/lib/martyrs";
import { useAppStore, useTotalDonatedToday, useTotalRaised } from "@/lib/store";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CATEGORY_LABEL } from "@/lib/types";

const QUICK_AMOUNTS = [10, 50, 100, 500];

export default function Home() {
  const user = useAppStore((s) => s.user);
  const cases = useAppStore((s) => s.cases);
  const donate = useAppStore((s) => s.donate);
  const totalDonors = useAppStore((s) => s.totalDonors);
  const totalRaised = useTotalRaised();
  const todayTotal = useTotalDonatedToday();
  const [amount, setAmount] = useState(50);
  const urgent = cases.filter((c) => c.urgent).slice(0, 4);
  const supported = cases.filter((c) => c.raised > 0).length;
  const martyrs = useMartyrs((s) => s.martyrs);

  const handleDonate = () => {
    donate("general", amount);
    toast.success(`تم التبرع بـ ${formatCurrency(amount)} للصندوق العام`, {
      description: "شكراً لكرمك — ظهر تبرعك في شاشة الشفافية مباشرة.",
    });
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <header className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">السلام عليكم</p>
          <h1 className="text-lg font-extrabold text-primary">{user?.name?.split(" ")[0] || "صديق ساعد"} 👋</h1>
        </div>
        <button className="relative h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center" aria-label="إشعارات">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
        </button>
      </header>

      {/* Hero donation card */}
      <section className="px-5">
        <div className="gradient-hero text-primary-foreground rounded-3xl p-5 shadow-elevated relative overflow-hidden">
          <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative">
            <Badge className="bg-accent text-accent-foreground border-0 mb-3">الصندوق العام</Badge>
            <h2 className="text-xl font-bold">تبرع تصرفه ساعد حيث الحاجة الأكبر</h2>
            <p className="text-sm text-primary-foreground/80 mt-1">اختر مبلغاً وابدأ خيرك الآن</p>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={cn(
                    "h-11 rounded-xl text-sm font-bold border transition-all",
                    amount === a
                      ? "bg-accent text-accent-foreground border-accent shadow-glow"
                      : "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>

            <Button onClick={handleDonate} size="lg" className="w-full mt-4 h-12 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <HandHeart className="h-5 w-5" />
              تبرع الآن بـ {formatCurrency(amount)}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 mt-5 grid grid-cols-3 gap-2.5">
        <Stat icon={Users} value={formatNumber(totalDonors)} label="متبرع" />
        <Stat icon={TrendingUp} value={formatCurrency(totalRaised + todayTotal)} label="إجمالي التبرعات" compact />
        <Stat icon={HeartPulse} value={formatNumber(supported)} label="حالة مدعومة" />
      </section>

      {/* Urgent carousel */}
      <section className="mt-7">
        <div className="px-5 flex items-center justify-between">
          <h3 className="font-bold text-foreground">حالات عاجلة</h3>
          <Link to="/cases" className="text-xs font-semibold text-secondary inline-flex items-center gap-0.5">
            عرض الكل <ChevronLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {urgent.map((c) => (
            <Link
              key={c.id}
              to={`/case/${c.id}`}
              className="shrink-0 w-56 bg-surface rounded-2xl border border-border overflow-hidden shadow-soft"
            >
              <div className="h-28 bg-muted overflow-hidden relative">
                <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground border-0">عاجل</Badge>
              </div>
              <div className="p-3">
                <p className="text-[11px] text-secondary font-semibold">{CATEGORY_LABEL[c.category]}</p>
                <h4 className="text-sm font-bold text-foreground line-clamp-1 mt-0.5">{c.title}</h4>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-accent" style={{ width: `${Math.min(100, (c.raised / c.goal) * 100)}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Martyrs section */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-foreground">سجل الشهداء</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">نخلّد ذكراهم ونروي سيرتهم</p>
          </div>
          <Link to="/martyrs/new" className="text-xs font-semibold text-accent-foreground bg-accent rounded-full px-3 py-1.5 inline-flex items-center gap-1">
            <Plus className="h-3.5 w-3.5" />
            إضافة شهيد
          </Link>
        </div>
        <Link
          to="/martyrs"
          className="block bg-surface rounded-2xl border border-border p-4 shadow-soft hover:shadow-elevated transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 space-x-reverse">
              {martyrs.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="h-10 w-10 rounded-full ring-2 ring-surface overflow-hidden bg-muted"
                >
                  {m.image ? (
                    <img src={m.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full gradient-primary" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">
                {martyrs.length.toLocaleString("ar-EG")} شهيداً موثّقاً
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">تصفّح سيرهم وملفاتهم الشخصية</p>
            </div>
            <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ScrollText className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Shortcuts */}
      <section className="px-5 mt-6 grid grid-cols-2 gap-3">
        <Shortcut to="/cases" title="تصفح الحالات" desc="ادعم حالة محددة" tone="primary" />
        <Shortcut to="/transparency" title="الشفافية المباشرة" desc="تابع التبرعات لحظياً" tone="accent" />
      </section>
    </div>
  );
}

function Stat({
  icon: Icon, value, label, compact,
}: { icon: React.ElementType; value: string; label: string; compact?: boolean }) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-3 shadow-soft">
      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <p className={cn("font-extrabold text-foreground mt-2", compact ? "text-sm" : "text-base")}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Shortcut({ to, title, desc, tone }: { to: string; title: string; desc: string; tone: "primary" | "accent" }) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-2xl p-4 border shadow-soft hover:shadow-elevated transition-all",
        tone === "primary"
          ? "bg-surface border-border"
          : "gradient-accent border-transparent text-accent-foreground",
      )}
    >
      <p className="text-sm font-bold">{title}</p>
      <p className={cn("text-xs mt-0.5", tone === "primary" ? "text-muted-foreground" : "text-accent-foreground/80")}>
        {desc}
      </p>
    </Link>
  );
}
