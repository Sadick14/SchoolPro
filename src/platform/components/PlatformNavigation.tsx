import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Settings,
  Activity,
  UserCheck,
  AlertCircle,
  HelpCircle,
  Database,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
  badge?: number;
}

const PlatformNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />,
      description: 'Overview and quick actions',
    },
  ];

  const managementNavItems: NavItem[] = [
    {
      label: 'System Overview',
      path: '/system/overview',
      icon: <Database className="w-5 h-5" />,
      description: 'System health and status',
    },
    {
      label: 'Tenants',
      path: '/system/tenants',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Manage schools & institutions',
    },
    {
      label: 'Users',
      path: '/system/users',
      icon: <Users className="w-5 h-5" />,
      description: 'System operators & admins',
    },
  ];

  const operationsNavItems: NavItem[] = [
    {
      label: 'Pending Approvals',
      path: '/system/pending',
      icon: <AlertCircle className="w-5 h-5" />,
      description: 'Schools awaiting approval',
      badge: 7,
    },
    {
      label: 'Support Tickets',
      path: '/system/tickets',
      icon: <HelpCircle className="w-5 h-5" />,
      description: 'User support requests',
      badge: 23,
    },
    {
      label: 'Create School',
      path: '/system/create-school',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Register new school',
    },
  ];

  const analyticsNavItems: NavItem[] = [
    {
      label: 'Analytics',
      path: '/system/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Platform analytics & reports',
    },
    {
      label: 'Activity Log',
      path: '/system/activity',
      icon: <Activity className="w-5 h-5" />,
      description: 'System activity monitoring',
    },
  ];

  const settingsNavItems: NavItem[] = [
    {
      label: 'Settings',
      path: '/system/settings',
      icon: <Settings className="w-5 h-5" />,
      description: 'System configuration',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavSection = ({
    title,
    items,
  }: {
    title: string;
    items: NavItem[];
  }) => (
    <div className="mb-6">
      <h3 className="px-4 py-2 text-xs font-bold uppercase text-gray-500 tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-start space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
              isActive(item.path)
                ? 'bg-blue-100 text-blue-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className={`mt-0.5 flex-shrink-0 ${
              isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{item.label}</p>
                {item.badge && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <NavSection title="Main" items={mainNavItems} />
      <NavSection title="Management" items={managementNavItems} />
      <NavSection title="Operations" items={operationsNavItems} />
      <NavSection title="Analytics" items={analyticsNavItems} />
      <NavSection title="Configuration" items={settingsNavItems} />
    </div>
  );
};

export default PlatformNavigation;
