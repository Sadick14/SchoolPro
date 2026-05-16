import React, { useMemo } from 'react';
import { Card, StatCard, Sparkline } from '@/shared';
import { TrendingUp, Users, Building2, DollarSign, BarChart3, PieChart } from 'lucide-react';

const Analytics: React.FC = () => {
  const analyticsData = useMemo(() => ({
    totalRevenue: 156780,
    revenueGrowth: 23.5,
    activeSchools: 89,
    schoolsGrowth: 12.3,
    totalUsers: 3245,
    usersGrowth: 18.7,
    avgUsersPerSchool: 36.5,
    usersGrowthTrend: [120, 135, 128, 152, 165, 178, 185, 192],
    revenueByMonth: [8900, 12300, 11800, 15600, 18900, 22100, 26700, 30200],
    topTenants: [
      { name: 'Cape Coast Central', revenue: 25600, users: 120 },
      { name: 'Kumasi Excellence', revenue: 18900, users: 78 },
      { name: 'Accra International', revenue: 12500, users: 45 },
      { name: 'Takoradi Tech', revenue: 2800, users: 32 },
    ],
    userBreakdown: {
      schoolAdmins: 89,
      teachers: 1245,
      parents: 892,
      students: 1019,
    },
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-2">Platform performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value={`GHS ${analyticsData.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend={`+${analyticsData.revenueGrowth}%`}
          color="success"
        />
        <StatCard
          label="Active Schools"
          value={analyticsData.activeSchools.toString()}
          icon={<Building2 className="w-6 h-6" />}
          trend={`+${analyticsData.schoolsGrowth}%`}
          color="primary"
        />
        <StatCard
          label="Total Users"
          value={analyticsData.totalUsers.toString()}
          icon={<Users className="w-6 h-6" />}
          trend={`+${analyticsData.usersGrowth}%`}
          color="accent"
        />
        <StatCard
          label="Avg Users/School"
          value={analyticsData.avgUsersPerSchool.toString()}
          icon={<BarChart3 className="w-6 h-6" />}
          color="secondary"
        />
      </div>

      {/* Revenue & Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trend (Last 8 Months)">
          <div className="space-y-4">
            <div className="h-40 flex items-end space-x-2">
              {analyticsData.revenueByMonth.map((value, idx) => (
                <div key={idx} className="flex-1 bg-blue-200 rounded-t" style={{
                  height: `${(value / Math.max(...analyticsData.revenueByMonth)) * 100}%`,
                  minHeight: '20px',
                }} title={`GHS ${value.toLocaleString()}`}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
            </div>
          </div>
        </Card>

        <Card title="User Growth (Last 8 Months)">
          <Sparkline
            data={analyticsData.usersGrowthTrend}
            color="emerald"
            height={160}
            showLabel={true}
          />
          <p className="text-sm text-gray-600 mt-4">Cumulative users showing consistent growth trend</p>
        </Card>
      </div>

      {/* User Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="User Breakdown">
          <div className="space-y-4">
            {[
              { label: 'Students', value: analyticsData.userBreakdown.students, color: 'blue' },
              { label: 'Teachers', value: analyticsData.userBreakdown.teachers, color: 'green' },
              { label: 'Parents', value: analyticsData.userBreakdown.parents, color: 'orange' },
              { label: 'School Admins', value: analyticsData.userBreakdown.schoolAdmins, color: 'purple' },
            ].map((item, idx) => {
              const total = Object.values(analyticsData.userBreakdown).reduce((a, b) => a + b, 0);
              const percentage = (item.value / total) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className="text-gray-900 font-semibold">{item.value.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${item.color}-600 h-2 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Top Performing Tenants">
          <div className="space-y-4">
            {analyticsData.topTenants.map((tenant, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{idx + 1}. {tenant.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{tenant.users} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">GHS {tenant.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+15%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Month-over-Month Growth</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">+18.5%</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <PieChart className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Market Penetration</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">23.4%</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Platform Utilization</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">87.6%</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
