import React, { useState, useMemo } from 'react';
import { Card, Button, Input, Table } from '@/shared';
import { Search, Plus, Edit2, Trash2, Eye, CheckCircle, AlertCircle } from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  email: string;
  admin: string;
  schools: number;
  users: number;
  status: 'active' | 'suspended' | 'trial';
  createdAt: string;
  revenue: number;
}

const TenantManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'Accra International School',
      email: 'admin@accra-intl.edu',
      admin: 'Kwame Owusu',
      schools: 1,
      users: 45,
      status: 'active',
      createdAt: '2025-01-15',
      revenue: 12500,
    },
    {
      id: '2',
      name: 'Kumasi Excellence Academy',
      email: 'admin@kumasi-excel.edu',
      admin: 'Ama Mensah',
      schools: 2,
      users: 78,
      status: 'active',
      createdAt: '2025-02-20',
      revenue: 18900,
    },
    {
      id: '3',
      name: 'Takoradi Tech School',
      email: 'admin@takoradi-tech.edu',
      admin: 'Kofi Boateng',
      schools: 1,
      users: 32,
      status: 'trial',
      createdAt: '2025-04-10',
      revenue: 2800,
    },
    {
      id: '4',
      name: 'Cape Coast Central',
      email: 'admin@cape-central.edu',
      admin: 'Abena Appiah',
      schools: 3,
      users: 120,
      status: 'active',
      createdAt: '2024-11-05',
      revenue: 25600,
    },
  ]);

  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.admin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tenants]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'suspended':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-2">Manage all schools and institutions</p>
        </div>
        <Button onClick={() => {}} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by tenant name, email, or admin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Tenants Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Tenant Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Admin</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Schools</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Users</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Revenue</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Joined</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{tenant.name}</p>
                      <p className="text-xs text-gray-500">{tenant.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{tenant.admin}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {tenant.schools}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {tenant.users}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    GHS {tenant.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.status)}`}>
                      {getStatusIcon(tenant.status)}
                      <span className="capitalize">{tenant.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{tenant.createdAt}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>Showing {filteredTenants.length} of {tenants.length} tenants</p>
          <div className="space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TenantManagement;
