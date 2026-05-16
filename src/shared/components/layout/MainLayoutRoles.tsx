import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  School, Users, Home, BookOpen, Calendar, ClipboardCheck, 
  DollarSign, Bell, Menu, X, LogOut, UserCircle, Settings,
  ChevronRight, TrendingUp, Bus, Building, Library, MessageSquare, FileText
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/shared/lib/mockData';
import { useAuth, hasRole } from '@/shared/lib/auth';
import type { UserRole } from '@/shared/lib/auth';


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
        { path: '/', label: 'Dashboard', icon: <Home size={16} /> },
        { path: '/system/overview', label: 'System Overview', icon: <Building size={16} /> },
        { path: '/system/tenants', label: 'Manage Tenants', icon: <Users size={16} /> },
        { path: '/system/users', label: 'System Users', icon: <UserCircle size={16} /> },
        { path: '/system/analytics', label: 'Analytics', icon: <TrendingUp size={16} /> },
        { path: '/system/activity', label: 'Activity Log', icon: <FileText size={16} /> },
        { path: '/system/create-school', label: 'Create School', icon: <Building size={16} /> },
        { path: '/system/pending', label: 'Pending Schools', icon: <ClipboardCheck size={16} /> },
        { path: '/system/tickets', label: 'Support Tickets', icon: <MessageSquare size={16} /> },
        { path: '/system/settings', label: 'Settings', icon: <Settings size={16} /> },
      ]
    },
    {
      role: 'school_admin',
      label: 'School',
      icon: <School size={18} />,
      items: [
        { path: '/school', label: 'Owner Dashboard', icon: <Home size={16} /> },
        { path: '/school/setup', label: 'Initial Setup', icon: <ClipboardCheck size={16} /> },
        { path: '/academics', label: 'Academics', icon: <BookOpen size={16} /> },
        { path: '/school/campuses', label: 'Campuses', icon: <Building size={16} /> },
        { path: '/school/staff', label: 'Staff Management', icon: <UserCircle size={16} /> },
        { path: '/school/admissions', label: 'Admissions', icon: <ClipboardCheck size={16} /> },
        { path: '/students', label: 'Students', icon: <Users size={16} /> },
        { path: '/classes', label: 'Classes', icon: <BookOpen size={16} /> },
        { path: '/fees', label: 'Fees', icon: <DollarSign size={16} /> },
        { path: '/hr', label: 'HR', icon: <UserCircle size={16} /> },
        { path: '/hostel', label: 'Hostel', icon: <Building size={16} /> },
        { path: '/transport', label: 'Transport', icon: <Bus size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/communications', label: 'Communication', icon: <MessageSquare size={16} /> },
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
        { path: '/students', label: 'My Students', icon: <Users size={16} /> },
        { path: '/classes', label: 'My Classes', icon: <BookOpen size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/communications', label: 'Communication', icon: <MessageSquare size={16} /> },
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
        { path: '/communications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    },
    {
      role: 'student',
      label: 'Student',
      icon: <Users size={18} />,
      items: [
        { path: '/student', label: 'Portal', icon: <Home size={16} /> },
        { path: '/assessments', label: 'Exams', icon: <ClipboardCheck size={16} /> },
        { path: '/attendance', label: 'Attendance', icon: <Calendar size={16} /> },
        { path: '/library', label: 'Library', icon: <Library size={16} /> },
        { path: '/fees', label: 'Fees', icon: <DollarSign size={16} /> },
        { path: '/communications', label: 'Communication', icon: <MessageSquare size={16} /> },
      ]
    }
  ];

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  if (!user) return <Outlet />;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex overflow-hidden font-sans">
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <School size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">SchoolPro<span className="text-blue-600">GH</span></h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {roleFolders.map(folder => {
            if (!hasRole(user, folder.role)) return null;
            const isOpen = !!openFolders[folder.role];
            return (
              <div key={folder.role} className="mb-2">
                <button
                  type="button"
                  onClick={() => setOpenFolders(prev => ({ ...prev, [folder.role]: !prev[folder.role] }))}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${isOpen ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <div className="flex items-center space-x-2">
                    <div>{folder.icon}</div>
                    <span>{folder.label}</span>
                  </div>
                  <ChevronRight size={16} className={`${isOpen ? 'rotate-90' : ''} transition-transform`} />
                </button>

                {isOpen && (
                  <div className="mt-1 space-y-1 pl-3">
                    {folder.items.map(it => (
                      <NavLink key={it.path} to={it.path} className={({ isActive }) => `group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <div>{it.icon}</div>
                        <div>{it.label}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 m-3 mt-auto rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserCircle size={20} className="text-blue-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">{user.full_name}</p>
              <p className="text-[10px] text-gray-500 font-medium uppercase">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button
              onClick={() => navigate('/profile')}
              className="flex-1 flex items-center justify-center py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-sm"
            >
              <Settings size={14} />
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center py-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors text-sm"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 bg-gray-100 rounded-lg border border-gray-200 text-gray-600">
            <Menu size={18} />
          </button>
          <div className="hidden md:flex items-center text-xs text-gray-600 gap-3">
             <span className="font-medium text-gray-900">{new Date().getFullYear()} / {new Date().getFullYear() + 1}</span>
             <span className="opacity-20">|</span>
             <span className="flex items-center gap-1"><TrendingUp size={14} className="text-green-600" /> <span className="text-green-600">Live</span></span>
          </div>
          <div className="flex items-center space-x-3">
               <div className="relative">
                 <button onClick={() => setNotifOpen((s) => !s)} className="relative w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-all">
                    <Bell size={16} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                 </button>
                 {notifOpen && (
                   <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                     <h4 className="text-sm font-bold text-gray-800 mb-2">Notifications</h4>
                     <div className="space-y-2 max-h-64 overflow-y-auto">
                       {MOCK_NOTIFICATIONS.map((n: typeof MOCK_NOTIFICATIONS[0]) => (
                         <div key={n.id} className="p-2 bg-gray-50 rounded-lg">
                           <div className="flex items-start justify-between">
                             <div>
                               <p className="text-xs font-bold text-gray-900">{n.title}</p>
                               <p className="text-xs text-gray-600 mt-0.5">{n.content}</p>
                             </div>
                             <div className="text-[9px] text-gray-400 ml-2 flex-shrink-0">{new Date(n.created_at).toLocaleString()}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="mt-2">
                       <button className="w-full py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700">Mark all read</button>
                     </div>
                   </div>
                 )}
               </div>
             <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                {user.full_name.charAt(0)}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50">
          <div key={location.pathname} className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MainLayoutRoles;
