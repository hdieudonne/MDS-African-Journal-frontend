import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Verify2FA from "./pages/Verify2FA";
import Auth from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/editorial-board" element={<EditorialBoard />} />
              <Route path="/author-page" element={<AuthorPage />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/submission" element={<Submission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Auth/>} />
              <Route path="/verify-2fa" element={<Verify2FA />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
