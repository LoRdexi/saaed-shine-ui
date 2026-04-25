import { Link } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useMartyrs } from "@/lib/martyrs";
import { Plus, ChevronLeft, MapPin } from "lucide-react";

export default function Martyrs() {
  const martyrs = useMartyrs((s) => s.martyrs);

  return (
    <div className="pb-6">
      <ScreenHeader
        title="سجل الشهداء"
        subtitle="نخلّد ذكراهم ونروي سيرتهم"
        right={
          <Link to="/martyrs/new">
            <Button size="sm" className="rounded-full bg-primary h-9 gap-1">
              <Plus className="h-4 w-4" />
              إضافة
            </Button>
          </Link>
        }
      />

      <section className="px-5 pt-4">
        <div className="gradient-hero text-primary-foreground rounded-3xl p-5 shadow-elevated relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <p className="relative text-xs text-primary-foreground/80">إجمالي الشهداء الموثّقين</p>
          <p className="relative text-3xl font-extrabold mt-1">{martyrs.length.toLocaleString("ar-EG")}</p>
          <p className="relative text-xs text-primary-foreground/70 mt-2 leading-relaxed">
            كل اسم هنا قصة. ساهم في توثيق سيرتهم لتبقى ذاكرة الأمة حيّة.
          </p>
        </div>
      </section>

      <section className="px-5 pt-5 space-y-3">
        {martyrs.map((m) => (
          <Link
            key={m.id}
            to={`/martyrs/${m.id}`}
            className="flex items-center gap-3 bg-surface rounded-2xl border border-border p-3 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
          >
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-muted shrink-0 ring-2 ring-accent/30">
              {m.image ? (
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-extrabold text-xl">
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground truncate">{m.name}</p>
              {m.role && <p className="text-xs text-secondary mt-0.5 truncate">{m.role}</p>}
              {m.hometown && (
                <p className="text-[11px] text-muted-foreground mt-1 inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {m.hometown}
                </p>
              )}
            </div>
            <ChevronLeft className="h-5 w-5 text-muted-foreground shrink-0" />
          </Link>
        ))}
      </section>
    </div>
  );
}
