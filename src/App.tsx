import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to default language (French) */}
          <Route path="/" element={<Navigate to="/fr" replace />} />
          
          {/* Language routes - Index */}
          <Route
            path="/fr"
            element={
              <LanguageProvider>
                <Index />
              </LanguageProvider>
            }
          />
          <Route
            path="/en"
            element={
              <LanguageProvider>
                <Index />
              </LanguageProvider>
            }
          />
          <Route
            path="/es"
            element={
              <LanguageProvider>
                <Index />
              </LanguageProvider>
            }
          />
          
          {/* Language routes - Booking */}
          <Route
            path="/fr/booking"
            element={
              <LanguageProvider>
                <Booking />
              </LanguageProvider>
            }
          />
          <Route
            path="/en/booking"
            element={
              <LanguageProvider>
                <Booking />
              </LanguageProvider>
            }
          />
          <Route
            path="/es/booking"
            element={
              <LanguageProvider>
                <Booking />
              </LanguageProvider>
            }
          />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
