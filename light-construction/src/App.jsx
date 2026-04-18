import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Founder & Co-Founder portfolios — not in navbar */}
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/co-founder" element={<CoFounderPage />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="canvas" element={<CanvasBoard />} />
          <Route path="gallery" element={<GalleryManage />} />
          <Route path="services" element={<ServicesManage />} />
          <Route path="portfolio" element={<PortfolioManage />} />
          <Route path="about" element={<AboutManage />} />
          <Route path="co-founder" element={<CoFounderManage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
