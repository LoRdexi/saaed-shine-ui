import { useParams, Link } from "react-router-dom";
import { useMartyrs } from "@/lib/martyrs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  MapPin,
  User as UserIcon,
  Quote,
  BookOpen,
  Flame,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export default function MartyrDetail() {
  const { id } = useParams();
  const martyr = useMartyrs((s) => s.martyrs.find((m) => m.id === id));

  if (!martyr) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <p className="text-muted-foreground">لم يتم العثور على هذا الملف.</p>
        <Link to="/martyrs">
          <Button className="mt-4 rounded-full">العودة للقائمة</Button>
        </Link>
      </div>
    );
  }

  const age =
    martyr.birthYear && martyr.martyrdomDate
      ? new Date(martyr.martyrdomDate).getFullYear() - martyr.birthYear
      : undefined;

  const dateLabel = new Date(martyr.martyrdomDate).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onShare = () => {
    toast.success("تم نسخ رابط الملف", {
      description: "شارك سيرة الشهيد مع أحبائك.",
    });
  };

  return (
    <div className="pb-10 bg-background">
      {/* Hero — full bleed portrait */}
      <div className="relative h-[420px] overflow-hidden">
        {martyr.image ? (
          <img
            src={martyr.image}
            alt={martyr.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-extrabold text-7xl">
            {martyr.name.charAt(0)}
          </div>
        )}

        {/* Top dark fade for buttons legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom dark fade for name */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/70 to-transparent" />

        {/* Top action bar */}
        <div className="absolute inset-x-0 top-0 px-4 pt-4 flex items-center justify-between">
          <Link
            to="/martyrs"
            className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
            aria-label="رجوع"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button
            onClick={onShare}
            className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
            aria-label="مشاركة"
          >
            <Share2 className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Martyr ribbon */}
        <div className="absolute top-20 right-4 inline-flex items-center gap-1.5 bg-accent text-accent-foreground rounded-full px-3 py-1 text-[11px] font-extrabold shadow-glow">
          <Flame className="h-3 w-3" />
          شهيد
        </div>

        {/* Name overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <p className="text-xs text-accent font-semibold mb-1.5">
            رحمه الله وتقبّله في الشهداء
          </p>
          <h1 className="text-2xl font-extrabold text-foreground leading-tight">
            {martyr.name}
          </h1>
          {martyr.role && (
            <p className="text-sm text-secondary mt-1.5 font-semibold">
              {martyr.role}
            </p>
          )}
        </div>
      </div>

      {/* Quick facts strip */}
      <section className="px-5 -mt-2">
        <div className="bg-surface rounded-3xl border border-border shadow-elevated grid grid-cols-3 divide-x divide-x-reverse divide-border overflow-hidden">
          <Fact
            icon={Calendar}
            label="الاستشهاد"
            value={dateLabel.replace(/ /g, "\u00A0").split("\u00A0").slice(0, 2).join(" ")}
          />
          <Fact
            icon={UserIcon}
            label="العمر"
            value={age !== undefined ? `${age} سنة` : "—"}
          />
          <Fact
            icon={MapPin}
            label="البلدة"
            value={martyr.hometown || "—"}
          />
        </div>
      </section>

      {/* Quote / dedication card */}
      <section className="px-5 mt-5">
        <div className="relative gradient-hero text-primary-foreground rounded-3xl p-5 shadow-elevated overflow-hidden">
          <Quote className="absolute -top-2 -left-2 h-20 w-20 text-primary-foreground/10" />
          <div className="relative">
            <p className="text-[11px] font-semibold text-accent">آية كريمة</p>
            <p className="text-sm leading-7 mt-2 font-semibold">
              «وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ
              أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ»
            </p>
            <p className="text-[11px] text-primary-foreground/70 mt-2">
              آل عمران — 169
            </p>
          </div>
        </div>
      </section>

      {/* Biography */}
      <Section icon={BookOpen} title="السيرة الذاتية">
        <p className="text-sm text-foreground leading-7 whitespace-pre-line">
          {martyr.bio}
        </p>
      </Section>

      {/* Martyrdom story */}
      {martyr.martyrdomStory && (
        <Section icon={Flame} title="قصة الاستشهاد" accent>
          <p className="text-sm text-foreground leading-8 whitespace-pre-line">
            {martyr.martyrdomStory}
          </p>
        </Section>
      )}

      {/* Detailed info grid */}
      <section className="px-5 pt-5">
        <h3 className="text-sm font-bold text-foreground mb-2.5">
          معلومات إضافية
        </h3>
        <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden">
          <Row label="الاسم الكامل" value={martyr.name} />
          {martyr.birthYear && (
            <Row label="سنة الميلاد" value={String(martyr.birthYear)} />
          )}
          <Row label="تاريخ الاستشهاد" value={dateLabel} />
          {martyr.hometown && <Row label="البلدة" value={martyr.hometown} />}
          {martyr.role && <Row label="الدور / المهنة" value={martyr.role} />}
        </div>
      </section>

      {/* Footer dedication */}
      <section className="px-5 pt-6">
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center">
          <p className="text-xs text-foreground leading-6">
            هذه السيرة جزءٌ من سجل الشهداء في{" "}
            <span className="font-extrabold text-primary">ساعد</span>.
            <br />
            ساهم في توثيق المزيد لتبقى ذاكرتنا حيّة.
          </p>
          <Link to="/martyrs/new">
            <Button className="mt-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              إضافة شهيد آخر
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 text-center">
      <Icon className="h-4 w-4 text-primary mx-auto" />
      <p className="text-[10px] text-muted-foreground mt-1.5">{label}</p>
      <p className="text-xs font-extrabold text-foreground mt-0.5 truncate">
        {value}
      </p>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 pt-6">
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className={
            accent
              ? "h-7 w-7 rounded-lg bg-accent/20 text-accent-foreground flex items-center justify-center"
              : "h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
          }
        >
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-extrabold text-foreground">{title}</h3>
      </div>
      <div
        className={
          accent
            ? "bg-surface rounded-2xl border-r-4 border-accent border-y border-l border-border p-4 shadow-soft"
            : "bg-surface rounded-2xl border border-border p-4 shadow-soft"
        }
      >
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-bold text-foreground">{value}</span>
    </div>
  );
}
