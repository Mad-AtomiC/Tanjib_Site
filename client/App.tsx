import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Dynamic logo loading for Favicon
const logoImages = import.meta.glob('@/assets/logo/*', { eager: true, as: 'url' });
const dynamicLogo = Object.values(logoImages)[0] as string | undefined;

const App = () => {
  // Dynamically update favicon
  if (dynamicLogo) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    (link as HTMLLinkElement).type = 'image/x-icon';
    (link as HTMLLinkElement).rel = 'shortcut icon';
    (link as HTMLLinkElement).href = dynamicLogo;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
