import { useEffect } from "react";
import { useAppStore } from "./store";

/** Background simulator: emits a fake donation every 2.5–4.5s while mounted. */
export function useLiveSimulator(enabled = true) {
  const add = useAppStore((s) => s._addMockDonation);
  useEffect(() => {
    if (!enabled) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      add();
      timeout = setTimeout(tick, 2500 + Math.random() * 2000);
    };
    timeout = setTimeout(tick, 1500 + Math.random() * 1500);
    return () => clearTimeout(timeout);
  }, [enabled, add]);
}
