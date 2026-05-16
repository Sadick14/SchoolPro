import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { MOCK_STUDENTS, MOCK_ASSIGNMENTS } from '../../lib/mockData';
import { useAuth } from '../../lib/auth';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);

  if (!user || user.role !== 'teacher') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a Teacher to access this page.</p>
        </Card>
      </div>
    );
  }

  const toggleAttendance = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' } : s));
  };

  const createAssignment = () => {
    const newA = { id: `a-${Date.now()}`, title: 'New Assignment', class: 'Form 2', due_date: '2026-06-01', submitted_by: [] };
    setAssignments(prev => [newA, ...prev]);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Teacher Dashboard</h1>
          <p className="text-slate-400">Mark attendance, create assignments, and manage your class.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={createAssignment}>Create Assignment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Class Students">
          <Table
            columns={[
              { header: 'Student', accessor: (s:any) => <div className="font-bold">{s.full_name}</div> },
              { header: 'Admission', accessor: 'admission_id' },
              { header: 'Attendance', accessor: (s:any) => (
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-black ${s.attendance === 'Present' ? 'text-success-400' : 'text-error-400'}`}>{s.attendance}</div>
                  <Button size="sm" variant="glass" onClick={() => toggleAttendance(s.id)}>Toggle</Button>
                </div>
              ) },
            ]}
            data={students}
            keyExtractor={(s) => s.id}
          />
        </Card>

        <Card title="Assignments">
          <div className="space-y-3">
            {assignments.map(a => (
              <div key={a.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400">Due: {a.due_date}</div>
                </div>
                <div>
                  <Button size="sm" variant="glass">View</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
