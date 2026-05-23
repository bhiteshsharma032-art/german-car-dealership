import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/ui/CookieConsent';

// Public Pages
import Home from './pages/public/Home';
import CarList from './pages/public/CarList';
import CarDetail from './pages/public/CarDetail';

// Removed utility pages per user request

// Legal Pages
import Impressum from './pages/legal/Impressum';
import Datenschutz from './pages/legal/Datenschutz';

// Company Pages
import Geschichte from './pages/public/Geschichte';

// Services
import Inzahlungnahme from './pages/public/Inzahlungnahme';
import Finanzierung from './pages/public/Finanzierung';
import Contact from './pages/public/Contact';
import Service from './pages/public/Service';
import FAQ from './pages/public/FAQ';

// Utility Pages
import NotFound from './pages/utility/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCarList from './pages/admin/AdminCarList';
import AdminCarAdd from './pages/admin/AdminCarAdd';
import AdminCarEdit from './pages/admin/AdminCarEdit';
import AdminTradeIns from './pages/admin/AdminTradeIns';
import AdminContacts from './pages/admin/AdminContacts';
import AdminFinancing from './pages/admin/AdminFinancing';

import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fahrzeuge" element={<CarList />} />
          <Route path="/fahrzeug/:id" element={<CarDetail />} />
          {/* Legal Pages */}
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          {/* Company Pages */}
          <Route path="/geschichte" element={<Geschichte />} />
          <Route path="/inzahlungnahme" element={<Inzahlungnahme />} />
          <Route path="/finanzierung" element={<Finanzierung />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="fahrzeuge" element={<AdminCarList />} />
          <Route path="fahrzeuge/neu" element={<AdminCarAdd />} />
          <Route path="fahrzeuge/:id/bearbeiten" element={<AdminCarEdit />} />
          <Route path="inzahlungnahmen" element={<AdminTradeIns />} />
          <Route path="kontakte" element={<AdminContacts />} />
          <Route path="finanzierungen" element={<AdminFinancing />} />
        </Route>
      </Routes>
      
      {/* Global Components */}
      <ChatBot />
      <CookieConsent />
    </SmoothScroll>
  );
}

export default App;
