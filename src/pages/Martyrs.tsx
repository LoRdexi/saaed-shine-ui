import { Link } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useMartyrs } from "@/lib/martyrs";
import { Plus, MapPin, Flame } from "lucide-react";

export default function Martyrs() {
  const martyrs = useMartyrs((s) => s.martyrs);

  return (
    <div className="pb-6">
      <ScreenHeader
        title="معرض الشهداء"
        subtitle="نخلّد ذكراهم ونروي سيرتهم"
        back={false}
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
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
          <p className="relative text-xs text-primary-foreground/80">إجمالي الشهداء الموثّقين</p>
          <p className="relative text-3xl font-extrabold mt-1">{martyrs.length.toLocaleString("ar-EG")}</p>
          <p className="relative text-xs text-primary-foreground/70 mt-2 leading-relaxed">
            كل اسم هنا قصة. ساهم في توثيق سيرتهم لتبقى ذاكرة الأمة حيّة.
          </p>
        </div>
      </section>

      <section className="px-5 pt-5 grid grid-cols-2 gap-3">
        {martyrs.map((m) => (
          <Link
            key={m.id}
            to={`/martyrs/${m.id}`}
            className="group bg-surface rounded-2xl border border-border shadow-soft overflow-hidden hover:shadow-elevated hover:-translate-y-0.5 transition-all"
          >
            <div className="relative aspect-square bg-muted overflow-hidden">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="h-full w-full gradient-primary flex items-center justify-center text-primary-foreground font-extrabold text-4xl">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-accent/95 text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-extrabold">
                <Flame className="h-3 w-3" />
                شهيد
              </span>
              <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                <p className="font-extrabold text-sm leading-tight line-clamp-2">{m.name}</p>
                {m.hometown && (
                  <p className="text-[10px] text-white/85 mt-1 inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {m.hometown}
                  </p>
                )}
              </div>
            </div>
            {m.role && (
              <p className="px-3 py-2 text-[11px] text-secondary font-semibold truncate">
                {m.role}
              </p>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
