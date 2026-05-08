import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAppStore } from "@/lib/store";
import { formatCurrency, timeAgo } from "@/lib/format";
import { ChevronLeft, HandHeart, ListOrdered, LogOut, Mail, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const donations = useAppStore((s) => s.donations);
  const myDonations = donations.filter((d) => d.isMine);
  const myTotal = myDonations.reduce((s, d) => s + d.amount, 0);
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
          <p className="text-[11px] text-muted-foreground">إجمالي تبرعاتي</p>
          <p className="font-extrabold text-primary text-lg mt-1">{formatCurrency(myTotal)}</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-soft">
          <p className="text-[11px] text-muted-foreground">عدد التبرعات</p>
          <p className="font-extrabold text-foreground text-lg mt-1">{myDonations.length}</p>
        </div>
      </section>

      <section className="px-5 pt-5">
        <h3 className="text-sm font-bold text-foreground mb-2">سجل تبرعاتي</h3>
        {myDonations.length === 0 ? (
          <div className="bg-surface border border-dashed border-border rounded-2xl p-6 text-center">
            <Sparkles className="h-8 w-8 mx-auto text-accent" />
            <p className="text-sm font-semibold text-foreground mt-2">لم تتبرع بعد</p>
            <p className="text-xs text-muted-foreground mt-1">ابدأ بدعم حالة أو تبرع للصندوق العام</p>
            <Button onClick={() => navigate("/cases")} className="mt-4 rounded-full bg-primary">
              <HandHeart className="h-4 w-4" />
              تصفح الحالات
            </Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {myDonations.map((d) => (
              <li key={d.id} className="bg-surface border border-border rounded-2xl p-3.5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent-foreground flex items-center justify-center">
                  <HandHeart className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{d.caseTitle}</p>
                  <p className="text-[11px] text-muted-foreground">{timeAgo(d.timestamp)}</p>
                </div>
                <p className="font-extrabold text-primary tabular-nums">{formatCurrency(d.amount)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="px-5 pt-5 space-y-2">
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
