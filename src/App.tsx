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
import DashboardLayout from "./pages/admin/DashboardLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import SubmissionsPage from "./pages/admin/SubmissionsPage";
import UsersPage from "./pages/admin/UsersPage";
import EditorialBoardPage from "./pages/admin/EditorialBoardPage";
import ArchivePage from "./pages/admin/ArchivePage";
import Verify2FA from "./pages/Verify2FA";
import Auth from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import UploadEditorialMember from "./pages/admin/UploadEditorialMember";
import {ToastContainer} from "react-toastify"
import FaqManager from "./pages/admin/FaqForm";
import ContactMessages from "./pages/admin/ContactMessages";
import EditorialMemberForm from "./pages/admin/UploadEditorialMember";
import AboutSectionManager from "./pages/admin/AboutPageSectionUI";
import NewsletterDashboard from "./pages/admin/NewsletterDashboard";
import TopicDashboard from "./pages/admin/TopicDashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideLayout = location.pathname.includes("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navigation />}

      <main className="flex-1">
        <Routes>
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="editorial-board" element={<EditorialBoardPage />} />
            <Route path="archive" element={<ArchivePage />} />
            <Route path="upload-member"  element={<EditorialMemberForm/>} />
             <Route path="add-faq" element={<FaqManager/>}   />
             <Route path="contact-msg" element={<ContactMessages/>}  />
             <Route  path="add-about" element={<AboutSectionManager/>}  />
             <Route path="view-newsletter"  element={<NewsletterDashboard/>}   />
             <Route  path="add-topic"  element={<TopicDashboard/>}   />
            
          </Route>

          {/* Public routes */}
         
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route path="/author-page" element={<AuthorPage />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Catch-all */}
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
      <ToastContainer/>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;