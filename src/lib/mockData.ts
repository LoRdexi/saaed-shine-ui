import type { Case } from "./types";

export const CASES: Case[] = [
  {
    id: "c1",
    title: "علاج الطفلة سارة",
    shortDesc: "عملية جراحية عاجلة لطفلة في السابعة من عمرها",
    story:
      "سارة طفلة في السابعة من عمرها تعاني من مرض في القلب وتحتاج إلى عملية جراحية عاجلة. ساهم في إعادة الابتسامة لها ولعائلتها.",
    category: "medical",
    goal: 80000,
    raised: 52400,
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80&auto=format&fit=crop",
    urgent: true,
    beneficiaries: 1,
  },
  {
    id: "c2",
    title: "كسوة الشتاء للأيتام",
    shortDesc: "توفير ملابس شتوية لمئة طفل يتيم",
    story:
      "مع اقتراب فصل الشتاء، يحتاج مئة طفل يتيم إلى ملابس دافئة وأحذية مناسبة لمواجهة البرد القارس.",
    category: "family",
    goal: 35000,
    raised: 22150,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop",
    beneficiaries: 100,
  },
  {
    id: "c3",
    title: "تعليم 50 طالباً محتاجاً",
    shortDesc: "رسوم دراسية وكتب لطلاب متفوقين",
    story:
      "خمسون طالباً متفوقاً مهددون بترك الدراسة بسبب ظروف مادية صعبة. ساعدنا في استكمال مسيرتهم التعليمية.",
    category: "education",
    goal: 60000,
    raised: 41200,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
    beneficiaries: 50,
  },
  {
    id: "c4",
    title: "إغاثة منكوبي الفيضانات",
    shortDesc: "مساعدات عاجلة لمئات العائلات",
    story:
      "مئات العائلات فقدت منازلها في الفيضانات الأخيرة وتحتاج إلى مأوى وغذاء ومستلزمات أساسية فوراً.",
    category: "relief",
    goal: 200000,
    raised: 128400,
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80&auto=format&fit=crop",
    urgent: true,
    beneficiaries: 320,
  },
  {
    id: "c5",
    title: "كرسي متحرك للطفل أحمد",
    shortDesc: "كرسي طبي متخصص لتسهيل حياته اليومية",
    story:
      "أحمد يحتاج إلى كرسي متحرك طبي متخصص ليتمكن من الذهاب إلى مدرسته ومتابعة حياته الطبيعية.",
    category: "medical",
    goal: 12000,
    raised: 8900,
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80&auto=format&fit=crop",
    beneficiaries: 1,
  },
  {
    id: "c6",
    title: "إفطار صائم - 1000 وجبة",
    shortDesc: "توزيع وجبات يومية على المحتاجين",
    story: "نوزع يومياً ألف وجبة إفطار للأسر المحتاجة في الأحياء الفقيرة.",
    category: "family",
    goal: 25000,
    raised: 18750,
    image:
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&q=80&auto=format&fit=crop",
    beneficiaries: 1000,
  },
  {
    id: "c7",
    title: "بناء مدرسة في القرية",
    shortDesc: "مدرسة ابتدائية لقرية نائية",
    story:
      "أطفال قرية بعيدة يقطعون أكثر من ساعتين سيراً للوصول إلى أقرب مدرسة. لنبنِ لهم مدرسة قريبة.",
    category: "education",
    goal: 350000,
    raised: 142800,
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80&auto=format&fit=crop",
    beneficiaries: 200,
  },
  {
    id: "c8",
    title: "أدوية مرضى السرطان",
    shortDesc: "توفير أدوية شهرية لمرضى لا يقدرون على شرائها",
    story:
      "خمسة وعشرون مريضاً بالسرطان لا يستطيعون شراء أدويتهم الشهرية الباهظة. كن سبباً في علاجهم.",
    category: "medical",
    goal: 95000,
    raised: 61300,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    urgent: true,
    beneficiaries: 25,
  },
];

export const MOCK_DONOR_NAMES = [
  "عبدالله",
  "محمد",
  "فاطمة",
  "نورة",
  "أحمد",
  "سارة",
  "خالد",
  "ريم",
  "سلطان",
  "هند",
  "يوسف",
  "ليلى",
  "عمر",
  "منى",
  "بدر",
  "أسماء",
];

export function maskName(name: string) {
  if (name.length <= 2) return name + "***";
  return name.slice(0, 2) + "***";
}
