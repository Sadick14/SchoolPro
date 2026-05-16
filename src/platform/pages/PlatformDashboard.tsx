import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, StatCard } from '@/shared';
import { Activity, Users, Building2, BarChart3, Settings, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const PlatformDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock platform metrics
  const metrics = useMemo(() => ({
    totalTenants: 142,
    activeUsers: 3245,
    activeSchools: 89,
    pendingApprovals: 7,
    monthlyRevenue: 45230,
    systemUptime: '99.8%',
    supportTickets: 23,
    lastActivity: new Date().toLocaleTimeString(),
  }), []);

  // Quick action cards
  const quickActions = [
    {
      icon: Building2,
      label: 'Create School',
      description: 'Register a new school',
      action: () => navigate('/system/create-school'),
      color: 'blue',
    },
    {
      icon: AlertCircle,
      label: 'Pending Approvals',
      description: 'Review school applications',
      action: () => navigate('/system/pending'),
      badge: metrics.pendingApprovals,
      color: 'orange',
    },
    {
      icon: Users,
      label: 'Manage Tenants',
      description: 'Manage schools & admins',
      action: () => navigate('/system/tenants'),
      color: 'green',
    },
    {
      icon: AlertCircle,
      label: 'Support Tickets',
      description: 'View support requests',
      action: () => navigate('/system/tickets'),
      badge: metrics.supportTickets,
      color: 'red',
    },
  ];

  // Navigation cards
  const sections = [
    {
      title: 'System Overview',
      description: 'View system health and status',
      icon: BarChart3,
      action: () => navigate('/system/overview'),
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics & reports',
      icon: TrendingUp,
      action: () => navigate('/system/analytics'),
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      action: () => navigate('/system/settings'),
    },
    {
      title: 'Activity Log',
      description: 'View system activity',
      icon: Activity,
      action: () => navigate('/system/activity'),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Operator Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage and monitor the SchoolPro platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Schools"
          value={metrics.activeSchools.toString()}
          icon={<Building2 className="w-6 h-6" />}
          trend="+12"
          color="primary"
        />
        <StatCard
          label="Active Users"
          value={metrics.activeUsers.toString()}
          icon={<Users className="w-6 h-6" />}
          trend="+8"
          color="success"
        />
        <StatCard
          label="Monthly Revenue"
          value={`GHS ${metrics.monthlyRevenue.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+15"
          color="accent"
        />
        <StatCard
          label="System Uptime"
          value={metrics.systemUptime}
          icon={<Clock className="w-6 h-6" />}
          trend="-0.2"
          color="secondary"
        />
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={action.action}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <Icon className={`w-6 h-6 text-${action.color}-600 group-hover:scale-110 transition-transform`} />
                  {action.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                      {action.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mt-3">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Main Sections */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={idx} clickable onClick={section.action}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* System Status */}
      <Card title="System Status">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Database Status</p>
              <p className="text-gray-900 font-semibold">Operational</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Status</p>
              <p className="text-gray-900 font-semibold">Operational</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Check</p>
              <p className="text-gray-900 font-semibold">{metrics.lastActivity}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformDashboard;
