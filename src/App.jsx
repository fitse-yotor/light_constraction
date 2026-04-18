import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Website
import HomePage from './pages/website/HomePage';
import AboutPage from './pages/website/AboutPage';
import ServicesPage from './pages/website/ServicesPage';
import ServiceDetail from './pages/website/ServiceDetail';
import PortfolioPage from './pages/website/PortfolioPage';
import PortfolioDetail from './pages/website/PortfolioDetail';
import GalleryPage from './pages/website/GalleryPage';
import FounderPage from './pages/website/FounderPage';
import CoFounderPage from './pages/website/CoFounderPage';

// Dashboard
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ProjectDetail from './pages/dashboard/ProjectDetail';
import ExpensesPage from './pages/dashboard/ExpensesPage';
import CanvasBoard from './pages/dashboard/CanvasBoard';
import ReportsPage from './pages/dashboard/ReportsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import GalleryManage from './pages/dashboard/GalleryManage';
import ServicesManage from './pages/dashboard/ServicesManage';
import PortfolioManage from './pages/dashboard/PortfolioManage';
import AboutManage from './pages/dashboard/AboutManage';
import CoFounderManage from './pages/dashboard/CoFounderManage';
import TestimonialsManage from './pages/dashboard/TestimonialsManage';
import AnnouncementsManage from './pages/dashboard/AnnouncementsManage';
import DocumentsManage from './pages/dashboard/DocumentsManage';
import GanttView from './pages/dashboard/GanttView';
import HomepageSections from './pages/dashboard/HomepageSections';
import SeoManager from './pages/dashboard/SeoManager';
import VendorsManage from './pages/dashboard/VendorsManage';
import UserManage from './pages/dashboard/UserManage';

// Protected route wrapper
function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('lc_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const handleLogin = (u) => {
    setUser(u);
    sessionStorage.setItem('lc_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('lc_user');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />

        {/* Public Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/co-founder" element={<CoFounderPage />} />

        {/* Admin Dashboard — protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="canvas" element={<CanvasBoard />} />
          <Route path="timeline" element={<GanttView />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="documents" element={<DocumentsManage />} />
          <Route path="vendors" element={<VendorsManage />} />
          <Route path="gallery" element={<GalleryManage />} />
          <Route path="services" element={<ServicesManage />} />
          <Route path="portfolio" element={<PortfolioManage />} />
          <Route path="about" element={<AboutManage />} />
          <Route path="co-founder" element={<CoFounderManage />} />
          <Route path="testimonials" element={<TestimonialsManage />} />
          <Route path="announcements" element={<AnnouncementsManage />} />
          <Route path="homepage" element={<HomepageSections />} />
          <Route path="seo" element={<SeoManager />} />
          <Route path="users" element={<UserManage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
