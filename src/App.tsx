import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhoneShell } from "@/components/layout/PhoneShell";
import Splash from "./pages/Splash.tsx";
import Auth from "./pages/Auth.tsx";
import Profile from "./pages/Profile.tsx";
import Martyrs from "./pages/Martyrs.tsx";
import MartyrDetail from "./pages/MartyrDetail.tsx";
import AddMartyr from "./pages/AddMartyr.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" dir="rtl" />
      <BrowserRouter>
        <Routes>
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

          <Route element={<PhoneShell />}>
            <Route path="/martyrs" element={<Martyrs />} />
            <Route path="/martyrs/new" element={<AddMartyr />} />
            <Route path="/martyrs/:id" element={<MartyrDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
