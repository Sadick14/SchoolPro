import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/shared';
import { Login } from '@/auth';

// Platform (System Operator)
import {
  PlatformDashboard,
  SystemOverview,
  SystemDashboard,
  TenantManagement,
  Analytics,
  SystemSettings,
  ActivityLog,
  UserManagement,
  PendingSchools,
  SupportTickets,
  CreateSchool,
  TenantDetail,
} from '@/platform';

// School (Institution Admin)
import {
  Dashboard,
  OwnerDashboard,
  InitialSetup,
  Campuses,
  StaffManagement,
  Admissions,
  Profile,
  TeacherAttendance,
  StudentsList,
  ClassesList,
  FeesManagement,
  StaffDirectory,
  HostelManagement,
  TransportManagement,
  LibraryManagement,
  Notices,
  SchoolsList,
} from '@/school';

// Teacher
import { TeacherDashboard, AssessmentsList } from '@/teacher';

// Parent
import { ParentPortal } from '@/parent';

// Student
import { StudentPortal } from '@/student';

// Auth
import { useAuth } from '@/shared/lib/auth';

function App() {
  const { initialized, user } = useAuth();

  useEffect(() => {
    document.title = 'SchoolPro GH | Management System';
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-bold uppercase tracking-widest text-[10px]">Loading SchoolPro GH...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        {/* ============================================
            PLATFORM ROUTES (System Operator / super_admin)
            ============================================ */}
        {user?.role === 'super_admin' && (
          <>
            <Route index element={<PlatformDashboard />} />
            <Route path="dashboard" element={<PlatformDashboard />} />
            <Route path="system" element={<SystemOverview />} />
            <Route path="system/overview" element={<SystemOverview />} />
            <Route path="system/dashboard" element={<SystemDashboard />} />
            <Route path="system/tenants" element={<TenantManagement />} />
            <Route path="system/analytics" element={<Analytics />} />
            <Route path="system/settings" element={<SystemSettings />} />
            <Route path="system/activity" element={<ActivityLog />} />
            <Route path="system/users" element={<UserManagement />} />
            <Route path="system/schools" element={<SchoolsList />} />
            <Route path="system/create-school" element={<CreateSchool />} />
            <Route path="system/pending" element={<PendingSchools />} />
            <Route path="system/tickets" element={<SupportTickets />} />
            <Route path="tenants/:id" element={<TenantDetail />} />
          </>
        )}

        {/* ============================================
            SCHOOL ROUTES (School Admin / school_admin)
            ============================================ */}
        {user?.role === 'school_admin' && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="school" element={<OwnerDashboard />} />
            <Route path="school/profile" element={<OwnerDashboard />} />
            <Route path="school/setup" element={<InitialSetup />} />
            <Route path="school/campuses" element={<Campuses />} />
            <Route path="school/staff" element={<StaffManagement />} />
            <Route path="school/admissions" element={<Admissions />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="classes" element={<ClassesList />} />
            <Route path="assessments" element={<AssessmentsList />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="hr" element={<StaffDirectory />} />
            <Route path="fees" element={<FeesManagement />} />
            <Route path="hostel" element={<HostelManagement />} />
            <Route path="transport" element={<TransportManagement />} />
            <Route path="library" element={<LibraryManagement />} />
            <Route path="communications" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}

        {/* ============================================
            TEACHER ROUTES (Teacher / teacher)
            ============================================ */}
        {user?.role === 'teacher' && (
          <>
            <Route index element={<TeacherDashboard />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="assessments" element={<AssessmentsList />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="classes" element={<ClassesList />} />
            <Route path="library" element={<LibraryManagement />} />
            <Route path="communications" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}

        {/* ============================================
            PARENT ROUTES (Parent / parent)
            ============================================ */}
        {user?.role === 'parent' && (
          <>
            <Route index element={<ParentPortal />} />
            <Route path="dashboard" element={<ParentPortal />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="fees" element={<FeesManagement />} />
            <Route path="transport" element={<TransportManagement />} />
            <Route path="communications" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}

        {/* ============================================
            STUDENT ROUTES (Student / student)
            ============================================ */}
        {user?.role === 'student' && (
          <>
            <Route index element={<StudentPortal />} />
            <Route path="dashboard" element={<StudentPortal />} />
            <Route path="assessments" element={<AssessmentsList />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="library" element={<LibraryManagement />} />
            <Route path="fees" element={<FeesManagement />} />
            <Route path="communications" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;