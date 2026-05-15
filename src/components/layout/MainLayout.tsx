import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  School, Users, Home, BookOpen, Calendar, ClipboardCheck, 
  DollarSign, Bell, Menu, X, LogOut, UserCircle, Settings,
  ChevronRight, TrendingUp, Bus, Building, Library, MessageSquare
} from 'lucide-react';
import { useAuth, hasRole } from '../../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const navItems = [
    {
      path: '/',
      icon: <Home size={20} />,
      label: 'Dashboard',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
    {
      path: '/students',
      icon: <Users size={20} />,
      label: 'Students',
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      path: '/classes',
      icon: <BookOpen size={20} />,
      label: 'Academic',
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      path: '/assessments',
      icon: <ClipboardCheck size={20} />,
      label: 'Examinations',
      roles: ['super_admin', 'school_admin', 'teacher', 'student'],
    },
    {
      path: '/attendance',
      icon: <Calendar size={20} />,
      label: 'Attendance',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
    {
      path: '/fees',
      icon: <DollarSign size={20} />,
      label: 'Financials',
      roles: ['super_admin', 'school_admin', 'parent', 'student'],
    },
    {
      path: '/hr',
      icon: <UserCircle size={20} />,
      label: 'Staff & HR',
      roles: ['super_admin', 'school_admin'],
    },
    {
      path: '/hostel',
      icon: <Building size={20} />,
      label: 'Hostel',
      roles: ['super_admin', 'school_admin'],
    },
    {
      path: '/transport',
      icon: <Bus size={20} />,
      label: 'Transport',
      roles: ['super_admin', 'school_admin', 'parent'],
    },
    {
      path: '/library',
      icon: <Library size={20} />,
      label: 'Library',
      roles: ['super_admin', 'school_admin', 'teacher', 'student'],
    },
    {
      path: '/notifications',
      icon: <MessageSquare size={20} />,
      label: 'Communication',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
  ];
  
  if (!user) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 flex overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-72 backdrop-blur-sm bg-white/95 border-r border-gray-200 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
              <School size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">SchoolPro<span className="text-primary-600">GH</span></h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-4 mb-4">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
        
        {/* User Card */}
        <div className="p-6 m-4 mt-auto rounded-3xl bg-gray-100 border border-gray-200 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 border border-primary-300 flex items-center justify-center overflow-hidden">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={24} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.full_name}</p>
              <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
             <button
              onClick={() => navigate('/profile')}
              className="flex-1 flex items-center justify-center py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors border border-gray-300"
            >
              <Settings size={16} className="text-gray-600" />
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center py-2 bg-error-100 hover:bg-error-200 text-error-600 rounded-xl transition-colors border border-error-200"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 backdrop-blur-sm bg-white/80 border-b border-gray-200 flex items-center justify-between px-8 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 bg-gray-100 rounded-xl border border-gray-200 text-gray-600"
          >
            <Menu size={20} />
          </button>
          
          <div className="hidden md:flex items-center text-sm text-gray-600">
             <span className="font-medium text-gray-900">Session: {new Date().getFullYear()} / {new Date().getFullYear() + 1}</span>
             <span className="mx-3 opacity-20">|</span>
             <span className="flex items-center space-x-1"><TrendingUp size={14} className="text-success-600" /> <span className="text-success-600">System Live</span></span>
          </div>
          
          <div className="flex items-center space-x-4">
             <button className="relative w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl transition-all">
                <Bell size={18} className="text-gray-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white" />
             </button>
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 border border-primary-300 flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold text-white">{user.full_name.charAt(0)}</span>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.4);
        }
      `}</style>
    </div>
  );
};

export default MainLayout;