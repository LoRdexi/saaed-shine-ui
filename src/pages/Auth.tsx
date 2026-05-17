import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export default function Auth() {
  const [params] = useSearchParams();
  const initial = params.get("mode") === "signup" ? "signup" : "login";
  const [tab, setTab] = useState(initial);
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string) || "صديق ساعد";
    const email = (data.get("email") as string) || "user@saaed.app";
    login({ name, email });
    toast.success(tab === "signup" ? "تم إنشاء حسابك بنجاح" : "أهلاً بعودتك");
    navigate("/martyrs", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="pt-6"><Logo size="md" /></div>

      <div className="mt-8 flex-1 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-primary">مرحباً بك في ساعد</h1>
        <p className="text-sm text-muted-foreground mt-1">سجّل دخولك لتوثّق سير الشهداء وتساهم في حفظ ذاكرتهم</p>

        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="grid grid-cols-2 w-full bg-muted h-11 rounded-2xl p-1">
            <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-surface data-[state=active]:text-primary font-bold">دخول</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-xl data-[state=active]:bg-surface data-[state=active]:text-primary font-bold">حساب جديد</TabsTrigger>
          </TabsList>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <TabsContent value="signup" className="m-0 space-y-4">
              <Field label="الاسم الكامل" name="name" placeholder="أدخل اسمك" required />
            </TabsContent>

            <Field label="البريد الإلكتروني أو رقم الجوال" name="email" placeholder="example@saaed.app" required />
            <Field label="كلمة المرور" name="password" type="password" placeholder="••••••••" required />

            <Button type="submit" className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold text-base mt-2 shadow-soft">
              {tab === "signup" ? "إنشاء حساب" : "دخول"}
            </Button>

            <Link to="/martyrs" className="block text-center text-sm text-secondary hover:text-primary py-2 font-medium">
              متابعة كزائر
            </Link>
          </form>
        </Tabs>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs text-muted-foreground font-semibold">{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required={required}
        className="h-12 rounded-2xl bg-surface border-border text-right" />
    </div>
  );
}
