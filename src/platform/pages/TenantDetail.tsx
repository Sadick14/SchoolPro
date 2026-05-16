import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import Table from '@/shared/components/common/Table';
import { MOCK_SCHOOLS, MOCK_USERS, MOCK_FINANCE_SUMMARY, MOCK_ACADEMIC, MOCK_REPORTS } from '@/shared/lib/mockData';

const TenantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tenant = MOCK_SCHOOLS.find(s => s.id === id) || MOCK_SCHOOLS[0];
  const [tab, setTab] = useState<'branding' | 'settings' | 'users' | 'finance' | 'academic' | 'reports'>('branding');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Tenant: {tenant.name}</h1>
          <p className="text-slate-400 text-sm">Tenant ID: {tenant.id}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="glass" onClick={() => navigate('/system')}>Back</Button>
          <Button>Open Console</Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        {['branding','settings','users','finance','academic','reports'].map(t => (
          <button key={t} onClick={() => setTab(t as any)} className={`px-4 py-2 rounded-2xl ${tab===t ? 'bg-primary-500 text-white' : 'bg-white/5 text-slate-300'}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {tab === 'branding' && (
          <Card title="Branding & Appearance">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-xl bg-white/5 flex items-center justify-center">Logo</div>
                <div>
                  <p className="font-bold text-white">Primary Color</p>
                  <p className="text-sm text-slate-400">#F59E0B</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="primary">Upload Logo</Button>
                <Button variant="glass">Preview Theme</Button>
              </div>
            </div>
          </Card>
        )}

        {tab === 'settings' && (
          <Card title="Settings">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Academic Year</p>
                  <p className="text-sm text-slate-400">2026</p>
                </div>
                <div>
                  <Button variant="glass" size="sm">Edit</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Timezone</p>
                  <p className="text-sm text-slate-400">Africa/Accra</p>
                </div>
                <div>
                  <Button variant="glass" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {tab === 'users' && (
          <Card title="Users">
            <Table
              columns={[
                { header: 'Name', accessor: (u: any) => <div className="font-bold">{u.full_name}</div> },
                { header: 'Email', accessor: 'email' },
                { header: 'Role', accessor: (u: any) => <div className="text-xs font-black uppercase">{u.role}</div> },
                { header: '', accessor: () => <Button size="sm" variant="glass">Manage</Button>, className: 'text-right' }
              ]}
              data={MOCK_USERS}
              keyExtractor={(u) => u.id}
            />
          </Card>
        )}

        {tab === 'finance' && (
          <Card title="Finance Summary">
            <div className="space-y-4">
              <div className="font-bold text-white">Total Revenue: {MOCK_FINANCE_SUMMARY.total_revenue}</div>
              <div className="text-sm text-slate-400">Outstanding: {MOCK_FINANCE_SUMMARY.outstanding}</div>
              <div className="mt-4">
                <h4 className="font-bold text-white mb-2">Recent Transactions</h4>
                <div className="space-y-2">
                  {MOCK_FINANCE_SUMMARY.recent_transactions.map((t:any) => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-bold text-white">{t.title}</div>
                        <div className="text-xs text-slate-400">{t.date}</div>
                      </div>
                      <div className="font-black">{t.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {tab === 'academic' && (
          <Card title="Academic Structure">
            <div className="space-y-3">
              <div className="font-bold text-white">Levels: {MOCK_ACADEMIC.levels.join(', ')}</div>
              <div className="mt-3">
                <h4 className="font-bold text-white mb-2">Classes</h4>
                <div className="space-y-2">
                  {MOCK_ACADEMIC.classes.map((c:any) => (
                    <div key={c.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-xs text-slate-400">{c.students} students</div>
                      </div>
                      <Button size="sm" variant="glass">Manage</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {tab === 'reports' && (
          <Card title="Reports">
            <div className="space-y-2">
              {MOCK_REPORTS.map(r => (
                <div key={r.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{r.name}</div>
                    <div className="text-xs text-slate-400">Generated: {r.generated}</div>
                  </div>
                  <Button size="sm" variant="glass">Download</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TenantDetail;
