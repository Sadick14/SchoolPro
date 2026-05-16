import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import { MOCK_CAMPUSES } from '../../lib/mockData';

const Campuses: React.FC = () => {
  const [campuses, setCampuses] = useState(MOCK_CAMPUSES);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');

  const addCampus = () => {
    const newCampus = { id: `camp-${Date.now()}`, name, address, capacity: Number(capacity) };
    setCampuses(prev => [newCampus, ...prev]);
    setName(''); setAddress(''); setCapacity('');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-white">Campuses</h1>
        <Button onClick={addCampus}>Add Campus</Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input label="Campus name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Input label="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>

        <Table
          columns={[
            { header: 'Campus', accessor: 'name' },
            { header: 'Address', accessor: 'address' },
            { header: 'Capacity', accessor: (c:any) => <strong>{c.capacity}</strong> },
            { header: '', accessor: () => <Button variant="glass" size="sm">Manage</Button>, className: 'text-right' }
          ]}
          data={campuses}
          keyExtractor={(c) => c.id}
        />
      </Card>
    </div>
  );
};

export default Campuses;
