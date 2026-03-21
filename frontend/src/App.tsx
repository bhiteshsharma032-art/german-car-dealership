import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/ui/CookieConsent';

// Public Pages
import Home from './pages/public/Home';
import CarList from './pages/public/CarList';
import CarDetail from './pages/public/CarDetail';


import Contact from './pages/public/Contact';
import Finanzierung from './pages/public/Finanzierung';
import Inzahlungnahme from './pages/public/Inzahlungnahme';
import FAQ from './pages/public/FAQ';
import Service from './pages/public/Service';

// Legal Pages
import Impressum from './pages/legal/Impressum';
import Datenschutz from './pages/legal/Datenschutz';

// Utility Pages
import NotFound from './pages/utility/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCarList from './pages/admin/AdminCarList';
import AdminCarAdd from './pages/admin/AdminCarAdd';
import AdminCarEdit from './pages/admin/AdminCarEdit';
import AdminTradeIns from './pages/admin/AdminTradeIns';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fahrzeuge" element={<CarList />} />
          <Route path="/fahrzeug/:id" element={<CarDetail />} />

          <Route path="/finanzierung" element={<Finanzierung />} />
          <Route path="/inzahlungnahme" element={<Inzahlungnahme />} />

          <Route path="/service" element={<Service />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontakt" element={<Contact />} />
          
          {/* Legal Pages */}
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          
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
        </Route>
      </Routes>
      
      {/* Global Components */}
      <ChatBot />
      <CookieConsent />
    </>
  );
}

export default App;
