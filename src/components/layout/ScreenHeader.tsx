import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ScreenHeader({
  title,
  subtitle,
  back = true,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-md border-b border-border px-4 pt-4 pb-3 flex items-center gap-3">
      {back && (
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-muted transition"
          aria-label="رجوع"
        >
          {/* RTL: chevron-right visually points back (toward right reading direction = previous) */}
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-bold text-primary truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
