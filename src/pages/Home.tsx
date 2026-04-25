import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ChevronLeft, HandHeart, HeartPulse, MapPin, Plus, TrendingUp, Users } from "lucide-react";
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

      {/* Martyrs section — placed BEFORE cases */}
      <section className="mt-7">
        <div className="px-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">سجل الشهداء</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">نخلّد ذكراهم ونروي سيرتهم</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/martyrs/new"
              className="text-[11px] font-semibold text-accent-foreground bg-accent rounded-full px-2.5 py-1 inline-flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              إضافة
            </Link>
            <Link to="/martyrs" className="text-xs font-semibold text-secondary inline-flex items-center gap-0.5">
              عرض الكل <ChevronLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {martyrs.slice(0, 6).map((m) => (
            <Link
              key={m.id}
              to={`/martyrs/${m.id}`}
              className="shrink-0 w-44 bg-surface rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 group"
            >
              <div className="relative h-52 bg-muted overflow-hidden">
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-extrabold text-3xl">
                    {m.name.charAt(0)}
                  </div>
                )}
                {/* Dark gradient for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                {/* "Martyr" ribbon */}
                <div className="absolute top-2.5 right-2.5 bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-extrabold shadow-glow">
                  شهيد
                </div>
                {/* Name + meta overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-white font-extrabold text-sm leading-snug line-clamp-2 drop-shadow-md">
                    {m.name}
                  </p>
                  {m.role && (
                    <p className="text-[10px] text-white/85 mt-1 line-clamp-1">{m.role}</p>
                  )}
                  {m.hometown && (
                    <p className="text-[10px] text-white/70 mt-0.5 inline-flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {m.hometown}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Urgent cases — redesigned premium carousel */}
      <section className="mt-7">
        <div className="px-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">حالات عاجلة</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">حالات بحاجة لدعمك الآن</p>
          </div>
          <Link to="/cases" className="text-xs font-semibold text-secondary inline-flex items-center gap-0.5">
            عرض الكل <ChevronLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {urgent.map((c) => {
            const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
            return (
              <Link
                key={c.id}
                to={`/case/${c.id}`}
                className="shrink-0 w-[260px] bg-surface rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 group"
              >
                <div className="relative h-36 overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge className="absolute top-2.5 right-2.5 bg-destructive text-destructive-foreground border-0 gap-1 shadow-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    عاجل
                  </Badge>
                  <div className="absolute top-2.5 left-2.5 bg-white/95 text-primary rounded-full px-2 py-0.5 text-[10px] font-bold">
                    {CATEGORY_LABEL[c.category]}
                  </div>
                  <p className="absolute bottom-2.5 right-3 left-3 text-white font-extrabold text-sm leading-snug line-clamp-2 drop-shadow-md">
                    {c.title}
                  </p>
                </div>

                <div className="p-3 space-y-2.5">
                  {/* Progress with label */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-extrabold text-accent-foreground bg-accent/15 rounded-full px-2 py-0.5">
                        {pct}٪
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-bold text-primary tabular-nums">{formatCurrency(c.raised)}</span>
                        <span className="mx-1">/</span>
                        <span className="tabular-nums">{formatCurrency(c.goal)}</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-accent rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full h-9 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-1.5 text-xs"
                  >
                    <HandHeart className="h-3.5 w-3.5" />
                    تبرع الآن
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
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
