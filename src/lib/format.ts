export function formatCurrency(n: number) {
  return new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(n) + " ر.س";
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(n);
}

export function timeAgo(ts: number) {
  const diff = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (diff < 60) return `منذ ${diff} ثانية`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `منذ ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `منذ ${h} ساعة`;
  const d = Math.floor(h / 24);
  return `منذ ${d} يوم`;
}
