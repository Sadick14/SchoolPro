import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { MOCK_TIMETABLE, MOCK_ASSIGNMENTS } from '../../lib/mockData';
import { useAuth } from '../../lib/auth';

const StudentPortal: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);

  if (!user || user.role !== 'student') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a Student to access this page.</p>
        </Card>
      </div>
    );
  }

  const submitAssignment = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, submitted_by: [...a.submitted_by, user.id] } : a));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Student Portal</h1>
          <p className="text-slate-400">Your timetable, assignments and results.</p>
        </div>
        <div>
          <Button>Join Class</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Timetable">
          <div className="space-y-2">
            {MOCK_TIMETABLE.map(row => (
              <div key={row.day} className="p-2 bg-white/5 rounded-md">
                <div className="font-bold text-white">{row.day}</div>
                <div className="text-xs text-slate-400 mt-1">{row.periods.join(' • ')}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Assignments">
          <div className="space-y-2">
            {assignments.map(a => (
              <div key={a.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400">Due: {a.due_date}</div>
                </div>
                <div>
                  <Button size="sm" variant="primary" onClick={() => submitAssignment(a.id)}>Submit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentPortal;
