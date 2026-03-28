import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1f] relative selection:bg-red-500/30 selection:text-white">
      <Header />
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Floating Contact Button */}
      <AnimatePresence>
        <motion.a
          href="tel:+4956193004649"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 text-white rounded-2xl transition-shadow duration-500 group cursor-pointer shadow-glass"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            boxShadow: '0 0 30px rgba(239,68,68,0.3), 0 8px 32px rgba(0,0,0,0.4)',
          }}
          aria-label="Rufen Sie uns an"
        >
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-2xl border border-red-400/30 animate-ping opacity-0 group-hover:opacity-100" />
          <Phone className="w-5 h-5" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
