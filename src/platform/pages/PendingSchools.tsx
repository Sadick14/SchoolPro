import React, { useState } from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { MOCK_PENDING_SCHOOLS } from '@/shared/lib/mockData';

const PendingSchools: React.FC = () => {
  const [pending, setPending] = useState(MOCK_PENDING_SCHOOLS);

  const approve = (id: string) => {
    setPending(prev => prev.filter(p => p.id !== id));
    // In real implementation, call backend to create tenant and seed defaults
  };

  const reject = (id: string) => {
    setPending(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-white mb-4">Pending School Registrations</h1>
      <div className="space-y-4">
        {pending.map(p => (
          <Card key={p.id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{p.name}</div>
                <div className="text-xs text-slate-400">{p.city}, {p.region} — {p.contact}</div>
                <div className="text-[11px] text-slate-500 mt-1">Submitted: {p.submitted_at}</div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="primary" size="sm" onClick={() => approve(p.id)}>Approve</Button>
                <Button variant="outline" size="sm" onClick={() => reject(p.id)}>Reject</Button>
              </div>
            </div>
          </Card>
        ))}
        {pending.length === 0 && <div className="text-slate-400">No pending registrations.</div>}
      </div>
    </div>
  );
};

export default PendingSchools;
