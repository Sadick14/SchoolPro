import React from 'react';
import Card from '@/shared/components/common/Card';
import Button from '@/shared/components/common/Button';
import { MOCK_STUDENTS, MOCK_ASSIGNMENTS } from '@/shared/lib/mockData';
import { useAuth } from '@/shared/lib/auth';

const ParentPortal: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'parent') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a Parent to access this page.</p>
        </Card>
      </div>
    );
  }

  // For demo, pick first student as the child
  const child = MOCK_STUDENTS[0];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Parent Portal</h1>
          <p className="text-slate-400">View your child's performance, attendance and fees.</p>
        </div>
        <div>
          <Button>Pay Fees</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Child Overview">
          <div className="space-y-2">
            <div className="font-bold text-white">{child.full_name}</div>
            <div className="text-xs text-slate-400">{child.class} — {child.stream}</div>
            <div className="text-sm text-white mt-2">Attendance: {child.attendance}</div>
            <div className="text-sm text-white">Fees: {child.fees_paid} (Due: {child.fees_due})</div>
          </div>
        </Card>

        <Card title="Assignments">
          <div className="space-y-2">
            {MOCK_ASSIGNMENTS.map(a => (
              <div key={a.id} className="flex items-center justify-between p-2 bg-white/5 rounded-md">
                <div>
                  <div className="font-bold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400">Due: {a.due_date}</div>
                </div>
                <Button size="sm" variant="glass">View</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Reports & Cards">
          <div className="space-y-2">
            <div className="text-sm text-slate-400">Report card for latest term (mock)</div>
            <Button size="sm">Download Report Card</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentPortal;
