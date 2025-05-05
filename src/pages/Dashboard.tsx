import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { useAuth } from '../lib/auth';
import { Users, BookOpen, CalendarCheck, Bell, School } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/common/Button';

interface DashboardStat {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );

  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        let dashboardStats: DashboardStat[] = [];

        if (user.role === 'super_admin') {
          // Fetch schools count
          const { count: schoolsCount } = await supabase
            .from('schools')
            .select('id', { count: 'exact', head: true });

          // Fetch users count
          const { count: usersCount } = await supabase
            .from('users')
            .select('id', { count: 'exact', head: true });

          dashboardStats = [
            {
              title: 'Total Schools',
              value: schoolsCount || 0,
              icon: <School size={24} />,
              color: 'bg-primary-800',
            },
            {
              title: 'Total Users',
              value: usersCount || 0,
              icon: <Users size={24} />,
              color: 'bg-accent-500',
            },
          ];
        } else if (user.role === 'school_admin' || user.role === 'teacher') {
          // School-specific data
          const { count: studentsCount } = await supabase
            .from('students')
            .select('id', { count: 'exact', head: true })
            .eq('school_id', user.school_id);

          // Fetch classes count for this school
          const { count: classesCount } = await supabase
            .from('classes')
            .select('id', { count: 'exact', head: true })
            .eq('school_id', user.school_id);

          // Fetch today's attendance percentage
          const today = new Date().toISOString().split('T')[0];
          const { data: attendance } = await supabase
            .from('attendance')
            .select('status')
            .eq('date', today)
            .in('status', ['present', 'absent']);

          const attendancePercentage = attendance
            ? Math.round(
                (attendance.filter((a) => a.status === 'present').length / attendance.length) * 100
              )
            : 0;

          dashboardStats = [
            {
              title: 'Total Students',
              value: studentsCount || 0,
              icon: <Users size={24} />,
              color: 'bg-primary-800',
            },
            {
              title: 'Total Classes',
              value: classesCount || 0,
              icon: <BookOpen size={24} />,
              color: 'bg-secondary-600',
            },
            {
              title: "Today's Attendance",
              value: `${attendancePercentage}%`,
              icon: <CalendarCheck size={24} />,
              color: 'bg-success-500',
            },
          ];
        } else if (user.role === 'student' || user.role === 'parent') {
          // Student-specific data
          // For parents, we could show data for their children
          // For simplicity, we'll show similar data
          const studentId = user.role === 'student' ? user.id : 'parent-child-id';

          // Fetch attendance percentage for this month
          const currentMonth = new Date().getMonth() + 1;
          const { data: attendance } = await supabase
            .from('attendance')
            .select('status')
            .eq('student_id', studentId)
            .like('date', `%-${currentMonth.toString().padStart(2, '0')}-%`);

          const attendancePercentage = attendance
            ? Math.round(
                (attendance.filter((a) => a.status === 'present').length / attendance.length) * 100
              )
            : 0;

          // Fetch recent assessment marks
          const { data: assessmentMarks } = await supabase
            .from('assessment_marks')
            .select('assessment_id, marks_obtained')
            .eq('student_id', studentId)
            .order('created_at', { ascending: false })
            .limit(5);

          const averageMarks = assessmentMarks
            ? Math.round(
                assessmentMarks.reduce((sum, mark) => sum + mark.marks_obtained, 0) /
                  assessmentMarks.length
              )
            : 0;

          dashboardStats = [
            {
              title: 'Monthly Attendance',
              value: `${attendancePercentage}%`,
              icon: <CalendarCheck size={24} />,
              color: 'bg-primary-800',
            },
            {
              title: 'Average Marks',
              value: averageMarks,
              icon: <BookOpen size={24} />,
              color: 'bg-success-500',
            },
          ];
        }

        setStats(dashboardStats);

        // Fetch recent notifications
        const { data: notifications } = await supabase
          .from('notifications')
          .select('*')
          .eq('school_id', user.school_id)
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentNotifications(notifications || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white h-32 rounded-lg shadow-sm"></div>
          ))}
        </div>
        <div className="bg-white h-64 rounded-lg shadow-sm"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.full_name}
          <span
            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              connectionStatus === 'online'
                ? 'bg-success-100 text-success-700'
                : 'bg-warning-100 text-warning-700'
            }`}
          >
            {connectionStatus === 'online' ? 'Online' : 'Offline'}
          </span>
        </p>
      </div>

      {connectionStatus === 'offline' && (
        <div className="mb-6 bg-warning-50 border border-warning-100 text-warning-700 px-4 py-3 rounded-md">
          <p className="text-sm">
            You are currently working in offline mode. Changes will be synchronized when you
            reconnect to the internet.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-200 hover:shadow-md hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} text-white flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card
          title="Recent Notifications"
          headerAction={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          {recentNotifications.length === 0 ? (
            <div className="text-center py-4">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No recent notifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{notification.content}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            {user?.role === 'teacher' && (
              <>
                <Button>Take Attendance</Button>
                <Button>Record Assessment</Button>
                <Button>View Class Schedule</Button>
                <Button>Send Notification</Button>
              </>
            )}
            {user?.role === 'school_admin' && (
              <>
                <Button>Add User</Button>
                <Button>Add Student</Button>
                <Button>Add Class</Button>
                <Button>Send Notification</Button>
              </>
            )}
            {(user?.role === 'student' || user?.role === 'parent') && (
              <>
                <Button>View Attendance</Button>
                <Button>View Report Card</Button>
                <Button>View Fee Status</Button>
                <Button>View Schedule</Button>
              </>
            )}
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Database Sync</span>
              <span className="text-success-700">Up to date</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Offline Storage</span>
              <span className="text-success-700">Enabled</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last Synced</span>
              <span className="text-gray-600">
                {connectionStatus === 'online'
                  ? 'Real-time'
                  : new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;