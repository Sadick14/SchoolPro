import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  School, Users, Home, BookOpen, Calendar, ClipboardCheck, 
  DollarSign, Bell, Menu, X, LogOut, UserCircle, Settings,
  ChevronRight, TrendingUp, Bus, Building, Library, MessageSquare, HeartPulse, Laptop, ShieldCheck, FileText, WalletCards
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../lib/mockData';
import { useAuth, hasRole } from '../../lib/auth';
import type { UserRole } from '../../lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface RoleFolder {
  role: UserRole;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const MainLayoutRoles: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setSidebarOpen(false), [location.pathname]);

  useEffect(() => {
    if (!user && location.pathname !== '/login') navigate('/login');
  }, [user, location.pathname, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const roleFolders: RoleFolder[] = [
    {
      role: 'super_admin',
      label: 'System',
      icon: <School size={18} />, 
      items: [
        { path: '/system', label: 'Overview', icon: <TrendingUp size={16} /> },
        { path: '/implementation', label: 'Implementation', icon: <ShieldCheck size={16} /> },
        { path: '/system/dashboard', label: 'Dashboard', icon: <Home size={16} /> },
        { path: '/system/create-school', label: 'Create School', icon: <Building size={16} /> },
        { path: '/subscriptions', label: 'Subscriptions', icon: <WalletCards size={16} /> },
        { path: '/system/pending', label: 'Pending Schools', icon: <ClipboardCheck size={16} /> },
        { path: '/system/tickets', label: 'Support Tickets', icon: <MessageSquare size={16} /> },
      ]
    },
    {
      role: 'school_admin',
      label: 'School',
      icon: <School size={18} />,
      items: [
        { path: '/school', label: 'Owner Dashboard', icon: <Home size={16} /> },
        { path: '/school/campuses', label: 'Campuses', icon: <Building size={16} /> },
        { path: '/school/staff', label: 'Staff Management', icon: <UserCircle size={16} /> },
        { path: '/school/admissions', label: 'Admissions', icon: <ClipboardCheck size={16} /> },
        { path: '/students', label: 'Students', icon: <Users size={16} /> },
        { path: '/classes', label: 'Classes', icon: <BookOpen size={16} /> },
        { path: '/fees', label: 'Fees', icon: <DollarSign size={16} /> },
        { path: '/finance', label: 'Accounting', icon: <WalletCards size={16} /> },
        { path: '/payroll', label: 'Payroll', icon: <UserCircle size={16} /> },
        { path: '/hr', label: 'HR', icon: <UserCircle size={16} /> },
        { path: '/hostel', label: 'Hostel', icon: <Building size={16} /> },
        { path: '/transport', label: 'Transport', icon: <Bus size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/lms', label: 'LMS', icon: <Laptop size={16} /> },
        { path: '/clinic', label: 'Clinic', icon: <HeartPulse size={16} /> },
        { path: '/security', label: 'Security', icon: <ShieldCheck size={16} /> },
        { path: '/reports', label: 'Reports', icon: <FileText size={16} /> },
        { path: '/notifications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    },
    {
      role: 'teacher',
      label: 'Teacher',
      icon: <Users size={18} />,
      items: [
        { path: '/teacher', label: 'Dashboard', icon: <Home size={16} /> },
        { path: '/attendance', label: 'Attendance', icon: <Calendar size={16} /> },
        { path: '/assessments', label: 'Assessments', icon: <ClipboardCheck size={16} /> },
        { path: '/lms', label: 'LMS', icon: <Laptop size={16} /> },
        { path: '/students', label: 'My Students', icon: <Users size={16} /> },
        { path: '/classes', label: 'My Classes', icon: <BookOpen size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/notifications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    },
    {
      role: 'parent',
      label: 'Parent',
      icon: <Users size={18} />,
      items: [
        { path: '/parent', label: 'Portal', icon: <Home size={16} /> },
        { path: '/attendance', label: 'Attendance', icon: <Calendar size={16} /> },
        { path: '/fees', label: 'Fees', icon: <DollarSign size={16} /> },
        { path: '/transport', label: 'Transport', icon: <Bus size={16} /> },
        { path: '/notifications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    },
    {
      role: 'student',
      label: 'Student',
      icon: <Users size={18} />,
      items: [
        { path: '/student', label: 'Portal', icon: <Home size={16} /> },
        { path: '/lms', label: 'LMS', icon: <Laptop size={16} /> },
        { path: '/assessments', label: 'Exams', icon: <ClipboardCheck size={16} /> },
        { path: '/attendance', label: 'Attendance', icon: <Calendar size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/fees', label: 'Fees', icon: <DollarSign size={16} /> },
        { path: '/notifications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    }
  ];

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  if (!user) return <Outlet />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 flex overflow-hidden font-sans">
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

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
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-4 mb-4">Features</p>
          {roleFolders.map(folder => {
            if (!hasRole(user, folder.role)) return null;
            const isOpen = !!openFolders[folder.role];
            return (
              <div key={folder.role} className="mb-3">
                <button
                  type="button"
                  onClick={() => setOpenFolders(prev => ({ ...prev, [folder.role]: !prev[folder.role] }))}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${isOpen ? 'bg-amber-50 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-600">{folder.icon}</div>
                    <span className="font-medium">{folder.label}</span>
                  </div>
                  <ChevronRight size={14} className={`${isOpen ? 'rotate-90' : ''} transition-transform`} />
                </button>

                {isOpen && (
                  <div className="mt-2 space-y-1 pl-6">
                    {folder.items.map(it => (
                      <NavLink key={it.path} to={it.path} className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${isActive ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <div className="opacity-80">{it.icon}</div>
                        <div className="font-medium">{it.label}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

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

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 backdrop-blur-sm bg-white/80 border-b border-gray-200 flex items-center justify-between px-8 z-40">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 bg-gray-100 rounded-xl border border-gray-200 text-gray-600">
            <Menu size={20} />
          </button>
          <div className="hidden md:flex items-center text-sm text-gray-600">
             <span className="font-medium text-gray-900">Session: {new Date().getFullYear()} / {new Date().getFullYear() + 1}</span>
             <span className="mx-3 opacity-20">|</span>
             <span className="flex items-center space-x-1"><TrendingUp size={14} className="text-success-600" /> <span className="text-success-600">System Live</span></span>
          </div>
          <div className="flex items-center space-x-4">
               <div className="relative">
                 <button onClick={() => setNotifOpen((s) => !s)} className="relative w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl transition-all">
                    <Bell size={18} className="text-gray-600" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white" />
                 </button>
                 {notifOpen && (
                   <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-4 z-50">
                     <h4 className="text-sm font-bold text-gray-800 mb-3">Notifications</h4>
                     <div className="space-y-3 max-h-64 overflow-y-auto">
                       {MOCK_NOTIFICATIONS.map(n => (
                         <div key={n.id} className="p-3 bg-gray-50 rounded-xl">
                           <div className="flex items-start justify-between">
                             <div>
                               <p className="text-sm font-bold text-gray-900">{n.title}</p>
                               <p className="text-xs text-gray-600 mt-1">{n.content}</p>
                             </div>
                             <div className="text-[10px] text-gray-400 ml-3">{new Date(n.created_at).toLocaleString()}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="mt-3">
                       <button className="w-full py-2 bg-primary-500 text-white rounded-xl">Mark all read</button>
                     </div>
                   </div>
                 )}
               </div>
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 border border-primary-300 flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold text-white">{user.full_name.charAt(0)}</span>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="max-w-7xl mx-auto">
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {sidebarOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
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

export default MainLayoutRoles;
