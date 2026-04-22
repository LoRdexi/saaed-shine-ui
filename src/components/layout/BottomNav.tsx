import { Heart, Home, LayoutGrid, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/cases", label: "الحالات", icon: LayoutGrid },
  { to: "/transparency", label: "الشفافية", icon: Heart },
  { to: "/profile", label: "حسابي", icon: User },
];

export function BottomNav() {
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md">
      <ul className="grid grid-cols-4 px-2 pt-2 pb-3">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-1.5 rounded-xl text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                      isActive ? "bg-primary/10 scale-105" : "",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive && "stroke-[2.4]")} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
