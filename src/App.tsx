import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
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
          
          {/* Language routes */}
          <Route
            path="/fr/*"
            element={
              <LanguageProvider>
                <Index />
              </LanguageProvider>
            }
          />
          <Route
            path="/en/*"
            element={
              <LanguageProvider>
                <Index />
              </LanguageProvider>
            }
          />
          <Route
            path="/es/*"
            element={
              <LanguageProvider>
                <Index />
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
