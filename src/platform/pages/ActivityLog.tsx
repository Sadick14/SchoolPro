import React, { useState, useMemo } from 'react';
import { Card, Input } from '@/shared';
import { Search, Filter, User, Building2, Settings, Lock, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  type: 'success' | 'warning' | 'error' | 'info';
  details: string;
  ipAddress: string;
}

const ActivityLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const activities: ActivityLog[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60000).toLocaleString(),
      user: 'Kwame Owusu',
      action: 'Created new school',
      type: 'success',
      details: 'Accra International School registered',
      ipAddress: '192.168.1.1',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60000).toLocaleString(),
      user: 'System',
      action: 'Backup completed',
      type: 'success',
      details: 'Daily backup completed successfully (4.2 GB)',
      ipAddress: 'SYSTEM',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60000).toLocaleString(),
      user: 'Ama Mensah',
      action: 'Updated tenant settings',
      type: 'info',
      details: 'Kumasi Excellence Academy settings modified',
      ipAddress: '192.168.1.45',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1 * 3600000).toLocaleString(),
      user: 'Admin',
      action: 'Failed login attempt',
      type: 'warning',
      details: '3 failed login attempts from IP 203.0.113.42',
      ipAddress: '203.0.113.42',
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 2 * 3600000).toLocaleString(),
      user: 'Kofi Boateng',
      action: 'Approved school registration',
      type: 'success',
      details: 'Takoradi Tech School approved',
      ipAddress: '192.168.1.78',
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 3 * 3600000).toLocaleString(),
      user: 'System',
      action: 'System update',
      type: 'info',
      details: 'Platform updated to version 2.1.0',
      ipAddress: 'SYSTEM',
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 4 * 3600000).toLocaleString(),
      user: 'Abena Appiah',
      action: 'Suspended tenant',
      type: 'warning',
      details: 'Cape Coast Central access suspended (payment overdue)',
      ipAddress: '192.168.1.92',
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 5 * 3600000).toLocaleString(),
      user: 'System',
      action: 'Database maintenance',
      type: 'info',
      details: 'Scheduled database optimization completed',
      ipAddress: 'SYSTEM',
    },
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = 
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || activity.type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-600 mt-2">Monitor all system activities and user actions</p>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by user, action, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4 border-t border-gray-200 pt-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('success')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Success
              </button>
              <button
                onClick={() => setFilterType('warning')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'warning'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Warnings
              </button>
              <button
                onClick={() => setFilterType('error')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Errors
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`border rounded-lg p-4 ${getTypeColor(activity.type)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className="pt-1">{getTypeIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{activity.action}</h3>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{activity.details}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                    <span>
                      <User className="w-3 h-3 inline mr-1" />
                      {activity.user}
                    </span>
                    <span className="text-gray-400">{activity.ipAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No activities match your search</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredActivities.length} of {activities.length} activities
        </p>
        <div className="space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Next
          </button>
        </div>
      </div>

      {/* Activity Statistics */}
      <Card title="Activity Summary">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Success</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activities.filter(a => a.type === 'success').length}
            </p>
          </div>
          <div className="text-center">
            <AlertCircle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Warnings</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activities.filter(a => a.type === 'warning').length}
            </p>
          </div>
          <div className="text-center">
            <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Errors</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activities.filter(a => a.type === 'error').length}
            </p>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Info</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activities.filter(a => a.type === 'info').length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActivityLog;
