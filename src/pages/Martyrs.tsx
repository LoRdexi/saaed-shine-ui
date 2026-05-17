import { Link } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useMartyrs } from "@/lib/martyrs";
import { Plus, MapPin, Calendar } from "lucide-react";

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
        {martyrs.map((m) => {
          const year = m.martyrdomDate
            ? new Date(m.martyrdomDate).getFullYear()
            : null;
          return (
            <Link
              key={m.id}
              to={`/martyrs/${m.id}`}
              className="group bg-surface rounded-xl border border-border shadow-soft overflow-hidden hover:shadow-elevated hover:-translate-y-0.5 transition-all flex flex-col"
            >
              {/* Square portrait */}
              <div className="relative aspect-square bg-muted overflow-hidden border-b-2 border-accent">
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
              </div>

              {/* Formal info block below */}
              <div className="p-3 bg-surface flex-1 flex flex-col">
                <p className="text-[10px] text-accent font-bold tracking-widest uppercase">
                  شهيد
                </p>
                <h3 className="font-extrabold text-sm text-foreground leading-snug mt-1 line-clamp-2 min-h-[2.5rem]">
                  {m.name}
                </h3>
                {m.role && (
                  <p className="text-[11px] text-muted-foreground mt-1 truncate">
                    {m.role}
                  </p>
                )}
                <div className="mt-2 pt-2 border-t border-border/70 flex items-center justify-between text-[10px] text-muted-foreground">
                  {m.hometown && (
                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 text-primary" />
                      {m.hometown}
                    </span>
                  )}
                  {year && (
                    <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                      <Calendar className="h-3 w-3 text-primary" />
                      {year}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
