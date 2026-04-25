import { useParams, Link } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { useMartyrs } from "@/lib/martyrs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User as UserIcon, Heart } from "lucide-react";

export default function MartyrDetail() {
  const { id } = useParams();
  const martyr = useMartyrs((s) => s.martyrs.find((m) => m.id === id));

  if (!martyr) {
    return (
      <div>
        <ScreenHeader title="الشهيد" />
        <div className="px-5 py-10 text-center">
          <p className="text-muted-foreground">لم يتم العثور على هذا الملف.</p>
          <Link to="/martyrs">
            <Button className="mt-4 rounded-full">العودة للقائمة</Button>
          </Link>
        </div>
      </div>
    );
  }

  const age =
    martyr.birthYear && martyr.martyrdomDate
      ? new Date(martyr.martyrdomDate).getFullYear() - martyr.birthYear
      : undefined;

  return (
    <div className="pb-8">
      <ScreenHeader title="ملف الشهيد" />

      <div className="relative h-56 overflow-hidden">
        {martyr.image ? (
          <img src={martyr.image} alt={martyr.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full gradient-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <section className="px-5 -mt-10 relative">
        <div className="bg-surface rounded-3xl border border-border p-5 shadow-elevated">
          <div className="flex items-center gap-2 text-accent">
            <Heart className="h-4 w-4 fill-current" />
            <span className="text-xs font-bold">رحمه الله وتقبّله في الشهداء</span>
          </div>
          <h1 className="text-xl font-extrabold text-primary mt-2">{martyr.name}</h1>
          {martyr.role && <p className="text-sm text-secondary mt-1">{martyr.role}</p>}

          <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
            {martyr.hometown && (
              <Info icon={MapPin} label="البلدة" value={martyr.hometown} />
            )}
            <Info
              icon={Calendar}
              label="تاريخ الاستشهاد"
              value={new Date(martyr.martyrdomDate).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            {martyr.birthYear && (
              <Info icon={UserIcon} label="سنة الميلاد" value={String(martyr.birthYear)} />
            )}
            {age !== undefined && (
              <Info icon={UserIcon} label="العمر" value={`${age} سنة`} />
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pt-5">
        <h3 className="text-sm font-bold text-foreground mb-2">السيرة الذاتية</h3>
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft">
          <p className="text-sm text-foreground leading-7 whitespace-pre-line">{martyr.bio}</p>
        </div>
      </section>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-muted/60 rounded-xl p-2.5 flex items-start gap-2">
      <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="font-bold text-foreground text-xs truncate">{value}</p>
      </div>
    </div>
  );
}
