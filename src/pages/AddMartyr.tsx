import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMartyrs } from "@/lib/martyrs";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AddMartyr() {
  const addMartyr = useMartyrs((s) => s.addMartyr);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [martyrdomDate, setMartyrdomDate] = useState("");
  const [hometown, setHometown] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bio.trim() || !martyrdomDate) {
      toast.error("يرجى تعبئة الاسم وتاريخ الاستشهاد والسيرة");
      return;
    }
    const m = addMartyr({
      name: name.trim(),
      bio: bio.trim(),
      martyrdomDate,
      birthYear: birthYear ? Number(birthYear) : undefined,
      hometown: hometown.trim() || undefined,
      role: role.trim() || undefined,
      image: image.trim() || undefined,
    });
    toast.success("تم إضافة الشهيد إلى السجل", {
      description: "شكراً لمساهمتك في حفظ ذاكرتهم.",
    });
    navigate(`/martyrs/${m.id}`, { replace: true });
  };

  return (
    <div className="pb-8">
      <ScreenHeader title="إضافة شهيد" subtitle="أضف اسمه وسيرته ليبقى محفوظاً" />

      <form onSubmit={onSubmit} className="px-5 pt-4 space-y-4">
        <Field label="الاسم الكامل *">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: الشهيد محمد علي" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="سنة الميلاد">
            <Input
              type="number"
              inputMode="numeric"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="1990"
            />
          </Field>
          <Field label="تاريخ الاستشهاد *">
            <Input
              type="date"
              value={martyrdomDate}
              onChange={(e) => setMartyrdomDate(e.target.value)}
            />
          </Field>
        </div>

        <Field label="البلدة / المنطقة">
          <Input value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="غزة" />
        </Field>

        <Field label="المهنة أو الدور">
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="مسعف، طالب، أب..." />
        </Field>

        <Field label="رابط صورة (اختياري)">
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </Field>

        <Field label="السيرة الذاتية *">
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="اكتب نبذة عن حياته، إنجازاته، وكيف ارتقى..."
            rows={6}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full h-12 rounded-2xl bg-primary font-bold">
          <Save className="h-5 w-5" />
          حفظ في السجل
        </Button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-foreground">{label}</Label>
      {children}
    </div>
  );
}
