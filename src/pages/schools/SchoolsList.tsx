import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import tenants, { Tenant } from '../../lib/tenants';
import { useAuth } from '../../lib/auth';

const SchoolsList: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const tenant: Tenant = {
        name,
        registration_number: regNo,
        email,
        created_at: new Date().toISOString(),
      };

      const created = await tenants.createTenant(tenant);
      await tenants.initializeTenantDefaults(created.id!);

      setMessage(`Created school ${created.name} (${created.id})`);
      setName('');
      setRegNo('');
      setEmail('');
    } catch (err: any) {
      setMessage(err.message || 'Error creating school');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'super_admin') {
    return (
      <div className="p-8">
        <Card title="Access Denied">
          <p className="text-sm text-gray-600">You must be a super admin to manage schools.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card title="Schools Management">
        <div className="space-y-4">
          <Input label="School name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Registration number" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
          <Input label="Contact email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {message && <p className="text-sm text-gray-700 font-medium">{message}</p>}
          <Button onClick={handleCreate} isLoading={loading} variant="primary">Create School</Button>
        </div>
      </Card>
    </div>
  );
};

export default SchoolsList;
