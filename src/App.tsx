import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhoneShell } from "@/components/layout/PhoneShell";
import Splash from "./pages/Splash.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import Cases from "./pages/Cases.tsx";
import CaseDetail from "./pages/CaseDetail.tsx";
import Transparency from "./pages/Transparency.tsx";
import Profile from "./pages/Profile.tsx";
import Martyrs from "./pages/Martyrs.tsx";
import MartyrDetail from "./pages/MartyrDetail.tsx";
import AddMartyr from "./pages/AddMartyr.tsx";
import GeneralFund from "./pages/GeneralFund.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" dir="rtl" />
      <BrowserRouter>
        <Routes>
          {/* Standalone screens (no bottom nav) */}
          <Route
            path="/"
            element={
              <div className="min-h-screen w-full bg-gradient-to-br from-muted to-background flex items-stretch md:items-center md:py-6 justify-center">
                <div className="phone-frame">
                  <Splash />
                </div>
              </div>
            }
          />
          <Route
            path="/auth"
            element={
              <div className="min-h-screen w-full bg-gradient-to-br from-muted to-background flex items-stretch md:items-center md:py-6 justify-center">
                <div className="phone-frame">
                  <Auth />
                </div>
              </div>
            }
          />

          {/* App shell with bottom nav */}
          <Route element={<PhoneShell />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/martyrs" element={<Martyrs />} />
            <Route path="/martyrs/new" element={<AddMartyr />} />
            <Route path="/martyrs/:id" element={<MartyrDetail />} />
            <Route path="/general-fund" element={<GeneralFund />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
