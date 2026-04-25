import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Users,
  TrendingUp,
  HeartPulse,
  Stethoscope,
  GraduationCap,
  Home as HomeIcon,
  Utensils,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { useAppStore, useTotalRaised, useTotalDonatedToday } from "@/lib/store";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const QUICK_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function GeneralFund() {
  const donate = useAppStore((s) => s.donate);
  const totalDonors = useAppStore((s) => s.totalDonors);
  const totalRaised = useTotalRaised();
  const todayTotal = useTotalDonatedToday();
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");

  const finalAmount = custom ? Number(custom) : amount;

  const handleDonate = () => {
    if (!finalAmount || finalAmount < 1) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }
    donate("general", finalAmount);
    toast.success(`تم التبرع بـ ${formatCurrency(finalAmount)} للصندوق العام`, {
      description: "بارك الله بك — تبرعك ظهر في شاشة الشفافية مباشرة.",
    });
    setCustom("");
  };

  const onShare = () => {
    toast.success("تم نسخ رابط الصندوق العام", {
      description: "شارك الخير مع أحبابك.",
    });
  };

  return (
    <div className="pb-10 bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden gradient-hero text-primary-foreground rounded-b-[2rem] pb-8">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute top-20 -left-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl" />

        {/* Top bar */}
        <div className="relative px-4 pt-4 flex items-center justify-between">
          <Link
            to="/home"
            className="h-10 w-10 rounded-full bg-primary-foreground/15 backdrop-blur-md flex items-center justify-center border border-primary-foreground/20"
            aria-label="رجوع"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button
            onClick={onShare}
            className="h-10 w-10 rounded-full bg-primary-foreground/15 backdrop-blur-md flex items-center justify-center border border-primary-foreground/20"
            aria-label="مشاركة"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Title block */}
        <div className="relative px-5 pt-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground rounded-full px-3 py-1 text-[11px] font-extrabold shadow-glow">
            <Sparkles className="h-3 w-3" />
            صندوق ساعد العام
          </div>
          <h1 className="text-2xl font-extrabold mt-3 leading-tight">
            تبرّع واحد <span className="text-accent">يصل لكل محتاج</span>
          </h1>
          <p className="text-sm text-primary-foreground/80 mt-2 leading-relaxed">
            نوزّع تبرعك بحكمة على الحالات الأكثر إلحاحاً لحظة وصوله.
          </p>
        </div>

        {/* Live counter */}
        <div className="relative mx-5 mt-6 bg-primary-foreground/10 backdrop-blur-md rounded-2xl border border-primary-foreground/20 p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-[11px] font-semibold text-primary-foreground/90">
              تبرعات اليوم — مباشر
            </p>
          </div>
          <p className="text-center text-3xl font-extrabold mt-1.5 tabular-nums">
            {formatCurrency(todayTotal)}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-primary-foreground/15">
            <MiniStat
              icon={Users}
              label="متبرع"
              value={formatNumber(totalDonors)}
            />
            <MiniStat
              icon={TrendingUp}
              label="إجمالي التبرعات"
              value={formatCurrency(totalRaised + todayTotal)}
            />
          </div>
        </div>
      </div>

      {/* Donate panel */}
      <section className="px-5 -mt-4 relative">
        <div className="bg-surface rounded-3xl border border-border shadow-elevated p-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/15 text-accent-foreground flex items-center justify-center">
              <HandHeart className="h-4 w-4" />
            </div>
            <h3 className="font-extrabold text-foreground">اختر مبلغ تبرعك</h3>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                className={cn(
                  "h-12 rounded-xl text-sm font-extrabold border-2 transition-all tabular-nums",
                  amount === a && !custom
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-muted/40 border-border text-foreground hover:border-primary/40",
                )}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <label className="text-[11px] font-semibold text-muted-foreground">
              أو أدخل مبلغاً مخصصاً
            </label>
            <div className="relative mt-1">
              <Input
                type="number"
                inputMode="numeric"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="مثال: 175"
                className="h-12 pr-4 pl-16 text-base font-bold rounded-xl"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                ر.س
              </span>
            </div>
          </div>

          <Button
            onClick={handleDonate}
            size="lg"
            className="w-full mt-4 h-14 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-extrabold text-base gap-2 shadow-glow"
          >
            <HandHeart className="h-5 w-5" />
            تبرّع الآن بـ {formatCurrency(finalAmount || 0)}
          </Button>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-foreground" />
            تبرعك مؤمَّن وموثَّق في سجل الشفافية
          </div>
        </div>
      </section>

      {/* What is the General Fund */}
      <section className="px-5 pt-7">
        <h3 className="font-extrabold text-foreground">ما هو الصندوق العام؟</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-7">
          الصندوق العام لـ <span className="font-bold text-primary">ساعد</span>{" "}
          هو وعاء تبرعات موحّد، نوجّه أمواله إلى الحالات الأكثر إلحاحاً في
          الوقت المناسب — دون الحاجة لاختيار حالة بعينها. فريقنا الميداني يتابع
          الأولويات يومياً ويصرف التبرعات وفق دراسة دقيقة لكل حالة.
        </p>
      </section>

      {/* How money is spent */}
      <section className="px-5 pt-6">
        <h3 className="font-extrabold text-foreground mb-3">كيف يُصرف تبرعك؟</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <SpendCard
            icon={Stethoscope}
            label="حالات طبية"
            pct={40}
          />
          <SpendCard
            icon={Utensils}
            label="إغاثة وغذاء"
            pct={30}
          />
          <SpendCard
            icon={GraduationCap}
            label="تعليم وأيتام"
            pct={20}
          />
          <SpendCard icon={HomeIcon} label="إيواء وأسر" pct={10} />
        </div>
      </section>

      {/* Why donate */}
      <section className="px-5 pt-7">
        <h3 className="font-extrabold text-foreground mb-3">
          لماذا الصندوق العام؟
        </h3>
        <div className="space-y-2.5">
          <Reason
            title="وصول أسرع للمحتاج"
            desc="لا انتظار لاكتمال هدف حالة واحدة — تبرعك يُصرف فوراً."
          />
          <Reason
            title="توزيع عادل ومدروس"
            desc="فريقنا يحدّد الأولويات بناءً على شدة الحاجة لا الترتيب الزمني."
          />
          <Reason
            title="شفافية مطلقة"
            desc="كل ريال يظهر في سجل الشفافية لحظة استلامه ولحظة صرفه."
          />
          <Reason
            title="أجر متعدد"
            desc="تبرع واحد يصل لعشرات الحالات بدلاً من حالة واحدة فقط."
          />
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-5 pt-7">
        <div className="bg-surface rounded-2xl border border-border p-4 grid grid-cols-3 gap-2 text-center">
          <Trust icon={ShieldCheck} label="مرخّص رسمياً" />
          <Trust icon={HeartPulse} label="رقابة مستمرة" />
          <Trust icon={Users} label="فريق ميداني" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pt-7">
        <div className="gradient-accent text-accent-foreground rounded-3xl p-5 text-center shadow-elevated">
          <p className="text-sm font-bold leading-relaxed">
            «مَن فرّج عن مؤمنٍ كربةً من كرب الدنيا، فرّج الله عنه كربةً من كرب
            يوم القيامة»
          </p>
          <Button
            onClick={() => {
              window.scrollTo({ top: 280, behavior: "smooth" });
            }}
            className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-extrabold gap-2"
          >
            <HandHeart className="h-4 w-4" />
            ابدأ تبرعك الآن
          </Button>
        </div>
      </section>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-1 text-[10px] text-primary-foreground/70">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <p className="text-sm font-extrabold mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}

function SpendCard({
  icon: Icon,
  label,
  pct,
}: {
  icon: React.ElementType;
  label: string;
  pct: number;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-3 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs font-extrabold text-accent-foreground bg-accent/15 rounded-full px-2 py-0.5 tabular-nums">
          {pct}٪
        </span>
      </div>
      <p className="text-xs font-bold text-foreground mt-2">{label}</p>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
        <div
          className="h-full gradient-accent rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Reason({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-surface rounded-2xl border border-border p-3 shadow-soft">
      <div className="h-8 w-8 rounded-full bg-accent/15 text-accent-foreground flex items-center justify-center shrink-0">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="font-bold text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-6">{desc}</p>
      </div>
    </div>
  );
}

function Trust({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div>
      <Icon className="h-5 w-5 text-primary mx-auto" />
      <p className="text-[10px] font-bold text-foreground mt-1">{label}</p>
    </div>
  );
}
