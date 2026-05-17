import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { BookOpen, Flame, ShieldCheck } from "lucide-react";

export default function Splash() {
  return (
    <div className="min-h-screen flex flex-col gradient-hero text-primary-foreground p-6 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-32 -right-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="pt-12 flex justify-center animate-fade-in">
          <Logo size="lg" className="flex-col [&>span]:text-primary-foreground" />
        </div>

        <div className="mt-12 text-center space-y-3 animate-fade-in">
          <h1 className="text-3xl font-extrabold leading-tight">نحفظ ذكراهم.. لتبقى أحياءً</h1>
          <p className="text-primary-foreground/80 text-sm max-w-xs mx-auto leading-relaxed">
            ساعد هو تطبيق توثيق الشهداء. وثّق اسماً، اروِ قصة، واحفظ سيرة من ارتقى ليبقى حيّاً في الذاكرة.
          </p>
        </div>

        <ul className="mt-12 space-y-3 animate-fade-in">
          {[
            { icon: BookOpen, t: "سجل سير الشهداء وقصصهم" },
            { icon: Flame, t: "وثّق لحظات الاستشهاد بكرامة" },
            { icon: ShieldCheck, t: "أرشيف موثّق يبقى للأجيال" },
          ].map(({ icon: I, t }) => (
            <li key={t} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-primary-foreground/15">
              <span className="h-9 w-9 rounded-xl bg-accent/90 text-accent-foreground flex items-center justify-center">
                <I className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8 space-y-3 animate-fade-in">
          <Button asChild size="lg" className="w-full h-12 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow">
            <Link to="/auth?mode=signup">إنشاء حساب جديد</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full h-12 rounded-2xl bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link to="/auth?mode=login">تسجيل الدخول</Link>
          </Button>
          <Link to="/martyrs" className="block text-center text-sm text-primary-foreground/80 hover:text-primary-foreground py-2">
            متابعة كزائر
          </Link>
        </div>
      </div>
    </div>
  );
}
