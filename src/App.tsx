import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import EventsVisuals from "./pages/EventsVisuals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            {/* Redirect root to default language (French) */}
            <Route path="/" element={<Navigate to="/fr" replace />} />
            
            {/* Language routes - Index */}
            <Route path="/fr" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/es" element={<Index />} />
            
            {/* Language routes - Booking */}
            <Route path="/fr/booking" element={<Booking />} />
            <Route path="/en/booking" element={<Booking />} />
            <Route path="/es/booking" element={<Booking />} />
            
            {/* Language routes - Events & Visuals */}
            <Route path="/fr/events" element={<EventsVisuals />} />
            <Route path="/en/events" element={<EventsVisuals />} />
            <Route path="/es/events" element={<EventsVisuals />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
