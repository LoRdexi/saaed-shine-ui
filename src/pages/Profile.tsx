import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { useAppStore } from "@/lib/store";
import { useMartyrs } from "@/lib/martyrs";
import { ChevronLeft, LogOut, Mail, Shield, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const totalMartyrs = useMartyrs((s) => s.martyrs.length);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast("تم تسجيل الخروج");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <ScreenHeader title="حسابي" back={false} />

      <section className="px-5 pt-4">
        <div className="bg-surface rounded-2xl border border-border p-5 flex items-center gap-4 shadow-soft">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-extrabold">
            {(user?.name?.charAt(0) || "ز")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-foreground truncate">{user?.name || "زائر"}</p>
            <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3" />
              {user?.email || "تصفح بدون حساب"}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pt-4 grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft">
          <p className="text-[11px] text-muted-foreground">شهداء موثّقون</p>
          <p className="font-extrabold text-primary text-lg mt-1">{totalMartyrs}</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft">
          <p className="text-[11px] text-muted-foreground">مساهماتي</p>
          <p className="font-extrabold text-foreground text-lg mt-1">0</p>
        </div>
      </section>

      <section className="px-5 pt-5 space-y-2">
        <Row icon={BookOpen} label="عن المشروع" />
        <Row icon={Shield} label="الخصوصية والشفافية" />
        <Row icon={Mail} label="تواصل معنا" />
        <button
          onClick={handleLogout}
          className="w-full bg-surface border border-border rounded-2xl p-4 flex items-center gap-3 text-destructive hover:bg-destructive/5 transition"
        >
          <span className="h-9 w-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="h-4 w-4" />
          </span>
          <span className="font-bold text-sm">تسجيل الخروج</span>
        </button>
      </section>
    </div>
  );
}

function Row({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full bg-surface border border-border rounded-2xl p-4 flex items-center gap-3 hover:bg-muted transition">
      <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </span>
      <span className="font-semibold text-sm text-foreground flex-1 text-right">{label}</span>
      <ChevronLeft className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
