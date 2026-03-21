import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] relative">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Animated Contact Button */}
      <AnimatePresence>
        <motion.a
          href="/kontakt"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-red-600 to-red-500 text-white rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow duration-300 group cursor-pointer"
          aria-label="Kontaktieren Sie uns"
        >
          {/* Pulse Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-red-400 opacity-0 group-hover:animate-ping" />
          <MessageCircle className="w-6 h-6" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
