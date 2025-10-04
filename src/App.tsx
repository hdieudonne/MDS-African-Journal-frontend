import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Journal from "./pages/Journal";
import EditorialBoard from "./pages/EditorialBoard";
import AuthorPage from "./pages/AuthorPage";
import Archive from "./pages/Archive";
import Submission from "./pages/Submission";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  // Hide header/footer when the route includes "dashboard"
  const hideLayout = location.pathname.includes("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navigation />}

      <main className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route path="/author-page" element={<AuthorPage />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
