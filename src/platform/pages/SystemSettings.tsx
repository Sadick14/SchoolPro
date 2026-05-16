import React, { useState } from 'react';
import { Card, Button, Input } from '@/shared';
import { Settings, Save, Lock, Bell, Mail, Shield, Zap } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    platformName: 'SchoolPro GH',
    platformEmail: 'support@schoolpro.gh',
    platformPhone: '+233 (0)XXX XXX XXX',
    supportEmail: 'support@schoolpro.gh',
    apiRateLimit: '1000',
    sessionTimeout: '30',
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorEnabled: true,
    backupFrequency: 'daily',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">✓ Settings saved successfully</p>
        </div>
      )}

      {/* Platform Settings */}
      <Card title="Platform Information" icon={<Settings className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <Input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleChange('platformName', e.target.value)}
              placeholder="Platform name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <Input
              type="email"
              value={settings.platformEmail}
              onChange={(e) => handleChange('platformEmail', e.target.value)}
              placeholder="support@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
            <Input
              type="tel"
              value={settings.platformPhone}
              onChange={(e) => handleChange('platformPhone', e.target.value)}
              placeholder="+233 (0)XXX XXX XXX"
            />
          </div>
        </div>
      </Card>

      {/* API Settings */}
      <Card title="API Configuration" icon={<Zap className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (req/hour)</label>
            <Input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleChange('apiRateLimit', e.target.value)}
              placeholder="1000"
            />
            <p className="text-xs text-gray-600 mt-2">Maximum number of API requests allowed per hour</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <Input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
              placeholder="30"
            />
            <p className="text-xs text-gray-600 mt-2">User session timeout duration</p>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card title="Security & Privacy" icon={<Shield className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.twoFactorEnabled}
                onChange={(e) => handleChange('twoFactorEnabled', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="font-medium text-gray-700">Require Two-Factor Authentication</span>
            </label>
            <p className="text-xs text-gray-600 mt-2 ml-7">Enforce 2FA for all admin accounts</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleChange('backupFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">How often to backup system data</p>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="font-medium text-gray-700">Maintenance Mode</span>
            </label>
            <p className="text-xs text-gray-600 mt-2 ml-7">Disable platform access for maintenance</p>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card title="Notifications" icon={<Bell className="w-5 h-5" />}>
        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="font-medium text-gray-700">Email Notifications</span>
            </label>
            <p className="text-xs text-gray-600 mt-2 ml-7">Send notifications via email</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900">Notification Types</p>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>School registration notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>System error alerts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>User activity alerts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>Payment notifications</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Database Settings */}
      <Card title="Database" icon={<Lock className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Database Status</p>
            <p className="text-sm text-green-600 mt-1">✓ Connected and operational</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Last Backup</p>
            <p className="text-sm text-gray-700 mt-1">Today at 2:30 AM - 4.2 GB</p>
          </div>
          <Button onClick={() => {}} variant="secondary" size="sm">
            Trigger Manual Backup
          </Button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-end space-x-4">
        <Button onClick={() => {}} variant="secondary">
          Reset
        </Button>
        <Button onClick={handleSave} variant="primary">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
