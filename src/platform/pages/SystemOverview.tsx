import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import ModulesPanel from '@/platform/components/ModulesPanel';
import { MOCK_SCHOOLS, MOCK_MODULES, MOCK_PLANS } from '@/shared/lib/mockData';
import { useAuth } from '@/shared/lib/auth';

const SystemOverview: React.FC = () => {
  const { user } = useAuth();
  const [schools] = useState(MOCK_SCHOOLS);
  const [modules, setModules] = useState(MOCK_MODULES);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(schools[0]?.id || null);
  const navigate = useNavigate();
  const [plan, setPlan] = useState(MOCK_PLANS[0].id);

  if (!user || user.role !== 'super_admin') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a System Operator to view the system overview.</p>
        </Card>
      </div>
    );
  }

  const handleToggle = (id: string, enabled: boolean) => {
    setModules((prev) => prev.map(m => m.id === id ? { ...m, enabled } : m));
  };

  const selected = schools.find(s => s.id === selectedSchool) || schools[0];

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-black">System Overview</h1>
          <p className="text-slate-400 mt-1">Manage tenants, modules, and global configuration.</p>
        </div>
        <div className="flex items-center space-x-3">
            <Button variant="glass" onClick={() => navigate('/system/dashboard')}>Overview</Button>
            <Button variant="glass" onClick={() => navigate('/system/pending')}>Pending</Button>
            <Button variant="glass" onClick={() => navigate('/system/tickets')}>Tickets</Button>
            <Button>Invite Operator</Button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Registered Schools">
            <div className="space-y-3">
              {schools.map(s => (
                <div key={s.id} className={`p-3 rounded-xl border ${selectedSchool === s.id ? 'border-primary-500 bg-white/5' : 'border-white/5' } flex items-center justify-between` }>
                  <div>
                    <div className="font-bold text-black">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.city}, {s.region} — {s.students} students</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button size="sm" variant="glass" onClick={() => navigate(`/tenants/${s.id}`)}>Open</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title={`Tenant: ${selected.name}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black">Levels / Operation</p>
                  <p className="text-xs text-slate-400">Configure whether the school runs single or multiple levels.</p>
                </div>
                <div className="space-x-2">
                  <Button variant="glass" size="sm">Single-level</Button>
                  <Button variant="glass" size="sm">Multi-level</Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-black">Subscription Plan</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {MOCK_PLANS.map(p => (
                    <div key={p.id} className={`p-3 rounded-xl border ${plan === p.id ? 'border-primary-500 bg-white/5' : 'border-white/5'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-black">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.price}</div>
                        </div>
                        <div>
                          <Button size="sm" variant={plan === p.id ? 'outline' : 'glass'} onClick={() => setPlan(p.id)}>{plan === p.id ? 'Current' : 'Select'}</Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 mt-3">
                        {p.features.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Enabled Modules">
            <ModulesPanel modules={modules} onToggle={handleToggle} />
          </Card>

          <Card title="Platform Summary">
            <div className="text-sm text-black space-y-2">
              <div>Total schools: {schools.length}</div>
              <div>Active modules: {modules.filter(m => m.enabled).length}</div>
              <div>Plans available: {MOCK_PLANS.length}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;
