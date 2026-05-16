import React from 'react';
import Card from '@/shared/components/common/Card';
import StatCard from '@/shared/components/common/StatCard';
import Button from '@/shared/components/common/Button';
import { PLATFORM_STATS, MOCK_PENDING_SCHOOLS, MOCK_SCHOOLS, MOCK_TICKETS } from '@/shared/lib/mockData';
import { School, Users, Database, ServerCog, BarChart2, FileText } from 'lucide-react';

const SystemDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Schools', value: String(PLATFORM_STATS.total_schools), trend: '+3%', color: 'primary' },
    { label: 'Pending Approvals', value: String(PLATFORM_STATS.pending_schools), trend: '-1%', color: 'accent' },
    { label: 'Active Users', value: String(PLATFORM_STATS.active_users), trend: '+4%', color: 'secondary' },
    { label: 'Monthly Revenue', value: PLATFORM_STATS.monthly_revenue, trend: '+6%', color: 'success' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Platform Overview</h1>
          <p className="text-slate-400 mt-1">High level metrics for the System Operator.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="glass">Export</Button>
          <Button>Manage Billing</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} trend={s.trend} color={s.color as any} icon={<BarChart2 size={20} />} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Pending Schools">
          <div className="space-y-3">
            {MOCK_PENDING_SCHOOLS.slice(0,3).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-bold text-white">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.city}, {p.region}</div>
                </div>
                <div className="text-xs text-slate-400">{p.submitted_at}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Tickets">
          <div className="space-y-3">
            {MOCK_TICKETS.slice(0,3).map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-bold text-white">{t.title}</div>
                  <div className="text-xs text-slate-400">Priority: {t.priority}</div>
                </div>
                <div className={`text-xs font-bold ${t.status === 'open' ? 'text-error-400' : 'text-success-400'}`}>{t.status}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Platform Health">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white">Storage used</div>
              <div className="text-sm text-slate-400">{PLATFORM_STATS.storage_used_gb} GB</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white">API Integrations</div>
              <div className="text-sm text-slate-400">{MOCK_SCHOOLS.length} connected</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemDashboard;
