export type CaseCategory = "medical" | "education" | "family" | "relief";

export interface Case {
  id: string;
  title: string;
  shortDesc: string;
  story: string;
  category: CaseCategory;
  goal: number;
  raised: number;
  image: string;
  urgent?: boolean;
  beneficiaries?: number;
}

export interface Donation {
  id: string;
  donorName: string;
  donorMasked: boolean;
  amount: number;
  caseId: string | "general";
  caseTitle: string;
  timestamp: number;
  isMine?: boolean;
}

export const CATEGORY_LABEL: Record<CaseCategory, string> = {
  medical: "طبية",
  education: "تعليمية",
  family: "أسرية",
  relief: "إغاثة",
};
