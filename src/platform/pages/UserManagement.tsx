import React, { useState, useMemo } from 'react';
import { Card, Button, Input } from '@/shared';
import { Search, Plus, Edit2, Trash2, Lock, Unlock, Mail } from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'support';
  school?: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinDate: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const users: SystemUser[] = [
    {
      id: '1',
      name: 'Kwame Owusu',
      email: 'kwame@schoolpro.gh',
      role: 'superadmin',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 3600000).toLocaleString(),
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Ama Mensah',
      email: 'ama@schoolpro.gh',
      role: 'admin',
      school: 'Kumasi Excellence Academy',
      status: 'active',
      lastLogin: new Date(Date.now() - 1 * 3600000).toLocaleString(),
      joinDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Kofi Boateng',
      email: 'kofi@schoolpro.gh',
      role: 'support',
      status: 'active',
      lastLogin: new Date(Date.now() - 30 * 60000).toLocaleString(),
      joinDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Abena Appiah',
      email: 'abena@schoolpro.gh',
      role: 'admin',
      school: 'Cape Coast Central',
      status: 'active',
      lastLogin: new Date(Date.now() - 5 * 60000).toLocaleString(),
      joinDate: '2024-01-08',
    },
    {
      id: '5',
      name: 'Yaw Amoah',
      email: 'yaw@schoolpro.gh',
      role: 'support',
      status: 'inactive',
      lastLogin: new Date(Date.now() - 7 * 24 * 3600000).toLocaleString(),
      joinDate: '2024-04-01',
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.school?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchesRole = filterRole === 'all' || user.role === filterRole;

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, filterRole]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Users</h1>
          <p className="text-gray-600 mt-2">Manage system operators and administrators</p>
        </div>
        <Button onClick={() => {}} variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-3 border-t border-gray-200 pt-4">
            {['all', 'superadmin', 'admin', 'support'].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filterRole === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">School</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Last Login</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                      {user.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {user.school ? (
                      <span className="text-sm">{user.school}</span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{user.lastLogin}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Lock Account">
                        {user.status === 'active' ? (
                          <Lock className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Unlock className="w-4 h-4 text-gray-600" />
                        )}
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
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Super Admins</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {users.filter(u => u.role === 'superadmin').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Inactive</p>
            <p className="text-3xl font-bold text-gray-600 mt-2">
              {users.filter(u => u.status === 'inactive').length}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
