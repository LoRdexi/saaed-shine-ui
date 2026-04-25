import { create } from "zustand";

export interface Martyr {
  id: string;
  name: string;
  birthYear?: number;
  martyrdomDate: string; // ISO or free text
  hometown?: string;
  role?: string; // e.g. "طالب جامعي", "مسعف", "أب لثلاثة أطفال"
  bio: string;
  martyrdomStory?: string;
  image?: string;
  addedBy?: string;
  createdAt: number;
}

const SEED: Martyr[] = [
  {
    id: "m1",
    name: "الشهيد عمر الخطيب",
    birthYear: 1995,
    martyrdomDate: "2024-03-12",
    hometown: "غزة",
    role: "مسعف ميداني",
    bio: "تطوع منذ صغره في الهلال الأحمر، وأنقذ عشرات الجرحى تحت القصف قبل أن يرتقي شهيداً وهو يحاول إسعاف عائلة محاصرة تحت الأنقاض.",
    martyrdomStory:
      "في فجر الثاني عشر من آذار، تلقى عمر نداء استغاثة من حيٍّ مجاور بعد غارة استهدفت مبنى سكنياً. هرع بسيارة الإسعاف رغم استمرار القصف، وتمكّن من إخراج طفلين وامرأة مسنّة من تحت الركام. وأثناء عودته لإنقاذ أبٍ ما زال محاصراً، استهدفت غارة ثانية المكان فارتقى شهيداً وهو يضمّ يد الجريح. شيّعه الحيّ كله، وروى الناجون أن آخر كلماته كانت: «لا تتركوهم… أكملوا».",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "m2",
    name: "الشهيدة ليلى عبدالرحمن",
    birthYear: 1988,
    martyrdomDate: "2023-11-04",
    hometown: "خان يونس",
    role: "معلمة لغة عربية",
    bio: "كرّست حياتها لتعليم أطفال الحي رغم انقطاع الكهرباء وشُح الموارد، وكانت تفتح بيتها مدرسةً للأيتام في أمسيات الشتاء.",
    martyrdomStory:
      "حوّلت ليلى منزلها إلى صفٍّ مؤقت بعد تدمير مدرسة الحي. في تلك الليلة، كان عندها اثنا عشر طفلاً يحفظون سورة الرحمن على ضوء شمعة. سقطت قذيفة على البيت المجاور فهرعت لتُخرج الأطفال من النافذة الخلفية واحداً واحداً، حتى نجوا جميعاً. عادت لتأخذ كرّاساتهم — قالت إنها «أمانة» — فسقط السقف عليها. وُجدت وهي تحتضن دفاتر طلابها.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format&fit=crop",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
  {
    id: "m3",
    name: "الشهيد يوسف الحلبي",
    birthYear: 2001,
    martyrdomDate: "2024-01-22",
    hometown: "حلب",
    role: "طالب طب",
    bio: "كان في سنته الرابعة بكلية الطب، وكان يحلم ببناء مستشفى مجاني في قريته. ارتقى وهو يضمّد جرحى غارة استهدفت مدرسة.",
    martyrdomStory:
      "ترك يوسف محاضراته في كلية الطب وتطوع في النقطة الطبية الميدانية القريبة من المدرسة المستهدفة. عمل ثماني عشرة ساعة متواصلة، يُسعف الأطفال الجرحى ويُهدّئ من روع أمهاتهم. حين نفدت أكياس الدم، تبرّع من دمه مرتين في يوم واحد. ارتقى وهو يحاول إنقاذ طفلة في عمر أخته الصغرى، تشبّث بيدها حتى آخر نفس. ترك خلفه مذكرة: «إذا لم أعد، أكملوا الدراسة وابنوا المستشفى».",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80&auto=format&fit=crop",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "m4",
    name: "الشهيد محمود السيد",
    birthYear: 1979,
    martyrdomDate: "2024-02-08",
    hometown: "نابلس",
    role: "أب لخمسة أطفال — نجار",
    bio: "اشتُهر في حيّه بصنع الألعاب الخشبية للأطفال مجاناً. ارتقى وهو يحمي جيرانه أثناء اقتحام ليلي.",
    martyrdomStory:
      "في الثالثة فجراً، اقتحمت قوة عسكرية الحي. خرج محمود من بيته حافياً ليُنبّه الجيران ويُساعد كبار السن على المغادرة من الباب الخلفي. أوقف جندياً كان يطرق باب عائلة فيها ثلاث بنات صغيرات، ووقف بجسده حائلاً. أُطلقت عليه النار من مسافة قريبة فارتقى أمام بيته. في اليوم التالي، وجد الأطفال في ورشته لعبةً خشبية لم يُكمل تلميعها — كانت هديةً لطفلة الجيران بمناسبة عيد ميلادها.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

interface MartyrsState {
  martyrs: Martyr[];
  addMartyr: (m: Omit<Martyr, "id" | "createdAt">) => Martyr;
  getById: (id: string) => Martyr | undefined;
}

export const useMartyrs = create<MartyrsState>((set, get) => ({
  martyrs: SEED,
  addMartyr: (m) => {
    const martyr: Martyr = {
      ...m,
      id: "m" + Math.random().toString(36).slice(2, 9),
      createdAt: Date.now(),
    };
    set((s) => ({ martyrs: [martyr, ...s.martyrs] }));
    return martyr;
  },
  getById: (id) => get().martyrs.find((m) => m.id === id),
}));
