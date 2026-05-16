import React, { useState } from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { MOCK_TICKETS } from '@/shared/lib/mockData';

const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState(MOCK_TICKETS);

  const setStatus = (id: string, status: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-black mb-4">Support Tickets</h1>
      <div className="space-y-4">
        {tickets.map(t => (
          <Card key={t.id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-black">{t.title}</div>
                <div className="text-xs text-slate-400">Created: {t.created_at}</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`text-xs font-bold ${t.status === 'open' ? 'text-error-400' : 'text-success-400'}`}>{t.status}</div>
                {t.status !== 'resolved' && <Button size="sm" variant="primary" onClick={() => setStatus(t.id, 'resolved')}>Resolve</Button>}
                <Button size="sm" variant="outline" onClick={() => setStatus(t.id, 'closed')}>Close</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportTickets;
