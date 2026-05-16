import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { MOCK_STAFF } from '../../lib/mockData';

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const addStaff = () => {
    const newStaff = { id: `staff-${Date.now()}`, full_name: name, role, department };
    setStaff(prev => [newStaff, ...prev]);
    setName(''); setRole(''); setDepartment('');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-white">Staff Directory</h1>
        <Button onClick={addStaff}>Add Staff</Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>

        <Table
          columns={[
            { header: 'Name', accessor: (s:any) => <div className="font-bold">{s.full_name}</div> },
            { header: 'Role', accessor: 'role' },
            { header: 'Department', accessor: 'department' },
            { header: '', accessor: () => <Button variant="glass" size="sm">Manage</Button>, className: 'text-right' }
          ]}
          data={staff}
          keyExtractor={(s) => s.id}
        />
      </Card>
    </div>
  );
};

export default StaffManagement;
