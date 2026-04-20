import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Car, LogOut, Menu, X, User, Mail, Euro } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AdminLayout() {
  const { isAuthenticated, user, logout, checkAuth, updateActivity, checkInactivity } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  // Check auth on mount
  useEffect(() => {
    const isAuth = checkAuth();
    setChecking(false);
    
    if (!isAuth) {
      return;
    }
  }, [checkAuth]);

  // Update activity on user interaction
  useEffect(() => {
    const handleActivity = () => {
      updateActivity();
    };

    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [updateActivity]);

  // Check for inactivity every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkInactivity();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkInactivity]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#1a1a20] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Fahrzeuge', href: '/admin/fahrzeuge', icon: Car },
    { name: 'Inzahlungnahmen', href: '/admin/inzahlungnahmen', icon: Car },
    { name: 'Kontaktanfragen', href: '/admin/kontakte', icon: Mail },
    { name: 'Finanzierung', href: '/admin/finanzierungen', icon: Euro },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#1a1a20]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-all duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64',
          'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            'flex items-center h-16 px-6 bg-gray-800 border-b border-gray-700',
            sidebarCollapsed ? 'lg:justify-center lg:px-0' : 'justify-between'
          )}>
            <Link to="/admin/dashboard" className={cn(
              'flex items-center space-x-2',
              sidebarCollapsed && 'lg:space-x-0'
            )}>
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-lg font-bold text-white lg:block">Admin Panel</span>
              )}
            </Link>
            <button
              className="lg:hidden text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="px-6 py-4 border-b border-gray-700 lg:block">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700 rounded-full">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-400">{user?.role || 'Administrator'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-lg transition-colors min-h-[44px]',
                    sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'space-x-3',
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20'
                      : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  )}
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium lg:block">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Toggle - Desktop Only */}
          <div className="hidden lg:block p-4 border-t border-gray-700">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors min-h-[44px]"
              title={sidebarCollapsed ? 'Sidebar erweitern' : 'Sidebar minimieren'}
            >
              <Menu className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Minimieren</span>
              )}
            </button>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition-colors min-h-[44px]',
                sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'space-x-3'
              )}
              title={sidebarCollapsed ? 'Abmelden' : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium lg:block">Abmelden</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        'transition-all duration-300',
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      )}>
        {/* Top bar */}
        <header className="bg-[#2b2b36] shadow-md shadow-black/20 sticky top-0 z-10 border-b border-zinc-800">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors min-h-[44px] flex items-center"
              >
                Zur Website →
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
