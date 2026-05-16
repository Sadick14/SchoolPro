import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  School,
  Users,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Settings,
  ArrowRight,
  Database,
  Shield,
  Zap,
  LineChart,
  Clock,
  DollarSign,
  Activity,
} from 'lucide-react';
import Button from '@/shared/components/common/Button';
import Card from '@/shared/components/common/Card';
import StatCard from '@/shared/components/common/StatCard';
import Table from '@/shared/components/common/Table';
import { PLATFORM_STATS, MOCK_PENDING_SCHOOLS, MOCK_TICKETS, MOCK_SCHOOLS } from '@/shared/lib/mockData';
import { useAuth } from '@/shared/lib/auth';

interface SystemMetric {
  label: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'accent' | 'secondary';
}

interface RecentActivityItem {
  id: string;
  action: string;
  school: string;
  user: string;
  timestamp: string;
  status: 'success' | 'pending' | 'warning';
}

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!user || user.role !== 'super_admin') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">
            You must be a System Operator to access this dashboard.
          </p>
        </Card>
      </div>
    );
  }

  const systemMetrics: SystemMetric[] = [
    {
      label: 'Total Schools',
      value: PLATFORM_STATS.total_schools,
      change: '+3 this month',
      icon: <School size={20} />,
      color: 'primary',
    },
    {
      label: 'Active Users',
      value: PLATFORM_STATS.active_users,
      change: '+12% from last month',
      icon: <Users size={20} />,
      color: 'success',
    },
    {
      label: 'Monthly Revenue',
      value: PLATFORM_STATS.monthly_revenue,
      change: '+6% from last month',
      icon: <DollarSign size={20} />,
      color: 'accent',
    },
    {
      label: 'System Uptime',
      value: '99.8%',
      change: 'Last 30 days',
      icon: <Activity size={20} />,
      color: 'secondary',
    },
  ];

  const recentActivity: RecentActivityItem[] = [
    {
      id: '1',
      action: 'School onboarded',
      school: 'Accra International Academy',
      user: 'Samuel Mensah',
      timestamp: '2 hours ago',
      status: 'success',
    },
    {
      id: '2',
      action: 'Subscription upgraded',
      school: 'Wesley Girls High School',
      user: 'Ama Boateng',
      timestamp: '5 hours ago',
      status: 'success',
    },
    {
      id: '3',
      action: 'Support ticket created',
      school: 'Prempeh College',
      user: 'Kofi Adjei',
      timestamp: '1 day ago',
      status: 'pending',
    },
    {
      id: '4',
      action: 'Migration in progress',
      school: 'Ashanti Girls High School',
      user: 'System',
      timestamp: '2 days ago',
      status: 'warning',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700';
      case 'pending':
        return 'bg-blue-50 text-blue-700';
      case 'warning':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'warning':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-8 shadow-2xl">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
              <Shield size={14} /> System Operator
            </div>

            <h1 className="mt-5 text-4xl font-black text-white md:text-5xl">
              Platform Control Center
            </h1>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-300">
              Manage all schools, users, subscriptions, and system configuration across the SchoolPro platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button icon={<Zap size={18} />} onClick={() => navigate('/system')}>
                Manage Tenants
              </Button>
              <Button
                variant="glass"
                icon={<Settings size={18} />}
                onClick={() => navigate('/system/create-school')}
              >
                Add School
              </Button>
              <Button
                variant="glass"
                icon={<LineChart size={18} />}
                onClick={() => navigate('/system/dashboard')}
              >
                Detailed Analytics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEY METRICS */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard
              label={metric.label}
              value={String(metric.value)}
              trend={metric.change}
              icon={metric.icon}
              color={metric.color}
            />
          </motion.div>
        ))}
      </section>

      {/* TABS */}
      <section className="flex gap-2 border-b border-slate-200">
        {['overview', 'pending', 'performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-3 font-semibold text-sm transition-colors ${
              selectedTab === tab
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </section>

      {/* MAIN CONTENT - OVERVIEW TAB */}
      {selectedTab === 'overview' && (
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* REGISTERED SCHOOLS */}
            <Card title="Registered Schools" className="overflow-hidden">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {MOCK_SCHOOLS.slice(0, 5).map((school, idx) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/tenants/${school.id}`)}
                  >
                    <div>
                      <div className="font-bold text-slate-900">{school.name}</div>
                      <div className="text-sm text-slate-500">
                        {school.students} students • {school.city}, {school.region}
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-primary-500" />
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/system')}
                >
                  View All Schools
                </Button>
              </div>
            </Card>

            {/* RECENT ACTIVITY */}
            <Card title="System Activity" className="overflow-hidden">
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <div className={`rounded-full p-2 ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900">
                        {activity.action}
                      </div>
                      <div className="text-sm text-slate-500">
                        {activity.school} by {activity.user}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">
                      {activity.timestamp}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* QUICK ACTIONS */}
            <Card title="Quick Actions" variant="solid">
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/system/pending')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    <span className="font-semibold text-sm">Pending Approvals</span>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 rounded-full px-2 py-1">
                    {PLATFORM_STATS.pending_schools}
                  </span>
                </button>
                <button
                  onClick={() => navigate('/system/tickets')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-blue-600" />
                    <span className="font-semibold text-sm">Support Tickets</span>
                  </div>
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-1">
                    {MOCK_TICKETS.length}
                  </span>
                </button>
                <button
                  onClick={() => navigate('/subscriptions')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-emerald-600" />
                    <span className="font-semibold text-sm">Subscriptions</span>
                  </div>
                  <ArrowRight size={16} className="text-primary-500" />
                </button>
              </div>
            </Card>

            {/* SYSTEM STATUS */}
            <Card title="System Status" variant="solid">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">API Servers</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Cache Layer</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm font-medium text-slate-700">Uptime</span>
                  <span className="text-sm font-bold text-emerald-600">99.8%</span>
                </div>
              </div>
            </Card>

            {/* LATEST STATS */}
            <Card title="Platform KPIs" variant="solid">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">
                      Database Usage
                    </span>
                    <span className="text-xs font-bold text-slate-700">68%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">
                      Storage Used
                    </span>
                    <span className="text-xs font-bold text-slate-700">45%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* PENDING APPROVALS TAB */}
      {selectedTab === 'pending' && (
        <section>
          <Card title="Schools Awaiting Approval">
            <Table
              data={MOCK_PENDING_SCHOOLS}
              keyExtractor={(s) => s.id}
              columns={[
                {
                  header: 'School Name',
                  accessor: (s) => (
                    <div>
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-500">
                        {s.principal_name}
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Location',
                  accessor: (s) => `${s.city}, ${s.region}`,
                },
                {
                  header: 'Submitted',
                  accessor: (s) => s.submitted_at,
                },
                {
                  header: 'Action',
                  accessor: (s) => (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  ),
                  align: 'right',
                },
              ]}
            />
          </Card>
        </section>
      )}

      {/* PERFORMANCE TAB */}
      {selectedTab === 'performance' && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Request Analytics">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">
                    API Requests (24h)
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    234,567
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: '87%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Average Response Time
                  </span>
                  <span className="text-sm font-bold text-slate-700">
                    142ms
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Error Rate
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    0.02%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Top Endpoints">
            <div className="space-y-2">
              {[
                { name: '/api/students', calls: 45230, status: 'healthy' },
                { name: '/api/attendance', calls: 38921, status: 'healthy' },
                { name: '/api/fees', calls: 32145, status: 'healthy' },
                { name: '/api/classes', calls: 28903, status: 'healthy' },
                { name: '/api/reports', calls: 18234, status: 'warning' },
              ].map((endpoint, idx) => (
                <div
                  key={endpoint.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {endpoint.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {endpoint.calls.toLocaleString()} calls
                    </div>
                  </div>
                  <div
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      endpoint.status === 'healthy'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {endpoint.status}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
