import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function PhoneShell({ children, withNav = true }: { children?: React.ReactNode; withNav?: boolean }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-muted to-background flex items-stretch md:items-center md:py-6 justify-center">
      <div className="phone-frame">
        <div className={withNav ? "pb-24" : ""}>{children ?? <Outlet />}</div>
        {withNav && <BottomNav />}
      </div>
    </div>
  );
}
