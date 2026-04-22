import { create } from "zustand";
import { CASES, MOCK_DONOR_NAMES, maskName } from "./mockData";
import type { Case, Donation } from "./types";

interface User {
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AppState {
  user: User | null;
  cases: Case[];
  donations: Donation[];
  totalDonors: number;
  login: (user: User) => void;
  logout: () => void;
  donate: (caseId: string | "general", amount: number) => void;
  _addMockDonation: () => void;
}

const GENERAL_TITLE = "الصندوق العام";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  cases: CASES,
  donations: seedDonations(),
  totalDonors: 1284,

  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  donate: (caseId, amount) => {
    const state = get();
    const user = state.user;
    const donorName = user && !user.isGuest ? user.name.split(" ")[0] || "متبرع" : "متبرع";
    const targetCase = caseId === "general" ? null : state.cases.find((c) => c.id === caseId);
    const donation: Donation = {
      id: uid(),
      donorName,
      donorMasked: false,
      amount,
      caseId,
      caseTitle: targetCase ? targetCase.title : GENERAL_TITLE,
      timestamp: Date.now(),
      isMine: true,
    };
    set({
      donations: [donation, ...state.donations].slice(0, 200),
      cases: targetCase
        ? state.cases.map((c) =>
            c.id === caseId ? { ...c, raised: Math.min(c.goal, c.raised + amount) } : c,
          )
        : state.cases,
      totalDonors: state.totalDonors + 1,
    });
  },

  _addMockDonation: () => {
    const state = get();
    const name = MOCK_DONOR_NAMES[Math.floor(Math.random() * MOCK_DONOR_NAMES.length)];
    const useGeneral = Math.random() < 0.35;
    const target = useGeneral
      ? null
      : state.cases[Math.floor(Math.random() * state.cases.length)];
    const amounts = [10, 20, 50, 100, 150, 200, 300, 500, 750, 1000];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const masked = Math.random() < 0.55;

    const donation: Donation = {
      id: uid(),
      donorName: masked ? maskName(name) : name,
      donorMasked: masked,
      amount,
      caseId: target ? target.id : "general",
      caseTitle: target ? target.title : GENERAL_TITLE,
      timestamp: Date.now(),
    };

    set({
      donations: [donation, ...state.donations].slice(0, 200),
      cases: target
        ? state.cases.map((c) =>
            c.id === target.id ? { ...c, raised: Math.min(c.goal, c.raised + amount) } : c,
          )
        : state.cases,
      totalDonors: state.totalDonors + (Math.random() < 0.6 ? 1 : 0),
    });
  },
}));

function seedDonations(): Donation[] {
  const now = Date.now();
  const out: Donation[] = [];
  for (let i = 0; i < 12; i++) {
    const name = MOCK_DONOR_NAMES[Math.floor(Math.random() * MOCK_DONOR_NAMES.length)];
    const c = CASES[Math.floor(Math.random() * CASES.length)];
    const amounts = [20, 50, 100, 200, 500];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const masked = Math.random() < 0.5;
    out.push({
      id: uid(),
      donorName: masked ? maskName(name) : name,
      donorMasked: masked,
      amount,
      caseId: c.id,
      caseTitle: c.title,
      timestamp: now - i * 1000 * (10 + Math.random() * 60),
    });
  }
  return out;
}

export function useTotalDonatedToday() {
  return useAppStore((s) =>
    s.donations
      .filter((d) => Date.now() - d.timestamp < 24 * 3600 * 1000)
      .reduce((sum, d) => sum + d.amount, 0),
  );
}

export function useTotalRaised() {
  return useAppStore((s) => s.cases.reduce((sum, c) => sum + c.raised, 0));
}

export function useCasesSupported() {
  return useAppStore((s) => s.cases.filter((c) => c.raised > 0).length);
}
