import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { useAuth } from '@/shared/lib/auth';
import { MOCK_STATS } from '@/shared/lib/mockData';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'school_admin') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a School Owner / Director to view this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">School Owner Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your school: campuses, staff, admissions, finances and settings.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="glass" onClick={() => navigate('/school/campuses')}>Campuses</Button>
          <Button variant="glass" onClick={() => navigate('/school/staff')}>Staff</Button>
          <Button variant="glass" onClick={() => navigate('/school/admissions')}>Admissions</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((s) => (
          <div key={s.label} className="premium-card p-6">
            <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">{s.label}</div>
            <div className="text-2xl font-black text-gray-900 mt-3">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">Trend: {s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Quick Actions">
          <div className="space-y-3">
            <Button onClick={() => navigate('/school/campuses')}>Manage Campuses</Button>
            <Button onClick={() => navigate('/school/staff')}>Add Staff</Button>
            <Button onClick={() => navigate('/school/admissions')}>Review Admissions</Button>
          </div>
        </Card>

        <Card title="Finance Snapshot">
          <div className="text-sm text-slate-400">Summary of fees collected and outstanding totals (mock).</div>
        </Card>

        <Card title="Academic Snapshot">
          <div className="text-sm text-slate-400">Quick view of active levels and classes (mock).</div>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
