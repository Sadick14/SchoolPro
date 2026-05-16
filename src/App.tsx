import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayoutRoles';
import { Login } from './features/auth';
import Dashboard from './pages/Dashboard';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import StudentsList from './pages/students/StudentsList';
import ClassesList from './pages/classes/ClassesList';
import FeesManagement from './pages/fees/FeesManagement';
import AssessmentsList from './pages/assessments/AssessmentsList';
import StaffDirectory from './pages/hr/StaffDirectory';
import HostelManagement from './pages/hostel/HostelManagement';
import TransportManagement from './pages/transport/TransportManagement';
import LibraryManagement from './pages/library/LibraryManagement';
import Notices from './pages/communication/Notices';
import SchoolsList from './pages/schools/SchoolsList';

import { useAuth } from './lib/auth';
import Profile from './pages/Profile';
import OwnerDashboard from './pages/school/OwnerDashboard';
import Campuses from './pages/school/Campuses';
import StaffManagement from './pages/school/StaffManagement';
import Admissions from './pages/school/Admissions';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentPortal from './pages/parent/ParentPortal';
import StudentPortal from './pages/student/StudentPortal';
import SystemOverview from './pages/admin/SystemOverview';
import TenantDetail from './pages/admin/TenantDetail';
import SystemDashboard from './pages/admin/SystemDashboard';
import PendingSchools from './pages/admin/PendingSchools';
import SupportTickets from './pages/admin/SupportTickets';
import CreateSchool from './pages/admin/CreateSchool';
import { ImplementationCommandCenter, ModuleWorkspace } from './features/platform';

function App() {
  const { initialized } = useAuth();

  useEffect(() => {
    // Set the page title
    document.title = 'SchoolPro GH | Management System';
  }, []);

  // Show a loading state until auth is initialized
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
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="classes" element={<ClassesList />} />
        <Route path="fees" element={<FeesManagement />} />
        <Route path="finance" element={<ModuleWorkspace moduleId="finance-accounting" />} />
        <Route path="subscriptions" element={<ModuleWorkspace moduleId="subscriptions-billing" />} />
        <Route path="payroll" element={<ModuleWorkspace moduleId="hr-payroll" />} />
        <Route path="lms" element={<ModuleWorkspace moduleId="lms-elearning" />} />
        <Route path="clinic" element={<ModuleWorkspace moduleId="clinic" />} />
        <Route path="security" element={<ModuleWorkspace moduleId="audit-security" />} />
        <Route path="reports" element={<ModuleWorkspace moduleId="reports-compliance" />} />
        <Route path="modules/:moduleId" element={<ModuleWorkspace />} />
        
        <Route path="assessments" element={<AssessmentsList />} />
        <Route path="hr" element={<StaffDirectory />} />
        <Route path="hostel" element={<HostelManagement />} />
        <Route path="transport" element={<TransportManagement />} />
        <Route path="library" element={<LibraryManagement />} />
        <Route path="notifications" element={<Notices />} />
        <Route path="system" element={<SystemOverview />} />
        <Route path="implementation" element={<ImplementationCommandCenter />} />
        <Route path="system/create-school" element={<CreateSchool />} />
        <Route path="system/dashboard" element={<SystemDashboard />} />
        <Route path="system/pending" element={<PendingSchools />} />
        <Route path="system/tickets" element={<SupportTickets />} />
        <Route path="tenants/:id" element={<TenantDetail />} />
        
        <Route path="schools" element={<SchoolsList />} />
        <Route path="profile" element={<Profile />} />
          <Route path="school" element={<OwnerDashboard />} />
          <Route path="school/campuses" element={<Campuses />} />
          <Route path="school/staff" element={<StaffManagement />} />
          <Route path="school/admissions" element={<Admissions />} />
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="parent" element={<ParentPortal />} />
          <Route path="student" element={<StudentPortal />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;