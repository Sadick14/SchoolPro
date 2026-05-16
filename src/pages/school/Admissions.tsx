import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { MOCK_ADMISSIONS } from '../../lib/mockData';

const Admissions: React.FC = () => {
  const [admissions, setAdmissions] = useState(MOCK_ADMISSIONS);

  const updateStatus = (id: string, status: string) => {
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-white mb-4">Admissions</h1>
      <Card>
        <Table
          columns={[
            { header: 'Applicant', accessor: 'name' },
            { header: 'Applied For', accessor: 'applied_for' },
            { header: 'Submitted', accessor: 'submitted_at' },
            { header: 'Status', accessor: (a:any) => <div className={`text-xs font-black ${a.status === 'pending' ? 'text-warning-400' : 'text-success-400'}`}>{a.status}</div> },
            { header: '', accessor: (a:any) => (
              <div className="flex items-center space-x-2 justify-end">
                <Button size="sm" variant="primary" onClick={() => updateStatus(a.id, 'approved')}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, 'rejected')}>Reject</Button>
              </div>
            ), className: 'text-right' }
          ]}
          data={admissions}
          keyExtractor={(a) => a.id}
        />
      </Card>
    </div>
  );
};

export default Admissions;
