import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  School, Users, Home, BookOpen, Calendar, ClipboardCheck, 
  DollarSign, Bell, Menu, X, LogOut, UserCircle 
} from 'lucide-react';
import { useAuth, hasRole } from '../../lib/auth';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Close sidebar on route change on mobile
    setSidebarOpen(false);
  }, [location.pathname]);
  
  // Check if user is authenticated
  useEffect(() => {
    if (user === null && location.pathname !== '/login') {
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
      path: '/schools',
      icon: <School size={20} />,
      label: 'Schools',
      roles: ['super_admin'],
    },
    {
      path: '/users',
      icon: <Users size={20} />,
      label: 'Users',
      roles: ['super_admin', 'school_admin'],
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
      label: 'Classes',
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      path: '/attendance',
      icon: <Calendar size={20} />,
      label: 'Attendance',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
    {
      path: '/assessments',
      icon: <ClipboardCheck size={20} />,
      label: 'Assessments',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
    {
      path: '/fees',
      icon: <DollarSign size={20} />,
      label: 'Fees',
      roles: ['super_admin', 'school_admin', 'parent', 'student'],
    },
    {
      path: '/notifications',
      icon: <Bell size={20} />,
      label: 'Notifications',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
    {
      path: '/profile',
      icon: <UserCircle size={20} />,
      label: 'Profile',
      roles: ['super_admin', 'school_admin', 'teacher', 'parent', 'student'],
    },
  ];
  
  if (!user) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-primary-800 text-white p-4 flex md:hidden items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center space-x-2">
          <School size={24} />
          <h1 className="text-xl font-bold">SchoolMS</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-white focus:outline-none"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for tablet and desktop */}
        <aside className={`${
            sidebarOpen ? 'fixed inset-0 z-50 transform translate-x-0' : 'transform -translate-x-full'
          } md:relative md:transform-none md:flex bg-primary-800 text-white w-64 flex-col transition-transform duration-300 ease-in-out md:block`}
        >
          <div className="p-4 border-b border-primary-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <School size={24} />
              <h1 className="text-xl font-bold">SchoolMS</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="py-4">
              <ul>
                {navItems.map((item) => {
                  // Only show items the user has access to
                  if (!user || !hasRole(user, item.roles)) return null;
                  
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-2 px-4 py-3 text-sm transition duration-200 ${
                            isActive
                              ? 'bg-primary-700 border-l-4 border-accent-400'
                              : 'hover:bg-primary-700'
                          }`
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          
          <div className="p-4 border-t border-primary-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium truncate">{user?.full_name}</div>
                <div className="text-xs text-gray-300 capitalize">{user?.role.replace('_', ' ')}</div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <main className="container mx-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          {navItems.slice(0, 5).map((item) => {
            // Only show items the user has access to
            if (!user || !hasRole(user, item.roles)) return null;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-2 text-xs ${
                    isActive ? 'text-primary-800' : 'text-gray-500'
                  }`
                }
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      
      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;